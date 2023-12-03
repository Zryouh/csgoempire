class LeagueUtils {

    /**
     * Update team statistics based on match results.
     * @param {Object} teamStats - Object to store team statistics.
     * @param {string} teamName - Name of the team.
     * @param {number} goalsFor - Goals scored by the team.
     * @param {number} goalsAgainst - Goals conceded by the team.
     * @param {number} points - Points earned by the team.
     */
    static updateTeamStats(teamStats, teamName, goalsFor, goalsAgainst, points) {
        if (!teamStats[teamName]) {
            teamStats[teamName] = {
                teamName,
                matchesPlayed: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0,
                headToHead: {},
            };
        }

        teamStats[teamName].matchesPlayed++;
        teamStats[teamName].goalsFor += goalsFor;
        teamStats[teamName].goalsAgainst += goalsAgainst;
        teamStats[teamName].goalDifference = teamStats[teamName].goalsFor - teamStats[teamName].goalsAgainst;
        teamStats[teamName].points += points;
    }

    /**
     * Compare head-to-head results between two teams.
     * @param {Object} teamA - Team A.
     * @param {Object} teamB - Team B.
     * @param {Array} matches - List of matches.
     * @returns {number} Comparison result (-1, 0, or 1).
     */
    static getHeadToHeadResult(teamA, teamB, matches) {
        const headToHeadMatches = matches.filter(
            (match) =>
                (match.homeTeam === teamA.teamName && match.awayTeam === teamB.teamName) ||
                (match.homeTeam === teamB.teamName && match.awayTeam === teamA.teamName)
        );

        const teamAScore = headToHeadMatches.reduce((total, match) => {
            return total + (match.homeTeam === teamA.teamName ? match.homeTeamScore : match.awayTeamScore);
        }, 0);

        const teamBScore = headToHeadMatches.reduce((total, match) => {
            return total + (match.homeTeam === teamB.teamName ? match.homeTeamScore : match.awayTeamScore);
        }, 0);

        return teamBScore - teamAScore;
    }

    static formatLeaderboardEntry(entry) {
        return {
            teamName: entry.teamName,
            matchesPlayed: entry.matchesPlayed,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            goalDifference: entry.goalDifference,
            points: entry.points,
        };
    }
}

export default LeagueUtils;