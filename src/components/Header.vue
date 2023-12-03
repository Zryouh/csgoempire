<template>
     <nav id="navbar-fixed" class="navbar-fixed">
      <div id="nav_extended" class="nav_extended generale">
        <div class="nav-wrapper">
          <div class="container">
            <div class="container_logo_left">
              <img
                src="../../public/images/logo.svg"
                class="logo"
                alt="img"
                @click="this.$router.push('/')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container_logo_right">
        <img
        src="../../public/images/schedule.png"
        class="logoLeft"
        alt="img"
        @click="this.$router.push({ path: '/schedule' })"
        />
        <h3 class="menu">Schedule</h3>

        <img
        src="../../public/images/leaderboard.png"
        class="logoLeft"
        alt="img"
        @click="this.$router.push('/leaderboard')"
        />
        <h3 class="menu">Leaderboard</h3>
      </div>
    </nav>
</template>

<script>
export default {
    name:'Header',
}

</script>

<style>
 #navbar-fixed {
    width: 100%;
    height: 60px;
    background-color: #025FEB;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .container_logo_left {
      margin-left: 40px;
      cursor: pointer;

      .logo {
        width: 110px; 
        cursor: pointer;
      }
    }
    .container_logo_right {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .logoLeft {
      height: 25px;
    }
    .menu {
      color:#FFFFFF ;
      font-size: 16px;
      margin-right: 40px;
      margin-left: 5px;

    }
  }
</style>