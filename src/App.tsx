import React, {useState, useEffect} from 'react';
import './App.css';
import {  fetchFixtures, 
          FixtureData, 
          fetchTeams, 
          TeamData,
          gameweekNum
         } from './api'; 
         
function App() {
  const [fixtureData, setFixtureData] = useState<FixtureData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [gameweekNum, setGameweekNum] = useState<number>(5);
  
const handleNumGameweeksChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setGameweekNum(parseInt(e.target.value));
};

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

  const getTeamName = (teamId: number): string => {
    const team = teamData.find((team) => team.id === teamId);
    return team ? team.name : 'Unknown Team';
  };

  return (
    <div className="App">
      <h1>Premier League Fixtures</h1>
      <div>
        <label htmlFor="numGameweeks">Select the number of gameweeks to show: </label>
        <select id="numGameweeks" value={gameweekNum} onChange={handleNumGameweeksChange}>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          {/* Add more options here if needed */}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Gameweek 1</th>
            <th>Gameweek 2</th>
            <th>Gameweek 3</th>
            <th>Gameweek 4</th>
            <th>Gameweek 5</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              {Array.from({ length: 5 }).map((_, index) => {
                const gameweek = index + 1;
                const teamFixture = fixtureData.find(
                  (fixture) => fixture.team_h === team.id && fixture.event === gameweek
                );
                const opponentFixture = fixtureData.find(
                  (fixture) => fixture.team_a === team.id && fixture.event === gameweek
                );
                if (!teamFixture && !opponentFixture) {
                  return <td key={gameweek}>BLANK</td>;
                }
                return (
                  <td key={gameweek}>
                    {teamFixture ? `${getTeamName(teamFixture.team_a)} (H)` : ''}
                    {opponentFixture ? `${getTeamName(opponentFixture.team_h)} (A)` : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>


      {/* <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>GW</th>
          </tr>
        </thead>
        <tbody>
          {fixtureData.map((fixture) => (
            <tr>
              <td>{getTeamName(fixture.team_h)}</td>
              <td>{getTeamName(fixture.team_a)}</td>
              <td>{fixture.event}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

    </div>
  );
}

export default App;
