<template>
  <div>
    <div class="header">
      <div class="banner-contenido">
        <div v-if="serieAleatoria" class="banner-serie">
          <img class="banner-serie-imagen" :src="'https://image.tmdb.org/t/p/w1280' + serieAleatoria.backdrop_path" />
          <div class="details">
            <h1>{{ serieAleatoria.name }}</h1>
            <div class="rating">★★★★☆</div>
            <div class="year">{{ serieAleatoria.first_air_date.substring(0, 4) }}</div>
            <div v-if="serieAleatoria && serieAleatoria.overview" class="description">{{ serieAleatoria.overview }}</div>

            <div class="buttons">
            <a href="#" class="button red" @click.prevent="reproducirTrailer()">▶ Ver Trailer</a>
            <router-link :to="{ name: 'DetalleSerie', params: { id: serieAleatoria.id } }" class="button plain">Más información</router-link>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
  import axios from "axios";
  import { RouterLink } from 'vue-router';

  export default {
    name: "HeaderBanner",
    components: {
  RouterLink,
},
    data() {
      return {
        serieAleatoria: null,
      };
    },
    mounted() {
      this.obtenerSerieAleatoria();
      setInterval(() => {
        this.obtenerSerieAleatoria();
      }, 3000); 
    },
    methods: {
      reproducirTrailer() {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${this.serieAleatoria.name}+trailer`;
  window.open(youtubeUrl, "_blank");
},
      obtenerSerieAleatoria() {
        axios
          .get("https://api.themoviedb.org/3/tv/popular", {
            params: {
              api_key: "c6aeee577586ba38e487b74dfede5deb",
            },
          })
          .then((response) => {
            const seriesPopulares = response.data.results;
            let numeroAleatorio = Math.floor(Math.random() * seriesPopulares.length);
            while (!seriesPopulares[numeroAleatorio].backdrop_path) {
              numeroAleatorio = Math.floor(Math.random() * seriesPopulares.length);
            }
            this.serieAleatoria = seriesPopulares[numeroAleatorio];
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
  
  <style>


.header {
  position: relative;
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; 
}

.banner-contenido {
  width: 100%;
  
}

.banner-serie {
  position: relative;
}

.banner-serie-imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(35%) blur(2px);
}

.banner-serie-imagen::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.details {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 50%;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;
}

.rating {
  display: inline-block;
  font-size: 22px;
  color: #ea292e;
  margin-right: 10px;
}

.year,
.seasons {
  display: inline-block;
  font-size: 20px;
  color: rgba(255, 255, 255, .9);
}

.description {
  margin-top: 20px;
  font-size: 15px;
  line-height: 26px;
  color: rgba(255, 255, 255, .95);
}

.buttons {
  margin-top: 15px;
}

.button.red {
  background-color: #ea292e;
 
  margin: 5px;
  padding:10px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size:11px;
  line-height:32px;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
}

.button.red:hover {
  background-color: rgba(255, 255, 255, 0.699);
  color: red;
}

.button.plain {
  background-color: rgba(255, 255, 255, 0.699);
  color: red;
  margin: 5px;
  padding:10px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size:11px;
  line-height:32px;
  text-transform: uppercase;
  text-decoration: none;
}

.button.plain:hover {
  background-color: #ea292e;
  color: white;
}

.banner-serie-imagen::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8));
}
@media only screen and (max-width: 1000px) {
  .header {
    height: 100%;
  }
  .banner-serie-imagen {
    height: 100%;
  }
  
}
@media (max-width: 768px) {
  .banner-serie {
    height: auto;
  }
  
  .banner-serie-imagen {
    height: 100%;
  }
  
  .details {
    width: 100%;
    padding: 0 20px;
    text-align: center;
  
  }
  
  .description {
    display: none;
  }
  .buttons{
 text-align: center;
 margin-top: 10px;
  }

}

</style>