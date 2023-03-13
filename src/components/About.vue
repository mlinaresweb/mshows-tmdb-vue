<template>
  <div class="about-container">
    <div class="logo">
    <img src="../assets/mshows.png" alt="">
  </div>
    <p class="about-description">
      Esta página utiliza la API de <a href="https://www.themoviedb.org/" target="_blank">TMDB</a> para mostrar información de películas y series. TMDB es una base de datos en línea de información relacionada con  programas de televisión, elenco, equipo de producción, rating de las series y una infinidad de informacion adicional.
    </p>
    <p class="about-description">
      La página fue creada utilizando Vue.js. Fue desarrollada por Manel Linares.
    </p>
    <div class="about-social social">
      <a href="https://github.com/mlinaresweb" target="_blank">
            <img src="../assets/github.png" alt="Icono GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/manellinares/" target="_blank">
            <img src="../assets/linkedin.png" alt="Icono LinkedIn" />
          </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #fff;
  padding: 80px;
  text-align: center;
  font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  height: 100vh;
}

.about-description {
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 20px;
}

.about-social {
  margin-top: 40px;
  font-size: 30px;
}

.about-social a {
  margin-right: 20px;
  color: #fff;
}

.about-social a:hover {
  color: #e50914;
}

.tmdb-logo {
  height: 50px;
  margin-bottom: 30px;
}

.social a {
  margin-right: 20px;
  transition: all 0.2s ease-in-out;
}

a{
  text-decoration: none;
  color: red;
}
.social a:hover img {
  transform: translateY(-3px);
}

.social-icon {
  height: 40px;
  margin: 0 10px;
}
@media (max-width: 768px) {
 .logo{
  display: none;
 }
}
</style>
