<template>
  <div
    :style="{ width: size + '%', backgroundColor: cellBgColor }"
    class="MatrixCell"
  >
    <div
      v-if="cell.content === CellType.Dummy"
      class="DummyContent"
      :style="dummyPartStyles"
    />
    <i
      v-else-if="cell.content === CellType.Food"
      class="pulse-animation"
      :class="game.food.classes"
      :style="game.food.styles"
      style="font-size: 26px"
    />
  </div>
</template>

<script lang="ts">
  import {computed, reactive} from 'vue';
  import {CellType, GrassColor, MatrixPosition} from '@/services/game/matrix.service';
  import {game} from '@/services/game/game.service';
  import {DummyTurn} from '@/services/dummy/Dummy';

interface Props {
  cell: {
    content: CellType;
    position: MatrixPosition;
  };
  size: number;
}

// TODO: for food cell type add transition
// TODO: for dummy cell type add transition and leave side type effect

export default {
  props: {
    cell: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props) {
    const positions: MatrixPosition[] = reactive(game.dummy.positions);
    const position: MatrixPosition = reactive(props.cell.position);

    const computedCellColor = computed(() => {
      try {
        const isOdd = (position.row + position.column) % 2 === 0;
        return isOdd ? GrassColor.Dark : GrassColor.Light;
      } catch (e) {
        return GrassColor.Red;
      }
    });

    const cellBgColor: GrassColor = computedCellColor.value;

    function getDummyPartStyles(): object {
      if (props.cell.content !== CellType.Dummy) return {};

      const positionIndex: number = positions
        .findIndex(p => p.row === position.row && p.column === position.column);

      const closestFrontPosition: MatrixPosition = positions[positionIndex + 1];
      const closestBackPosition: MatrixPosition = positions[positionIndex - 1];

      const closestPositions = [closestFrontPosition, closestBackPosition];
      if (isDummyLimb(closestPositions)) {
        // TODO: if is front limb set brs to (for example) 0 0 50% 50%
        // else if back limb set opposite brs

        return {};
      }

      let dummyPartBorderRadius = '';

      switch (true) {
        case checkTurn(DummyTurn.TopLeft, closestPositions): dummyPartBorderRadius = '0 0 50% 0'; break;
        case checkTurn(DummyTurn.TopRight, closestPositions): dummyPartBorderRadius = '0 0 0 50%'; break;
        case checkTurn(DummyTurn.RightBottom, closestPositions): dummyPartBorderRadius = '50% 0 0 0'; break;
        case checkTurn(DummyTurn.LeftBottom, closestPositions): dummyPartBorderRadius = '0 50% 0 0'; break;
        default: dummyPartBorderRadius = ''; break;
      }

      return {
        borderRadius: dummyPartBorderRadius,
      };
    }

    function isDummyLimb(closestPositions: MatrixPosition[]): boolean {
      return !(closestPositions[0] && closestPositions[1]);
    }

    function checkTurn(turn: DummyTurn, closestPositions: MatrixPosition[]): boolean {
      switch (turn) {
        case DummyTurn.TopLeft: return checkTwoSidesTurn(closestPositions, isTurnTopLeft);
        case DummyTurn.TopRight: return checkTwoSidesTurn(closestPositions, isTurnTopRight);
        case DummyTurn.RightBottom: return checkTwoSidesTurn(closestPositions, isTurnRightBottom);
        case DummyTurn.LeftBottom: return checkTwoSidesTurn(closestPositions, isTurnLeftBottom);
        default: throw new Error('Invalid turn type');
      }
    }

    function checkTwoSidesTurn(closestPositions: MatrixPosition[], checkFunc: (closestPositions: MatrixPosition[]) => boolean): boolean {
      return checkFunc(closestPositions) || checkFunc(closestPositions.reverse());
    }

    function isTurnTopLeft(closestPositions: MatrixPosition[]): boolean {
      // TODO: optimize code - take out logic to separate function
      return closestPositions[0].row === position.row - 1 && closestPositions[1].column === position.column - 1;
    }

    function isTurnTopRight(closestPositions: MatrixPosition[]): boolean {
      return closestPositions[0].row === position.row - 1 && closestPositions[1].column === position.column + 1;
    }

    function isTurnRightBottom(closestPositions: MatrixPosition[]): boolean {
      return closestPositions[0].row === position.row + 1 && closestPositions[1].column === position.column + 1;
    }

    function isTurnLeftBottom(closestPositions: MatrixPosition[]): boolean {
      return closestPositions[0].row === position.row + 1 && closestPositions[1].column === position.column - 1;
    }

    const dummyPartStyles = computed(() => getDummyPartStyles());

    return {
      dummyPartStyles,
      cellBgColor,
      CellType,
      game,
    };
  },
};
</script>

<style scoped>
  .MatrixCell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .DummyContent {
    width: 100%;
    height: 100%;
    background-color: royalblue;
    /*transition: 0.2s;*/
  }
</style>
