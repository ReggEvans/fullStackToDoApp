import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import ToDoApp from './views/ToDoApp'


const app = function() {
  var ToDoRouter = Backbone.Router.extend({
  	routes: {
  		"tasks" : "handleToDoView",
  		"complete" : "handleCompletedView",
  		"unfinished" : "handleUnfinishedView",
  		"*default" : "home"
  	},
  	home: function() {
  		location.hash = "tasks"
  	},
  	handleToDoView: function() {
  		ReactDOM.render(<ToDoApp />, document.querySelector('.container'))
  	},
  	handleCompletedView: function() {
  		ReactDOM.render(<Complete />, document.querySelector('.container'))
  	},
  	handleUnfinishedView: function() {
  		ReactDOM.render(<Unfinished />, document.querySelector('.container'))
  	}
  })
  new ToDoRouter()
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..