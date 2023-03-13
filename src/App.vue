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
body {
  background-color: #000000;
  font-family:Arial, Helvetica, sans-serif;
}
</style>

