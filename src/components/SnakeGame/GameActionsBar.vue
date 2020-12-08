<template>
  <div class="GameActionsBar">
    <div class="d-flex align-center ml-1">
      <div class="Icon">
        <i class="nes-icon is-large trophy no-margin" />
      </div>
      <span class="nes-text middle-nes-text CounterText">{{ game.maxScore }}</span>
    </div>

    <div class="d-flex align-center ml-2">
      <div class="Icon">
        <i class="nes-icon is-large star no-margin" />
      </div>
      <span class="nes-text middle-nes-text CounterText">{{ game.score }}</span>
    </div>

    <div style="flex-grow: 1" />

    <button
      type="button"
      class="nes-btn is-error"
      style="height: 50px"
      @click="restartGame"
    >
      Restart game
    </button>

    <section>
      <button
        type="button"
        class="nes-btn"
        :class="isRunningGame ? 'is-disabled' : 'is-warning'"
        style="height: 50px; margin-left: 10px"
        @click="onSettingsClick"
      >
        Pause
      </button>

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
    </section>
  </div>
</template>

<script>
import {
  pauseGameProcess,
  resumeGameProcess,
  restartGame
} from '@/services/game/game.service';

export default {
  name: 'GameActionsBar',
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
    const onSettingsClick = () => {
      pauseGameProcess();
    };

    return {
      isRunningGame: false, // TODO: replace with real game status
      applyGameSetting,
      onSettingsClick,
      restartGame,
      resumeGameProcess,
    };
  },
};
</script>

<style scoped>

  .GameActionsBar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
    background-color: skyblue;
    border-bottom: 1px solid black;
  }

  .GameActionsBar .Icon {
    display: flex;
    height: 64px;
    width: 74px;
    margin-right: 3px;
  }

  .GameActionsBar .Icon i {
    max-height: 64px!important;
    max-width: 64px!important;
  }

  .GameActionsBar .CounterText {
    margin-top: 8px;
    min-width: 70px;
  }

  .middle-nes-text {
    font-size: 33px;
  }

</style>
