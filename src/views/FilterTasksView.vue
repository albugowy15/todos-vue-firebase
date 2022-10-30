<template>
	<div class="p-4 text-center flex flex-col gap-2">
		<h1 class="text-xl font-bold">Cari dan Filter Task</h1>
		<div>
			<div class="flex items-center justify-center gap-2">
				<label for="title">Tag</label>
				<div class="py-1 flex gap-2 flex-wrap">
					<div class="flex bg-blue-700 items-center overflow-hidden gap-1" v-for="(tag, index) in tags" :key="index">
						<p class="p-1">{{ tag }}</p>
						<button type="button" class="p-1 h-full bg-blue-900" @click="deleteTag(index)">
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" style="fill: #fff">
								<path
									d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="my-2 flex gap-1 justify-center items-center">
				<input type="text" v-model="tag" name="title" class="form-input bg-gray-800 rounded p-1 h-full" />
				<button @click="addTag" class="bg-blue-500 h-full p-1 rounded-md">Tambah Tag</button>
			</div>
			<div>
				<button class="bg-blue-600 rounded p-2 font-bold my-3" @click="startFilter">Filter</button>
			</div>
		</div>
	</div>
	<div id="container" class="flex flex-col justify-center items-center">
		<h1 class="text-xl font-bold">Hasil Filter</h1>
		<div class="py-3"></div>
		<div class="w-full px-2 md:w-[60%] lg:w-full lg:px-7 lg:grid grid-cols-3 gap-2">
			<TasksHolder :tasks="runningTasks" color="bg-gray-700" type="Sedang Berjalan" :delete-task="deleteTask" :finish-task="finishTask" />
			<TasksHolder :tasks="missedTasks" color="bg-red-700" type="Terlewat" :delete-task="deleteTask" :finish-task="finishTask" />
			<TasksHolder :tasks="completedTasks" color="bg-green-700" type="Selesai" :delete-task="deleteTask" :finish-task="finishTask" />
		</div>
	</div>
	<LoadingSpinner v-if="isLoading" />
</template>

<script>
import { deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "@firebase/firestore";
import { db, db_collect } from "../firebase";
import TasksHolder from "../components/TasksHolder.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
	components: {
		TasksHolder: TasksHolder,
		LoadingSpinner: LoadingSpinner,
	},
	data() {
		return {
			tags: [],
			tag: "",
			completedTasks: [],
			runningTasks: [],
			missedTasks: [],
			isLoading: false,
		};
	},

	methods: {
		addTag() {
			this.tags.push(this.tag);
		},
		deleteTag(index) {
			this.tags.splice(index, 1);
		},
		deleteTask(id) {
			this.isLoading = true;
			deleteDoc(doc(db_collect, "task", id))
				.then(() => {
					this.isSuccess = true;
					console.log("ke klik nih");
				})
				.catch((err) => {
					console.log(err.message);
				})
				.finally(() => {
					this.isLoading = false;
					this.startFilter();
				});
		},
		finishTask(id, status) {
			this.isLoading = true;
			updateDoc(doc(db_collect, "task", id), {
				status: !status,
			})
				.then(() => {
					this.isSuccess = true;
				})
				.catch((err) => {
					console.log(err.message);
				})
				.finally(() => {
					this.isLoading = false;
					this.startFilter();
				});
		},
		async filterData() {
			this.runningTasks = [];
			this.completedTasks = [];
			this.missedTasks = [];
			const q = query(db, where("tags", "array-contains-any", this.tags), orderBy("endAt", "asc"));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				if (doc.data().status == true) {
					this.completedTasks.push({
						id: doc.id,
						title: doc.data().title,
						description: doc.data().description,
						status: doc.data().status,
						tags: doc.data().tags,
						createdAt: doc.data().createdAt.toDate(),
						endAt: doc.data().endAt.toDate(),
					});
				} else {
					if (doc.data().endAt.toDate() >= new Date()) {
						this.runningTasks.push({
							id: doc.id,
							title: doc.data().title,
							description: doc.data().description,
							status: doc.data().status,
							tags: doc.data().tags,
							createdAt: doc.data().createdAt.toDate(),
							endAt: doc.data().endAt.toDate(),
						});
					} else {
						this.missedTasks.push({
							id: doc.id,
							title: doc.data().title,
							description: doc.data().description,
							status: doc.data().status,
							tags: doc.data().tags,
							createdAt: doc.data().createdAt.toDate(),
							endAt: doc.data().endAt.toDate(),
						});
					}
				}
			});
		},
		startFilter() {
			this.isLoading = true;
			this.filterData().finally(() => {
				this.isLoading = false;
			});
		},
	},
};
</script>
