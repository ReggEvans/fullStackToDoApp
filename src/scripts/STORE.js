import Backbone from 'backbone'
import {TasksCollection} from './models/tasksModel'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		tasksCollection: new TasksCollection()
	},

	get: function(prop) {
		return this.data[prop]
	},

	set: function(attrs) {
		this.data = Object.assign(this.data, attrs)
		this.trigger('dataUpdated')
	}
})

export default STORE