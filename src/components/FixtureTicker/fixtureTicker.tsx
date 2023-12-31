import './fixtureTicker.css';
import { FixtureData, TeamData } from '../../api';
import React, { useState } from 'react';

function FixtureTicker({
  fixtureData,
  teamData,
  gameweekNum,
  loading,
  setGameweekNum,
}: {
  fixtureData: FixtureData[];
  teamData: TeamData[];
  gameweekNum: number;
  loading: boolean;
  setGameweekNum: (numGameweeks: number) => void;
}) {
  const [selectedGameweek, setSelectedGameweek] = useState(gameweekNum);
  const [sortOrder, setSortOrder] = useState<number[]>(Array.from({ length: gameweekNum }, () => 1));

  const handleTeamSort = (e: React.MouseEvent<HTMLTableHeaderCellElement>, gameweek: number) => {
    const columnIndex = gameweek - 1;
    const newSortOrder = [...sortOrder];
    newSortOrder[columnIndex] = newSortOrder[columnIndex] === 1 ? -1 : 1;
    setSortOrder(newSortOrder);
    setSelectedGameweek(gameweek);
  };

  const handleNumGameweeksChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameweeks = parseInt(e.target.value);
    setGameweekNum(selectedGameweeks);
    setSelectedGameweek(selectedGameweeks);
    setSortOrder(Array.from({ length: selectedGameweeks }, () => 1));
  };

  const handleFixtureStrength = (fixture: FixtureData | null, teamId: number): number => {
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

  const getTeamName = (teamId: number): string => {
    const team = teamData.find((team) => team.id === teamId);
    return team ? team.short_name : 'Unknown Team';
  };

  return (
    <div>
      <h1>Premier League Fixtures</h1>

      <div>
        <label htmlFor="numGameweeks">Select the number of gameweeks to show: </label>
        <select id="numGameweeks" value={gameweekNum} onChange={handleNumGameweeksChange}>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="38">all</option>
        </select>
      </div>

      {!loading && fixtureData.length > 0 && teamData.length > 0 && (
        <div className="fixture-table-container">
          <table className="fixture-table">
            <thead>
              <tr>
                <th>Team Name ↕️</th>
                {Array.from({ length: gameweekNum }).map((_, index) => (
                  <th
                    key={index + 1}
                    onClick={(e) => handleTeamSort(e, index + 1)}
                    className={selectedGameweek === index + 1 ? 'sorted' : ''}
                  >
                    {index + 1} {sortOrder[index] === 1? '⬆️' : '⬇️'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamData
                .sort((a, b) => {
                  let sortValue = 0;
                  const gameweek = selectedGameweek;
                  const aFixture = fixtureData.find(
                    (fixture) => fixture.team_h === a.id && fixture.event === gameweek
                  );
                  const bFixture = fixtureData.find(
                    (fixture) => fixture.team_h === b.id && fixture.event === gameweek
                  );
                  const aStrength = handleFixtureStrength(aFixture || null, a.id);
                  const bStrength = handleFixtureStrength(bFixture || null, b.id);

                  if (aStrength !== bStrength) {
                    sortValue = sortOrder[selectedGameweek - 1] * (aStrength - bStrength);
                  }

                  return sortValue;
                })
                .map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    {Array.from({ length: gameweekNum }).map((_, index) => {
                      const gameweek = index + 1;
                      const teamFixture = fixtureData.find(
                        (fixture) => fixture.team_h === team.id && fixture.event === gameweek
                      );
                      const opponentFixture = fixtureData.find(
                        (fixture) => fixture.team_a === team.id && fixture.event === gameweek
                      );
                      if (!teamFixture && !opponentFixture) {
                        return <td key={gameweek} className="blank-gw"></td>;
                      }

                      const strength = handleFixtureStrength(teamFixture || opponentFixture || null, team.id);

                      // Map the strength to the appropriate CSS class
                      let strengthClass = '';
                      if (strength === 1) {
                        strengthClass = 'very-easy';
                      } else if (strength === 2) {
                        strengthClass = 'easy';
                      } else if (strength === 3) {
                        strengthClass = 'medium';
                      } else if (strength === 4) {
                        strengthClass = 'hard';
                      } else if (strength === 5) {
                        strengthClass = 'very-hard';
                      }

                      return (
                        <td key={gameweek} className={strengthClass}>
                          {teamFixture ? `${getTeamName(teamFixture.team_a)}` : ''}
                          {opponentFixture ? `${getTeamName(opponentFixture.team_h).toLowerCase()}` : ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FixtureTicker;