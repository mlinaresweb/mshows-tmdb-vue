<template>
  <div class="lista-series">
    <FiltrosGeneros @filtrarSeries="filtrarSeriesPorGenero">
      <template #boton-reset>
  <button class="button-filtros" @click="resetearFiltros" style="position: relative; padding: 10px;">
    <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <img src="../assets/basura.png" alt="Papelera" style="height: 20px;">
    </span>
  </button>
</template>
    </FiltrosGeneros>
    <div v-if="series.length > 0">
      <div class="serie-container">
        <div class="serie" v-for="serie in series" :key="serie.id" @click="irADetalle(serie.id)">
  <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" :alt="serie.name">
  <div class="serie-info">
    <h2>{{ serie.name }}</h2>
    <div class="serie-rating-year">
    <p class="year">{{ serie.first_air_date.slice(0, 4) }}</p>
    <p class="rating">{{ serie.vote_average }}/10</p>
  </div>
  </div>
</div>
      </div>
      <div v-if="totalPages > 1" class="pagination">
        <button class="izquierda" @click="irAPagina(currentPage - 1)" :disabled="currentPage === 1">Anterior 🡸</button>
        <button class="derecha" @click="irAPagina(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente 🡺 </button>
      </div>
    </div>
    <div v-else>
      <p>Cargando lista de series...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FiltrosGeneros from "./FiltrosGeneros.vue";

export default {
  name: "ListaSeries",
  data() {
    return {
      series: [],
      currentPage: 1,
      totalPages: null,
      selectedGenres: []
    };
  },
  mounted() {
    this.cargarSeries();
  },
  methods: {
    cargarSeries() {
      axios
        .get("https://api.themoviedb.org/3/tv/popular", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb",
            page: this.currentPage
          }
        })
        .then(response => {
          this.series = response.data.results;
          this.totalPages = response.data.total_pages;
        })
        .catch(error => {
          console.log(error);
        });
    },
    irADetalle(id) {
      this.$router.push({ name: "DetalleSerie", params: { id } });
    },
    irAPagina(pageNumber) {
      this.currentPage = pageNumber;
      this.series = [];
      this.cargarSeries();
    },
    filtrarSeriesPorGenero(generoId) {
      axios
        .get("https://api.themoviedb.org/3/discover/tv", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb",
            with_genres: generoId
          }
        })
        .then(response => {
          this.series = response.data.results;
          this.totalPages = 1;
          this.currentPage = 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetearFiltros() {
      this.cargarSeries();
    }
  },
  components: { FiltrosGeneros }
};
</script>

<style scoped>
.lista-series {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.serie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  position: relative;
}

.serie {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 10px; 
  width: calc((100% - 80px) / 6); 
  max-width: calc((100% - 80px) / 4);
  margin-top: 40px;
}

.serie img {
  width: 100%; 
  height: auto;
  object-fit: cover; 
}

.serie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.serie:hover .serie-info {
  opacity: 1;
}

.serie-info h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.serie-info p {
  margin: 5px 0 0;
  font-size: 14px;
}

.serie-info .year {
  font-weight: 400;
}

.serie-info .rating {
  font-weight: 400;
  font-size: 16px;
}
.serie-rating-year{
  display: flex;
  justify-content: space-between;
}
.pagination {
  display: flex;
  justify-content: space-between;
  margin: 5px  10px;
  
 
}
.pagination > button{
 
 background-color: #f05050; 
 border-radius: 29px; 
 border: 1px solid #081F2D; 
 color: white; 
 font-size: 15px; 
padding: 10px 45px; 
 cursor: pointer; 
 transition: 0.3s; 
}
.pagination >button:hover{
  background-color: #ff0000; 
  transition: 0.3s; 
}
.izquierda{
  margin-left: 55px;
}
.derecha{
  margin-right: 55px;
}
.button-filtros{
 
  background-color: black; 
  border: none;
  cursor: pointer;
}
.button-filtros:hover{
  background-color: white;
}
.serie:hover{
  transform: scale(1.2) rotateY(360deg);
  animation: rotate-360 1.1s;
  transform-origin: center;
  filter: none;
  opacity: 0.8;
  
}
.serie img:hover {
  filter: none;
  
}
@keyframes rotate-360 {
  from {
    transform: scale(1.2) rotateY(0deg);
  }
  to {
    transform: scale(1.2) rotateY(360deg);
  }
}
@media (max-width: 1024px) {
  .serie {
    width: calc((100% - 60px) / 4); 
    max-width: calc((100% - 60px) / 3); 
  }
}

@media (max-width: 768px) {
  .serie {
    width: calc((100% - 40px) / 3); 
    max-width: calc((100% - 40px) / 2); 
  }
}

@media (max-width: 480px) {
  .serie {
    width: calc((100% - 20px) / 2); 
    max-width: 100%;
}
}
@media (min-width: 1900px) {
  .izquierda{
  margin-left: 95px;
}
.derecha{
  margin-right: 95px;
}
}
</style>