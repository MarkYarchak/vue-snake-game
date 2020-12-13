import { createMatrix, Matrix } from './matrix.service';
import { destroyGameUtils, initGameUtils } from './game.service';
import { Dummy, DummyParams, DummySpeed } from '../dummy/Dummy';
import { Food, FoodParams } from '../food/Food';
import { FoodType, createFoodByType } from '../food/food.service';
import { createDummyByType, DummyType } from '../dummy/dummy.service';

interface GameParams {
  matrixSize: number;
  dummyType: DummyType;
  foodType: FoodType;
}

export enum GameStatus {
  Initialized = 'INITIALIZED_GAME_STATUS',
  Running = 'RUNNING_GAME_STATUS',
  Stopped = 'STOPPED_GAME_STATUS',
  Restarted = 'RESTARTED_GAME_STATUS',
  Finished = 'FINISHED_GAME_STATUS',
  Destroyed = 'DESTROYED_GAME_STATUS', // Can be removed in future. Not recommended to bind with
}

export enum MatrixSize {
  Min = 7,
  Max = 100,
}

export class Game {
  public matrix: Matrix;
  public matrixSize!: number;
  public readonly playFieldSize: string = '';
  public score = 0;
  public maxScore: number = 0;
  public status: GameStatus = GameStatus.Initialized;
  public previousStatus!: GameStatus;
  public dummyType: DummyType;
  public foodType: FoodType;
  public dummy!: Dummy;
  public food!: Food;

  constructor({ matrixSize, dummyType, foodType }: GameParams) {
    this.matrix = createMatrix(matrixSize);
    this.setMatrixSize(matrixSize);
    this.playFieldSize = '800px';
    this.dummyType = dummyType;
    this.foodType = foodType;
    initGameUtils();
  }

  private setGameStatus(status: GameStatus) {
    this.previousStatus = this.status;
    this.status = status;
  }

  public get styles() {
    return {};
  }

  public get boardStyles() {
    return {
      width: this.playFieldSize,
      height: this.playFieldSize,
    };
  }

  public setMatrixSize(size: number) {
    if (size >= MatrixSize.Min && size <= MatrixSize.Max) {
      this.matrixSize = size;
    } else throw new Error('Invalid matrix size');
  }

  public start() {
    // TODO: resume dummy moving & food animation (add class back)
    this.setGameStatus(GameStatus.Running);
    this.dummy.startMoving();
  }

  public stop() {
    // TODO: stop dummy, stop food animation (clear class for example)
    this.dummy.stopMoving();
    this.setGameStatus(GameStatus.Stopped);
  }

  public resume() {
    this.setGameStatus(this.previousStatus);
    if (this.status === GameStatus.Running) this.start();
  }

  public restart() {
    this.finish();
    this.compareAndSaveScore();
    this.rollBackDefaultState();
    this.addAdaptationItems();
    this.setGameStatus(GameStatus.Restarted);
  }

  public finish() {
    this.dummy.stopMoving();
    this.setGameStatus(GameStatus.Finished);
  }

  public destroy() {
    destroyGameUtils();
    this.setGameStatus(GameStatus.Destroyed);
  }

  private compareAndSaveScore() {
    if (this.score > this.maxScore) this.maxScore = this.score;
  }

  private rollBackDefaultState() {
    this.matrix = createMatrix(this.matrixSize);
    this.score = 0;
  }

  public addScore() {
    this.score++;
  }

  public addAdaptationItems() {
    this.addDummy(this.dummyType);
    this.addFood(this.foodType);
  }

  public addDummy(dummyType: DummyType, dummyParams: DummyParams = { speed: DummySpeed.Medium, matrix: this.matrix }) {
    this.dummy = createDummyByType(dummyType, dummyParams);
  }

  public addFood(foodType: FoodType, foodParams: FoodParams = { matrix: this.matrix }) {
    this.food = createFoodByType(foodType, foodParams);
  }
}
