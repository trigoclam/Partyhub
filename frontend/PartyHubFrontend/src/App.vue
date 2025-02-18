<template>
  <nav>
    <router-link to="/">Inicio</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Registro</router-link>
    <router-link v-if="isAuthenticated" to="/mis-eventos">Eventos apuntados</router-link>
    <button v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
  </nav>

  <router-view />
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return localStorage.getItem("token") !== null;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push("/login");
    },
  },
};
</script>


<style>
/* Fuente moderna */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: #f4f7fc; /* Fondo suave */
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* Navbar */
.navbar {
  background: #1abc9c;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 10px;
}

.navbar a:hover {
  text-decoration: underline;
}

/* Contenedor principal */
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Botones */
button {
  background: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #2980b9;
}

/* Formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form input,
form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

form input:focus,
form textarea:focus {
  border-color: #3498db;
  outline: none;
}
</style>

