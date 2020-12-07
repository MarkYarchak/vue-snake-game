<template>
  <div :style="game.styles" class="Game">
    <div class="GameActionsBar">
      <div class="TrophyIcon">
        <i class="nes-icon is-large trophy no-margin" />
      </div>

      <span class="nes-text middle-nes-text">{{ game.score }}</span>

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
          class="nes-btn is-warning"
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

    <div :style="game.boardStyles" class="GameBoard">
      <MatrixRow
        v-for="(matrixRow, idx) of game.matrix"
        :key="idx"
        :cells="matrixRow"
        :cell-size="100 / game.matrixSize"
        :row-index="idx"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MatrixRow from '../MatrixRow/MatrixRow.vue';
import { Game } from '@/services/game/Game';
import {
  createNewGame,
  pauseGameProcess,
  resumeGameProcess,
  restartGame
} from '@/services/game/game.service';

export default {
  components: {
    MatrixRow,
  },
  setup() {
    const applyGameSetting = () => {
      // TODO: apply settings from dialog
      resumeGameProcess();
    };
    const onSettingsClick = () => {
      pauseGameProcess();
    };

    const game: Game = createNewGame();

    return {
      game: game,
      applyGameSetting,
      onSettingsClick,
      restartGame,
      resumeGameProcess,
    };
  },
};
</script>

<style scoped>
  .Game {}

  .GameActionsBar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
    background-color: skyblue;
    border-bottom: 1px solid black;
  }

  .GameBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: dodgerblue;
    border: 1px solid black;
  }

  .TrophyIcon {
    display: flex;
    height: 64px;
    width: 84px;
    padding-left: 5px;
  }

  .TrophyIcon i {
    max-height: 64px!important;
    max-width: 64px!important;
  }

  .middle-nes-text {
    font-size: 33px;
  }

  @media screen and (max-width: 800px) {
    .Game {
      zoom: 60%;
    }
  }

  @media screen and (max-width: 600px) {
    .Game {
      zoom: 44%;
    }
  }
</style>
