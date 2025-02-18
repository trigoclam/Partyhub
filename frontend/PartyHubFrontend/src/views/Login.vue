<template>
    <div class="container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    // Dentro de methods en Login.vue
    methods: {
  async login() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // Guarda el rol

        // Redirigir al usuario según su rol
        if (data.role === "organizer") {
          this.$router.push("/dashboard-organizer");
        } else if (data.role === "user") {
          this.$router.push("/dashboard-user");
        } else {
          this.$router.push("/");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  }
}



  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    width: 100%;
    padding: 10px;
  }
  </style>
  