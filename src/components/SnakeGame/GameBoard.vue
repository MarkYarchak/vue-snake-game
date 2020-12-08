<template>
  <div :style="game.boardStyles" class="GameBoard">
    <MatrixRow
      v-for="(matrixRow, idx) of game.matrix"
      :key="idx"
      :cells="matrixRow"
      :cell-size="100 / game.matrixSize"
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

  .GameBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: dodgerblue;
    border: 1px solid black;
  }

</style>
