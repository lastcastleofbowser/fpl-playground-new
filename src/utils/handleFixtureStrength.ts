import { FixtureData } from "../interfaces/api_interfaces";

export const handleFixtureStrength = (
  fixture: FixtureData | null, teamId: number
): number => {
    if (!fixture) {
      return 0; // No fixture
    }
    const { team_h, team_h_difficulty = 0, team_a, team_a_difficulty = 0 } = fixture;

    if (teamId === team_h) {
      return team_h_difficulty;
    } else if (teamId === team_a) {
      return team_a_difficulty;
    }

    return 0;
  };