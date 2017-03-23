import React from 'react'

var Header = React.createClass({
	render: function() {
		return (
			<header>
				<h1>TO-DO APP</h1>
				<Nav />
			</header>
		)
	}
})

var Nav = React.createClass({
	render: function() {
		return (
			<nav>
				{/*<a href={'#tasks'}>All</a>
				<a href={'#complete'}>Complete</a>
				<a href={'#unfinished'}>Incomplete</a>*/}
			</nav>
		)
	}
})

export default Header