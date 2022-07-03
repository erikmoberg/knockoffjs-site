import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';

export class GettingStartedPage extends FrameworkBase<any> {

  constructor() {
    super();
  }

  template(): string {

    const code = this.encodeHTMLEntities(`export class MyModel {
  name: string;
}

export class BasicPage extends FrameworkBase<MyModel> {
  constructor() {
    super();
  }

  template(): string {
    return \`
        <h2>About</h2>
        <p data-bind="innerText: name"></p>
        \`;
  }

  styles() {
    return \`
    p {
      color: red;
    }
    \`;
  }

  initState() {
    let model = new MyModel();
    model.name = "my name";
    return model;
  }
}
customElements.define("basic-page", BasicPage);
`);

    return /* html*/`
        <h2>Getting started</h2>
        <h3>#1: Set up a minimal page example with data binding:</h3>
        <pre><code>${code}</code></pre>

        <h3>#2: Include the file in your index.html:</h3>
        <code>${this.encodeHTMLEntities('<script src="../dist/web/components/basic-page.js" type="module"></script>')}</code>

        <h3>#3: Add the component anywhere in the body of your index.html </h3>
        <code>${this.encodeHTMLEntities('<basic-page></basic-page>')}</code>

        <p>Done! Feel free to proceed to the <a href="/documentation">Documentation</a> for a more complete explanation.</p>
        `;
  }

  encodeHTMLEntities = (text) => {
    var textArea = document.createElement('textarea');
    textArea.innerText = text;
    return textArea.innerHTML;
  }

  styles() {
    return `${CssRegistry.get("common")}`;
  }

  initState() {
    return {}
  }
}
