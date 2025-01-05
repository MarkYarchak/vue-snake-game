<template>
  <div class="nes-field">
    <label for="matrix_size_select">Cells count</label>

    <input
      id="matrix_size_select"
      v-model="modelValue"
      :min="MatrixSize.Min"
      :max="MatrixSize.Max"
      :maxlength="3"
      :class="{ 'is-error': !isValid }"
      type="number"
      placeholder="Count"
      class="nes-input is-primary"
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, defineModel } from 'vue';
import { Game } from '@/services/game/Game';
import { MatrixSize } from '@/services/game/matrix.service';

const modelValue = defineModel({
  type: [Number, String],
  default: Game.defaultSettings.matrixSize,
});

const isValid = computed(() => validateValue(modelValue.value));

function validateValue(val) {
  return val <= MatrixSize.Max && val >= MatrixSize.Min;
}
</script>
