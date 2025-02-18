<template>
    <div>
      <h2>Mis eventos apuntados</h2>
      <ul v-if="misEventos.length">
        <li v-for="evento in misEventos" :key="evento._id">
          <strong>{{ evento.name }}</strong> - {{ evento.date }} - {{ evento.location }}
          <p>{{ evento.description }}</p>
        </li>
      </ul>
      <p v-else>No te has apuntado a ningún evento aún.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        misEventos: [],
      };
    },
    async mounted() {
      try {
        const response = await fetch("http://localhost:3000/api/users/mis-eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar el token de autenticación
          },
        });
  
        if (response.ok) {
          this.misEventos = await response.json();
        } else {
          console.error("Error al obtener eventos apuntados");
        }
      } catch (error) {
        console.error("Error al cargar eventos apuntados:", error);
      }
    },
  };
  </script>
  