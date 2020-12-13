<template>
  <div :style="game.styles" class="Game">
    <GameActionsBar :game="game" />
    <GameBoard :game="game" />
  </div>
</template>

<script lang="ts">
import GameActionsBar from './GameActionsBar.vue';
import { createNewGame, game } from '@/services/game/game.service';
import GameBoard from './GameBoard.vue';

export default {
  components: {
    GameBoard,
    GameActionsBar,
  },
  setup() {
    createNewGame();
    return {
      game,
    };
  },
};
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
