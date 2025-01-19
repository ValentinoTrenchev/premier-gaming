<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

const game = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/games.json');
    const data = await response.json();
    game.value = data[slug];

    if (!game.value) {
      router.push('/');
    }
  } catch (error) {
    console.error('Failed to load game data:', error);
  }
});
</script>

<template>
  <div class="game-container" v-if="game">
    <div class="game-background" :style="{ backgroundImage: `url(${game.game_background})` }">
      <div class="game-content">
        <h1>{{ game.title }}</h1>
        <div v-html="game.content"></div>
        <router-link to="/" class="back-link">Back to Lobby</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading game details...</p>
  </div>
</template>
