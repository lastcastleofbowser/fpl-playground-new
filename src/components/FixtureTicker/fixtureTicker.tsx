import React, { useState, useMemo } from 'react';
import { FixtureData, TeamData } from '../../api';
import { handleFixturesByGw } from '../../utils/handleFixturesByGw';
import { handleFixtureStrength } from '../../utils/handleFixtureStrength';
import './fixtureTicker.css';

interface FixtureTickerProps {
  fixtureData: FixtureData[];
  teamData: TeamData[];
  gameweekNum: number;
  loading: boolean;
  setGameweekNum: (numGameweeks: number) => void;
}

function FixtureTicker({
  fixtureData,
  teamData,
  gameweekNum,
  loading,
  setGameweekNum,
}: FixtureTickerProps) {
  const [selectedGameweek, setSelectedGameweek] = useState(gameweekNum);
  const [sortOrder, setSortOrder] = useState<number[]>(
    Array.from({ length: gameweekNum }, () => 1)
  );

  // Precompute grouped fixtures by gameweek
  const fixturesByGw = useMemo(() => handleFixturesByGw(fixtureData), [fixtureData]);

  // Get the sorted list of all gw numbers
  const gwNumbers = useMemo(() => {
    return Object.keys(fixturesByGw)
      .map((k) => parseInt(k))
      .sort((a, b) => a - b);  
  }, [fixturesByGw]);

  // Last event in fixture list
  const lastEvent = useMemo(() => {
    if (fixtureData.length === 0) return 0;
    return Math.max(...fixtureData.map(f => f.event));
  }, [fixtureData]);
  
  // Limit columns to not exceed actual fixtures
  const maxColumns = Math.min(gameweekNum, lastEvent);

  // Teams lookup map
  const teamMap = useMemo(
    () => Object.fromEntries(teamData.map((team) => [team.id, team])),
    [teamData]
  );

  const getTeamShortName = (teamId: number | null) =>
  teamId && teamMap[teamId] ? teamMap[teamId].short_name : 'Unknown';

  // Handle sorting by gameweek
  const handleTeamSort = (gameweek: number) => {
    const columnIndex = gameweek - 1;
    const newSortOrder = [...sortOrder];
    newSortOrder[columnIndex] = newSortOrder[columnIndex] === 1 ? -1 : 1;
    setSortOrder(newSortOrder);
    setSelectedGameweek(gameweek);
  };

  // Handle user changing number of gameweeks to display
  const handleNumGameweeksChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameweeks = parseInt(e.target.value);
    setGameweekNum(selectedGameweeks);
    setSelectedGameweek(selectedGameweeks);
    setSortOrder(Array.from({ length: selectedGameweeks }, () => 1));
  };

  return (
    <div>
      <h1>Premier League Fixtures</h1>

      <div>
        <label htmlFor="numGameweeks">Select the number of gameweeks to show: </label>
        <select id="numGameweeks" value={gameweekNum} onChange={handleNumGameweeksChange}>
          {[5, 6, 7, 8, 9, 10]
            .filter((gw) => gw <= lastEvent) // remove options beyond lastEvent
            .map((gw) => (
              <option key={gw} value={gw}>
                {gw}
              </option>
            ))}
          {lastEvent > 10 && (
            <option key="all" value={lastEvent}>
              All
            </option>
          )}
        </select>
      </div>

      {!loading && fixtureData.length > 0 && teamData.length > 0 && (
        <div className="fixture-table-container">
          <table className="fixture-table">
            <thead>
              <tr>
                <th>Team Name ↕️</th>
                {gwNumbers.slice(0, maxColumns).map((gw) => (
                <th
                  key={gw}
                  onClick={() => handleTeamSort(gw)}
                  className={selectedGameweek === gw ? 'sorted' : ''}
                >
                  {gw} {sortOrder[gw] === 1 ? '⬆️' : '⬇️'}
                </th>
              ))}
              </tr>
            </thead>
            <tbody>
              {[...teamData]
                .sort((a, b) => {
                  const gw = selectedGameweek;
                  const aFixture = fixturesByGw[gw]?.find(
                    (f) => f.team_h === a.id || f.team_a === a.id
                  );
                  const bFixture = fixturesByGw[gw]?.find(
                    (f) => f.team_h === b.id || f.team_a === b.id
                  );

                  const aStrength = aFixture ? handleFixtureStrength(aFixture, a.id) : 0;
                  const bStrength = bFixture ? handleFixtureStrength(bFixture, b.id) : 0;

                  return sortOrder[selectedGameweek - 1] * (aStrength - bStrength);
                })
                .map((team) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    {gwNumbers.slice(0, maxColumns).map((_, idx) => {
                      const gw = gwNumbers[idx];
                      const fixturesForGw = fixturesByGw[gw] || [];
                      const fixture = fixturesForGw.find(
                        (f) => f.team_h === team.id || f.team_a === team.id
                      );

                      if (!fixture) {
                        return <td key={gw} className="blank-gw"></td>;
                      }

                      const opponentId = fixture.team_h === team.id ? fixture.team_a : fixture.team_h;
                      const opponentName = getTeamShortName(opponentId);

                      const strength = handleFixtureStrength(fixture, team.id);
                      let strengthClass = '';
                      if (strength === 1) strengthClass = 'very-easy';
                      else if (strength === 2) strengthClass = 'easy';
                      else if (strength === 3) strengthClass = 'medium';
                      else if (strength === 4) strengthClass = 'hard';
                      else if (strength === 5) strengthClass = 'very-hard';

                      return (
                        <td key={gw} className={strengthClass}>
                          {opponentName}
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