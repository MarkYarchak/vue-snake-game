import { createMatrix, Matrix } from './matrix.service';
import { destroyGameUtils, initGameUtils } from './game.service';
import { Dummy, DummyParams, DummySpeed } from '../dummy/Dummy';
import { Food, FoodParams } from '../food/Food';
import { FoodType, createFoodByType } from '../food/food.service';
import { createDummyByType, DummyType } from '../dummy/dummy.service';

export interface GameSettings {
  matrixSize: number;
  dummyType: DummyType;
  dummySpeed: DummySpeed;
  foodType: FoodType;
  useSounds: boolean;
  default?: GameSettings;
}

export enum GameStatus {
  Initialized = 'INITIALIZED_GAME_STATUS',
  Running = 'RUNNING_GAME_STATUS',
  Stopped = 'STOPPED_GAME_STATUS',
  Restarted = 'RESTARTED_GAME_STATUS',
  Finished = 'FINISHED_GAME_STATUS',
  Destroyed = 'DESTROYED_GAME_STATUS', // Can be removed in future. Not recommended to bind with
}

export class Game {
  public matrix: Matrix;
  public score = 0;
  public maxScore: number = 0;
  public status: GameStatus = GameStatus.Initialized;
  public previousStatus!: GameStatus;
  public dummy!: Dummy;
  public food!: Food;
  public settings!: GameSettings;

  constructor(settings: GameSettings = Game.defaultSettings) {
    this.applySettings(settings);
    this.matrix = createMatrix(settings.matrixSize);
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
    const playFieldSize = '800px';
    return {
      width: playFieldSize,
      height: playFieldSize,
    };
  }

  public start() {
    this.dummy.startMoving();
    this.setGameStatus(GameStatus.Running);
  }

  public stop() {
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
    this.setGameStatus(GameStatus.Finished);
  }

  public destroy() {
    destroyGameUtils();
    this.setGameStatus(GameStatus.Destroyed);
  }

  private compareAndSaveScore() {
    if (this.score > this.maxScore) this.maxScore = this.score;
  }

  public rollBackDefaultState() {
    this.matrix = createMatrix(this.settings.matrixSize);
    this.score = 0;
  }

  public addScore() {
    this.score++;
  }

  public addAdaptationItems() {
    this.addDummy(this.settings.dummyType);
    this.addFood(this.settings.foodType);
  }

  public addDummy(dummyType: DummyType, dummyParams?: DummyParams) {
    const params = { speed: this.settings.dummySpeed, matrix: this.matrix, ...dummyParams };
    this.dummy = createDummyByType(dummyType, params);
  }

  public addFood(foodType: FoodType, foodParams?: FoodParams) {
    const params = { matrix: this.matrix, ...foodParams };
    this.food = createFoodByType(foodType, params);
  }

  public applySettings(settings: GameSettings = Game.defaultSettings) {
    this.settings = { ...this.settings, ...settings, default: Game.defaultSettings };
  }

  static get defaultSettings(): GameSettings {
    const defaultMatrixSize = 30;
    return {
      matrixSize: defaultMatrixSize,
      dummyType: DummyType.Snake,
      dummySpeed: DummySpeed.Medium,
      foodType: FoodType.Apple,
      useSounds: true,
    };
  }
}
