import { CssRegistry } from '../../node_modules/knockoffjs/css-registry.js';
import { KnockoffJsBase } from '../../node_modules/knockoffjs/knockoffjs-base.js';

export class GettingStartedPage extends KnockoffJsBase<any> {

  constructor() {
    super();
  }

  template(): string {

    const code = this.encodeHTMLEntities(`import { KnockoffJsBase } from "./node_modules/knockoffjs/knockoffjs-base.js";

class MyModel {
  name: string;
}

export class BasicPage extends KnockoffJsBase<MyModel> {
  constructor() {
    super({ name: "Mr Worldwide" });
  }

  template(): string {
    return \`
      <h2>Hello <span data-bind="innerText: name"></span></h2>
      <button data-bind="event: { click: addExclamation }">Click me!</button>\`;
  }

  styles(): string {
    return \`
      h2 span {
        color: darkgoldenrod;
      }\`;
  }

  addExclamation = () => {
    this.state.name += "!";
  }
}
customElements.define("basic-page", BasicPage);
`);

    return /* html*/`
        <h2>Getting started</h2>

        <h3>Option 1: Super quick start (clone and run this site)</h3>
        
        <p>Open a terminal and type:</p>
        <pre><code>git clone https://github.com/erikmoberg/knockoffjs-site.git
cd knockoffjs-site
npm install
npm run-script serve</code></pre>
        <p>Open a browser, point to <a href="http://localhost:3000">http://localhost:3000</a> and enjoy.</p>

        <h3>Option 2: Also quick start (except slower)</h3>

        <h3>#1: Add KnockoffJS to package.json:</h3>
        <pre><code>npm install https://github.com/erikmoberg/knockoffjs.git</code></pre>
        <p>Also add TypeScript support:</p>
        <pre><code>npm install typescript</code></pre>

        <h3>#2: Set up a basic component (basic-page.ts):</h3>
        <pre><code>${code}</code></pre>

        <h3>#3: Transpile TS to JS and include the file in your index.html:</h3>
        <pre><code>${this.encodeHTMLEntities('<script src="dist/basic-page.js" type="module"></script>')}</code></pre>

        <h3>#4: Add the component anywhere in the body of your index.html:</h3>
        <pre><code>${this.encodeHTMLEntities(`<body>
  <basic-page></basic-page>
</body>`)}</code></pre>

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
}
