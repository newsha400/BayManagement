import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Add extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedOption: 'Pallet',
			height: '',
			width: '',
			length: '',
			dep:'',
			deps: [],
			classes: [],
			categories: [],
			addedItem: 'Pallet'
		}
		this.changeHeight = this.changeHeight.bind(this)
		this.changeWidth = this.changeWidth.bind(this)
		this.changeLength = this.changeLength.bind(this)
		this.changeDepartment = this.changeDepartment.bind(this)
		this.changeClass = this.changeClass.bind(this)
		this.changeCategory = this.changeCategory.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
	}

	componentWillMount() {
		axios.get("http://35.231.206.44:8081/getDepartments")
			.then((response) => {
				console.log("departments on load: ", response.data)
				this.setState({ deps: response.data,
				dep:response.data[0].value })
			})

		axios.get("http://35.231.206.44:8081/getClasses").then((response) => {
			console.log("classes: ", response.data)
			this.setState({ classes: response.data,
			paletteClass:response.data[0].value })
		})

		axios.get("http://35.231.206.44:8081/getCategories").then((response) => {
			console.log("categories on load: ", response.data)
			this.setState({ categories: response.data,
			category:response.data[0].value })
		})
	}

	changeHeight(e) {
		this.setState({ height: e.target.value })
		console.log("height here:", e.target.value)
	}
	changeWidth(e) {
		this.setState({ width: e.target.value })
	}
	changeLength(e) {
		this.setState({ length: e.target.value })
	}
	changeDepartment(e) {
		this.setState({ dep: e.target.value })
	}
	changeClass(e) {
		this.setState({ class: e.target.value })
	}
	changeCategory(e) {
		this.setState({ category: e.target.value })
		console.log("category check: ", e.target.value)
	}
	handleOptionChange(event) {
		this.setState({ selectedOption: event.target.name })
		this.setState({ addedItem: event.target.name })
	}

	submitHandler(event) {
		event.preventDefault();
		if (this.state.selectedOption === 'Pallet') {
			console.log("dept: ", this.state.dep)
			axios.post(`http://35.231.206.44:8081/addPalette`, {
				height: this.state.height,
				width: this.state.width,
				length: this.state.length,
				dep: this.state.dep,
				paletteClass: this.state.paletteClass,
				category: this.state.category,
				bay: 0
			})
				.then((response) => {
					console.log(response)
					console.log("Pallet ID: ", response.data)
					this.props.history.push(`/load/P${response.data}`)
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		else if (this.state.selectedOption === 'Master Bay') {
			axios.post(`http://35.231.206.44:8081/addMasterBay`, {
				height: this.state.height,
				width: this.state.width,
				length: this.state.length,
			})
				.then((response) => {
					console.log("Bay ID: ", response.data)
					this.props.history.push(`/load/MB${response.data}`)
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<div className="float-center" >
				<div className="container" >
					<div className="row col-12" >
						<h2>Add a {this.state.addedItem}</h2>
						<div className="form-check">
							<label className="form-check-label">
								<input type="radio"
									className="form-check-input"
									name="Pallet"
									checked={this.state.selectedOption === 'Pallet'}
									onChange={this.handleOptionChange}
								/>
								Pallet
								</label >
						</div>

						<div className="form-check" >
							<label className="form-check-label" >
								<input type="radio"
									className="form-check-input"
									name="Master Bay"
									checked={this.state.selectedOption === 'Master Bay'}
									onChange={this.handleOptionChange}
								/>
								Master Bay
								</label >
						</div>
					</div >

					<div >
						<form onSubmit={this.submitHandler} >
							<label>
								Length:
						<input type="number" onChange={this.changeLength}
									name="length" />
							</label>
							<br />

							<label>
								Width:
						<input type="number" onChange={this.changeWidth}
									name="width" />
							</label>
							<br />

							<label>
								Height:
						<input type="number" onChange={this.changeHeight}
									name="height" />
							</label>
							<br />

							{this.state.selectedOption === 'Pallet' &&
								<div>
									<label>
										Department:
								<select name="department" onChange={this.changeDepartment}>

											{/* this was the line in question --Q*/}
											{/*{this.state.deps.map(x => <option>{x}</option>)} */}
											{this.state.deps.map(x => <option>{x.value}</option>)}

										</select>
									</label>
									<br />

									<label>
										Class:
								<select name="class" onChange={this.changeClass}>
											{this.state.classes.map(x => <option>{x.value}</option>)}
										</select>
									</label>
									<br />

									<label>
										Category:
								<select name="category" onChange={this.changeCategory}>
											{this.state.categories.map(x => <option>{x.value}</option>)}
										</select>
									</label>
									<br />
								</div>
							}

							<button className="btn btn-primary custom-btn"
								type="submit">
								Submit
					</button>
						</form >
					</div>
				</div >
			</div>
		)
	}
}

export default Add