<template>
  <div class="nes-field">
    <label htmlFor="speed_select">Speed</label>
    <div class="nes-select is-primary">
      <select
        id="speed_select"
        :defaultValue="1"
        required
      >
        <option
          v-for="(speed, sIdx) of dummySpeedList"
          :key="sIdx"
          :value="speed"
        >
          {{ speed }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import { DummySpeed } from '@/services/dummy/Dummy';

defineModel();

const dummySpeedList: string[] = Object.keys(DummySpeed).filter(s => !Number(s));
</script>
