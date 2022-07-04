import { FrameworkBase } from "../../../framework/framework-base.js";
import { SimpleModel } from "./simple-model.js";

export class SimpleElement extends FrameworkBase<SimpleModel> {
  constructor() {
    super(new SimpleModel("", ""));
  }

  template(): string {
    return `
        <h4>Simple element</h4>
        <p>
          <span data-bind="innerText: firstname"></span>
          <span data-bind="innerText: lastname"></span>
        </p>
        `;
  }

  styles() {
    return ``;
  }
}
