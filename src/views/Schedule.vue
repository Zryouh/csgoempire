<template>
    <div class="containerBody">
        <div class="containerLeague">
            <span>{{ schedule  }}</span>
        </div>
        <div v-if="this.isMobileViewS">
                <table class="tables">
                    <thead>
                        <tr>
                        <th class="tableHeader homeS">Home Team</th>
                        <th class="tableHeader homeA">Away Team</th>
        
                        </tr>
                    </thead>
                </table>
                <table class="tablesBis">
                <template v-for="(match, index) in matchesData" :key="index">
                    <tr  v-bind:class="{'tr': index % 2 !== 0}" style="height: 70px;">
                            <td style="text-align: right;">{{ match.homeTeam }}</td><img :src="`https://flagsapi.codeaid.io/`+ countriesHome[index] + `.png`" alt="" class="countries">
                            <td>{{ match.homeTeamScore }} : {{ match.awayTeamScore }}</td>
                            <img :src="`https://flagsapi.codeaid.io/`+ countriesAway[index] + `.png`" alt="" class="countries" text-align="left"><td style="text-align: left;">{{ match.awayTeam }}</td>
                    </tr>
                </template>
            </table>
        </div>
        <div v-else-if="this.isMobileViewM">
            <table class="tables">
                <thead>
                    <tr>
                        <th style="width: 15%;" class="tableHeader">DateTime</th>
                        <th class="tableHeader">Home Team</th>
                        <th style="text-align: left; width: 35%;" class="tableHeader">Away Team</th>
    
                    </tr>
                </thead>
            </table>
            <table class="tablesBis">
                <template v-for="(match, index) in matchesData" :key="index">
                    <tr  v-bind:class="{'tr': index % 2 !== 0}" style="height: 70px;">
                            <td class="formatDate">{{ this.formatDate[index] }}</td>
                            <td style="text-align: right;">{{ match.homeTeam }}</td><img :src="`https://flagsapi.codeaid.io/`+ countriesHome[index] + `.png`" alt="" class="countries">
                            <td>{{ match.homeTeamScore }} : {{ match.awayTeamScore }}</td>
                            <img :src="`https://flagsapi.codeaid.io/`+ countriesAway[index] + `.png`" alt="" class="countries" text-align="left"><td style="text-align: left;">{{ match.awayTeam }}</td>
                    </tr>
                </template>
            </table>
        </div>
        <div v-else-if="!isMobileViewM && !isMobileViewS">
            <table class="tables">
                <thead>
                    <tr>
                        <th style="width: 10%;" class="tableHeader">DateTime</th>
                        <th class="tableHeader">Stadium</th>
                        <th class="tableHeader">Home Team</th>
                        <th style="text-align: left; width: 27%;" class="tableHeader">Away Team</th>
    
                    </tr>
                </thead>
            </table>
            <table class="tablesBis">
                <template v-for="(match, index) in matchesData" :key="index">
                    <tr  v-bind:class="{'tr': index % 2 !== 0}" style="height: 70px;">
                            <td class="formatDate">{{ this.formatDate[index] }}</td>
                            <td class="stadium">{{ match.stadium }}</td>
                            <td style="text-align: right;">{{ match.homeTeam }}</td><img :src="`https://flagsapi.codeaid.io/`+ countriesHome[index] + `.png`" alt="" class="countries">
                            <td>{{ match.homeTeamScore }} : {{ match.awayTeamScore }}</td>
                            <img :src="`https://flagsapi.codeaid.io/`+ countriesAway[index] + `.png`" alt="" class="countries" text-align="left"><td style="text-align: left;">{{ match.awayTeam }}</td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>

<script>
import LeagueService from '../services/LeagueService';
export default {
name: 'Schedule',

    data() {
        return {
            schedule : 'League Schedule',
            isMobileViewS: false,
            isMobileViewM: false,
            matchesData: null,
            formatDate: [],
            countriesHome: ['Brazil','Switzerland','Serbia','Brazil','Brazil','Switzerland'],
            countriesAway: ['Serbia','Serbia','Cameroon','Switzerland','Cameroon','Cameroon'],
        }
    },
    methods: {
        handleView() {
            if(window.innerWidth <= 500) {
                this.isMobileViewS = true;
            } 
            else if(window.innerWidth > 500 && window.innerWidth <= 750) {
                this.isMobileViewM = true;
            }
            else {
                this.isMobileViewS = false;
                this.isMobileViewM = false;
            
            }
        },
         async getFetchData(){
            try {
                const _leagueService = new LeagueService();
                let formatDateWrong = [];
                await _leagueService.fetchData();
                this.matchesData  = await _leagueService.getMatches();
                this.matchesData.forEach((match) => {
                    formatDateWrong.push(match.matchDate);
                });
                await this.getFormatDate(formatDateWrong);
            }catch(error) {
                console.log('Error fetching leaderboard', error);
            }
            
        },
        
        getFormatDate(MatchesDates) {
            if(MatchesDates === null) return;
            for(let i = 0; i < MatchesDates.length; i++) {
                const timestamp = MatchesDates[i];
                const date = new Date(timestamp);
                
                const formattedDate  =
                    date.getDate() +
                    '.' +
                    (date.getMonth() + 1) + // Months are zero-based
                    '.' +
                    date.getFullYear() +
                    ' ' +
                    (date.getHours() < 10 ? '0' : '') + date.getHours() +
                    ':' +
                    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

                    this.formatDate.push(formattedDate);
            }
        },
    },

    created() {
        this.handleView();
        window.addEventListener('resize', this.handleView);
    },

    mounted() {
        this.getFetchData();
    },
}

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
    font-size: 24px;
    font-weight: bold;
    margin-top: 60px;
    color: #182C62;

    }
    .tables {
    border-color: #E4EDF2;
    width: 100%;
    height: 40px;
    background-color: #E4EDF2;
    
    }
    .tablesBis {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-spacing: 0px;
    color:#4B5C68;
        .tr {
            background-color:  #F6F7F7;
        }
        .formatDate {
            font-size: 14px;
            font-weight: normal;
            width: 10%;
            text-align: right;
        }
        .stadium {
            font-size: 14px;
            font-weight: normal;
            padding-left: 10%;
            text-align: left;
        }
        .countries {
            width: 53px;
            height: 37px;
            margin-left: 10px;
            margin-top: 15px;
        }
    }

    .tableHeader {
    font-size: 12px;
    color:#4B5C68;
    font-weight: none;
    &.homeS {
        width: 50%; 
        text-align: right; 
        padding-right: 10%;
    }
    &.homeA {
        width: 50%; 
        text-align: left; 
        padding-left: 10%;
    }
    td {
        text-align: right;
    }
}
}
@media  screen and (min-width: 1049px) 
 {
.containerBody
.tablesBis
    .formatDate {
        font-size: 14px;
        font-weight: normal;
        width: 8%;
        text-align: right;
        color:#4B5C68;
    }
}
</style>