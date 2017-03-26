import React from 'react'
import Backbone from 'backbone'
import STORE from '../STORE'
import ACTIONS from '../ACTIONS'

import Header from './components/header'

var ToDoApp = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllTasks()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off()
	},
	getInitialState: function() {
		return STORE.data
	},
	handleSubmit: function(event) {
		event.preventDefault()
		var formInput = event.target
		var taskData = {
			task: formInput.newTask.value,
			// notes: formInput.notes.value,
			// date: formInput.date.value
		}
		ACTIONS.addTask(taskData)

		formInput.reset()
	},
	render: function() {
		return (
			<div className='ToDoApp'>
				<Header tasks={this.state.tasksCollection}/>
				<div className='contentWrapper'>
					<div className='form-wrapper'>
						<form onSubmit={this.handleSubmit}>
						  <input className='textInput' name='newTask' type="text" placeholder="Add a new task..."/>
						  {/*<input name='notes' type="text" placeholder="Notes"/>
						  <input name='date' type="text" placeholder="Due Date"/>} */}
						  <input className='button' name='submit' type="submit" value="+" />
						</form>
					</div>
					<TaskList tasks={this.state.tasksCollection}/>
				</div>
			</div>
		)
	}
})

var TaskList = React.createClass({
	makeSingleTasks: function(model) {
		if (model.get('complete') === false) {
			return (
				<SingleTask taskModel={model} key={model.cid} />
			)
		}
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
	handleToggle: function() {
		ACTIONS.toggleComplete(this.props.taskModel)
	},
	render: function() {
		var date = new Date(this.props.taskModel.get('createdAt'))

		return (
			<div className="single-task" >
				<div className='task-div'>
					<p>{this.props.taskModel.get('task')}</p>
				</div>
				<div className='button-div'>
					<button className='close' onClick={this.handleToggle}><i className="material-icons md-36">done_all</i></button>
				</div>
				<div className='date'>
					<small>{moment(date).fromNow()}</small>
				</div>
				
			</div>
		)
	}
})

export default ToDoApp