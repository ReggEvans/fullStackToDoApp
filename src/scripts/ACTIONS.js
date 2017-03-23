import STORE from './STORE'
import Backbone from 'backbone'

var ACTIONS = {
	addTask: function(taskData) {
		var tasksColl = STORE.get('tasksCollection')
		tasksColl.add(taskData)
		STORE.set({
			tasksCollection: tasksColl
		})
	},

	handleDelete: function(id) {
		var tasksColl = STORE.get('tasksCollection')
		for (var i = 0; i < tasksColl.length; i++) {
			if (tasksColl.models[i].cid === id) {
				tasksColl.remove(tasksColl.models[i])
			}
		}
		STORE.set({
			tasksCollection: tasksColl
		})
	}
}

export default ACTIONS