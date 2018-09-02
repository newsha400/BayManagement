import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';
import swal from 'sweetalert';

class EditSubBay extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.state={
            id: this.props.location.state.subBayInfo.id,
            width: this.props.location.state.subBayInfo.width,
            length: this.props.location.state.subBayInfo.length,
            height:this.props.location.state.subBayInfo.height,
            dep:this.props.location.state.subBayInfo.dep,
            class:this.props.location.state.subBayInfo.bayClass,
            category:this.props.location.state.subBayInfo.category,
            palette:this.props.location.state.subBayInfo.palette,
            masterbay:this.props.location.state.subBayInfo.masterbay
           
        }
    }

    submitHandler(event) {
    event.preventDefault();
    console.log(this.props.location.state.subBayInfo)
    let subBay = {}
    subBay.id= this.state.id;
    subBay.width= this.state.width;
    subBay.length =  this.state.length;
    subBay.height = this.state.height;
    subBay.dep = this.state.dep
    subBay.bayClass = this.state.class
    subBay.category = this.state.category;
    subBay.masterbay = this.state.masterbay;
    subBay.palette = this.state.palette;
    console.log("?????????")
    console.log(this.state.palette)
    axios.post("http://35.231.206.44:8081/editBay",subBay).then((response) =>{
        console.log("**************")
        console.log(response.data.message)
        if(response.data.message === "Bay too wide"){
                    swal({
                        title: "Dimension Mismatch",
                        text: response.data.message,
                        icon: "error",
                        button: "OK"
                    })
        }else if(response.data.message === "Edit successful"){

                    swal({
                        title: "Edit Successful",
                        text: `Subbay Edited Successfully`,
                        icon: "success",
                        button: "OK"
                    })
        }else {//(response.data.message === "Bay width too small for palette P...") 
                    swal({
                        title: "Dimension Mismatch",
                        text: response.data.message,
                        icon: "error",
                        button: "OK"   
                    })    
        }        
    })
}

    deleteHandler(event) {
        event.preventDefault();
        const pId = this.props.match.params.id;
        console.log(pId)
        this.props.history.push('/?msg=deleted')
        axios.delete(`http://35.231.206.44:8081/deleteBay?id=${pId}`).then(res => {
            if(res.data.message == "Delete successful"){
                swal({
                    title: "Delete successful",
                    text: `Subbay is successfully deleted`,
                    icon: "success",
                    button: "OK"
                })  
            } else {
                swal({
                    title: "Palette Associated",
                    text: res.data.message,
                    icon: "error",
                    button: "OK"
                })  
            }
        })
    }

    changeValue(event,box){
        console.log(event.target)
        var stateChange = {}
        console.log(stateChange[box]);
        stateChange[box] = event.target.value
        console.log(stateChange[box]);
        this.setState(stateChange);
    }


    componentWillMount(){
        
        let departments = axios.get("http://35.231.206.44:8081/getDepartments").then((response)=>{
            const dropDowns = response.data.map((department,index)=>{
                console.log(department.value)
                if(department.value === this.state.dep){
                    return (<option value={department.value} selected>{department.value}</option>)
                } else
                return (<option value={department.value}>{department.value}</option>)
            })
            this.setState({
                deps: dropDowns
            })
        })  

        let classes = axios.get("http://35.231.206.44:8081/getClasses").then((response)=>{
            const dropDowns = response.data.map((department,index)=>{
                console.log(department.value)
                if(department.value === this.state.class){
                    return (<option value={department.value} selected>{department.value}</option>)
                } else
                return (<option value={department.value}>{department.value}</option>)
            })
            this.setState({
                classes: dropDowns
            })
        })  

        let categories = axios.get("http://35.231.206.44:8081/getCategories").then((response)=>{
            const dropDowns = response.data.map((department,index)=>{
                console.log(department.value)
                if(department.value === this.state.category){
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
            <BrowserRouter>
                <div>
                <h4>Sub Bay: SB{this.props.location.state.subBayInfo.id}</h4>
                <form id="editSubBay" name="editSubBay" >
                    <label>
                        Height:
            <input type="number" name="height" value={this.state.height} onChange={(e)=>{this.changeValue(e,'height')}}/>
                    </label>
                    <br />

                    <label>
                        Width:
            <input type="number" name="width" value={this.state.width} onChange={(e)=>{this.changeValue(e,'width')}}/>
                    </label>
                    <br />

                    <label>
                        Depth:
            <input type="number" name="depth"  value={this.state.length} onChange={(e)=>{this.changeValue(e,'length')}}/>
                    </label>
                    <br />
            </form>
                    <label>
                        Department:
            <select name="department" form="editSubBay" >
                            {this.state.deps}
                        </select>
                    </label>
                    <br />

                    <label>
                        Class:
            <select name="class" form="editSubBay">
                            {this.state.classes}
                        </select>
                    </label>
                    <br />

                    <label>
                        Category:
            <select name="category" form="editSubBay">
                            {this.state.categories}
                        </select>
                    </label>
                    <br />
                    <button className="btn btn-primary custom-btn"  onClick={this.submitHandler}>Submit</button>
                    <button className="btn btn-primary custom-btn"  onClick={this.deleteHandler}>Delete</button>
                </div>
            </BrowserRouter>
        )
    }
}

export default EditSubBay