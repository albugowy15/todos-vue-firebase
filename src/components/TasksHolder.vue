<template>
	<div class="my-3">
		<div class="bg-gray-800 flex justify-between p-2 border border-gray-800">
			<h2 class="font-bold">{{ type }}</h2>
			<div @click="expandMenu">
				<svg v-if="isExpanded" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" style="fill: #fff">
					<path
						d="M 14.984375 9 A 1.0001 1.0001 0 0 0 14.292969 9.2929688 L 4.2929688 19.292969 A 1.0001 1.0001 0 1 0 5.7070312 20.707031 L 15 11.414062 L 24.292969 20.707031 A 1.0001 1.0001 0 1 0 25.707031 19.292969 L 15.707031 9.2929688 A 1.0001 1.0001 0 0 0 14.984375 9 z"
					></path>
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" style="fill: #fff">
					<path
						transf
						d="M 24.990234 8.9863281 A 1.0001 1.0001 0 0 0 24.292969 9.2929688 L 15 18.585938 L 5.7070312 9.2929688 A 1.0001 1.0001 0 0 0 4.9902344 8.9902344 A 1.0001 1.0001 0 0 0 4.2929688 10.707031 L 14.292969 20.707031 A 1.0001 1.0001 0 0 0 15.707031 20.707031 L 25.707031 10.707031 A 1.0001 1.0001 0 0 0 24.990234 8.9863281 z"
					></path>
				</svg>
			</div>
		</div>
		<div v-if="isExpanded" class="flex flex-col gap-2 p-3">
			<!-- Item todo -->
			<div :class="color" class="rounded p-3 flex items-center justify-between" v-for="(task, index) in tasks" :key="index">
				<div>
					<p class="text-base font-bold">
						<RouterLink :to="'/edit/' + task.id">{{ task.title }}</RouterLink>
					</p>
					<div class="mt-2 flex gap-2 text-xs items-center">
						<p class="px-2 py-1 rounded bg-blue-600" v-for="(tags, index) in task.tags" :key="index">{{ tags }}</p>
					</div>
					<p id="endAt" class="text-sm mt-2">{{ task.endAt.toLocaleString() }}</p>
				</div>
				<div class="flex items-center gap-2">
					<input v-if="task.status" checked class="w-[20px] h-[20px]" @change="finishTask(task.id, task.status)" type="checkbox" />
					<input v-else class="w-[20px] h-[20px]" @change="finishTask(task.id, task.status)" type="checkbox" />
					<button @click="deleteTask(task.id)">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 24 24" style="fill: #fff">
							<path
								d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"
							></path>
						</svg>
					</button>
				</div>
			</div>
			<!-- End item todo -->
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tasks: {
			type: Array,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		deleteTask: {
			type: Function,
			default() {
				return "Function in TasksHolder";
			},
		},
		finishTask: {
			type: Function,
			default() {
				return "Function in TasksHolder";
			},
		},
	},
	data() {
		return {
			isSuccess: false,
			isLoading: false,
			errMessage: "",
			isExpanded: true,
		};
	},
	methods: {
		expandMenu() {
			this.isExpanded = !this.isExpanded;
		},
	},
};
</script>
