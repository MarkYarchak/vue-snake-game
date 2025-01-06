<template>
  <div class="GameBoard game-board">
    <MatrixRow
      v-for="(matrixRow, idx) of game.matrix"
      :key="idx"
      :cells="matrixRow"
      :cell-size="100 / game.settings.matrixSize"
      :row-index="idx"
    />
  </div>
</template>

<script>
import MatrixRow from '../MatrixRow/MatrixRow.vue';

export default {
  name: 'GameBoard',
  components: {
    MatrixRow,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.game-board {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 740px;
  background-color: dodgerblue;
  border: 1px solid black;
}
</style>
