<template>
  <div class="filtro-generos" :class="{'abierto': menuAbierto}">
    <h2 @click="toggleMenu">Filtrar Por Género:</h2>
    <div class="generos">
      <button v-for="genero in generos" :key="genero.id" @click="seleccionarGenero(genero.id)">
        {{ genero.name }}
      </button>
    </div>
    <slot name="boton-reset"></slot>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FiltroGeneros",
  data() {
    return {
      generos: [],
      generoSeleccionado: null,
      menuAbierto: false
    };
  },
  mounted() {
    this.cargarGeneros();
  },
  methods: {
    cargarGeneros() {
      axios
        .get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: "c6aeee577586ba38e487b74dfede5deb"
          }
        })
        .then(response => {
          this.generos = response.data.genres;
        })
        .catch(error => {
          console.log(error);
        });
    },
    seleccionarGenero(generoId) {
      this.generoSeleccionado = generoId;
      this.$emit('filtrarSeries', this.generoSeleccionado);
      this.toggleMenu();
    },
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto;
    },
    borrarFiltros() {
      this.generoSeleccionado = null;
      this.$router.push({ path: '/series' });
    }
  }
};
</script>
<style scoped>
.filtro-generos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #07070744;
  margin-top: 80px;
}

.filtro-generos h2 {
  margin: 0;
  cursor: pointer;
  color: white;
}

.generos {
  display: none;
}

.abierto .generos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.generos button {
  margin: 5px;
  padding: 5px;
  background-color: #ee6b6b; 
  border-radius: 29px; 
 border: 1px solid #081F2D; 
 color: white; 
 font-size: 15px; 

 cursor: pointer; 
 transition: 0.3s; 
}
.generos button:hover{
  background-color: #f74c4c; 
  transition: 0.3s; 
}
</style>
