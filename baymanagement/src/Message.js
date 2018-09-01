import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Message extends Component{
	constructor(props){
		super(props)
		this.state = {
			message: this.props.location.state.message
		}

	}
	render(){
		return(
		<h1>{this.state.message}</h1>
		)
	}
}
export default Message;