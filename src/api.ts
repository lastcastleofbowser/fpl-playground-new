import axios, { AxiosError } from 'axios';

const apiURL = 'http://localhost:3008/api/';

export interface FixtureData {
  team_h: number,
  team_a: number,
  team_h_score: number,
  team_a_score: number,
}

export const fetchFixtures = async () => {
    try {
      const response = await axios.get(`${apiURL}fixtures/`, { timeout: 5000 });
      return response.data as FixtureData[];
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
 
  
  
  
  
  
  