<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';

const games = ref([]);
const searchTerm = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/games.json');
    const data = await response.json();
    games.value = Object.values(data);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
});

const filteredGames = computed(() => {
  return games.value.filter(game =>
    game.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(() => {
  const handleKeyup = (event) => {
    if (event.key === 'Escape') {
      searchTerm.value = '';
    }
  };
  window.addEventListener('keyup', handleKeyup);

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', handleKeyup);
  });
});
</script>

<template>
  <div>
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="Search games..." aria-label="Search games" />
    </div>
    <ul class="game-list">
      <li class="game-list-item" v-for="game in filteredGames" :key="game.slug">
        <div class="game-item">
          <router-link :to="{ name: 'gameDetail', params: { slug: game.slug } }">
            <div class="thumbnail-container">
              <img class="game-thumbnail" :src="game.game_thumbnail" :alt="`Thumbnail of ${game.title}`" />
              <div class="overlay">
                <h3 class="game-title">{{ game.title }}</h3>
                <font-awesome-icon class="overlay-icon" icon="fa-circle-play" />
                <h3 class="game-title">{{ game.game_provider.name }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>