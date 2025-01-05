import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { reactive } from 'vue';
import deviceDetect from 'mobile-device-detect';
import { DummyDirection } from '../dummy/Dummy';
import { setDummyDirection } from '../dummy/dummy.service';
import { Game, GameStatus, GameSettings } from './Game';

const InvolvedKeysWithActions = new Map([
  ['ArrowUp', DummyDirection.Top],
  ['ArrowLeft', DummyDirection.Left],
  ['ArrowDown', DummyDirection.Bottom],
  ['ArrowRight', DummyDirection.Right],
  ['KeyW', DummyDirection.Top],
  ['KeyA', DummyDirection.Left],
  ['KeyS', DummyDirection.Bottom],
  ['KeyD', DummyDirection.Right],
]);

const GameSystemKeyCodesWithActions = new Map([
  ['Space', pauseGameProcess],
  ['Escape', resumeGameProcess],
]);


export let game: Game;
let keydownEvent$: Subscription;


export function createNewGame(settings?: GameSettings): Game {
  const newGame = new Game(settings);
  game = reactive(newGame) as Game;

  game.addAdaptationItems();

  return game;
}

export function restartGame() {
  destroyGameUtils();
  game.restart();
  initGameUtils();
}

function isMobile(): boolean {
  return deviceDetect.isMobile;
}

export function initGameUtils() {
  if (isMobile()) return initSwipesHandlers();
  initKeysDownHandlers();
}

export function destroyGameUtils() {
  if (isMobile()) return clearSwipesHandlers();
  clearKeyDownHandlers();
}

function initKeysDownHandlers() {
  keydownEvent$ = fromEvent<KeyboardEvent>(window, 'keydown')
    .pipe(
      throttleTime(0)
    )
    .subscribe(keyDownHandler);
}

function initSwipesHandlers() {
  // TODO: add swipes handlers
}

function clearSwipesHandlers() {
  // TODO: add clear swipes handlers
}

function clearKeyDownHandlers() {
  keydownEvent$.unsubscribe();
}

function keyDownHandler($event: KeyboardEvent) {
  if (isGameSystemKey($event)) return gameSystemKeysController($event);
  if (isInvolvedKey($event)) setupGameActions($event);
}

function isGameSystemKey($event: KeyboardEvent): boolean {
  return GameSystemKeyCodesWithActions.has($event.code);
}

function isInvolvedKey($event: KeyboardEvent): boolean {
  return InvolvedKeysWithActions.has($event.code);
}

function gameSystemKeysController($event: KeyboardEvent) {
  const action = GameSystemKeyCodesWithActions.get($event.code)!;
  action();
}

function setupGameActions($event: KeyboardEvent) {
  if (!pausedGameProcess()) {
    const newDummyDirection: DummyDirection = InvolvedKeysWithActions.get($event.code)!;
    if (isNewGameProcess() && newDummyDirection === DummyDirection.Left) return;
    setDummyDirection(game.dummy, newDummyDirection);
  }
  if (isNewGameProcess()) {
    game.start();
  }
}

export function isNewGameProcess() {
  return game.status === GameStatus.Initialized || game.status === GameStatus.Restarted;
}

function pausedGameProcess(): boolean {
  return game.status === GameStatus.Stopped;
}

function runningGameProcess(): boolean {
  return game.status === GameStatus.Running;
}

export function pauseGameProcess() {
  if (!runningGameProcess() && !pausedGameProcess()) {
    game.stop();
    openPauseDialog();
    blurPauseDialogMenu();
  }
}

export function resumeGameProcess() {
  if (pausedGameProcess()) {
    game.resume();
    closePauseDialog();
  }
}

export function openPauseDialog() {
  const dialogRounded = document.getElementById('dialog-rounded') as HTMLDialogElement;
  dialogRounded.showModal();
}

export function blurPauseDialogMenu() {
  document.getElementById('speed_select')!?.blur();
}

export function closePauseDialog() {
  const dialogRounded = document.getElementById('dialog-rounded') as HTMLDialogElement;
  dialogRounded.close();
}
