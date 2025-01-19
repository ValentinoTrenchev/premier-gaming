<script setup>
  import { RouterLink } from 'vue-router'
  import  Logo from '../assets/premier-gaming-logo.png'
</script>

<template>
   <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo-wrapper">
        <img :src="Logo" alt="Casino Logo" class="logo" />
      </router-link>
    </div>
  </nav>
</template>