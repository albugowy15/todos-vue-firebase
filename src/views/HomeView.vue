<template>
	<div id="container" class="flex flex-col justify-center items-center">
		<h1 class="text-xl font-bold p-3 text-center">Hai Owi! Jangan lupa kerjain tugasnya ya. SEMANGAT!!</h1>
		<div class="py-3"></div>
		<div class="w-full px-2 md:w-[60%] lg:w-full lg:px-7 lg:grid grid-cols-3 gap-2">
			<TasksHolder :tasks="runningTasks" color="bg-gray-700" type="Sedang Berjalan" :delete-task="deleteTask" :finish-task="finishTask" />
			<TasksHolder :tasks="missedTasks" color="bg-red-700" type="Terlewat" :delete-task="deleteTask" :finish-task="finishTask" />
			<TasksHolder :tasks="completedTasks" :delete-task="deleteTask" :finish-task="finishTask" color="bg-green-700" type="Selesai" />
		</div>
	</div>
</template>

<script>
import { deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "@firebase/firestore";
import { db, db_collect } from "../firebase";
import TasksHolder from "../components/TasksHolder.vue";
export default {
	components: {
		TasksHolder: TasksHolder,
	},
	data() {
		return {
			runningTasks: [],
			completedTasks: [],
			missedTasks: [],
		};
	},
	methods: {
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
					this.getAllTasks();
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
					this.getAllTasks();
				});
		},
		async getAllTasks() {
			this.runningTasks = [];
			this.completedTasks = [];
			this.missedTasks = [];
			const q = query(db, orderBy("endAt", "asc"));
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
	},
	async mounted() {
		await this.getAllTasks();
	},
};
</script>
