<template>
	<div id="container" class="flex flex-col justify-center items-center my-5">
		<div class="p-5 rounded bg-gray-800 md:w-3/5 max-w-lg relative">
			<h1 class="text-xl font-bold">Edit Task</h1>
			<form @submit.prevent="updateTask" class="text-sm">
				<div class="flex flex-col gap-1 py-2">
					<label for="judul" class="">Judul</label>
					<input v-model="title" type="text" name="judul" placeholder="Masukkan judul task" class="form-input rounded bg-gray-700 px-2 py-1 text-sm" required />
				</div>
				<div class="flex flex-col gap-1 py-2">
					<label for="deadline" class="">Deadline</label>
					<input v-model="endAt" type="datetime-local" name="deadline" placeholder="Masukkan Deadline Tugas" class="form-input rounded bg-gray-700 px-2 py-1 text-sm" required />
				</div>
				<div class="flex flex-col gap-1 py-2">
					<label for="deskripsi" class="">Deskripsi</label>
					<textarea v-model="description" name="deskripsi" rows="4" placeholder="Masukkan Deskripsi Tugas" class="form-textarea rounded bg-gray-700 px-2 py-1 text-sm" />
				</div>
				<div class="flex flex-col gap-1 py-2">
					<label for="tags" class="">Tags</label>
					<div v-if="tags.length != 0" class="py-1 flex gap-2 flex-wrap">
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
					<p v-else class="italic text-slate-400 mb-1">Tidak ada tag. Silahkan menambahkan dibawah</p>
					<div class="flex justify-between gap-2">
						<input type="text" v-model="tag" name="tags" class="form-input rounded bg-gray-700 text-sm px-2 py-1 flex-1" placeholder="Masukkan tag baru" />
						<button @click="addNewTags" type="button" class="px-2 bg-purple-600 w-fit rounded-md">Tambah Tags</button>
					</div>
				</div>
				<button type="submit" class="bg-blue-700 w-full p-2 my-2 rounded-md font-semibold">Simpan</button>
			</form>
			<div class="py-2"></div>
			<div class="bg-green-700 p-3" v-if="isSucces">
				<p>Task berhasil diubah</p>
			</div>
			<div class="bg-red-700 p-3" v-else-if="errorMes != ''">
				<p>Task gagal diubah</p>
			</div>
		</div>
	</div>
	<LoadingSpinner v-if="isLoading" />
</template>

<script>
import { db_collect } from "./../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LoadingSpinner from "./../components/LoadingSpinner.vue";
export default {
	components: {
		LoadingSpinner: LoadingSpinner,
	},
	data() {
		return {
			title: "",
			endAt: null,
			description: "",
			tag: "",
			tags: [],
			isSucces: false,
			errorMes: "",
			isLoading: false,
		};
	},

	methods: {
		addNewTags() {
			if (this.tag == "") return;
			this.tags.push(this.tag);
			this.tag = "";
		},
		deleteTag(index) {
			this.tags.splice(index, 1);
		},
		formatedTimestamp(d) {
			const date = d.toISOString().split("T")[0];
			const time = d.toTimeString().split(" ")[0];
			return `${date} ${time}`;
		},
		async getTask() {
			const id = this.$route.params.taskId;
			console.log(id);
			const docSnap = await getDoc(doc(db_collect, "task", id));
			if (docSnap.exists()) {
				this.title = docSnap.data().title;
				this.description = docSnap.data().description;
				this.endAt = this.formatedTimestamp(docSnap.data().endAt.toDate());
				this.tags = docSnap.data().tags;
			}
		},
		async updateTask() {
			const id = this.$route.params.taskId;
			this.isLoading = true;
			const deadline = new Date(this.endAt);
			const data = {
				title: this.title,
				description: this.description,
				endAt: deadline,
				tags: this.tags,
			};
			console.log(data.endAt);
			updateDoc(doc(db_collect, "task", id), data)
				.then(() => {
					this.isSucces = true;
					this.isSubmited = true;
				})
				.catch((err) => {
					this.errorMes = err.message;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
	mounted() {
		this.getTask();
	},
};
</script>
