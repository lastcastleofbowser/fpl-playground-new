import React, {useState, useEffect} from 'react';
import './App.css';
import {  fetchFixtures, 
          FixtureData, 
          fetchTeams, 
          TeamData, } from './api';
import FixtureTicker from './components/FixtureTicker/fixtureTicker';
         
function App() {
  const [fixtureData, setFixtureData] = useState<FixtureData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [gameweekNum, setGameweekNum] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = (numGameweeks: number) => {
    setLoading(true);
    Promise.all([fetchFixtures(numGameweeks), fetchTeams()])
      .then(([fixtures, teams]) => {
        setFixtureData(fixtures);
        setTeamData(teams);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(gameweekNum);
  }, [gameweekNum]);

  return (
    <div className="App">

      <FixtureTicker 
      fixtureData={fixtureData}
      teamData={teamData}
      gameweekNum={gameweekNum}
      loading={loading}
      setGameweekNum={setGameweekNum}
      />
    </div>
  );
}

export default App;
