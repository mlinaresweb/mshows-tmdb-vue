<template>
  
      <header>
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">
      <img  class="logo" src="../assets/mshows.png" alt="Logo" />
    </router-link>
      <div class="navbar-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/series">Series</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
      <div class="search">
      <SearchBar></SearchBar>
    </div>
    </nav>
  </header>
     
  </template>
  
    <script>

    import SearchBar from "./Search.vue";
    export default {
      name: "NavBar",
      components: { SearchBar }
    };

    </script>
    
    
    <style scoped>

  .navbar {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    margin-top: 10px;
    background-color: #f8f4f300;
    
  }
  
  .navbar-brand {
    
    height: 50px;
    margin-left: 20px;
  }
  .logo{
    height: 50px;
    margin-left: 40px;
  }
  .navbar-menu {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .navbar-menu ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .navbar-menu li {
    margin: 0 10px;
  }
  
  .navbar-menu a {
    color: #fff;
    text-decoration: none;
  }
  
  .navbar-menu a:hover {
    color: #f34040;
    text-decoration: underline;
  }
  .navbar-search {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  
  .navbar-search input[type="text"] {
    padding: 5px;
    border: none;
    border-radius: 5px;
  }
  
  .navbar-search button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f44336;
    color: #fff;
    cursor: pointer;
  }
  .search{
    justify-self: center;
    margin-right: 15px;
  }
  @media (max-width: 624px) {
   
  
    .navbar-brand {
     display: none;
    }
  
    .navbar-search input[type="text"] {
    padding: 4px;
    border: none;
    border-radius: 5px;
  }
    .navbar-menu li {
      margin: 10px 5px;
    }
    .navbar-search button {
    margin-left: 5px;
    padding: 3px 8px;
    
    
  }
  }
  
  
  
  
  </style>