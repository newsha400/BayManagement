import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'

class EditPallet extends Component {

	constructor(props) {
		super(props);
		this.submitHandler = this.submitHandler.bind(this)
		this.deleteHandler = this.deleteHandler.bind(this)
		this.changeValue = this.changeValue.bind(this)
		this.state={
			id: this.props.location.state.paletteInfo.id,
			width: this.props.location.state.paletteInfo.width,
			length: this.props.location.state.paletteInfo.length,
			height:this.props.location.state.paletteInfo.height,
			dep:this.props.location.state.paletteInfo.dep,
			class:this.props.location.state.paletteInfo.paletteClass,
			category:this.props.location.state.paletteInfo.category,
			bay: this.props.location.state.paletteInfo.bay
		}
	}

	submitHandler(event) {
		event.preventDefault();
		console.log(this.props.location.state.paletteInfo)
		let palette = {}

		palette.id = this.state.id;
		palette.width = this.state.width;
		palette.length = this.state.length;
		palette.height = this.state.height;
		palette.dep = this.state.dep
		palette.paletteClass = this.state.class
		palette.category = this.state.category;
		palette.bay = this.state.bay
		axios.post("http://localhost:8081/editPalette",palette).then((response) =>{
		    console.log(response);
		    console.log(response.data.dimensionMatch)
		    if(response.data.dimensionMatch === false){
		    	swal({
		    		title: "Dimension Mismatch",
                    text: `Pallet changes do not match the dimensions of its bay. Changes not saved.`,
                    icon: "warning",
                    button: "OK"
                })
		    }else{
		    	swal({
                    title: "Edit Successful",
                    icon: "success",
                    button: "OK"
                })
                this.props.history.push(`/load/P${palette.id}`)
		    }
		}).catch(function (error) {
	    	console.log(error);
	    });		
	}

	deleteHandler(event) {
		//push new data to db !!!
		event.preventDefault();
		const pId = this.props.match.params.id;
		console.log(pId)
		this.props.history.push('/?msg=deleted')
		axios.delete(`http://localhost:8081/deletePalette?id=${pId}`)
	}

	changeWidth(event) {
		this.setState({ width: event.target.value })
		console.log("new width: ", this.state.width);
	}

	changeHeight(event) {
		this.setState({ height: event.target.value })
		console.log("new heigth: ", this.state.height)
	}

	changeLength(event) {
		this.setState({ length: event.target.value })
		console.log("new length: ", this.state.length)
	}

	changeValue(event,box){
		// console.log(event.target)
		var stateChange = {}
		// console.log(stateChange[box]);
		stateChange[box] = event.target.value
		// console.log(stateChange[box]);
		this.setState(stateChange);
	}


	// changeValue(event,box){

 // 		console.log(event.target)
 // 		var stateChange = {}
 // 		console.log(stateChange[box]);
 // 		stateChange[box] = event.target.value
 // 		console.log(stateChange[box]);
 // 		this.setState(stateChange);
 // 	}

 // https://github.com/newsha400/CapstoneProject/commit/0fe22faf57c8531e24b47af56a711064a78ab75c

	componentWillMount() {
		let departments = axios.get("http://localhost:8081/getDepartments").then((response) => {
			const dropDowns = response.data.map((department, index) => {
				// console.log(department.value)
				if (department.value === this.state.dep) {
					return (<option value={department.value} selected>{department.value}</option>)
				} else
					return (<option value={department.value}>{department.value}</option>)
			})
			this.setState({
				deps: dropDowns
			})
		})

		let classes = axios.get("http://localhost:8081/getClasses").then((response) => {
			const dropDowns = response.data.map((department, index) => {
				console.log(department.value)
				if (department.value === this.state.class) {
					return (<option value={department.value} selected>{department.value}</option>)
				} else
					return (<option value={department.value}>{department.value}</option>)
			})
			this.setState({
				classes: dropDowns
			})
		})

		let categories = axios.get("http://localhost:8081/getCategories").then((response) => {
			const dropDowns = response.data.map((department, index) => {
				console.log(department.value)
				if (department.value === this.state.category) {
					return (<option value={department.value} selected>{department.value}</option>)
				} else
					return (<option value={department.value}>{department.value}</option>)
			})
			this.setState({
				categories: dropDowns
			})
		})

	}

	render() {
		return (
				<div>
					<h2>Editing Palette P{this.props.location.state.paletteInfo.id}</h2>
					<form id="editPalette" name="editPalette" >
						<label>
							Length:
							<input type="number" name="length" 
							value={this.state.length} onChange={(e) => { 
								this.changeLength(e, 'length') }} />
						</label>
						<br />

						<label>
							Width:
							<input type="number" name="width" 
							value={this.state.width} onChange={(e) => { 
								this.changeWidth(e, 'width') }} />
						</label>
						<br />

						<label>
							Height:
							<input type="number" name="height" 
							value={this.state.height} onChange={(e) => { 
								this.changeHeight(e, 'height') }} />
						</label>
						<br />

					<label>
						Department:
						<select name="department" form="editPalette" >
							{this.state.deps}
						</select>
					</label>
					<br />

					<label>
						Class:
						<select name="class" form="editPalette">
							{this.state.classes}
						</select>
					</label>
					<br />

					<label>
						Category:
						<select name="category" form="editPalette">
							{this.state.categories}
						</select>
					</label>
					<br />

					<button className="btn btn-primary custom-btn" onClick={this.submitHandler}>Submit</button>
					<button className="btn btn-primary custom-btn" onClick={this.deleteHandler}>Delete</button>
				</form>
				</div>
		)
	}
}

export default EditPallet