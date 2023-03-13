<template>
     <div class="contenedor-detalle"  v-if="serie">
      <div class="imagen-fondo" :style="{backgroundImage: 'url(' + backgroundImageUrl + ')'}"></div>
    <div class="detalle-serie">
      <div class="img-container">
        <img class="img-serie" :src="'https://image.tmdb.org/t/p/w300' + serie.poster_path" :alt="serie.name" />
      </div>
      <div class="info-container">
        <h1>{{ serie.name }}</h1>
        <div class="rating-container">
          <div class="rating">
            <span>{{ serie.vote_average }}</span>
          </div>
          <div class="estreno">
            <span>{{ serie.first_air_date }}</span>
          </div>
        </div>
        <div class="description-container">
          <h2>Sinopsis</h2>
          <p>{{ serie.overview }}</p>
        </div>
        <div class="details-container">
          <div class="genre">
            <span> {{ serie.genres.map(genre => genre.name).join(" ") }}</span>
          </div>
          <div class="temporadas">
            <span>Temporadas: {{ serie.number_of_seasons }}</span>
          </div>
          <div class="episodios">
            <span>Episodios: {{ serie.number_of_episodes }}</span>
          </div>
          <div class="estado">
            <span>Estado: {{ serie.status }}</span>
          </div>
          <div class="pais">
            <span>País de origen: {{ serie.origin_country.join(", ") }}</span>
            
          </div>
        </div>
        <div class="trailer">
        <a href="#" class="button red" @click.prevent="reproducirTrailer()">▶ Ver Trailer</a>
      </div>
      </div>
    </div>
  </div>

  <div class="container-similares" v-if="similarSeries">
  <h2 class="titulosimilar">Series similares</h2>
  <div class="series-container titulosimilar">
    <div v-for="(serie) in displayedSeries" :key="serie.id" class="serie">
      <img v-if="serie.poster_path" :src="'https://image.tmdb.org/t/p/w185' + serie.poster_path" :alt="serie.name" />
      <div class="serie-info" v-else>
        <p>{{ serie.name }}</p>
      </div>
    </div>
  </div>
</div>
  <div v-else>
    <p>Cargando información de serie...</p>
  </div>
  <div class="boton-atras">
  <router-link to="/" class="btn-back">Volver atrás</router-link>
</div>

</template>
<script>
import axios from "axios";

export default {
  name: "DetalleSerie",
  data() {
    return {
      serie: null,
      trailer: null,
      similarSeries: null,
      seasons: null,
      baseURL: "https://image.tmdb.org/t/p/w185",
      maxSimilarSeries: 6,
      currentIndex: 0,
    };
  },
  computed: {
    backgroundImageUrl() {
      return 'https://image.tmdb.org/t/p/original' + this.serie.poster_path;
    },
    displayedSeries() {
      return this.similarSeries.slice(
        this.currentIndex,
        this.currentIndex + this.maxSimilarSeries
      );
    },
  },
  created() {
    setInterval(this.updateIndex, 4000);
  },
  methods: {
    reproducirTrailer() {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${this.serie.name}+trailer`;
  window.open(youtubeUrl, "_blank");
},
    updateIndex() {
      this.currentIndex =
        (this.currentIndex + this.maxSimilarSeries) % this.similarSeries.length;
    },

    obtenerSeriesSimilares() {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${this.$route.params.id}/similar`,
          {
            params: {
              api_key: "c6aeee577586ba38e487b74dfede5deb"
            }
          }
        )
        .then(response => {
          this.similarSeries = response.data.results.filter(
            serie => serie.poster_path
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}`, {
        params: {
          api_key: "c6aeee577586ba38e487b74dfede5deb"
        }
      })
      .then(response => {
        this.serie = response.data;
        this.obtenerSeriesSimilares();
      })
      .catch(error => {
        console.log(error);
      });
      
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${this.$route.params.id}/similar`,
        {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb"
          }
        }
      )
      .then(response => {
        this.similarSeries = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
/* Serie e Informacion de la Serie */
.contenedor-detalle  {
  display: flex;
  justify-content: center;
}

.detalle-serie {
  display: flex;
  width: 80%;
  margin: 0 auto;
  color: white;
  margin-top: 150px;
}

.img-container {
  width: 30%;
  height: auto;
  margin-right: 20px;
 
  
}

.img-serie {
  width: 100%;
  height: auto;
  border-radius: 10px;
  filter:brightness(70%);
}
.img-serie:hover {
  filter:none;
}

.info-container {
  width: 70%;
}

.rating-container {
  display: flex;
  margin-bottom: 20px;
}

.rating {
  background-color: #ff4545;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 20px;
  margin-top: 5px;
}

.rating span {
  font-weight: bold;
}
.estreno{
  margin-top: 25px;
}
.estreno span {
  font-size: 16px;
}

.description-container {
  margin-bottom: 20px;
}

.description-container h2 {
  margin-bottom: 10px;
}

.details-container {
  display: flex;
  flex-wrap: wrap;
}

.details-container div {
  margin-right: 30px;
  margin-bottom: 10px;
}

.genre span,
.temporadas span,
.episodios span,
.estado span,
.compania span,
.pais span {
  font-size: 16px;
  font-weight: bold;
}
/* Botones */
.boton-atras{
display: flex;
justify-content: center;
}
.trailer{
  display: flex;
  justify-content: center;
}
.btn-back {
  background-color: #f05050; 
 border-radius: 29px; 
 border: 1px solid #081F2D; 
 color: white; 
 font-size: 15px; 
padding: 10px 45px; 
 cursor: pointer; 
 transition: 0.3s; 
 text-decoration: none;
}
.btn-back:hover {
  background-color: #ff0000; 
  transition: 0.3s; 
}
/* Series Similares*/
.series-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  text-align: center;
 
}

.serie {
  margin: 2rem;
  width: 100%; 
  max-width: 150px; 
}

.imagen-fondo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(5px);
  opacity: 0.8;
  z-index: -1;
}

.imagen-fondo::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7));
  z-index: 1;
}

.imagen-fondo::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: -1;
}
.container-similares{
  margin-top: 100px;
}
.titulosimilar{
  text-align: center;
  color: white;
}
/* Media Query*/
@media (max-width: 900px) {
  .img-serie {
 display: none;
}

.description-container{
  display: none;
}
.container-similares{
  margin-top: 100px;
  
}
}
@media (max-width: 960px) {
.container-similares{
  margin-top: 250px;
  
}
}
@media (min-width: 1900px) {
  .container-similares{
  margin-top: 200px;
  
}
}
</style>
