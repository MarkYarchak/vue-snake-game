<template>
  <header class="GameActionsBar">
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
        Menu
      </button>

      <SettingsDialog :game="game" />
    </section>
  </header>
</template>

<script>
import { computed } from 'vue';
import SettingsDialog from '@/components/SettingsDialog/SettingsDialog';
import { restartGame, pauseGameProcess, game } from '@/services/game/game.service';
import { GameStatus } from '@/services/game/Game';

export default {
  name: 'GameActionsBar',
  components: {
    SettingsDialog,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  setup() {

    const isRunningGame = computed(() => game.status === GameStatus.Running);

    const onSettingsClick = () => {
      pauseGameProcess();
    };

    return {
      isRunningGame,
      restartGame,
      onSettingsClick,
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
