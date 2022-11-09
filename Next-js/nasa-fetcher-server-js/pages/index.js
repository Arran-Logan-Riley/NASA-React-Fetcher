import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, Fragment, useRef } from 'react';

import useSWR from 'swr'


const DisplayEarth = (props) => {
  return (
    <div>
      <HeaderOfWebPage></HeaderOfWebPage>
      <div className='container'>
      <div className={'card ' + styles.cardSizer}>
        <img src={props.image1}></img>
        <div className='card-header'>
          {props.card1}
        </div>
        <div className='d-flex justify-content-center'>Date: {props.card1Date}</div>
        <div className='d-flex justify-content-center'>Altitude:{props.card1Altitude}km</div>
        <ButtonGroup></ButtonGroup>
      </div>
      <div className={'card ' + styles.cardSizer}>
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
 <nav className={styles.navbar + " navbar navbar-expand-lg navbar-light bg-light"}>
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
  <div className= {'card ' + styles.searchBoxContainer + " " +styles.cardSizer}>
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



export default function Home() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

    const state = {
      card1Altitude: " 35888.37",
      card2Altitude: "",
      card1Date: "16/03/2022",
      cardDate: "",
      card1: "This is a test of card1",
      cardCaption: "",
      image1: "https://api.nasa.gov/EPIC/archive/natural/2022/03/16/png/epic_1b_20220316001752.png?api_key=",
      imageUrl: "",
      key: "",
      testOut: ""
    };

  function getKey() {
    // Function to get key from API.
    const { data, error } = useSWR('/api/keyrequest', fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    state.key = data.key;
  }

  // Call the above function to update the state with the new key.
  getKey();
  
  function getData() {
    // Function to get data from API.
    const { data, error } = useSWR('/api/datamanage', fetcher)
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    // console.log(data.sendData);
    console.log(data);
    state.imageUrl = data.sendData.imageUrl;
    state.caption = data.sendData.caption;
    state.cardDate = data.sendData.cardDate;
    // TEST state.testOut = data.sendData.image2;
  } 

  getData();
    return (
      //this is so confusing:
      // Now we just access the "state" object.

      //State key is added at the end there with "image1={state.image1+state.key}" 
      <div>
        <DisplayEarth card2Altitude={state.card2Altitude} card1Altitude={state.card1Altitude} card2Date={state.cardDate} card1Date={state.card1Date} card1={state.card1} card2={state.caption} image1={state.image1+state.key} image2={state.imageUrl} />
        <div><a>{state.testOut}</a></div>
      </div>

      //Returns the new components of the app by accessing the state data by using this.state.card1
    );
  
}

