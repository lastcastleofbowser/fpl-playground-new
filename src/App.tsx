import React, {useState, useEffect} from 'react';
import './App.css';
import { fetchFixtures, FixtureData } from './api'; // Import the fetchFixtures function from the api.ts file
// import axios from 'axios';



// interface FixtureData {
//   team_h: number,
//   team_a: number,
//   team_h_score: number,
//   team_a_score: number,
// }

function App() {
  const [fixtureData, setFixtureData] = useState<FixtureData[]>([]);
  
  const apiURL = 'http://localhost:3008/api/'; 
  
  // const fetchFixtures = () => {
  //   axios
  //     .get(`${apiURL}fixtures/`, { timeout: 5000 })
  //     .then((response) => {
  //       setFixtureData(response.data);
  //       console.log('Fixture Data:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching fixture data', error);
  //     });
  // };

  // useEffect(() => {
  //   fetchFixtures();
  // }, []);


  useEffect(() => {
    fetchFixtures() // Use the fetchFixtures function to fetch the data
      .then((data) => {
        setFixtureData(data);
        console.log('Fixture Data:', data);
      });
  }, []);

  return (
    <div className="App">
      {/* <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Team Score</th>
            <th>Away Team Score</th>
          </tr>
        </thead>
        <tbody>
          {fixtureData.map((fixture) => (
            <tr key={fixture.id}>
              <td>{fixture.team_h}</td>
              <td>{fixture.team_a}</td>
              <td>{fixture.team_h_score}</td>
              <td>{fixture.team_a_score}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default App;
