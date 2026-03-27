export interface GameweekInfo {
  events: {
    id: number,
    name: string, // Gameweek name
    deadline_time: string,
    average_entry_score: number,
    highest_scoring_entry: number,
    highest_score: number
    most_captained: number,
    most_vice_captained: number,
    transfers_made: number,
    finished: boolean,
    data_checked: boolean,
  },
}

export interface FixtureData {
  id: number,
  event: number, // Gameweek number
  team_h: number,
  team_a: number,
  team_h_score: number,
  team_a_score: number,
  finished: boolean,
  team_h_difficulty: number, //Used in FDR
  team_a_difficulty: number, //Used in FDR
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

export interface AllPlayerData {
  //todo
}