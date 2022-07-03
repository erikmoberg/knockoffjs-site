import { FrameworkBase } from "../../framework/framework-base.js";
import { SimpleModel } from "./simple-model.js";

export class SimpleElement extends FrameworkBase<SimpleModel> {
  constructor() {
    super();
  }

  template(): string {
    return `
        <h5>Simple element</h5>
        <p>
          <span data-bind="innerText: firstname"></span>
          <span data-bind="innerText: lastname"></span>
        </p>
        `;
  }

  styles() {
    return ``;
  }

  initState() {
    return new SimpleModel("", "");
  }
}
