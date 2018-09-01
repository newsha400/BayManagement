import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


class LoadPallet extends Component {
	//this "link" will be calling Spring to get us a list of Bay list recommendations 
	constructor(props) {
		super(props);
		this.submitHandler = this.submitHandler.bind(this)
		this.linkHandler = this.linkHandler.bind(this)
		console.log(props.match.params.id)
		this.state = {
			palletInfo: {},
			buttonText: `Link`,
			id: props.match.params.id
		}
	}

	componentDidMount() {
		// this.state.pId = parseInt(this.props.match.params.id);

		axios.get(`http://localhost:8081/getPaletteById?id=${this.state.id}`).then(res => {
				let buttonText = "Link"
				if (res.data.bay>0) {
					// console.log("I AM THE DANG BAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", res.data.bay)
					buttonText = `Unlink`
				}
				this.setState({
					palletInfo: res.data,
					buttonText
				});	
			}
		)
	}

	submitHandler(event) {
		event.preventDefault();

		this.props.history.push({
			pathname: `/edit/p${this.state.id}`,
			state: { paletteInfo: this.state.palletInfo }
		})
}
	//LINK AND UNLINK COMMANDS HERE
	linkHandler(event) {
		event.preventDefault();
		console.log(this.state.palletInfo)		
		if (this.state.buttonText === `Link`) {
			console.log(this.state.palletInfo)
			this.props.history.push({
				pathname: `/pblink/P${this.state.id}`,
				state: {paletteInfo: this.state.palletInfo}
			})
		} else if (this.state.buttonText === `Unlink`) {
			axios.get(`http://localhost:8081/unlinkPalette`,{
				params: {
					id: this.state.id
				}
			}).then(()=>{
		let unlinkPalletInfo = this.state.palletInfo
		unlinkPalletInfo.bay =0;
		this.setState({
		buttonText: `Link`,
		palletInfo: unlinkPalletInfo
	})
})
		}
	}

	render() {
		return (
			<div>
				<h2>Palette ID: P{this.state.palletInfo.id} </h2>
				<p>Palette dimensions:</p>
				<p>Width:  {this.state.palletInfo.width}</p>
				<p>Height: {this.state.palletInfo.height}</p>
				<p>Length:  {this.state.palletInfo.length}</p>
				<p>Department: {this.state.palletInfo.dep}</p>
				<p>Class: {this.state.palletInfo.paletteClass}</p>
				<p>Category: {this.state.palletInfo.category}</p>
				<p>Location: SB{this.state.palletInfo.bay}</p>

				<form onSubmit={this.submitHandler} className="bar">
					<button className="btn btn-primary custom-btn" type="submit">
						Edit
					</button>
				</form>
				<form onSubmit={this.linkHandler} className="bar">
					<button className="btn btn-primary custom-btn" type="submit">
						{this.state.buttonText}
					</button>
				</form>
			</div>
		)
	}
}


export default LoadPallet
