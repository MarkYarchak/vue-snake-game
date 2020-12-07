import { CellType, fillInMatrixCell, Matrix, MatrixPosition } from '../game/matrix.service';
import { game, isNewGameProcess } from '../game/game.service';

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

export interface DummyParams {
  position?: MatrixPosition;
  speed: DummySpeed;
  matrix: Matrix;
}

export class Dummy {
  private direction: DummyDirection = DummyDirection.Right;
  public positions: MatrixPosition[] = [];
  private speed: DummySpeed = DummySpeed.Medium;
  private moveInterval: number | undefined;
  public connectedMatrix!: Matrix;

  constructor({ matrix, position, speed }: DummyParams) {
    this.updateConnectedMatrix(matrix);
    if (!position) position = this.defaultMatrixPosition;
    const defaultSnakePositions = [
      { ...position, column: position.column + 3 },
      { ...position, column: position.column + 2 },
      { ...position, column: position.column + 1 },
      { ...position },
    ];
    this.setMatrixPositions(defaultSnakePositions);
    this.setSpeed(speed);
  }

  private get defaultMatrixPosition(): MatrixPosition {
    const matrixSize = this.connectedMatrix.length;
    const centerPosition = Math.floor(Math.round(matrixSize / 2) );
    const row = centerPosition;
    const column = Math.floor(centerPosition / 2);

    return {
      row,
      column,
    };
  }

  public setMatrixPositions(positions: MatrixPosition[] = [this.defaultMatrixPosition]) {
    this.positions.splice(0);
    this.positions.push(...positions);
    if (!isNewGameProcess()) {
      this.connectedMatrix.forEach((matrixRow, row) =>
        matrixRow.forEach((val, column) =>
          fillInMatrixCell(
            this.connectedMatrix,
            { row, column },
            (val === CellType.Dummy) ? CellType.Empty : val)
        )
      );
    }

    positions.forEach((pos) => {
      fillInMatrixCell(this.connectedMatrix, pos, CellType.Dummy);
    });
  }

  public setSpeed(newSpeed: DummySpeed) {
    this.speed = newSpeed;
  }

  private updateConnectedMatrix(matrix: Matrix) {
    this.connectedMatrix = matrix;
  }

  public startMoving() {
    const moveFrequency = 1000 / this.speed;
    this.moveInterval = setInterval(this.moveOnce.bind(this), moveFrequency);
  }

  private moveOnce() {
    const newPositions: MatrixPosition[] = this.calculateNextPositions();
    const headPosition = newPositions[0];
    const busySnakeTailPosition = this.isSnakeTailNextHeadPosition(newPositions);
    if (this.isForbiddenPosition(headPosition) || busySnakeTailPosition) return game.finish();
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
    // TODO: add busy food position
    return position.column > game.matrixSize || position.column < 0 || position.row > game.matrixSize || position.row < 0;
  }

  private isSnakeTailNextHeadPosition(newPositions: MatrixPosition[]): boolean {
    const headPosition = newPositions[0];
    const positions = newPositions.slice(1, newPositions.length);
    return positions.some(pos => pos.row === headPosition.row && pos.column === headPosition.column);
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
    const oppositeTable = {
      [DummyDirection.Top]: DummyDirection.Bottom,
      [DummyDirection.Bottom]: DummyDirection.Top,
      [DummyDirection.Left]: DummyDirection.Right,
      [DummyDirection.Right]: DummyDirection.Left,
    };
    return oppositeTable[newDirection] === this.direction;
  }
}
