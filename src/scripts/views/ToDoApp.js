import React from 'react'
import Backbone from 'backbone'
import STORE from '../STORE'
import ACTIONS from '../ACTIONS'

import Header from './components/header'

var ToDoApp = React.createClass({
	componentWillMount: function() {
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	handleSubmit: function(event) {
		event.preventDefault()
		var formInput = event.target
		var taskData = {
			title: formInput.newTask.value,
			description: formInput.description.value,
			date: formInput.date.value,
			complete: false
		}
		ACTIONS.addTask(taskData)

		formInput.reset()
	},
	render: function() {
		return (
			<div className='ToDoApp'>
				<Header />
				<div className='contentWrapper'>
					<form onSubmit={this.handleSubmit}>
					  <input name='newTask' type="text" placeholder="Add a new task..."/>
					  <input name='description' type="text" placeholder="Description"/>
					  <input name='date' type="text" placeholder="Due Date"/>
					  <input name='submit' type="submit" value="+" />
					</form>
					<TaskList tasks={this.state.tasksCollection}/>
				</div>
			</div>
		)
	}
})

var TaskList = React.createClass({
	makeSingleTasks: function(model) {
		return (
			<SingleTask taskModel={model} key={model.cid} />
		)
	},
	render: function() {
		return (
			<div className='task-list'>
				{this.props.tasks.map(this.makeSingleTasks)}
			</div>
		)
	}
})

var SingleTask = React.createClass({
	render: function() {
		return (
			<div className="single-task" >
				<p>
					{this.props.taskModel.get('title')}
					<span className='close' onClick={() => ACTIONS.handleDelete(this.props.taskModel.cid)}>x</span>
				</p>
				<p>{this.props.taskModel.get('description')}</p>
				<small>{this.props.taskModel.get('date')}</small>
				
			</div>
		)
	}
})

export default ToDoApp