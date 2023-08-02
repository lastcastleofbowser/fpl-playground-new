import axios, { AxiosError } from 'axios';

const apiURL = 'http://localhost:3008/api/';

export interface FixtureData {
  team_h: number,
  team_a: number,
  team_h_score: number,
  team_a_score: number,
}

// export const fetchFixtures = () => {
//     axios
//       .get(`${apiURL}fixtures/`, { timeout: 5000 })
//       .then((response) => {
//         return response.data;
//         // console.log('Fixture Data:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching fixture data', error);
//       });
//   };

export const fetchFixtures = async () => {
    try {
      const response = await axios.get(`${apiURL}fixtures/`, { timeout: 5000 });
      return response.data as FixtureData[];
    } catch (error: any) {
      // Handle the error and throw a custom error message
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(`Error fetching fixture data: ${axiosError.response.statusText}`);
        } else if (axiosError.request) {
          // The request was made but no response was received
          throw new Error('Error fetching fixture data: Request did not receive a response');
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Error fetching fixture data: ${axiosError.message}`);
        }
      } else {
        // For non-Axios errors, just throw the error as is
        throw error;
      }
    }
  };
 
  
  
  
  
  
  