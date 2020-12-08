import { Apple } from './skins/Apple';
import { FoodParams } from './Food';

export enum FoodType {
  Apple = 'APPLE_FOOD_TYPE',
}

export const FoodList = new Map([
  [FoodType.Apple, Apple],
]);

export function createFoodByType(type: FoodType, params: FoodParams) {
  if (!validFoodType(type)) throwError('Invalid food type');
  return createNewFood(type, params);
}

function validFoodType(type: FoodType): boolean {
  return FoodList.has(type);
}

function throwError(message: string) {
  throw new Error(message);
}

function createNewFood(type: FoodType, foodParams: FoodParams) {
  const GameFood = FoodList.get(type)!;
  return new GameFood(foodParams);
}

