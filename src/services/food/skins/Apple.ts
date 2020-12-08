import { Food } from '../Food';

export class Apple extends Food {

  public get classes() {
    return 'fas fa-apple-alt';
  }

  public get styles() {
    return {
      color: 'red',
    };
  }
}
