1. set up axios, cors, express and middleware to fetch api data

2. fetch and store data from APIs
    - fixture data https://fantasy.premierleague.com/api/fixtures/ ✅
    - player data  https://fantasy.premierleague.com/api/element-summary/{player-id}/
    - FPL manager data 
        - Season data for manager -> https://fantasy.premierleague.com/api/entry/{team-id}/
        - Full transfer history for season -> https://fantasy.premierleague.com/api/entry/{team-id}/transfers/
        - Any GW squad -> https://fantasy.premierleague.com/api/entry/{team-id}/event/{GW}/picks/
        - Total career performance -> https://fantasy.premierleague.com/api/entry/{team-id}/history/

3. Using TS define the type for all the datapoints 