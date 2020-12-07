import { MatrixPosition, Matrix } from '../game/matrix.service';

export interface FoodParams {
  position: MatrixPosition,
  connectedMatrix: Matrix,
}

export class Food {
  constructor({ position, connectedMatrix }: FoodParams) {}

  public onTouch() {}

  private clear() {}
}
