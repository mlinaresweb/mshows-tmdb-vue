<template>
    <footer>
      <div class="container">
        <div class="logo">
          <img src="../assets/mshows.png" alt="Mshows" />
        </div>
        <div class="social">
          <a href="https://github.com/mlinaresweb" target="_blank">
            <img src="../assets/github.png" alt="Icono GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/manellinares/" target="_blank">
            <img src="../assets/linkedin.png" alt="Icono LinkedIn" />
          </a>
        </div>
      </div>
      <div class="rights">
        © Manel Linares 2023, Todos los derechos reservados.
        <br />
        Hecho con <img src="../assets/vue.png" alt="Icono Vue.js" />
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterView',
    data() {
      return {
        info: 'Información adicional del footer',
      };
    },
  };
  </script>
  
  <style scoped>
footer {
  background-image: linear-gradient(to top, #1a1a1a, #000);
  color: #fff;
  padding: 50px 0;
  font-size: 1rem;
  text-align: center;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo img {
  width: 200px;
  height: auto;
}

.social a {
  margin-right: 20px;
  transition: all 0.2s ease-in-out;
}

.social a img {
  width: 30px;
  height: 30px;
}

.social a:hover img {
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .social a {
    margin: 0 10px;
    margin-bottom: 20px;
  }

  .social a:last-child {
    margin-bottom: 0;
  }
}
  </style>