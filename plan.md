----- SET UP PLAN -----

1. set up axios, cors, express and middleware to fetch api data ✅

2. fetch and store data from APIs
    - essential game data data https://fantasy.premierleague.com/api/bootstrap-static/ ✅
    - fixture data https://fantasy.premierleague.com/api/fixtures/ ✅
    - player data  https://fantasy.premierleague.com/api/element-summary/{player-id}/
    - FPL manager data 
        - Season data for manager -> https://fantasy.premierleague.com/api/entry/{team-id}/
        - Full transfer history for season -> https://fantasy.premierleague.com/api/entry/{team-id}/transfers/
        - Any GW squad -> https://fantasy.premierleague.com/api/entry/{team-id}/event/{GW}/picks/
        - Total career performance -> https://fantasy.premierleague.com/api/entry/{team-id}/history/

----- FIXTURE TICKER PLAN -----

3. Take the team id and relate them to correct team for display purposes ✅
4. Display the first 5 fixtures ✅
5. Have the first column display all team names and get the GW fixtures to display in their own columns for each separate gameweek as requested by the user ✅
   - this will involve changing the URL to match the gameweek ie. /api/fixtures?event=7 will be for GW7
   - NB: /fixtures?future=0 this is all for GWs
   - NB: /fixtures?future=1 will be for 1 upcoming GW -> you can adjust this for x amount of future gameweeks in the fixture tracker
6. change the names to the abbreviated versions eg BHA ✅
7. change the names for home games in capitals and away games in lowercase✅
 - HOW ARE YOU GOING TO DISPLAY DGW????
8. use colours to indicate the difficulty of each team's game based on FDR ✅
9. create sorting filters to sort whole fixture table by difficulty in any gameweek by clicking sorting icon.✅
    - sort sorting icon
    - sorting is confused with home and away FDR information and therefore sorting is displaying incorrectly. It is giving greater difficulty to home games and not factoring in away game difficulty
10. Sort table by team name ascending order when clicking team name header
11. Add a column to show all your current players beside the fixture ticker next to their relvant team
    - must take in player id
    - must pull data from manager API
12. turn the fixture into a component from its own file ✅
13. When game has been played start gameweeks displaying from next game available