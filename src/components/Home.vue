<template>
    <div>
      <HeaderBanner></HeaderBanner>
      <div class="home-view">

        <div class="first-row-container">
  <h1>Series en tendencia</h1>
  <div class="series-container">
    <button class="arrow prev" @click="prevSeriesTendencias">&#8249;</button>
    <button class="arrow next" @click="nextSeriesTendencias">&#8250;</button>
    <div class="serie" v-for="serie in trendingSeries" :key="serie.id" @click="irADetalle(serie.id)">
      <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" :alt="serie.name">
      <div class="serie-info">
        <h2>{{ serie.name }}</h2>
        <div class="serie-rating-year">
          <p class="year">{{ serie.first_air_date.split('-')[0] }}</p>
          <p class="rating" :class="{'green': serie.vote_average >= 7, 'yellow': serie.vote_average >= 5 && serie.vote_average < 7, 'red': serie.vote_average < 5 }">{{ serie.vote_average.toFixed(1) }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

        <h1 class="">Series de televisión populares</h1>
        <div class="series-container series-populares">
          <button class="arrow prev" @click="prevSeriesPopular">&#8249;</button>
          <button class="arrow next" @click="nextSeriesPopular">&#8250;</button>
          <div class="serie" v-for="serie in series" :key="serie.id" @click="irADetalle(serie.id)">
            <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" :alt="serie.name">
            <div class="serie-info">
        <h2>{{ serie.name }}</h2>
        <div class="serie-rating-year">
          <p class="year">{{ serie.first_air_date.split('-')[0] }}</p>
          <p class="rating" :class="{'green': serie.vote_average >= 7, 'yellow': serie.vote_average >= 5 && serie.vote_average < 7, 'red': serie.vote_average < 5 }">{{ serie.vote_average.toFixed(1) }}</p>
        </div>
      </div>
          </div>
        </div>

        <h1>Series mejor Valoradas</h1>
        <div class="series-container">
          <button class="arrow prev" @click="prevSeriesValoradas">&#8249;</button>
          <button class="arrow next" @click="prevSeriesValoradas">&#8250;</button>
          <div class="serie" v-for="serie in topRatedSeries" :key="serie.id" @click="irADetalle(serie.id)">
            <img :src="'https://image.tmdb.org/t/p/w200' + serie.poster_path" :alt="serie.name">
              <div class="serie-info">
        <h2>{{ serie.name }}</h2>
        <div class="serie-rating-year">
          <p class="year">{{ serie.first_air_date.split('-')[0] }}</p>
          <p class="rating" :class="{'green': serie.vote_average >= 7, 'yellow': serie.vote_average >= 5 && serie.vote_average < 7, 'red': serie.vote_average < 5 }">{{ serie.vote_average.toFixed(1) }}</p>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import HeaderBanner from "./Header.vue";
  
  export default {
  name: "HomeView",
  data() {
    return {
      series: [],
      trendingSeries: [],
      topRatedSeries: [],
      currentPage: 1,
      totalPages: null,
    };
  },
  mounted() {
    this.cargarSeries();
    this.cargarSeriesTendencia();
    this.cargarSeriesMejorValoradas();
  },
  methods: {
    //Series Populares
    cargarSeries() {
      axios
        .get("https://api.themoviedb.org/3/tv/popular", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb",
            page: 1,
          },
        })
        .then((response) => {
          this.series = response.data.results.slice(0, 9);
          this.totalPages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prevSeriesPopular() {
    this.series.unshift(this.series.pop());
  },
  nextSeriesPopular() {
    this.series.push(this.series.shift());
  },
  //Series Tendencia
    cargarSeriesTendencia() {
      axios
        .get("https://api.themoviedb.org/3/trending/tv/week", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb",
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.trendingSeries = response.data.results.slice(0, 9);
          this.totalPages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prevSeriesTendencias() {
    this.trendingSeries.unshift(this.trendingSeries.pop());
  },
  nextSeriesTendencias() {
    this.trendingSeries.push(this.trendingSeries.shift());
  },
  //Series Mejor Valoradas
    cargarSeriesMejorValoradas() {
      axios
        .get("https://api.themoviedb.org/3/tv/top_rated", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb",
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.topRatedSeries = response.data.results.slice(0, 9);
          this.totalPages = response.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prevSeriesValoradas() {
    this.topRatedSeries.unshift(this.topRatedSeries.pop());
  },
  nextSeriesValoradas() {
    this.topRatedSeries.push(this.topRatedSeries.shift());
  },
  // ir al detalle de la serie
    irADetalle(id) {
      this.$router.push({ name: "DetalleSerie", params: { id } });
    },
   
  },
  components: { HeaderBanner },
};
</script>
<style scoped>
.home-view {
  max-width: 1920px;
  margin: 0 auto;
}
.arrow {
  position: absolute;
  align-self: center;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  color: rgb(255, 0, 0);
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
  border-radius: 50%;
}

.arrow:hover {
  opacity: 0.7;
}

.prev {
  left: 0;
  margin-left: 18px;

}

.next {
  right: 0;
  margin-right: 18px;
 
}
.series-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  position: relative;
}

.serie {
  position: relative;
  margin: 1rem;
  cursor: pointer;
  width: 100%; 
  max-width: 200px; 
  margin-bottom: 70px;
  transition: transform 0.3s ease-out;
}

.serie img {
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(80%);
  border-radius: 4%;
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

.rating.green {
  color: green;
}

.rating.yellow {
  color: yellow;
}

.rating.red {
  color: red;
}
.first-row-container {
  margin-top: 10rem;
}

h1 {
  color: white;
  margin-bottom: 0.5rem;
}
.btn-final{
  align-self: flex-end;
}
.serie:hover{
  transform: scale(1.2) rotateY(360deg);
  animation: rotate-360 1.1s;
  transform-origin: center;
  filter: none;
  
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
/* Media queries para ajustar el ancho de las series para diferentes tamaños de pantalla */
@media (max-width: 576px) {
  .arrow{
    display: none;
  }
  .serie {
    width: calc(50% - 2rem); 
  }
}

@media (min-width: 768px) {
 
  .serie {
    width: calc(33.33% - 2rem);
  }
}

@media (min-width: 992px) {
  .serie {
    width: calc(25% - 2rem); 
  }
}

@media (min-width: 1200px) {
  .serie {
    width: calc(10.5% - 2rem); 
  }
}
  @media (min-width: 1800px) {
    .first-row-container {
  margin-top: 20rem;
}
}
</style>
