import logo from './logo.svg';
import './App.css';
import './css/style.css';
// cmd into the file and install bootstrap using the command npm install bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, Fragment } from 'react';

//Create two cards that displays an image of earth with a header (the header will have the date)
const DisplayEarth = (props) => {
  return (
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
    </div>
  )
}

const HeaderOfWebPage = (props) => {
  <div class="page-header">
    <h1>Example Page Header</h1>
  </div>
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
      image1: "https://api.nasa.gov/EPIC/archive/natural/2022/03/16/png/epic_1b_20220316001752.png?api_key=eAjPURLpjgareHUuED8iAKrNmWoWAQkOIa2iZqMc",
      image2: ""
    }
  }
  //runs when the window has loaded
  componentDidMount() {
    var ObjDataPromise = getEpicObject();

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

  return fetch('https://api.nasa.gov/EPIC/api/natural?api_key=eAjPURLpjgareHUuED8iAKrNmWoWAQkOIa2iZqMc')
    .then(response => response.json())
    .then(data => {
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

function stringCheese(obj) {
  const source0 = "https://api.nasa.gov/EPIC/archive/natural/"
  const apiKey = "api_key=eAjPURLpjgareHUuED8iAKrNmWoWAQkOIa2iZqMc"
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
