<template>
  <div class="Game">
    <GameActionsBar :game="game" />
    <GameBoard :game="game" />
    <GameFooter />
  </div>
</template>

<script setup lang="ts">
import { createNewGame, game } from '@/services/game/game.service';
import GameActionsBar from './GameActionsBar.vue';
import GameBoard from './GameBoard.vue';
import GameFooter from './GameFooter.vue';

createNewGame();
</script>

<style scoped>
@media screen and (max-width: 800px) {
  .Game {
    zoom: 60%;
  }
}
@media screen and (max-width: 600px) {
  .Game {
    zoom: 44%;
  }
}
</style>
