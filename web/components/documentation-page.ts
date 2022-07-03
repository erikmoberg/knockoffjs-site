import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';

export class DocumentationPage extends FrameworkBase<any> {

  constructor() {
    super();
  }

  template(): string {

    return /* html*/`
        <h2>Documentation</h2>
        
        <h3>Basic concept</h3>
        <p>The most vital component is a the framework base class. All functionality is implemented as web components that inherit from this class. These methods should be implemented from the abstract base class:</p>
        <ul>
          <li><code>template</code>: Creates the HTML markup of the component.</li>
          <li><code>styles</code>: Creates the CSS of the component. The CSS will be scoped to the component (thanks to the shadow DOM).</li>
          <li><code>initState</code>: Creates an instance of the object that will be used for the state.</li>
        </ul>

        <h3>Bindings</h3>
        <p>For data binding, adding event listeners, etc data-bind is used. Example: <code>&lt;span data-bind="innerText: myText"&gt;&lt;/span&gt;</code> will display a span element and set it's text to the value of <code>myText</code> in the state model. Generally, this can be used to set any property on an HTML element.</p>
        <p>To add an attribute, use the <code>attr</code> binding: <code>data-bind="attr: { class: getMyClass }"</code>. Note that if the method (<code>getMyClass</code> in this case) returns null, the attribute will be removed.</p> 
        <p>For events, the <code>event</code> binding is used: <code>data-bind="event: { click: myHandler }"</code></p>

        <h3>Handling state</h3>
        <p>Initially, create and return an instance of the state model in the <code>initState</code> method. The type should correspond to the generic type passed to the base class. When setting the state, we simply access it and set it like so:</p>
        <p><code>this.state.myProperty = "new value";</code></p>
        <p>This updates all bindings. Note that arrays need to be replaced instead of mutated for the change to be detected. This will add a new element:</p>
        <p><code>this.state.myArray = [...this.state.myArray, newElement];</code></p>
        `;
  }

  styles() {
    return `${CssRegistry.get("common")}`;
  }

  initState() {
    return {}
  }
}
