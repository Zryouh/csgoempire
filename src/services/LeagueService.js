/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
import axios from 'axios';
import LeagueUtils from '../utils/LeagueUtils.js';
class LeagueService {    
    constructor() {
        this.matches = [];
        this.apiBaseUrl = 'http://localhost:3001/api/v1';
        this.accessToken = null;
    }

     /**
    * Asynchronous function to get the access token from the API.
    * @returns {Promise<string>} A promise that resolves to the access token.
    */
   async getAccessToken() {
       if (this.accessToken) {
           return this.accessToken;
       }

       const apiUrl = `${this.apiBaseUrl}/getAccessToken`;

       try {
           const response = await axios.get(apiUrl);
       
           if (response.data.success) {
               this.accessToken = response.data.access_token;
               return this.accessToken;
           } else {
               console.error('Failed to get access token:', response.data.error);
               throw new Error('Failed to get access token');
           }
       } catch (error) {
           console.error('Error fetching access token:', error);
           throw error;
       }
   }

    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * @param {Array} matches List of matches.
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const teamStats = {};

        this.matches.forEach((match) => { 
            const{ homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;

            const homePoints = homeTeamScore > awayTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0;
            const awayPoints = awayTeamScore > homeTeamScore ? 3 : awayTeamScore === homeTeamScore ? 1 : 0;

            LeagueUtils.updateTeamStats(teamStats, homeTeam, homeTeamScore, awayTeamScore, homePoints);
            LeagueUtils.updateTeamStats(teamStats, awayTeam, awayTeamScore, homeTeamScore, awayPoints);

        });
            
            const leaderboard = Object.values(teamStats);

            
            leaderboard.sort((a, b) => {
                if (a.points !== b.points) {
                    return b.points - a.points;
                } else {
                    //Apply Tiebreakers
                    const headToHeadResult = LeagueUtils.getHeadToHeadResult(a, b, matches);
                    if(headToHeadResult !== 0) {
                        return headToHeadResult;
                    }
                    return b.goalDifference - a.goalDifference;
                }
            });
    
        return leaderboard.map(LeagueUtils.formatLeaderboardEntry);
    }

    
    /**
     * Asynchronic function to fetch the data from the server.
     * 
     * 
     */

    async fetchData() {
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios.get(`${this.apiBaseUrl}/getAllMatches`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if(response.data.success) {
                this.setMatches(response.data.matches);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
 
}

export default LeagueService;