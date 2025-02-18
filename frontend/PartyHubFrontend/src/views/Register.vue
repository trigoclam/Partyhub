<template>
    <div class="container">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Nombre de usuario" required />
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <select v-model="role">
          <option value="user">Usuario</option>
          <option value="organizer">Organizador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <p>Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        role: 'user' ,
      };
    },
    methods: {
    async register() {
        console.log("Enviando datos:", { username: this.username, email: this.email, password: this.password, role: this.role });

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username: this.username,
                email: this.email,
                password: this.password,
                role: this.role || "user" // Forzar que se envíe un role
            });

            console.log("Respuesta del backend:", response.data);

            alert('Registro exitoso, ahora puedes iniciar sesión');
            this.$router.push('/login');
        } catch (error) {
            console.error('Error en el registro:', error.response?.data || error);
            alert('Error en el registro: ' + error.response?.data?.message);
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
  