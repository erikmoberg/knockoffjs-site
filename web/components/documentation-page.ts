import { CssRegistry } from '../../node_modules/knockoffjs/css-registry.js';
import { KnockoffJsBase } from '../../node_modules/knockoffjs/knockoffjs-base.js';

export class DocumentationPage extends KnockoffJsBase<any> {

  constructor() {
    super();
  }

  template(): string {

    return /* html*/`
        <h2>Documentation</h2>
        
        <h3>Basic concepts</h3>
        <p>The most vital component is a the framework base class: <code>KnockoffJsBase</code>. All functionality is implemented as web components that inherit from this class. These methods should be implemented from the abstract base class:</p>
        <ul>
          <li><code>template</code>: Creates the HTML markup of the component.</li>
          <li><code>styles</code>: Creates the CSS of the component. The CSS will be scoped to the component (thanks to the shadow DOM).</li>
          <li><code>constructor</code>: Pass in an instance of the object that will be used for the state to the base class.</li>
        </ul>
        <p>Since each component is a web component, any lifecycle methods that web components provide are available. For example, if you need to load data after the component has been created, you can use <code>connectedCallback</code>:</p>
        <pre><code>async connectedCallback(): Promise<void> {
  super.connectedCallback();
  const movies = await this.movieService.getMovies();
  this.state.name = movies[0].title;
}</code></pre>

        <h3>Bindings</h3>
        <p>For property data binding, adding event listeners, etc <code>data-bind</code> is used. Example: <code>&lt;span data-bind="innerText: myText"&gt;&lt;/span&gt;</code> will display a span element and set its text to the value of <code>myText</code> in the state model. Generally, this can be used to set <i>any property</i> on an HTML element, such as <code>innerText</code> or <code>disabled</code>. Also nested properties can be set, such as <code>styles.display</code>. The target of the binding (in the example above <code>myText</code>) can be a property in the <code>state</code> object, or it can be a variable, getter, or function in the component that returns a value. Note that when using a function, only the name of the function should be used, without parenthesis. Example: <code>&lt;span data-bind="innerText: getText"&gt;&lt;/span&gt;</code> can be used to run the <code>getText</code> function in the component to get the text.</p>
        <p>To add an attribute, use the <code>attr</code> binding: <code>data-bind="attr: { class: getMyClass }"</code>. Note that if the method (<code>getMyClass</code> in this case) returns null, the attribute will be removed. (Pro tip: Generally, properties can be used instead of attributes.)</p> 
        <p>For events, the <code>event</code> binding is used, that should point to a function in the same class: <code>data-bind="event: { click: myHandler }"</code></p>

        <h3>Handling state</h3>
        <p>Initially, create and return an instance of the state model in the <code>constructor</code>. The type should correspond to the generic type passed to the base class. When setting the state, we simply access it and set it like so:</p>
        <pre><code>this.state.myProperty = "new value";</code></pre>
        <p>This updates all bindings. Note that arrays need to be replaced instead of mutated for the change to be detected. This will add a new element:</p>
        <pre><code>this.state.myArray = [...this.state.myArray, newElement];</code></pre>

        <h3>Routing</h3>
        <p>Before doing anything else, set up the router to enable client side routing. The example below would assume that there is a component named "home-page"
        that is the start page of the application. It also assumes that there is a single <code>main</code> element on the page where it can be injected:</p>
        <pre><code>Router.init("home-page", "");</code></pre>
        <p>Any links starting with "/" should redirect to a registered web component. The component name should end with "-page" (for example "demo-page") and the link should point to the part before "-page" - so "/demo" will point to the component "/demo-page".</p>
        
        <h3>CSS registry</h3>
        <p>Styles are isolated between components by default, thanks to the shadow DOM, but styles can also can be shared using the <code>CssRegistry</code>. To add an entry with the key "common":</p>
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
        <p>To register a service, provide a key and a factory method. In the example below, we use the name of the class as key:</p>
        <pre><code>ServiceLocator.register(MovieService.name, () => new MovieService(ServiceLocator.resolve(MovieApi.name)));</code></pre>
        <p>To retrieve a service in a component:</p>
        <pre><code>const movieService = ServiceLocator.resolve<MovieService>(MovieService.name)</code></pre>
        <p>Note that while the component needs to access the service locator to resolve the service, the service itself will get all dependencies provided
        automatically (by constructor injection) and does not need to access the service locator.</p>
        `;
  }

  styles() {
    return `${CssRegistry.get("common")}`;
  }
}
