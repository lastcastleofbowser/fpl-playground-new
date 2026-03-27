import axios, { AxiosError } from 'axios';

import { 
  GameweekInfo,
  FixtureData,
  TeamData,
  AllPlayerData
} from './interfaces/api_interfaces';

const apiURL = 'http://localhost:3008/api/';

const handleAxiosError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new Error(`${context}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error(`${context}: No response received`);
    } else {
      throw new Error(`${context}: ${error.message}`);
    }
  }
  throw error;
};

export interface BootstrapData {
  gameweekInfo: GameweekInfo[];
  teams: TeamData[];
  allPlayerData: AllPlayerData[];
}

export const fetchBootstrapData = async (): Promise<BootstrapData> => {
  try {
    const response = await axios.get(`${apiURL}bootstrap-static`, { timeout: 5000 });

    return {
      gameweekInfo: response.data.events,
      teams: response.data.teams,
      allPlayerData: response.data.elements,
    };

  } catch (error: any) {
    handleAxiosError(error, 'Error fetching bootstrap data');
    throw error
  }
};


export const fetchFixtures = async (gameweekNum: number = 5) => {
  try {
    const response = await axios.get(`${apiURL}fixtures/?future=${gameweekNum}`, { timeout: 5000 });
    const fixtures: FixtureData[] = response.data;
    fixtures.sort((a, b) =>  a.event - b.event);

    return fixtures;

  } catch (error: any) {
    handleAxiosError(error, 'Error fetching bootstrap data');
    throw error
  }
};
  
// `${apiURL}bootstrap-static`
// response.data.elements are all players in the game
// ------  example Raya from Arsenal -------
// {
//       "can_transact": true,
//       "can_select": true,
//       "chance_of_playing_next_round": null,
//       "chance_of_playing_this_round": null,
//       "code": 154561,
//       "cost_change_event": 0,
//       "cost_change_event_fall": 0,
//       "cost_change_start": 5,
//       "cost_change_start_fall": -5,
//       "price_change_percent": "0",
//       "dreamteam_count": 1,
//       "element_type": 1,
//       "ep_next": "6.7",
//       "ep_this": "0.0",
//       "event_points": 0,
//       "first_name": "David",
//       "form": "5.7",
//       "id": 1,
//       "in_dreamteam": true,
//       "news": "",
//       "news_added": null,
//       "now_cost": 60,
//       "photo": "154561.jpg",
//       "points_per_game": "4.2",
//       "removed": false,
//       "second_name": "Raya Martín",
//       "selected_by_percent": "34.6",
//       "special": false,
//       "squad_number": null,
//       "status": "a",
//       "team": 1,
//       "team_code": 3,
//       "total_points": 129,
//       "transfers_in": 4160152,
//       "transfers_in_event": 39475,
//       "transfers_out": 2475288,
//       "transfers_out_event": 7994,
//       "value_form": "1.0",
//       "value_season": "21.5",
//       "web_name": "Raya",
//       "known_name": "",
//       "region": 200,
//       "team_join_date": "2024-07-04",
//       "birth_date": "1995-09-15",
//       "has_temporary_code": false,
//       "opta_code": "p154561",
//       "minutes": 2790,
//       "goals_scored": 0,
//       "assists": 0,
//       "clean_sheets": 15,
//       "goals_conceded": 22,
//       "own_goals": 0,
//       "penalties_saved": 0,
//       "penalties_missed": 0,
//       "yellow_cards": 1,
//       "red_cards": 0,
//       "saves": 50,
//       "bonus": 6,
//       "bps": 515,
//       "influence": "445.8",
//       "creativity": "33.4",
//       "threat": "0.0",
//       "ict_index": "48.0",
//       "clearances_blocks_interceptions": 30,
//       "recoveries": 257,
//       "tackles": 1,
//       "defensive_contribution": 0,
//       "starts": 31,
//       "expected_goals": "0.00",
//       "expected_assists": "0.06",
//       "expected_goal_involvements": "0.06",
//       "expected_goals_conceded": "22.30",
//       "corners_and_indirect_freekicks_order": null,
//       "corners_and_indirect_freekicks_text": "",
//       "direct_freekicks_order": null,
//       "direct_freekicks_text": "",
//       "penalties_order": null,
//       "penalties_text": "",
//       "scout_risks": [],
//       "scout_news_link": "",
//       "influence_rank": 108,
//       "influence_rank_type": 18,
//       "creativity_rank": 376,
//       "creativity_rank_type": 3,
//       "threat_rank": 816,
//       "threat_rank_type": 95,
//       "ict_index_rank": 270,
//       "ict_index_rank_type": 16,
//       "expected_goals_per_90": 0,
//       "saves_per_90": 1.61,
//       "expected_assists_per_90": 0,
//       "expected_goal_involvements_per_90": 0,
//       "expected_goals_conceded_per_90": 0.72,
//       "goals_conceded_per_90": 0.71,
//       "now_cost_rank": 86,
//       "now_cost_rank_type": 1,
//       "form_rank": 20,
//       "form_rank_type": 1,
//       "points_per_game_rank": 51,
//       "points_per_game_rank_type": 3,
//       "selected_rank": 9,
//       "selected_rank_type": 1,
//       "starts_per_90": 1,
//       "clean_sheets_per_90": 0.48,
//       "defensive_contribution_per_90": 0
//     },
  