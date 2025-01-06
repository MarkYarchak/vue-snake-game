<template>
  <div class="nes-field">
    <label for="speed_select">Speed</label>
    <div class="nes-select is-primary">
      <select
        id="speed_select"
        :value="modelValue"
        :defaultValue="1"
        required
        @input="modelValue = $event.target.value"
      >
        <option
          v-for="speed of dummySpeedList"
          :key="speed"
          :value="speed"
        >
          {{ getDummySpeedName(speed) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import { getDummySpeedOptions, getDummySpeedName } from '@/services/dummy/dummy.service';

const modelValue = defineModel();

const dummySpeedList = getDummySpeedOptions();
</script>
