import logo from './logo.svg';
import './App.css';
import './css/style.css';
// cmd into the file and install bootstrap using the command npm install bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, Fragment, useRef } from 'react';

//Create two cards that displays an image of earth with a header (the header will have the date)
const DisplayEarth = (props) => {
  return (
    <div>
      <HeaderOfWebPage></HeaderOfWebPage>
      <div className='container'>
      <div className='card'>
        <img src={props.image1}></img>
        <div className='card-header'>
          {props.card1}
        </div>
        <div className='d-flex justify-content-center'>Date: {props.card1Date}</div>
        <div className='d-flex justify-content-center'>Altitude:{props.card1Altitude}km</div>
        <ButtonGroup></ButtonGroup>
      </div>
      <div className='card'>
        <img src={props.image2}></img>
        <div className='card-header'>
          {props.card2}
          </div>
          <div className='d-flex justify-content-center'>Date: {props.card2Date}</div>
          <div className='d-flex justify-content-center'>Altitude: {props.card2Altitude}km</div>
          <ButtonGroup></ButtonGroup>
      </div>
      <SearchGroup></SearchGroup>
      </div>
    </div>
  )
}
//Headder of the website with NAV bar
const HeaderOfWebPage = (props) => {
  return(
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">NASA API TESTER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Lorm</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Lorm</a>
      </li>
    </ul>
    <span className="navbar-text">
      This website is made as a project to query the NASA API implemented using REACT.
    </span>
  </div>
</nav>
)}

const SearchGroup = (props) => {
  //Set the default state to null when the SearchBox is loaded.
  const inputRef = useRef(null);
  function handleClick (){
    //When the click handler is called, it will print the current state of the inputRef.
    var userDateInput = inputRef.current.value;
    console.log(userDateInput);
  };
  return(
  <div className='card searchBoxContainer'>
    <div className='searchBoxHeader'><h1>Search By Date</h1></div>
    <label className='lableSearchBox'>Select a date to search for</label>
    <div>
      <input className='searchBoxInputOne' type="date" id="dateSelector" name="name" ref={inputRef}/>
    </div>
    <button type="button" onClick={handleClick} className='btn btn-light loadButton'>LOAD IMAGE</button>
  </div>
  )
}

const ButtonGroup = (props) => {
  return (
    <div>
      <div className="buttonBox d-flex justify-content-center">
        <LeftButton></LeftButton>
        <RightButton></RightButton>
      </div>
    </div>
  )
};
//Left button
const LeftButton = (props) => {
  function handleClick (){
    console.log('Click happened left');
  };
  return (
      <button onClick={handleClick} type="button" className='btn btn-light'>Button</button>
  )
};
//Right button
const RightButton = (props) => {
  function handleClick (){
    console.log('Click happened right');
  };
  return(
    <button onClick={handleClick} type="button" className='btn btn-light'>Button</button>
  )
};

class App extends Component {
  //setup and current state
  constructor() {
    super();
    //sets the default states that are preset.
    this.state = {
      card1Altitude: " 35888.37",
      card2Altitude: "",
      card1Date: "16/03/2022",
      card2Date: "",
      card1: "This is a test of card1",
      card2: "",
      image1: "https://api.nasa.gov/EPIC/archive/natural/2022/03/16/png/epic_1b_20220316001752.png?api_key=",
      image2: ""
    }
  }
  //runs when the window has loaded
  componentDidMount() {
    var ObjDataPromise = getEpicObject();
    //getMarsData();

    //WHEN USING PROMSIES MAKE SURE TO USE |.then's|, you cain't just jump in.
    /*img2Url.then(value => {
      console.log(value.urlLink);
    })*/

    const printAddress = () => {
      ObjDataPromise.then((a) => {
        this.setState({
          image2: a.urlLink,
          card2Date: a.dateData,
          card2: a.captionData,
          card2Altitude: a.j2000Altitude

        })
      });
    };
    printAddress();
  };

  render() {
    return (
      //this is so confusing:
      <div>
        <DisplayEarth card2Altitude={this.state.card2Altitude} card1Altitude={this.state.card1Altitude} card2Date={this.state.card2Date} card1Date={this.state.card1Date} card1={this.state.card1} card2={this.state.card2} image1={this.state.image1} image2={this.state.image2} />
      </div>

      //Returns the new components of the app by accessing the state data by using this.state.card1
    );
  }
}


function getEpicObject() {

  return fetch('https://api.nasa.gov/EPIC/api/natural?api_key=')
    .then(response => response.json())
    .then(data => {
      textFile(data);
      console.log(data);
      //String cheese to construct a link that goes to the latest picture of the earth from the L1 point
      var urlLink = stringCheese(data);
      //Retrives the date of the first image
      let dateData = (data[0].date);
      //Retreives the caption of the image
      let captionData = (data[0].caption);
      //Gets the dscoverj2000 position x,y,z
      let j2000 = (data[0].dscovr_j2000_position);
      //This method calculates how far away the spacecraft is away from the earth.
      let j2000Altitude = calcAltitude(j2000);
      return {dateData, urlLink, captionData, j2000Altitude};
    });
}
//Somehow I need to qurry for a specific sol. 
function getMarsData(){
  return fetch("https://api.nasa.gov/insight_weather/?api_key=")
  .then(response =>  response.json())
  .then(data => {
    console.log(data);

  })
}


function textFile (data) {
  const element = document.createElement("a");
  const textFile = new Blob([[JSON.stringify(data)]]); //pass data from localStorage API to blob
  element.href = URL.createObjectURL(textFile);
  element.classList = 'downloadJsonLink'
  element.innerText = 'Download Data As JSON'
  element.download = "noaaSatelliteData.json";
  document.body.appendChild(element);
}


function stringCheese(obj) {
  const source0 = "https://api.nasa.gov/EPIC/archive/natural/"
  const apiKey = ""
  var imgUrl = ""
  var url = [];
  var identifier = obj[0].image;
  var date = obj[0].date;
  //cutting the unessasary data points out of the string
  date = date.slice(0, -9);
  //replacing slashes with dashes
  date = date.split('-').join('/');
  //adding the data to an array
  url.push(identifier, date)
  //Create the hyperlink that goes to the image
  imgUrl = source0 + url[1] + "/" + "png/" + url[0] + ".png?" + apiKey
  //console.log(imgUrl);
  return imgUrl;
};


//Method uses pythagoras theorem to calculate the distance between the earth and the orbiting spacecraft.
function calcAltitude(attitudeData){
  //get the data
  let x = attitudeData.x
  let y = attitudeData.y
  let z = attitudeData.z
  //square the data
  let sqrx = Math.pow(x, 2);
  let sqry = Math.pow(y, 2);
  let sqrz = Math.pow(z, 2);
  //Sum the data
  let sqrAdd = sqrx + sqry + sqrz;
  let sqrTot = Math.sqrt(sqrAdd);
  return Math.round(sqrTot);
}


export default App;
