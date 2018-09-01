import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import EditSubBay from './EditSubBay.js'


class LoadSubBay extends Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this)
        // this.subBayList = this.subBayList.bind(this)
        this.editBay = this.editBay.bind(this)


        this.state = {
            masterBayInfo: {

                bayList: [{}]
            },

            subBayInfo: {
                id: 0,
                width: 0,
                height: 0,
                length: 0,
                dep: "",
                bayClass: "",
                category: ""
            }
        }
    }


    componentDidMount() {
        let bId = this.props.passedId

        axios.get(`http://localhost:8081/getMasterbayById?id=${bId}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    masterBayInfo: res.data,
                });
            console.log("called MB");
            })
    }
    clickHandler(event) {
        event.preventDefault();

        let bId = this.props.match.params.id;
        bId = parseInt(bId)
        this.props.history.push(`/edit/mb${bId}`)
    }

    editBay(sB, e) {
        console.log({ sB });
        this.props.history.push({
            pathname: `/editSubBay/SB${sB.id}`,
            state: { subBayInfo: sB }
        })
    }

pText(sB) {
    let pText = `Pallet ID${sB.palette} associated with subBay`
    if(sB.palette === 0) {
        pText=`No associated Pallets`
    }
    return pText
}

    //add an onClick for each of these divs, and add a Flip feature 
    render() {

        if (this.state.masterBayInfo.bayList.length === 0) {
            return (<h3>No linked Sub Bays</h3>)
        }

        if (this.state.masterBayInfo.bayList) {
            return (
                <div>
                    <h3>Associated SubBays</h3>
                    {this.state.masterBayInfo.bayList.map((sB, i) => {
                        return (

                            <div key={i} className="col-sm-3 subBayDisplay">
                                <div onClick={(e) => { this.editBay(sB, e) }}>
                                    <p>SubBay ID: {sB.id}</p>
                                    <p>SubBay Width: {sB.width}</p>
                                    <p>SubBay Height: {sB.height}</p>
                                    <p>SubBay Length: {sB.length}</p>
                                    <p>SubBay Dept: {sB.dep}</p>
                                    <p>SubBay BayClass: {sB.bayClass}</p>
                                    <p>SubBay Category: {sB.category}</p>
                                    <p>{this.pText(sB)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    
    }
}


        export default LoadSubBay