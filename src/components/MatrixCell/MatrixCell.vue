<template>
  <div
    :style="{ width: size + '%', backgroundColor: cellBgColor, fontSize: (size * 5) + 'px'  }"
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
      style="font-size: 160%"
    />
  </div>
</template>

<script lang="ts">
  import { computed, reactive } from 'vue';
  import { CellType, GrassColor, MatrixPosition } from '@/services/game/matrix.service';
  import { game } from '@/services/game/game.service';
  import { DummyTurn } from '@/services/dummy/Dummy';

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
    const position: MatrixPosition = reactive(props.cell.position);

    const computedCellColor = computed(() => {
      const isOdd = (position.row + position.column) % 2 === 0;
      return isOdd ? GrassColor.Dark : GrassColor.Light;
    });

    const cellBgColor: GrassColor = computedCellColor.value;

    function getDummyPartStyles(): object {
      const positions: MatrixPosition[] = game.dummy.positions;

      if (props.cell.content !== CellType.Dummy) return {};

      const positionIndex: number = findDummyPartIndex(positions, position);
      const closestFrontPosition: MatrixPosition = positions[positionIndex - 1];
      const closestBackPosition: MatrixPosition = positions[positionIndex + 1];
      const closestPositions = [closestFrontPosition, closestBackPosition];

      const dummyPartBorderRadius: string = isDummyLimb(closestPositions)
        ? calcLimbBorderRadius(closestFrontPosition || closestBackPosition)
        : calcTurnBorderRadius(closestPositions);

      return {
        borderRadius: dummyPartBorderRadius,
        // animationName: positionIndex === 0 ? 'slideInLeft' : positionIndex === positions.length - 1 ? 'slideOutRight' : 'none',
      };
    }

    function findDummyPartIndex(positions: MatrixPosition[], { row, column }: MatrixPosition): number {
      return positions.findIndex(p => p.row === row && p.column === column);
    }

    function isDummyLimb(closestPositions: MatrixPosition[]): boolean {
      return !closestPositions[0] || !closestPositions[1];
    }

    function calcLimbBorderRadius(closestPosition: MatrixPosition): string {
      switch (true) {
        case closestPosition.row + 1 === position.row: return '0 0 50% 50%';
        case closestPosition.row - 1 === position.row: return '50% 50% 0 0';
        case closestPosition.column + 1 === position.column: return '0 50% 50% 0';
        case closestPosition.column - 1 === position.column: return '50% 0 0 50%';
        default: return '';
      }
    }

    function calcTurnBorderRadius(closestPositions: MatrixPosition[]): string {
      switch (true) {
        case checkTurn(DummyTurn.TopLeft, closestPositions): return '0 0 50% 0';
        case checkTurn(DummyTurn.TopRight, closestPositions): return '0 0 0 50%';
        case checkTurn(DummyTurn.RightBottom, closestPositions): return '50% 0 0 0';
        case checkTurn(DummyTurn.LeftBottom, closestPositions): return '0 50% 0 0';
        default: return '';
      }
    }

    function checkTurn(turn: DummyTurn, closestPositions: MatrixPosition[]): boolean {
      switch (turn) {
        case DummyTurn.TopLeft: return checkWithReverseSidesTurn(closestPositions, isTurnTopLeft);
        case DummyTurn.TopRight: return checkWithReverseSidesTurn(closestPositions, isTurnTopRight);
        case DummyTurn.RightBottom: return checkWithReverseSidesTurn(closestPositions, isTurnRightBottom);
        case DummyTurn.LeftBottom: return checkWithReverseSidesTurn(closestPositions, isTurnLeftBottom);
        default: throw new Error('Invalid turn type');
      }
    }

    function checkWithReverseSidesTurn(closestPositions: MatrixPosition[], checkFunc: (closestPositions: MatrixPosition[]) => boolean): boolean {
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
    animation-duration: 0.06s;
    animation-timing-function: linear;
  }
</style>
