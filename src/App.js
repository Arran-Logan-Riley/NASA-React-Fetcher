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
      </div>
      <div className='card'>
        <img src={props.image2}></img>
        <div className='card-header'>
          {props.card2}
        </div>
      </div>
    </div>
  )
}

const HeaderOfWebPage = (props) => {
  <div class="page-header">
    <h1>Example Page Header</h1>
  </div>
}

const buttonGroup = (props) => {
  return (
    <div>

    </div>
  )
}

class App extends Component {
  //setup and current state
  constructor() {
    super();
    this.state = {
      card1: "This is a test of card1",
      card2: "This is the other card",
      image1: "https://api.nasa.gov/EPIC/archive/natural/2022/03/16/png/epic_1b_20220316001752.png?api_key=sKcBuUyavxaoAuSGOz36c1MC8X7mh8C2VaGalZ4e",
      image2: ""
    }
  }
  //runs when the window has loaded
  componentDidMount() {
    var img2Url = getEpicObject();

    const printAddress = () => {
      img2Url.then((a) => {
        this.setState({
          image2: a
        })
      });
    };
    printAddress();
  }
  render() {
    return (
      //this is so confusing:
      <div>
        <DisplayEarth card1={this.state.card1} card2={this.state.card2} image1={this.state.image1} image2={this.state.image2} />
      </div>

      //Returns the new components of the app by accessing the state data by using this.state.card1
    );
  }
}

function stateController() {

}


function getEpicObject() {

  return fetch('https://api.nasa.gov/EPIC/api/natural?api_key=sKcBuUyavxaoAuSGOz36c1MC8X7mh8C2VaGalZ4e')
    .then(response => response.json())
    .then(data => {

      var urlLink = stringCheese(data)
      return urlLink;
    });
}




function stringCheese(obj) {
  const source0 = "https://api.nasa.gov/EPIC/archive/natural/"
  const apiKey = "api_key=sKcBuUyavxaoAuSGOz36c1MC8X7mh8C2VaGalZ4e"
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
  console.log(imgUrl);
  return imgUrl;
};

function testJSONWrite(obj) {
  console.log(obj);
};


export default App;
