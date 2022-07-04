import { FrameworkBase } from "../../../framework/framework-base.js";

class TextInputDemoModel {
  name: string;
}

export class TextInputDemo extends FrameworkBase<TextInputDemoModel> {

  constructor() {
    let model = new TextInputDemoModel();
    model.name = "Some text";
    super(model);
  }

  template(): string {
    return /*html*/`
    <input type="text" data-bind="event: {input: showInput}, value: name" />
    <p>You entered: <span data-bind="innerText: name"></span></p>`;
  }

  styles() {
    return /*CSS*/`
    `;
  }
  
  showInput = async (a: InputEvent) => {
    this.state.name = (a.target as HTMLInputElement).value;
  }
}
