<template>
  <div class="dashboard">
    <h2>🎉 Lista de Eventos Disponibles 🎉</h2>
    <div class="events-container">
      <div v-for="event in events" :key="event._id" class="event-card">
        <h3>{{ event.name }}</h3>
        <p><strong>📅 Fecha:</strong> {{ event.date }}</p>
        <p><strong>📍 Ubicación:</strong> {{ event.location }}</p>
        <p>{{ event.description }}</p>
        <button @click="joinEvent(event._id)">Apuntarse</button>
      </div>
    </div>

    <h2>🎟️ Mis Eventos Apuntados</h2>
    <div class="events-container">
      <div v-for="event in myEvents" :key="event._id" class="event-card joined">
        <h3>{{ event.name }}</h3>
        <p><strong>📅 Fecha:</strong> {{ event.date }}</p>
        <p><strong>📍 Ubicación:</strong> {{ event.location }}</p>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        events: [],
        myEvents: []
      };
    },
    async mounted() {
      this.fetchEvents();
      this.fetchMyEvents();
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await axios.get("http://localhost:3000/api/events");
          this.events = response.data;
        } catch (error) {
          console.error("Error al cargar eventos:", error);
        }
      },
      async fetchMyEvents() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/api/my-events", {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.myEvents = response.data;
        } catch (error) {
          console.error("Error al obtener mis eventos:", error);
        }
      },
      async joinEvent(eventId) {
        try {
          const token = localStorage.getItem("token");
          await axios.post(`http://localhost:3000/api/join-event/${eventId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert("¡Te has apuntado al evento!");
          this.fetchMyEvents(); // Refrescar la lista de eventos inscritos
        } catch (error) {
          console.error("Error al apuntarse al evento:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
  }
  
  .events-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Grid responsivo */
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }
  
  .event-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    text-align: left;
  }
  
  .event-card h3 {
    margin: 0;
    color: #3498db;
  }
  
  .event-card button {
    background: #42b883;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
    transition: background 0.3s ease;
  }
  
  .event-card button:hover {
    background: #2c3e50;
  }
  
  .event-card.joined {
    background: #f0f9ff;
    border: 2px solid #3498db;
  }
  </style>
  