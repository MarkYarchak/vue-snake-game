import { CellType, fillInMatrixCell, Matrix, MatrixPosition } from '../game/matrix.service';
import { game, isNewGameProcess } from '../game/game.service';
import { FoodParams } from '@/services/food/Food';
import { playSound } from '@/utils/sound-effects';
import { LocalPath } from '@/utils/path-pointers';

export enum DummyDirection {
  Top = 'TOP_SNAKE_DIRECTION',
  Bottom = 'BOTTOM_SNAKE_DIRECTION',
  Left = 'LEFT_SNAKE_DIRECTION',
  Right = 'RIGHT_SNAKE_DIRECTION',
}

export enum DummySpeed {
  Slow = 3,
  Medium = 8,
  Fast = 15,
}

export enum DummyTurn {
  TopLeft = 'DUMMY_TURN_TOP_LEFT',
  TopRight = 'DUMMY_TURN_TOP_RIGHT',
  RightBottom = 'DUMMY_TURN_RIGHT_BOTTOM',
  LeftBottom = 'DUMMY_TURN_LEFT_BOTTOM',
}

export const OppositeDummyDirection = {
  [DummyDirection.Top]: DummyDirection.Bottom,
  [DummyDirection.Bottom]: DummyDirection.Top,
  [DummyDirection.Left]: DummyDirection.Right,
  [DummyDirection.Right]: DummyDirection.Left,
};

export interface DummyParams {
  position?: MatrixPosition;
  speed: DummySpeed;
  matrix: Matrix;
}

export interface DummyStep {
  position: MatrixPosition;
  direction: DummyDirection;
}

export class Dummy {
  private direction: DummyDirection = DummyDirection.Right;
  public positions: MatrixPosition[] = [];
  private speed: DummySpeed = DummySpeed.Medium;
  private moveInterval: number | undefined;
  public connectedMatrix!: Matrix;
  private moveDirectionActions: DummyDirection[] = [];
  public coveredSteps: DummyStep[] = [];

  constructor({ matrix, position, speed }: DummyParams) {
    this.updateConnectedMatrix(matrix);
    if (!position) position = this.defaultMatrixPosition;
    const defaultDummyPositions: MatrixPosition[] = [
      { ...position, column: position.column + 3 },
      { ...position, column: position.column + 2 },
      { ...position, column: position.column + 1 },
      { ...position },
    ];
    this.setMatrixPositions(defaultDummyPositions);
    this.setSpeed(speed);
  }

  private get defaultMatrixPosition(): MatrixPosition {
    const matrixSize = this.connectedMatrix.length;
    const centerPosition = Math.round(matrixSize / 2);
    const row = centerPosition;
    const column = Math.round(centerPosition / 2);

    return {
      row,
      column,
    };
  }

  public setMatrixPositions(positions: MatrixPosition[] = [this.defaultMatrixPosition]) {
    const tailLastPosition = this.positions[this.positions.length - 1];
    this.positions.splice(0);
    this.positions.push(...positions);
    if (!isNewGameProcess()) {
      this.connectedMatrix.forEach((matrixRow, row) =>
        matrixRow.forEach((val, column) => {
          fillInMatrixCell(
            this.connectedMatrix,
            { row, column },
            (val === CellType.Dummy) ? CellType.Empty : val
          );
        })
      );
    }

    positions.forEach((pos) => {
      const snakeHeadPosition: MatrixPosition = positions[0];
      const { row, column } = snakeHeadPosition;
      const isFoodCell: boolean = this.connectedMatrix[row][column] === CellType.Food;
      if (isFoodCell) {
        this.onEat(tailLastPosition);
      }
      fillInMatrixCell(this.connectedMatrix, pos, CellType.Dummy);
    });
  }

  public addMoveDirectionAction(direction: DummyDirection) {
    const pushLimit: number = Object.values(DummySpeed).indexOf(this.speed) + 2;
    if (this.moveDirectionActions.length <= pushLimit) {
      this.moveDirectionActions.push(direction);
    }
  }

  public onEat(newTailPosition: MatrixPosition) {
    playSound(LocalPath.EatSound);
    const foodParams: FoodParams = game.food.prepareNew();
    game.addFood(game.settings.foodType, foodParams);
    this.growUp(newTailPosition);
    game.addScore();
    // this.eatenPosition = // TODO: position for snake food eating effect
  }

  protected growUp(tailPosition: MatrixPosition) {
    this.positions.push(tailPosition);
  }

  private clearMoveDirectionActions() {
    this.moveDirectionActions.splice(0);
  }

  public setSpeed(newSpeed: DummySpeed) {
    this.speed = newSpeed;
  }

  private updateConnectedMatrix(matrix: Matrix) {
    this.connectedMatrix = matrix;
  }

  public startMoving() {
    const ONE_SECOND = 1000;
    const moveFrequency = ONE_SECOND / this.speed;
    this.moveInterval = setInterval(() => {
      if (this.moveDirectionActions.length) {
        this.moveDirectionActions.forEach((direction) => {
          this.moveOnce.call(this, direction);
        });
        this.clearMoveDirectionActions();
      } else {
        this.moveOnce.call(this);
      }
    }, moveFrequency);
  }

  public moveOnce(direction?: DummyDirection) {
    this.setDirection(direction || this.direction);
    const newPositions: MatrixPosition[] = this.calculateNextPositions();
    const headPosition = newPositions[0];
    const busySnakeTailPosition = this.isSnakeTailNextHeadPosition(newPositions);
    if (this.isForbiddenPosition(headPosition) || busySnakeTailPosition) return this.crash();
    this.setMatrixPositions(newPositions);
  }

  private calculateNextPositions(): MatrixPosition[] {
    const nextHeadPosition: MatrixPosition = this.getNextHeadPosition();
    const nextTailPositions: MatrixPosition[] = this.getNextTailPositions();
    return [nextHeadPosition, ...nextTailPositions];
  }

  private getNextHeadPosition(): MatrixPosition {
    const headPosition: MatrixPosition = { ...this.positions[0] };
    switch (this.direction) {
      case DummyDirection.Top: --headPosition.row; break;
      case DummyDirection.Bottom: ++headPosition.row; break;
      case DummyDirection.Left: --headPosition.column; break;
      case DummyDirection.Right: ++headPosition.column; break;
      default: return headPosition;
    }
    return headPosition;
  }

  private getNextTailPositions(): MatrixPosition[] {
    const nextPositions: MatrixPosition[] = [...this.positions];
    nextPositions.pop();
    return nextPositions;
  }

  private isForbiddenPosition(position: MatrixPosition): boolean {
    const matrixSize = this.connectedMatrix.length;
    return position.column >= matrixSize || position.column < 0 || position.row >= matrixSize || position.row < 0;
  }

  private isSnakeTailNextHeadPosition(newPositions: MatrixPosition[]): boolean {
    const headPosition = newPositions[0];
    const positions = newPositions.slice(1, newPositions.length);
    return positions.some(pos => pos.row === headPosition.row && pos.column === headPosition.column);
  }

  private crash() {
    playSound(LocalPath.CrashSound);
    this.stopMoving();
    game.finish();
  }

  public stopMoving() {
    if (this.moveInterval) clearInterval(this.moveInterval);
  }

  public setDirection(direction: DummyDirection) {
    if (!this.isOppositeDirection(direction)) {
      this.direction = direction;
    }
  }

  private isOppositeDirection(newDirection: DummyDirection): boolean {
    return OppositeDummyDirection[newDirection] === this.direction;
  }
}
