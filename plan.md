1. set up axios, cors, express and middleware to fetch api data

2. fetch and store data from APIs
    - fixture data https://fantasy.premierleague.com/api/fixtures/ ✅
    - player data  https://fantasy.premierleague.com/api/element-summary/{player-id}/
    - FPL manager data 
        - Season data for manager -> https://fantasy.premierleague.com/api/entry/{team-id}/
        - Full transfer history for season -> https://fantasy.premierleague.com/api/entry/{team-id}/transfers/
        - Any GW squad -> https://fantasy.premierleague.com/api/entry/{team-id}/event/{GW}/picks/
        - Total career performance -> https://fantasy.premierleague.com/api/entry/{team-id}/history/

3. Take the team id and relate them to correct team for display purposes ✅
4. Display only the fixtures for each separate gameweek as requested by the user
   - this will involve changing the URL to match the gameweek ie. /api/fixtures?event=7 will be for GW7
   - NB: /fixtures?future=0 this is all for GWs
   - NB: /fixtures?future=1 will be for 1 upcoming GW -> you can adjust this for x amount of future gameweeks in the fixture tracker