<template>
    <div>
      <h1>Panel de Organizador</h1>
      <p>Bienvenido, aquí puedes gestionar tus eventos.</p>
  
      <!-- Botón para cerrar sesión -->
      <button @click="logout">Cerrar sesión</button>
  
      <!-- Formulario para crear eventos -->
      <h2>Crear nuevo evento</h2>
      <form @submit.prevent="createEvent">
        <input v-model="newEvent.name" type="text" placeholder="Nombre del evento" required />
        <input v-model="newEvent.date" type="date" required />
        <input v-model="newEvent.location" type="text" placeholder="Ubicación" required />
        <textarea v-model="newEvent.description" placeholder="Descripción"></textarea>
        <button type="submit">Crear Evento</button>
      </form>
  
      <!-- Lista de eventos creados -->
      <div v-if="events.length">
        <h2>Eventos creados</h2>
        <ul>
          <li v-for="event in events" :key="event._id">
            <strong>{{ event.name }}</strong> - {{ event.date }} - {{ event.location }}
            <p>{{ event.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newEvent: { name: "", date: "", location: "", description: "" },
        events: []
      };
    },
    methods: {
      async createEvent() {
        try {
          const token = localStorage.getItem("token"); // Recupera el token
          const response = await axios.post("http://localhost:3000/api/events", this.newEvent, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.events.push(response.data);
          alert("Evento creado con éxito");
        } catch (error) {
          console.error("Error al crear evento:", error);
          alert("No se pudo crear el evento");
        }
      },
      async fetchEvents() {
        try {
          const response = await axios.get("http://localhost:3000/api/events");
          this.events = response.data;
        } catch (error) {
          console.error("Error al obtener eventos:", error);
        }
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.$router.push("/login");
      }
    },
    mounted() {
      this.fetchEvents();
    }
  };
  </script>
  
  <style>
  h1 {
    color: #42b883;
    text-align: center;
  }
  button {
    background-color: #42b883;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    margin: 10px;
  }
  </style>
  