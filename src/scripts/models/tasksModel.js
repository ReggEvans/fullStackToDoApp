import Backbone from 'backbone'

export var Tasks = Backbone.Model.extend({

})

export var TasksCollection = Backbone.Collection.extend({
	model: Tasks
})

