import STORE from './STORE'
import Backbone from 'backbone'
import {Tasks} from './models/tasksModel.js'
import User from './models/userModel.js'

var ACTIONS = {
	addTask: function(taskData) {
		taskData.user_id = User.getCurrentUser().get('_id')
		var newTask = new Tasks(taskData)
		newTask.save()
			.then(
				function(response) {
					console.log('Saved!')
					ACTIONS.fetchAllTasks(taskData.user_id)
				},
				function(err) {
					alert('There was a problem.. :( ')
					console.log(err)
				}
			)
	},

	toggleComplete: function(models) {
		var userID = User.getCurrentUser().get('_id')
		models.set({
			complete: models.get('complete') ? false : true
		})
		models.save()
			.done(function(resp) {
				ACTIONS.fetchAllTasks(userID)
			})
			.fail(function(err) {
				alert('couldn\'t change the status')
				console.log(err)
			})
	},

	deleteTask: function(models) {
		var userID = User.getCurrentUser().get('_id')
		models.destroy()
			.done(ACTIONS.fetchAllTasks(userID))
			.fail(function(err) {
					alert('There was a problem deleting your task')
					console.log(err)
				})
	},

	fetchAllTasks: function(inputID) {
		var tasksColl = STORE.get('tasksCollection')
		tasksColl.fetch({
			data: {
				user_id: inputID
			}
		})
			.then(function(){
				STORE.set({
					tasksCollection: tasksColl
				})
			})
	},

	logout: function(){
		User.logout()
		.done(
			function(response){
				alert('Logged out')
				location.hash = 'login'
			}
		)
		.fail(
			function(err){
				alert('Problem logging out')
				console.log(err)
			}
		)
	},

	logUserIn: function(email, password) {
		User.login(email, password)
		.done(
			function(response){
				alert('LoggedIn!')
				console.log(response)
				location.hash = ACTIONS.hashRoute()
			}
		)
		.fail(
			function(err){
				alert('Problem logging in')
				console.log(err)
			}
		)
	},

	registerUser: function(userData) {
		User.register(userData)
		.done(
			function(res){
				alert(`New User ${res.email} Registered!`)
				console.log(res)
				ACTIONS.logUserIn(userData.email, userData.password)
			}
		)
		.fail(
			function(err){
				alert('Problem registering user')
				console.log(err)
			}
		)
	},

	loginName: function(){
		if(User.getCurrentUser() === null){
			return 'Welcome!'
		}
		else if (User.getCurrentUser().get('name') === undefined) {
			return 'Welcome!'
		}
		return `Welcome ${User.getCurrentUser().get('name')}!`
	},

	hashRoute: function(){
		if(User.getCurrentUser() === null){
			return '#login'
		}
		else if (User.getCurrentUser().get('name') === undefined) {
			return '#login'
		}
		return `#tasks/user/${User.getCurrentUser().get('_id')}`
	},
}

export default ACTIONS