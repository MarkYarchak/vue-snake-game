<template>
  <div
    :style="{ width: size + '%', backgroundColor: cellBgColor }"
    class="MatrixCell"
  >
    <div v-if="$props.cell.content === CellType.Dummy" class="DummyContent" />
    <i v-else-if="$props.cell.content === CellType.Food" class="fas fa-apple-alt" style="color: red" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { GrassColor, MatrixPosition, CellType } from '@/services/game/matrix.service';

interface Props {
  cell: {
    content: CellType;
    position: MatrixPosition;
  };
  size: number;
}

// TODO: for food cell type add animation, transition
// TODO: for dummy cell type add transition and leave side type effect

export default {
  props: {
    cell: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props) {

    const computedCellColor = computed(() => {
      const position: MatrixPosition = props.cell.position;
      const isOdd = (position.row + position.column) % 2 === 0;
      return isOdd ? GrassColor.Dark : GrassColor.Light;
    });

    const cellBgColor: GrassColor = computedCellColor.value;

    return {
      cellBgColor,
      CellType,
    };
  },
};
</script>

<style scoped>
  .MatrixCell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .DummyContent {
    width: 100%;
    height: 100%;
    background-color: royalblue;
    transition: 0.2s;
  }

  .FoodContent {
    transition: 0.3s;
  }
</style>