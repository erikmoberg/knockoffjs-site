import { FrameworkBase } from "../../framework/framework-base.js";

export class MyModel {
  name: string;
}

export class BasicPage extends FrameworkBase<MyModel> {
  constructor() {
    super();
  }

  template(): string {
    return `
        <h2>Hello</h2>
        <p data-bind="innerText: name"></p>
        `;
  }

  styles() {
    return `
    p {
      color: darkgoldenrod;
    }
    `;
  }

  initState() {
    let model = new MyModel();
    model.name = "Mr Worldwide";
    return model;
  }
}