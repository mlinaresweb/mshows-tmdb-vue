<template>
    <div class="search">
      <input class="search__input" type="text" placeholder="Buscar series..." v-model="query" @input="buscarSeries">
      <div class="search"></div>
      <ul v-if="seriesFiltradas.length > 0 && !detalleVisible" :key="reload">
  <li v-for="serie in seriesFiltradas" :key="serie.id" @click="mostrarDetalle(serie.id)" @mouseover="serieSeleccionada = serie">
    <img :src="getImageUrl(serie)" alt="Imagen de la serie" style="max-width: 100px; max-height: 150px; display: block;">
    <div v-if="serieSeleccionada && serieSeleccionada.id === serie.id">
      {{ serie.name }}
    </div>
  </li>
</ul>
      <div v-if="serieSeleccionada">
        {{ serieSeleccionada.name }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchBar',
    data() {
      return {
        query: '',
        series: [],
        serieSeleccionada: null,
        detalleVisible: false,
        reload: 0
      };
    },
    
    methods: {
      buscarSeries() {
        if (this.query) { 
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params: {
              api_key: 'c6aeee577586ba38e487b74dfede5deb',
              query: this.query
            }
          })
          .then(response => {
            this.series = response.data.results;
            this.serieSeleccionada = null; 
            this.filtrarSeries(); 
            this.reload++;
          })
          .catch(error => {
            console.log(error);
          });
        }
      },
      filtrarSeries() {
        if (this.query === '' || this.detalleVisible) {
          return [];
        } else {
          return this.series.filter(serie => serie.name.toLowerCase().includes(this.query.toLowerCase())).slice(0, 3);
        }
      },
      mostrarDetalle(id) {
  this.resetearBusqueda();
  this.$router.push({ name: 'DetalleSerie', params: { id: id } });
  this.serieSeleccionada = null; 
  this.detalleVisible = false; 
  this.$emit('serie-cambiada', id);
},
      resetearBusqueda() {
        this.query = '';
        this.serieSeleccionada = null;
        this.detalleVisible = true;
        this.reload++;
      },
      getImageUrl(serie) {
        if (serie.poster_path) {
          return `https://image.tmdb.org/t/p/w185/${serie.poster_path}`;
        } else {
          return 'https://via.placeholder.com/185x278.png?text=No+disponible';
        }
      }
    },
    computed: {
      seriesFiltradas() {
        return this.filtrarSeries();
      }
    },
    
  }
  </script>
  <style scoped>
  .search {
    position: relative;
  }
  .search__input {
      background-color: transparent;
      border: none;
      border-bottom: 2px solid red;
      color: white;
      font-size: 18px;
      padding: 5px 0;
      width: 100%;
      
    }

    .search__input:focus {
      outline: none;
    }

    .search__input::placeholder {
      color: white;
    }
    /* menu desplegable series coincidencias */
  ul {
    position: absolute;
    top: 100%;
    left: 0;
    max-width: 100%;
    max-height: 550px; 
    margin: 0;
    padding: 0;
    background-color: white;
    border: 1px solid black;
    display: flex; 
    flex-direction: column; 
  }
  
  li {
    padding: 0.5rem;
    cursor: pointer;
    display: block;
    border-bottom: 1px solid black;
  }
  
  li:last-child {
    border-bottom: none;
  }
  
  li:hover {
    background-color: #ccc;
  }
  </style>