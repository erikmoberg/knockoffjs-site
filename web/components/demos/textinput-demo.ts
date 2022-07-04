import { FrameworkBase } from "../../../framework/framework-base.js";

class TextInputDemoModel {
  name: string;
}

export class TextInputDemo extends FrameworkBase<TextInputDemoModel> {

  constructor() {
    super();
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

  initState() {
    let model = new TextInputDemoModel();
    model.name = "Some text";
    return model;
  }

  
  showInput = async (a: InputEvent) => {
    this.state.name = (a.target as HTMLInputElement).value;
  }
}
