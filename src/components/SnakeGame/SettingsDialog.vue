<template>
  <dialog id="dialog-rounded" class="nes-dialog is-rounded">
    <form method="dialog">
      <p class="title" style="font-size: 18px">Settings</p>

      <p class="nes-text is-primary">Best score: {{ game.maxScore }}</p>

      <label htmlFor="success_select">Speed</label>
      <div class="nes-select is-primary">
        <select id="success_select" defaultValue="0" required>
          <option value="0">Slow</option>
          <option value="1">Medium</option>
          <option value="1">Fast</option>
        </select>
      </div>

      <menu class="dialog-menu" style="padding: 14px 20px 0">
        <button class="nes-btn" style="margin-right: 12px" @click="resumeGameProcess">Cancel</button>
        <button class="nes-btn is-primary" style="margin-left: 12px; padding: 6px 24px" @click="applyGameSetting">Save</button>
      </menu>
    </form>
  </dialog>
</template>

<script>
import { resumeGameProcess } from '@/services/game/game.service';

export default {
  name: 'SettingsDialog',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  setup() {

    const applyGameSetting = () => {
      resumeGameProcess();
    };

    return {
      applyGameSetting,
      resumeGameProcess,
    };
  },
};
</script>
