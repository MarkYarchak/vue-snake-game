import {CellType, fillInMatrixCell, Matrix, MatrixPosition} from '../game/matrix.service';
import { game } from '@/services/game/game.service';

export interface FoodParams {
  position?: MatrixPosition;
  matrix: Matrix;
}

export class Food {
  public connectedMatrix: Matrix;
  public position: MatrixPosition;

  constructor({ position, matrix }: FoodParams) {
    this.connectedMatrix = matrix;
    this.position = position || this.defaultMatrixPosition;
    fillInMatrixCell(this.connectedMatrix, this.position, CellType.Food);
  }

  private get defaultMatrixPosition(): MatrixPosition {
    const matrixSize = this.connectedMatrix.length - 1;
    const centerPosition = Math.floor(Math.round(matrixSize / 2));
    const row = centerPosition;
    const column = centerPosition + Math.floor(centerPosition / 2);

    return {
      row,
      column,
    };
  }

  public prepareNew(): FoodParams {
    const position: MatrixPosition = this.getNewRandomPosition();
    this.position = position;

    return {
      position,
      matrix: this.connectedMatrix,
    };
  }

  private getNewRandomPosition(): MatrixPosition {
    const matrixSize: number = this.connectedMatrix.length - 1;

    const row = Math.round(Math.random() * matrixSize);
    const column = Math.round(Math.random() * matrixSize);

    const busyDummyPosition = game.dummy.positions
      .some((position) => position.row === row && position.column === column);

    const busyFoodPosition = this.position.row === row && this.position.column === column;

    if (busyDummyPosition || busyFoodPosition) return this.getNewRandomPosition();

    return {
      row,
      column,
    };
  }

}
