import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';

export class DocumentationPage extends FrameworkBase<any> {

  constructor() {
    super();
  }

  template(): string {

    return /* html*/`
        <h2>Documentation</h2>
        
        <h3>Basic concepts</h3>
        <p>The most vital component is a the framework base class: <code>FrameworkBase</code>. All functionality is implemented as web components that inherit from this class. These methods should be implemented from the abstract base class:</p>
        <ul>
          <li><code>template</code>: Creates the HTML markup of the component.</li>
          <li><code>styles</code>: Creates the CSS of the component. The CSS will be scoped to the component (thanks to the shadow DOM).</li>
          <li><code>constructor</code>: Pass in an instance of the object that will be used for the state to the base class.</li>
        </ul>

        <h3>Bindings</h3>
        <p>For data binding, adding event listeners, etc data-bind is used. Example: <code>&lt;span data-bind="innerText: myText"&gt;&lt;/span&gt;</code> will display a span element and set it's text to the value of <code>myText</code> in the state model. Generally, this can be used to set any property on an HTML element.</p>
        <p>To add an attribute, use the <code>attr</code> binding: <code>data-bind="attr: { class: getMyClass }"</code>. Note that if the method (<code>getMyClass</code> in this case) returns null, the attribute will be removed.</p> 
        <p>For events, the <code>event</code> binding is used: <code>data-bind="event: { click: myHandler }"</code></p>

        <h3>Handling state</h3>
        <p>Initially, create and return an instance of the state model in the <code>constructor</code>. The type should correspond to the generic type passed to the base class. When setting the state, we simply access it and set it like so:</p>
        <p><code>this.state.myProperty = "new value";</code></p>
        <p>This updates all bindings. Note that arrays need to be replaced instead of mutated for the change to be detected. This will add a new element:</p>
        <p><code>this.state.myArray = [...this.state.myArray, newElement];</code></p>

        <h3>Routing</h3>
        <p>Before doing anything else, set up the router to enable client side routing:</p>
        <pre><code>Router.init("home-page", "");</code></pre>
        <p>Any links starting with "/" should redirect to a registered web component. The component name should end with "-page" (for example "demo-page") and the link should point to the part before "-page" - so "/demo" will point to the component "/demo-page".</p>
        <h3>CSS registry</h3>
        <p>Since styles are isolated between components, they can be shared using the <code>CssRegistry</code>. To add an entry:</p>
        <pre><code>CssRegistry.register("common",
  \`code {
      color: black;
    }\`);</code></pre>
        <p>The styles can later be retrieved in a component, typically like so:</p>
        <pre><code>styles() {
  return \`
    \${CssRegistry.get("common")}
    /* Other styles... */
    p {
      color: blue;
    }\`;
  }</code></pre>

        <h3>Service locator</h3>
        <p>To register a service:</p>
        <pre><code>ServiceLocator.register(MovieService.name, () => new MovieService());</code></pre>
        <p>To retrieve a service:</p>
        <pre><code>const movieService = ServiceLocator.resolve<MovieService>(MovieService.name)</code></pre>
        `;
  }

  styles() {
    return `${CssRegistry.get("common")}`;
  }
}
