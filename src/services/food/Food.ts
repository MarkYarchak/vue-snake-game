import {CellType, fillInMatrixCell, Matrix, MatrixPosition} from '../game/matrix.service';

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
    const matrixSize = this.connectedMatrix.length;
    const centerPosition = Math.floor(Math.round(matrixSize / 2) );
    const row = centerPosition;
    const column = centerPosition + Math.floor(centerPosition / 2);

    return {
      row,
      column,
    };
  }
}
