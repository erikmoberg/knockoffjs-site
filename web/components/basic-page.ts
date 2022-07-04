import { KnockoffJsBase } from "../../knockoffjs/knockoffjs-base.js";

class MyModel {
  name: string;
}

export class BasicPage extends KnockoffJsBase<MyModel> {
  constructor() {
    super({ name: "Mr Worldwide" });
  }

  template(): string {
    return `
      <h2>Hello <span data-bind="innerText: name"></span></h2>
      <button data-bind="event: { click: addExclamation }">Click me!</button>`;
  }

  styles() {
    return `
      h2 span {
        color: darkgoldenrod;
      }`;
  }

  addExclamation = () => {
    this.state.name += "!";
  }
}