import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Search from './Search.js'
import Add from './Add.js'
import LoadBay from './LoadBay.js'
import LoadPallet from './LoadPallet.js'
import EditPallet from './EditPallet.js'
import EditBay from './EditBay.js'
import PBLink from './PBLink.js'
import Message from './Message';
import EditSubBay from './EditSubBay'
import AddSubBay from './AddSubBay'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img5 from './images/5.jpg'
import {Carousel} from 'react-bootstrap'
import PBLinkGraphic from './PBLinkGraphic';



class App extends Component {

  constructor(props) {
    super()
    document.title = "Overhead Bay Manager"
  }

  render() {

    return (

      <div className="App">
        <div className="routed">
          <header className="App-header">
    
          <Link to="/"><h1 className="App-title">Overhead Bay Manager</h1></Link>
          <div className="container">
            <div className="row">

              <switch>
                <div className="col-sm-6 col-sm-offset-3">
                  <div className="col-xs-6 headerButton"><Link to="/search">Search</Link></div>
                  <div className="col-xs-6 headerButton"><Link to="/add">Add</Link></div>
                </div>
                
              </switch>
              
            </div>
          </div>
          </header>
          
          <Route path="/add" component={ Add } />
          <Route exact path="/search" component={ Search } />
          <Route path="/load/P:id" component={ LoadPallet } />
          <Route path="/load/MB:id" component={ LoadBay } />
          <Route path="/edit/P:id" component={ EditPallet } />
          <Route path="/edit/MB:id" component={ EditBay } />
          <Route path="/pblink/P:id" component={ PBLink } />
          <Route path="/pblinkgraphic/P:id" component={ PBLinkGraphic } />
          <Route exact path="/load/message" component={Message} />  
          <Route exact path="/editSubBay/SB:id" component={EditSubBay} /> 
          <Route exact path="/addSubBay" component={AddSubBay} /> 

        </div> 
        <br/>
      <Route exact path="/" render={()=> 
        <div className="col-sm-6 carousel box col-sm-offset-2" >
        <Carousel className="carousel-box">
          <Carousel.Item>
            <img  height="500" width="1000" alt="900x500" src={img1} />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img height="500" width="1000" alt="900x500" src={img5} />   {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          */}
          </Carousel.Item>
          <Carousel.Item>
            <img height="500" width="1000" alt="900x500" src={img3} />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption> */} 
          </Carousel.Item>

      
        </Carousel>;
 </div>
 
 } 
 />
        </div>
     

  

    )
  }  
}

export default App;
