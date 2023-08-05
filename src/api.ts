import axios, { AxiosError } from 'axios';

const apiURL = 'http://localhost:3008/api/';

export const gameweekNum = 5; // Specific number of gameweek to fetch

export interface FPLGameweekInfo {
  events: {
    id: number,
    name: string, // Gameweek name
    deadline_time: string,
    average_entry_score: number,
    highest_scoring_entry: number,
    most_captained: number,
    most_vice_captained: number,
    transfers_made: number,
  },
}

export interface FixtureData {
  id: number,
  event: number, // Gameweek number
  team_h: number,
  team_a: number,
  team_h_score: number,
  team_a_score: number,
}

export interface TeamData {
  id: number,
  name: string,
  short_name: string, // eg ARS
  strength_overall_home: number,
  strength_overall_away: number,
  strength_attack_home: number,
  strength_attack_away: number,
  strength_defence_home: number,
  strength_defence_away: number,
}  

export const fetchFPLGameInfo = async () => {
  try {
    const response = await axios.get(`${apiURL}bootstrap-static`, { timeout: 5000 });
    return response.data.events as FPLGameweekInfo[];
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(`Error fetching fixture data: ${axiosError.response.statusText}`);
      } else if (axiosError.request) { 
        throw new Error('Error fetching fixture data: Request did not receive a response');
      } else { 
        throw new Error(`Error fetching fixture data: ${axiosError.message}`);
      }
    } else {
      throw error;
    }
  }
};

export const fetchFixtures = async (gameweekNum: number) => {
    try {
      const response = await axios.get(`${apiURL}fixtures/?future=${gameweekNum}`, { timeout: 5000 });
      const fixtures: FixtureData[] = response.data;

      fixtures.sort((a, b) =>  a.event - b.event);

      const fixturesByGameweek: Record<number, FixtureData[]> = {};
      fixtures.forEach((fixture) => {
        if (!fixturesByGameweek[fixture.event]) {
          fixturesByGameweek[fixture.event] = [];
        }
        fixturesByGameweek[fixture.event].push(fixture);
      });

      let combinedFixtures: FixtureData[] = [];
      for (let gameweek = 1; gameweek <= gameweekNum; gameweek ++) {
        combinedFixtures = combinedFixtures.concat(fixturesByGameweek[gameweek]);
      }

      return combinedFixtures;

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          throw new Error(`Error fetching fixture data: ${axiosError.response.statusText}`);
        } else if (axiosError.request) { 
          throw new Error('Error fetching fixture data: Request did not receive a response');
        } else { 
          throw new Error(`Error fetching fixture data: ${axiosError.message}`);
        }
      } else {
        throw error;
      }
    }
  };

  export const fetchTeams = async () => {
    try {
      const response = await axios.get(`${apiURL}bootstrap-static`, { timeout: 5000 });
      return response.data.teams as TeamData[];
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          throw new Error(`Error fetching fixture data: ${axiosError.response.statusText}`);
        } else if (axiosError.request) { 
          throw new Error('Error fetching fixture data: Request did not receive a response');
        } else { 
          throw new Error(`Error fetching fixture data: ${axiosError.message}`);
        }
      } else {
        throw error;
      }
    }
  };
  
  