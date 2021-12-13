"use strict";

const MyView = {
	data() {
		return {
			structure: [
				{
					name: "Item1",
					type: "text"
				},
				{
					name: "Item2",
					type: "pulldown",
					selection: [
						{
							value: 0,
							display: "選択肢１"
						},
						{
							value: 1,
							display: "選択肢２"
						}
					]
				},
				{
					name: "Item3",
					type: "text"
				},
			],
			selectedValue: ""
		}
	},
	methods: {
		log(item) {
		  console.log(item)
		},
		test() {
			console.log(this.selectedValue);
		},
		menu_openDB() {
			console.log("Open Database");
			window.open();
		},
		menu_openTemplate() {
			console.log("Open Template");
		}
	  }
}

Vue.createApp(MyView).mount("#MyView")


window.addEventListener("load", function () {
	window.api.testApi();
	window.api.testApi2();
});
