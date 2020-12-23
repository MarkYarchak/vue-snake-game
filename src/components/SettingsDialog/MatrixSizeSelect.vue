<template>
  <div class="nes-field">
    <label for="matrix_size_select">Cells count</label>

    <!--        <progress class="nes-progress is-primary" value="80" min="7" max="100"></progress>-->
    <input
      id="matrix_size_select"
      :value="value"
      placeholder="Count"
      :min="MatrixSize.Min"
      :max="MatrixSize.Max"
      type="number"
      class="nes-input is-primary"
      @keydown="onKeyDown"
    >
  </div>
</template>

<script lang="ts">
import { Game } from '@/services/game/Game';
import { MatrixSize } from '@/services/game/matrix.service';

// enum InputKey {
//   Backspace = 'Backspace',
// }

export default {
  name: 'MatrixSizeSelect',
  props: {
    value: {
      type: Number,
      default: Game.defaultSettings.matrixSize,
    },
  },
  setup() {

    function onKeyDown($event) {
      console.log($event.target.value);
      const { value: val } = $event.target;
      console.log(typeof val);
      if (val)
        console.log($event);
      const invalidVal = $event.target.value > MatrixSize.Max || $event.target.value < MatrixSize.Min;

      if (invalidVal) {
        $event.preventDefault();
      }
      return false;
    }

    return {
      MatrixSize,
      onKeyDown,
    };
  },
};
</script>
