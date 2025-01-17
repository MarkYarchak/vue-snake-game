import { Dummy, DummyDirection, DummyParams, DummySpeed } from './Dummy';
import { Snake } from './skins/Snake';

export enum DummyType {
  Snake = 'SNAKE_DUMMY_TYPE',
}

export const DummiesList = new Map([
  [DummyType.Snake, Snake],
]);

export function createDummyByType(type: DummyType, dummyParams: DummyParams) {
  if (!validDummyType(type)) throwError('Invalid dummy type');
  return createNewDummy(type, dummyParams);
}

function validDummyType(type: DummyType): boolean {
  return DummiesList.has(type);
}

function throwError(message: string) {
  throw new Error(message);
}

function createNewDummy(type: DummyType, dummyParams: DummyParams) {
  const GameDummy = DummiesList.get(type)!;
  return new GameDummy(dummyParams);
}

export function setDummyDirection(dummy: Dummy, direction: DummyDirection) {
  dummy.setDirection(direction);
  dummy.addMoveDirectionAction(direction);
}

export function getDummySpeedOptions(): DummySpeed[] {
  return [
    DummySpeed.Slow,
    DummySpeed.Medium,
    DummySpeed.Fast,
  ];
}

export function getDummySpeedName(speed: DummySpeed) {
  switch (speed) {
    case DummySpeed.Slow: return 'Slow';
    case DummySpeed.Medium: return 'Medium';
    case DummySpeed.Fast: return 'Fast';
    default: return 'Default';
  }
}
