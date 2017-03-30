import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import ToDoApp from './views/ToDoApp'
import Complete from './views/complete'
import Login from './views/login'

const app = function() {
  var ToDoRouter = Backbone.Router.extend({
  	routes: {
      "login" : "handleLoginView",
  		"tasks/user/:id" : "handleToDoView",
  		"complete" : "handleCompletedView",
  		"*default" : "home"
  	},
  	home: function() {
  		location.hash = "tasks/user/:id"
  	},
    handleLoginView: function() {
      ReactDOM.render(<Login />, document.querySelector('.container'))
    },
  	handleToDoView: function(id) {
  		ReactDOM.render(<ToDoApp userID={id}/>, document.querySelector('.container'))
  	},
  	handleCompletedView: function() {
  		ReactDOM.render(<Complete />, document.querySelector('.container'))
  	},
  })
  new ToDoRouter()
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..