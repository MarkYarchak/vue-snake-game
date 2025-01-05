<template>
  <dialog id="dialog-rounded" class="nes-dialog is-rounded">
    <form method="dialog">
      <p class="title" style="font-size: 18px">Settings</p>

      <p class="nes-text is-primary">Best score: {{ game.maxScore }}</p>

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

      <br>

      <MatrixSizeSelect v-model.number.trim="matrixSize" />

      <br>

      <div>
        <label>Use sounds</label>

        <div>
          <label>
            <input type="radio" class="nes-radio" name="answer" checked />
            <span>Yes</span>
          </label>
          <label class="ml-2">
            <input type="radio" class="nes-radio" name="answer" />
            <span>No</span>
          </label>
        </div>
      </div>

      <menu class="dialog-menu" style="padding: 14px 20px 0">
        <button class="nes-btn" style="margin-right: 12px" @click="resumeGameProcess">Cancel</button>
        <button class="nes-btn is-primary" style="margin-left: 12px; padding: 6px 24px" @click="applyGameSetting">Save</button>
      </menu>
    </form>
  </dialog>
</template>

<script lang="ts">
import { ref, reactive, toRaw } from 'vue';
import { resumeGameProcess, restartGame } from '@/services/game/game.service';
import { DummySpeed } from '@/services/dummy/Dummy';
import { Game } from '@/services/game/Game';
import MatrixSizeSelect from '@/components/SettingsDialog/MatrixSizeSelect.vue';

interface Props {
  game: Game;
}

export default {
  name: 'SettingsDialog',
  components: {
    MatrixSizeSelect,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  setup(props: Props) {
    const settings = reactive({ ...props.game.settings });

    const matrixSize = ref(settings.matrixSize);

    const dummySpeedList: string[] = Object.keys(DummySpeed).filter(s => !Number(s));

    const applyGameSetting = () => {
      console.log(settings);
      settings.matrixSize = matrixSize.value;
      props.game.applySettings(toRaw(settings));
      resumeGameProcess();
      restartGame();
    };

    return {
      settings,
      matrixSize,
      dummySpeedList,
      applyGameSetting,
      resumeGameProcess,
    };
  },
};
</script>
