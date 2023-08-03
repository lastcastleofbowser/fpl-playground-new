import React, {useState, useEffect} from 'react';
import './App.css';
import { fetchFixtures, FixtureData, fetchTeams, TeamData } from './api'; // Import the fetchFixtures function from the api.ts file


function App() {
  const [fixtureData, setFixtureData] = useState<FixtureData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  
  const apiURL = 'http://localhost:3008/api/'; 

  useEffect(() => {
    fetchFixtures() 
      .then((data) => {
        setFixtureData(data);
        console.log('Fixture Data:', data);
      });
      fetchTeams()
      .then((data) => {
        setTeamData(data);
        console.log('Team Data:', data);
      });
  }, []);

  return (
    <div className="App">
      <table>
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
            <tr>
              <td>{fixture.team_h}</td>
              <td>{fixture.team_a}</td>
              <td>{fixture.team_h_score}</td>
              <td>{fixture.team_a_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
