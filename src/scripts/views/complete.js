import React from 'react'
import Backbone from 'backbone'
import STORE from '../STORE'
import ACTIONS from '../ACTIONS'

import Header from './components/header'

var Complete = React.createClass({
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
	render: function() {
		return (
			<div className='ToDoApp'>
				<Header />
				<div className='contentWrapper'>
					<div className='form-wrapper'>
						<p>Completed Tasks</p>
					</div>
					<CompletedList completedTasks={this.state.tasksCollection}/>
				</div>
			</div>
		)
	}
})

var CompletedList = React.createClass({
	makeCompletedTasks: function(model) {
		if (model.get('complete') === true) {
			return (
				<SingleCompletedTask taskModel={model} key={model.cid} />
			)
		}
	},
	render: function() {
		return (
			<div className='task-list'>
				{this.props.completedTasks.map(this.makeCompletedTasks)}
			</div>
		)
	}
})

var SingleCompletedTask = React.createClass({
	handleDelete: function() {
		ACTIONS.deleteTask(this.props.taskModel)
	},
	render: function() {
		return (
			<div className="single-task" id="complete-task">
				<div className='task-div' id='complete-div'>
					<p>{this.props.taskModel.get('task')}</p>
				</div>
				<div className='button-div'>
					<button className='close' id='complete-close' onClick={this.handleDelete}><i className="material-icons md-24">delete_forever</i></button>
				</div>
			</div>
		)
	}
})

export default Complete