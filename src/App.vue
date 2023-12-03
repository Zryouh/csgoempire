<template>
  <section>
    <div>
      <Header></Header>
    </div>
  </section>
  <router-view />
  <section>
      <div>
        <Footer></Footer>
      </div>
  </section>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },

}
</script>

<style>
@import "./index.css";

@font-face {
  font-family: "Open sans", "sans-serif";
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
