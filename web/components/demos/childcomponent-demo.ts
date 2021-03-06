import { KnockoffJsBase } from "../../../node_modules/knockoffjs/knockoffjs-base.js";
import { SimpleModel } from "./simple-model.js";

class ChildComponentDemoModel {
  simpleElements: SimpleModel[];
}

export class ChildComponentDemo extends KnockoffJsBase<ChildComponentDemoModel> {

  constructor() {
    let model = new ChildComponentDemoModel();
    model.simpleElements = [new SimpleModel("Alex", "Kidd"), new SimpleModel("Sonic", "Hedgehog, the")];
    super(model);
  }

  template(): string {
    return /*html*/`
  <div data-bind="foreach: e of simpleElements">
    <simple-element data-bind="state: e"></simple-element>
  </div>`;
  }

  styles() {
    return /*CSS*/`
    `;
  }
}
