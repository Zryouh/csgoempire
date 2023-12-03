<template>
  <div class="containerBody">
    <div class="containerLeague">
      <span>{{ Leaderboard }}</span>
    </div>
    <div v-if="this.isMobileViewS">
        <table class="tables">
          <thead>
            <tr>
              <th style="width: 50%; text-align: left;" class="tableHeader" >Team Name</th>
              <th style="width: 0%; text-align: left;" class="tableHeader">MP</th>
              <th style="width: 7%;" class="tableHeader">GD</th>
              <th style="width:10%; text-align: center;" class="tableHeader">Points</th>
            </tr>
          </thead>
        </table>
        <table class="tableBis">
          <tr v-for="(team, index) in leaderboardData" :key="index" style="height: 70px;border-bottom: 1pt solid #E4EDF2;">
            <img :src="`https://flagsapi.codeaid.io/`+ countriesName[index] + `.png`" alt="" class="countries" ><td class="teamName" >{{ team.teamName }}</td> 
            <td class="sizeCell">{{ team.matchesPlayed }}</td>
            <td class="sizeCell">{{ team.goalDifference }}</td>
            <td class="points">{{ team.points }}</td>
          </tr>
        </table>
    </div>
    <div v-else-if="this.isMobileViewM">
        <table class="tables">
          <thead>
            <tr>
              <th style="width: 50%; text-align: left;" class="tableHeader" >Team Name</th>
              <th style="width: 8%; text-align: left;" class="tableHeader">MP</th>
              <th style="width: 8%; text-align: left;" class="tableHeader">GF</th>
              <th style="width: 10%; text-align: left;" class="tableHeader">GA</th>
              <th style="width:7%; text-align: center;" class="tableHeader">Points</th>
            </tr>
          </thead>
        </table>
        <table class="tableBis">
          <tr v-for="(team, index) in leaderboardData" :key="index" style="height: 70px;border-bottom: 1pt solid #E4EDF2;">
            <img :src="`https://flagsapi.codeaid.io/`+ countriesName[index] + `.png`" alt="" class="countries" ><td class="teamName" >{{ team.teamName }}</td> 
            <td class="sizeCell">{{ team.matchesPlayed }}</td>
            <td class="sizeCell">{{ team.goalsFor }}</td>
            <td class="sizeCell">{{ team.goalsAgainst }}</td>
            <td class="points">{{ team.points }}</td>
          </tr>
        </table>
    </div>
    <div v-else-if="!isMobileViewM && !isMobileViewS">
        <table class="tables">
          <thead>
            <tr>
              <th style="width: 50%; text-align: left;" class="tableHeader" >Team Name</th>
              <th style="width: 8%; text-align: left;" class="tableHeader">MP</th>
              <th style="width: 8%; text-align: left;" class="tableHeader">GF</th>
              <th style="width: 10%; text-align: left;" class="tableHeader">GA</th>
              <!-- <th class="tableHeader">GD</th> -->
              <th style="width:7%; text-align: center;" class="tableHeader">Points</th>
            </tr>
          </thead>
        </table>
        <table class="tableBis">
          <tr v-for="(team, index) in leaderboardData" :key="index" style="height: 70px;border-bottom: 1pt solid #E4EDF2;">
            <img :src="`https://flagsapi.codeaid.io/`+ countriesName[index] + `.png`" alt="" class="countries" ><td class="teamName" >{{ team.teamName }}</td> 
            <td class="sizeCell">{{ team.matchesPlayed }}</td>
            <td class="sizeCell">{{ team.goalsFor }}</td>
            <td class="sizeCell">{{ team.goalsAgainst }}</td>
            <!-- <td>{{ team.goalDifference }}</td> -->
            <td class="points">{{ team.points }}</td>
          </tr>
        </table>
     
    </div>
  </div>
</template>

<script>
import LeagueService from "../services/LeagueService";
export default {
  name: "Leaderboard",

  data() {
    return {
      Leaderboard: "League Standings",
      isMobileViewS: false,
      isMobileViewM: false,
      leaderboardData: [],
      error: null,
      countriesName: ['Brazil','Cameroon','Switzerland','Serbia'],
    };
  },

  methods: {

    handleView() {
      if (window.innerWidth <= 500) {
        this.isMobileViewS = true;
      } else if (window.innerWidth > 500 && window.innerWidth <= 750) {
        this.isMobileViewM = true;
      } else {
        this.isMobileViewS = false;
        this.isMobileViewM = false;
      }
    },

    async fetchLeaderboard() {
      try {
        const _leagueService = new LeagueService();
        await _leagueService.fetchData();
        this.leaderboardData = await _leagueService.getLeaderboard();
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
      }
    },
  },

  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },

  mounted() {
    this.fetchLeaderboard();
  },
};
</script>

<style>
.containerBody {
  box-sizing: border-box;
  height: 100%;
  padding: 0;
  margin: 0 auto;
  width: 90%;
  .containerLeague {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 60px;
    color: #182C62;
  }
  .tables {
    border-color: #E4EDF2;
    width: 100%;
    height: 40px;
    background-color: #E4EDF2;
  }
  
  .tableBis {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
    color: #4B5C68;
    .sizeCell {
      width: 11%;
      font-size: 14px;
    }
    .teamName {
        width: 55%;
        font-weight: bold;
        
    }
    .points{
        color: #025FEB;
        font-weight: bold; 
        width: 10%;
        text-align: center;
    }
  }
  .tableHeader {
    font-size: 12px;
    color: #182c62;
    font-weight: none;
  }
  .countries {
    width: 53px;
    height: 37px;
    margin-left: 10px;
    margin-top: 15px;
    margin-right: 15px;
 }
}
</style>
