<template>
  <div class="nes-field">
    <label>Use sounds</label>

    <div>
      <label>
        <input
          :checked="modelValue"
          type="radio"
          name="answer"
          class="nes-radio"
          @change="modelValue = true"
        />
        <span>Yes</span>
      </label>
      <label class="ml-2">
        <input
          :checked="!modelValue"
          type="radio"
          name="answer"
          class="nes-radio"
          @change="modelValue = false"
        />
        <span>No</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const modelValue = defineModel({
  type: Boolean,
  default: false,
});
</script>
