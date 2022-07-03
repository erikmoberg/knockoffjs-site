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
        <h2>About</h2>
        <p data-bind="innerText: name"></p>
        `;
  }

  styles() {
    return `
    p {
      color: red;
    }
    `;
  }

  initState() {
    let model = new MyModel();
    model.name = "my name";
    return model;
  }
}
customElements.define("basic-page", BasicPage);