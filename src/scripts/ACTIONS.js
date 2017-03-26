import STORE from './STORE'
import Backbone from 'backbone'
import {Tasks} from './models/tasksModel.js'

var ACTIONS = {
	addTask: function(taskData) {
		var newTask = new Tasks(taskData)
		newTask.save()
			.then(
				function(response) {
					console.log('Saved!')
					ACTIONS.fetchAllTasks()
				},
				function(err) {
					alert('There was a problem.. :( ')
					console.log(err)
				}
			)
	},

	toggleComplete: function(models) {
		models.set({
			complete: models.get('complete') ? false : true
		})
		models.save()
			.done(function(resp) {
				ACTIONS.fetchAllTasks()
			})
			.fail(function(err) {
				alert('couldn\'t change the status')
				console.log(err)
			})
	},

	deleteTask: function(models) {
		models.destroy()
			.done(ACTIONS.fetchAllTasks)
			.fail(function(err) {
					alert('There was a problem deleting your task')
					console.log(err)
				})
	},

	fetchAllTasks: function() {
		var tasksColl = STORE.get('tasksCollection')
		tasksColl.fetch()
			.then(function(){
				STORE.set({
					tasksCollection: tasksColl
				})
			})
	}
}

export default ACTIONS