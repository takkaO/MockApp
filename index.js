"use strict";

new Vue({
	el: '#MyView',
	data: {
			selectedValue: "",
			equipmentList: [],
			selectedEquipment: "",

			searchWindow: null
	},
	mounted: async function (){
		this.equipmentList =  await window.api.loadEquipmentList();
		const keys = Object.keys(this.equipmentList);
		if (keys.length > 0) {
			this.selectedEquipment = keys[0];
		}
	},
	methods: {
		log(item) {
		  console.log(item)
		},
		changeEquipment() {
			console.log(this.selectedEquipment);
		},
		async test() {
			console.log(this.selectedValue);
			console.log(this.equipmentList);
		},
		save() {
			swal("今の入力値をDBに保存する予定", "まだ実装されていない機能です🙄", "warning");
		},
		menu_openDB() {
			console.log("Open Database");
			window.api.openSearchDataBaseWindow();
			// this.searchWindow = window.open("./template/search_window.html");
			// this.searchWindow.postMessage("I'm parent window");
		},
		menu_openTemplate() {
			console.log("Open Template");
		}
	  }
});

