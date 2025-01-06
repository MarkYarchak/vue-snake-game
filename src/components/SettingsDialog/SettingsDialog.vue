<template>
  <dialog id="dialog-rounded" class="nes-dialog is-rounded">
    <form method="dialog">
      <p class="title" style="font-size: 18px">Settings</p>

      <p class="nes-text is-primary">Best score: {{ game.maxScore }}</p>
      <DummySpeedSelect v-model="settings.dummySpeed" />
      <br>
      <MatrixSizeSelect v-model.number.trim="settings.matrixSize" />
      <br>
      <ToggleGameSoundRadio v-model="settings.useSounds" />

      <footer class="dialog-menu" style="padding: 14px 20px 0">
        <button class="nes-btn" style="margin-right: 12px" @click="onCancel">Cancel</button>
        <button
          :disabled="!isValidForm"
          :class="{ 'is-disabled': !isValidForm }"
          class="nes-btn is-primary"
          style="margin-left: 12px; padding: 6px 24px"
          @click="applyGameSetting"
        >
          Save
        </button>
      </footer>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { reactive, computed, toRaw, defineProps } from 'vue';
import { resumeGameProcess, restartGame } from '@/services/game/game.service';
import { Game } from '@/services/game/Game';
import MatrixSizeSelect from '@/components/SettingsDialog/MatrixSizeSelect.vue';
import DummySpeedSelect from '@/components/SettingsDialog/DummySpeedSelect.vue';
import ToggleGameSoundRadio from '@/components/SettingsDialog/ToggleGameSoundRadio.vue';
import { isValidMatrixLength } from '@/services/game/matrix.service';

interface Props {
  game: Game;
}
const props = defineProps<Props>();

const settings = reactive(getInitialSettings());
const isValidForm = computed(() => isValidMatrixLength(settings.matrixSize));

function applyGameSetting() {
  props.game.applySettings(toRaw(settings));
  resumeGameProcess();
  restartGame();
}

function onCancel() {
  Object.assign(settings, getInitialSettings());
  resumeGameProcess();
}

function getInitialSettings() {
  return { ...props.game.settings };
}
</script>
