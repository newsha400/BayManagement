import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import swal from 'sweetalert'

class Search extends Component {

    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(event) {
        event.preventDefault();
        const query = event.target[0].value

        if (query) {
            if (query[0].toUpperCase() === "P") {
                axios.get(`http://localhost:8081/getPaletteById?id=${query.substring(1)}`)
                    .then(res => {
                        console.log("axios comes back with: ",res.data.id)
                        if (res.data.id === 0) {
                            //sweet alert about data not found
                            console.log("not here for pallets")
                            swal({
                                title: "Pallet Not Found",
                                text: `Pallet ${query.toUpperCase()} not found in database.`,
                                icon: "warning",
                                button: "OK"
                            })
                        } else {
                            this.props.history.push(`/load/${query}`)
                        }
                    })
            }

            else if (query.substring(0,2).toUpperCase() === "MB") {
                console.log("MB string check: ", query.substring(2))
                axios.get(`http://localhost:8081/getMasterbayById?id=${query.substring(2)}`)
                    .then(res => {
                        console.log("axios comes back with: ",res.data.id)
                        if (res.data.id === 0) {
                            //sweet alert about data not found
                            console.log("not here for masterbays")
                             swal({
                                title: "Master Bay Not Found",
                                text: `Master Bay ${query.toUpperCase()} not found in database.`,
                                icon: "warning",
                                button: "OK"
                            })
                        } else {
                            this.props.history.push(`/load/${query}`) 
                        }
                    })
                
        } else {
            // console.log("this is where the bad search goes")
            swal({
                    title: "Invalid Search Query",
                    icon: "warning",
                    button: "OK"
                })
                // this.props.history.push(`/search`)
            //DISPLAY A SWEET ALERT HERE ABOUT THE BAD SEARCH
        }
    }
}


    render() {
        return (
                <form onSubmit={this.clickHandler} className="bar">
                    <input type="text" id="search" placeholder="Enter P# or MB#"/>

                    {/* <LoadPallet palletInfo={this.props.palletInfo}/> */}
                    <button 
                    className="btn btn-primary custom-btn" 
                    type="submit"
                    onClick = { this.buttonTest }
                    >Search</button>

                </form>
        )
    }
}

export default Search
