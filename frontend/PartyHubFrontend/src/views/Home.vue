<template>
    <div>
      <h1>Bienvenido a PartyHub</h1>
  
      <!-- Botón para cargar eventos -->
      <button @click="fetchEvents">Cargar eventos</button>
  
      <!-- Mostrar formulario solo si el usuario es "organizer" -->
      <div v-if="role === 'organizer'">
        <h2>Crear nuevo evento:</h2>
        <form @submit.prevent="createEvent">
          <input v-model="newEvent.name" type="text" placeholder="Nombre del evento" required />
          <input v-model="newEvent.date" type="date" required />
          <input v-model="newEvent.location" type="text" placeholder="Ubicación" required />
          <textarea v-model="newEvent.description" placeholder="Descripción"></textarea>
          <button type="submit">Crear evento</button>
        </form>
      </div>
  
      <!-- Mostrar mensaje de éxito/error -->
      <p v-if="message" :class="{ error: isError }">{{ message }}</p>
  
      <!-- Lista de eventos disponibles -->
      <h2>Lista de eventos:</h2>
      <ul>
        <li v-for="event in events" :key="event._id">
          <strong>{{ event.name }}</strong> - {{ event.date }} - {{ event.location }}
          <p>{{ event.description }}</p>
          <button v-if="role === 'user'" @click="joinEvent(event._id)">Apuntarse</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [],
        newEvent: {
          name: "",
          date: "",
          location: "",
          description: ""
        },
        message: "",
        isError: false,
        role: localStorage.getItem('role') || 'user' // Obtener el rol del usuario desde localStorage
      };
    },
    mounted() {
      this.fetchEvents(); // Cargar eventos al montar la vista
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await fetch("http://localhost:3000/api/events");
          this.events = await response.json();
        } catch (error) {
          console.error("Error al cargar eventos:", error);
        }
      },
      async createEvent() {
        if (this.role !== 'organizer') return; // Solo organizadores pueden crear eventos
  
        try {
          const response = await fetch("http://localhost:3000/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.newEvent)
          });
  
          if (response.ok) {
            const createdEvent = await response.json();
            this.events.push(createdEvent);
            this.message = "Evento creado con éxito!";
            this.isError = false;
            this.newEvent = { name: "", date: "", location: "", description: "" };
          } else {
            this.message = "Error al crear el evento.";
            this.isError = true;
          }
        } catch (error) {
          console.error("Error al crear evento:", error);
          this.message = "Error al crear el evento.";
          this.isError = true;
        }
      },
      async joinEvent(eventId) {
        if (this.role !== 'user') return; // Solo usuarios pueden apuntarse a eventos
  
        alert(`Te has apuntado al evento ${eventId}!`);
      }
    }
  };
  </script>
  
  <style>
  button {
    background-color: #42b883;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2c3e50;
  }
  </style>
  