export type Matrix = CellType[][];

export enum MatrixSize {
  Min = 7,
  Max = 100,
}

export enum GrassColor {
  Dark = 'rgb(162,209,73)',
  Light = 'rgb(130, 195, 84)', // rgb(170, 215, 81)
}

export enum CellType {
  Dummy = 'DUMMY_CELL',
  Food = 'FOOD_CELL',
  Empty = 'EMPTY_CELL',
}

export interface MatrixPosition {
  row: number;
  column: number;
}

export function createMatrix(size: number): Matrix {
  const matrix: Matrix = [];
  createMatrixRows(matrix, size);
  createMatrixCells(matrix, size);
  tryFillInMatrix(matrix, CellType.Empty);
  return matrix;
}

export function createMatrixRows(matrix: Matrix, count: number) {
  for (let i = 0; i < count; i++) {
    const matrixCellsRow: CellType[] = [];
    matrix.push(matrixCellsRow);
  }
}

export function createMatrixCells(matrix: Matrix, count: number) {
  const createEmptyRowCells = function(matrixRow: CellType[]) {
    for (let i = 0; i < count; i++) matrixRow.push(CellType.Empty);
  };
  matrix.map(createEmptyRowCells);
}

export function tryFillInMatrix(matrix: Matrix, value: CellType): Matrix {
  if (!isValidMatrix(matrix)) throwError('Invalid matrix. It must contain at least few arrays with content');
  return fillInMatrixCells(matrix, value);
}

export function isValidMatrix(matrix: Matrix): boolean {
  return isValidMatrixLength(matrix.length);
}

export function isValidMatrixLength(length: number): boolean {
  return length >= MatrixSize.Min && length <= MatrixSize.Max;
}

function throwError(message: string) {
  throw new Error(message);
}

function fillInMatrixCells(matrix: Matrix, value: CellType) {
  return matrix.map(
    matrixRow => matrixRow.map(() => value)
  );
}

export function fillInMatrixCell(matrix: Matrix, { row, column }: MatrixPosition, newValue: CellType) {
  if (matrix.length >= row && matrix.length >= column) {
    matrix[row][column] = newValue;
  }
}
