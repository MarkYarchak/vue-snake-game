<template>
  <div class="App">
    <SnakeGame />
  </div>
</template>

<script lang="ts">
import SnakeGame from './components/SnakeGame/SnakeGame.vue';

export default {
  components: {
    SnakeGame,
  },
};
</script>

<style>
  .App {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
