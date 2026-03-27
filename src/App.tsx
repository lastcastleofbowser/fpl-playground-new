import {useState, useEffect} from 'react';
import {  FixtureData, TeamData, GameweekInfo, AllPlayerData} from './interfaces/api_interfaces';
import {  fetchFixtures, fetchBootstrapData } from '../src/api';
import FixtureTicker from './components/FixtureTicker/fixtureTicker';
         
interface AppData {
fixtures: FixtureData[];
teams: TeamData[];
events: GameweekInfo[];
players: AllPlayerData[];
}

export default function App() {
  
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameweekNum, setGameweekNum] = useState<number>(5);

  // const [teamData, setTeamData] = useState<TeamData[]>([]);
  // const [allPlayerData, setAllPlayerData] = useState<AllPlayerData[]>([]);
  // const [gameweekInfo, setGameweekInfo] = useState<GameweekInfo[]>([]); 

  const fetchData = async (gameweekNum: number) => {
    setLoading(true);

    try {
      const [fixtures, bootstrap] = await Promise.all([
        fetchFixtures(gameweekNum),
        fetchBootstrapData(),
      ]);

      setData({
        fixtures,
        teams: bootstrap.teams,
        events: bootstrap.gameweekInfo,
        players: bootstrap.allPlayerData,
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    };
    
  useEffect(() => {
    fetchData(gameweekNum);
  }, [gameweekNum]);

  return (
    <>
    <div className="App">
      <div className="main-wrapper flex">
        <div className='main-content flex-auto'>
          <p className='text-4xl text-red-600'>Main content</p>
        </div>
        <div className="flex-initial w-[32rem] overflow-x-auto">
          {data && <FixtureTicker 
            fixtureData={data.fixtures}
            teamData={data.teams}
            gameweekNum={gameweekNum}
            loading={loading}
            setGameweekNum={setGameweekNum}
          />}
        </div>
      </div>
    </div>
    </>
  );
}