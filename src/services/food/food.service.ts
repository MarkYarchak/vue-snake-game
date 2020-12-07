import { Apple } from './skins/Apple';

export enum FoodType {
  Apple = 'SNAKE_DUMMY_TYPE',
}

export const FoodList = new Map([
  [FoodType.Apple, Apple],
]);
