import React from 'react'
import ACTIONS from '../ACTIONS'
import Header from './components/header'

var Login = React.createClass({
	render: function() {
		return (
			<div className='ToDoApp'>
				<div className='contentWrapper'>
					<div className='form-wrapper'>
						<Header />
					</div>
				</div>
				<LoginForm />
				<RegisterForm />
			</div>
		)
	}
})

var LoginForm = React.createClass({
	_handleSubmit: function(e){
		e.preventDefault()
		var formEl = e.target
		ACTIONS.logUserIn(formEl.email.value, formEl.password.value)
	},
	render: function(){
		return (
			<div className='register-form'>
			<h2>Login</h2>
			<form onSubmit={this._handleSubmit}>
				<input className='loginInput' type='text' name='email' placeholder='Enter your email...' /> <br />
				<input className='loginInput' type='password' name='password' placeholder='Enter your password...' /> <br />
				<button className='loginButton' type='submit'>Submit</button>
			</form>
			</div>
		)
	}
})

var RegisterForm = React.createClass({
	_handleSubmit: function(e){
		e.preventDefault()
		var formEl = e.target
		var userData = {
			name: formEl.yourName.value,
			email: formEl.email.value,
			password: formEl.password.value
		}
		ACTIONS.registerUser(userData)
		formEl.reset()
	},
	render: function(){
		return (
			<div className='register-form'>
			<h2>Register</h2>
			<form onSubmit={this._handleSubmit}>
				<input className='loginInput' type='text' name='yourName' placeholder='Enter your name...' /><br />
				<input className='loginInput' type='text' name='email' placeholder='Enter your email...' /><br />
				<input className='loginInput' type='password' name='password' placeholder='Enter your password...' /> <br />
				<button className='loginButton' type='submit'>Submit</button>
			</form>
			</div>
		)
	}
})



export default Login