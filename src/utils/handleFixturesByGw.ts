import { FixtureData } from "../interfaces/api_interfaces";

export const handleFixturesByGw = (
  fixtureData: FixtureData[]
): Record<number, FixtureData[]> => {
  
  return fixtureData.reduce<Record<number, FixtureData[]>>(
    (acc, fixture) => {
      const gw = fixture.event;
  
      if (!acc[gw]) {
        acc[gw] = [];
      }
  
      acc[gw].push(fixture);
  
      return acc;
    },
    {}
  );

}
