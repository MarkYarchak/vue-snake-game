<template>
  <div class="MatrixRow" :style="{ maxHeight: cellSize + '%' }">
    <MatrixCell
      v-for="(cellContent, columnIndex) in cells"
      :key="columnIndex"
      :cell="{
        content: cellContent,
        position: { row: $props.rowIndex, column: columnIndex }
      }"
      :size="cellSize"
    />
  </div>
</template>

<script lang="ts">
import MatrixCell from '../MatrixCell/MatrixCell.vue';

export default {
  components: {
    MatrixCell,
  },
  props: {
    cells: {
      type: Array,
      required: true,
    },
    cellSize: {
      type: Number,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.MatrixRow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: orange;
}
</style>
