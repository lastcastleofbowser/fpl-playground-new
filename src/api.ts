import axios, { AxiosError } from 'axios';

const apiURL = 'http://localhost:3008/api/';
export const gameweekNum = 5; // Specific gameweek to fetch
// export const futureGameweeks = 0; // Number of future gameweeks to fetch (0 is all future gameweeks)

export interface FPLGameweekInfo {
  events: {
    id: number,
    name: string,
    deadline_time: string,
    average_entry_score: number,
    highest_scoring_entry: number,
    most_captained: number,
    most_vice_captained: number,
    transfers_made: number,
  },
}

export interface FixtureData {
  team_h: number,
  team_a: number,
  team_h_score: number,
  team_a_score: number,
  id: number,
}

export interface TeamData {
  id: number,
  name: string,
  short_name: string,
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

export const fetchFixtures = async () => {
    try {
      const response = await axios.get(`${apiURL}fixtures/?future=${gameweekNum}`, { timeout: 5000 });
      const fixtures: FixtureData[] = response.data;

      fixtures.sort((a, b) =>  a.id - b.id);

      const fixturesByGameweek: Record<number, FixtureData[]> = {};
      fixtures.forEach((fixture) => {
        if (!fixturesByGameweek[fixture.id]) {
          fixturesByGameweek[fixture.id] = [];
        }
        fixturesByGameweek[fixture.id].push(fixture);
      });

      let combinedFixtures: FixtureData[] = [];
      for (let gameweek = 1; gameweek <= 5; gameweek ++) {
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
  
  
  
  
  