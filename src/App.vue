<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
    <FooterView></FooterView>
  </div>
</template>

<script>
import NavBar from "./components/Nav.vue";
import FooterView from "./components/Footer.vue";
export default {
    name: "App",
    components: { NavBar, FooterView }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Secular+One&display=swap');
body {
  background-color: #000000;
  font-family: 'Roboto', sans-serif;
}
</style>

