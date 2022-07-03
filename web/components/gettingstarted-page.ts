import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';

export class GettingStartedPage extends FrameworkBase<any> {

  constructor() {
    super();
  }

  template(): string {

    const code = this.encodeHTMLEntities(`class MyModel {
  name: string;
}

export class BasicPage extends FrameworkBase<MyModel> {
  constructor() {
    super();
  }

  template(): string {
    return \`
        <h2>Hello</h2>
        <p data-bind="innerText: name"></p>
        \`;
  }

  styles() {
    return \`
    p {
      color: darkgoldenrod;
    }
    \`;
  }

  initState() {
    let model = new MyModel();
    model.name = "Mr Worldwide";
    return model;
  }
}
customElements.define("basic-page", BasicPage);
`);

    return /* html*/`
        <h2>Getting started</h2>
        <h3>#1: Set up a minimal component with data binding:</h3>
        <pre><code>${code}</code></pre>

        <h3>#2: Include the file in your index.html:</h3>
        <code>${this.encodeHTMLEntities('<script src="../dist/web/components/basic-page.js" type="module"></script>')}</code>

        <h3>#3: Add the component anywhere in the body of your index.html </h3>
        <code>${this.encodeHTMLEntities('<basic-page></basic-page>')}</code>

        <h3>Result:</h3>
        <div class="result">
          <basic-page></basic-page>
        </div>

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
