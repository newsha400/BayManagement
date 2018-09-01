import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import LoadSubBay from "./LoadSubBay.js"

class LoadBay extends Component {

	constructor(props) {
		super(props);
		this.clickHandler = this.clickHandler.bind(this)
		this.addSubBay = this.addSubBay.bind(this)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.render = this.render.bind(this)
		// this.subBayList = this.subBayList.bind(this)

		this.state = {
			masterBayInfo: {
				bayList: [{}]
			}
		}
	}

	componentWillMount() {
		let bId = this.props.match.params.id;
		console.log(bId)
		bId = parseInt(bId)
		axios.get(`http://localhost:8081/getMasterbayById?id=${bId}`)
			.then(res => {
				console.log(res.data)
				this.setState({
					masterBayInfo: res.data,
				});
				console.log("called MB");
			})
	}

	// subBayList = () => {

	clickHandler(event) {
		event.preventDefault();
		// const query = event.target[0].value
		let bId = this.props.match.params.id;
		bId = parseInt(bId)
		this.props.history.push(`/edit/mb${bId}`)
	}

	addSubBay(event){
		event.preventDefault();
		this.props.history.push({
			pathname: `/addSubBay`,
			state: { masterBayInfo: this.state.masterBayInfo }
		})
	}

	render() {
			console.log(this.state.masterBayInfo)
			if(this.state.masterBayInfo.id ===0){
				return(<h2>Master bay doesn't exist</h2>)
			}else{
		return (

			<div className="loadData">
				<h2>MasterBay ID: MB{this.state.masterBayInfo.id}</h2>
		
				<p>Master Bay dimensions: </p>
				<p>Width: {this.state.masterBayInfo.width}</p>
				<p>Height: {this.state.masterBayInfo.height}</p>
				<p>Length:  {this.state.masterBayInfo.length}</p>
				<div className="col-sm-12">

					<form onSubmit={this.clickHandler} className="bar">
						<button className="btn btn-primary custom-btn" type="submit">Edit MasterBay</button>

					</form>
				</div>

				<div className="col-sm-12 ">
					
			<div className="col-sm-12 text-center">
			<br/>
					<LoadSubBay history={this.props.history} passedId={this.props.match.params.id} />
					</div>
				</div>

				<div className="col-sm-12">
					<form onClick={this.addSubBay} className="bar" ><br/>
						<button className="btn btn-primary custom-btn" type="submit">Add SubBay</button>
					</form>
				</div>

				{/* <div className="col-sm-12" > */}
			 	{/* <LoadSubBay passedId={this.props.match.params.id} /> */}
				{/* </div> */}
			</div>
		)
	}
	}
}
export default LoadBay