"use strict";

new Vue({
	el: '#SearchView',
	data: {
		equipmentList: {},
		selectedEquipment: "",
		selectedSearchField: "_ALL_",
		searchQuery: "",
		columns: [],
		rows: []
	},
	mounted: async function () {
		this.equipmentList = await window.api.getEquipmentList();
		// ここは今選択しているものを親からもらう
		if (Object.keys(this.equipmentList).length > 0) {
			// 仮実装
			this.selectedEquipment = Object.keys(this.equipmentList)[0];
		}
		this.search();
	},
	methods: {
		log(item) {
			console.log(item)
		},
		async search() {
			let fields = [];
			if (this.selectedSearchField === "_ALL_") {
				for (var i in this.columns) {
					fields.push(this.columns[i].field);
				}
			}
			else {
				fields.push(this.selectedSearchField);
			}

			this.rows = await window.api.searchDataFromDB(this.selectedEquipment, fields, this.searchQuery);
			if (this.rows.length > 0) {
				this.columns = [];
				const keys = Object.keys(this.rows[0]);
				for (let i in keys) {
					this.columns.push({label: keys[i], field: keys[i]})
				}
			}

		}
	}
});

