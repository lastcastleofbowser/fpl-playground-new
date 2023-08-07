import React, {useState, useEffect} from 'react';
import './App.css';
import {  fetchFixtures, 
          FixtureData, 
          fetchTeams, 
          TeamData,
        } from './api';
         
import FixtureTicker from './components/FixtureTicker/fixtureTicker';
         
function App() {
 
  return (
    <div className="App">

      <FixtureTicker />
              
    </div>
  );
}

export default App;
