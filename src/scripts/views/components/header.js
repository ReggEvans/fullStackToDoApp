import React from 'react'
import ACTIONS from '../../ACTIONS'
import User from '../../models/userModel.js'

var Header = React.createClass({
	render: function() {
		return (
			<header>
				<div className='logo'>
					<h1><i className="material-icons md-48 md-light">done_all</i></h1>
				</div>
				<div className='welcome'>
					<span>{ACTIONS.loginName()}</span>
				</div>
				<div className='nav'>
					<Nav tasks={this.props.tasks}/>
				</div>
			</header>
		)
	}
})

var Nav = React.createClass({
	render: function() {
		return (
			<nav>
				<a href={ACTIONS.hashRoute()}><i className="material-icons md-24 md-light">assignment</i></a>
				<a href={'#complete'}><i className="material-icons md-24 md-light">assignment_turned_in</i></a>
				<a onClick={ACTIONS.logout}><i className="material-icons md-24 md-light">cancel</i></a>
			</nav>
		)
	}
})

export default Header