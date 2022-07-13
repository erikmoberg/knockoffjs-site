import { CssRegistry } from '../../node_modules/knockoffjs/css-registry.js';
import { KnockoffJsBase } from '../../node_modules/knockoffjs/knockoffjs-base.js';

export class DemosPage extends KnockoffJsBase<any> {

  constructor() {
    super();
  }

  encodeHTMLEntities = (text) => {
    var textArea = document.createElement('textarea');
    textArea.innerText = text;
    return textArea.innerHTML;
  }

  template(): string {
    return /*html*/`
<h2>Demos</h2>

<h3>#1: Text input</h3>
<pre><code>${this.encodeHTMLEntities(`/* Template */
<input type="text" data-bind="event: {input: showInput}, value: name" />
<p>You entered: <span data-bind="innerText: name"></span></p>`)}

/* JS */
showInput = async (a: InputEvent) => {
  this.state.name = (a.target as HTMLInputElement).value;
}
</code></pre>

<h4>Result</h4>
<div class="result">
  <textinput-demo></textinput-demo>
</div>

<h3>#2: Select control with async data loading</h3>
<pre><code>${this.encodeHTMLEntities(`/* Template */
<button data-bind="event: { click: loadMovies }">Load movies</button>
<span data-bind="style.display: isLoadingMoviesStyle">Loading movies...</span>
<div data-bind="style.display: movieSelectionStyle">
  <p>Select a movie:</p>
  <select data-bind="foreach: m of movies, event: { change: setSelectedMovie }">
    <option data-bind="value: m.title, innerText: m.title, selected: movieIsSelected, hidden: movieIsHidden"></option>
  </select>
</div>
<div data-bind="style.display: movieInfoStyle">
  <h3>Movie description</h3>
  <p><i data-bind="innerText: selectedMovie?.description"></i></p>
</div>`)}

/* JS */
loadMovies = async () => {
  this.state.isLoadingMovies = true;
  const movies = await this.movieService.getMovies();

  // insert null element that will serve as default
  this.state.movies = [new MovieModel("-- select --", null), ...movies];
  this.state.selectedMovie = this.state.movies[0];
  this.state.isLoadingMovies = false;
}

isLoadingMoviesStyle = () => {
  return this.state.isLoadingMovies ? "" : "none";
}

setSelectedMovie = (a: Event) => {
  const title = (a.target as HTMLSelectElement).value;
  this.state.selectedMovie = this.state.movies.filter(s => s.title === title)[0];
}

movieIsSelected = (s: MovieModel) => {
  return s?.title === this.state.selectedMovie?.title ? true : false;
}

movieIsHidden = (s: MovieModel) => {
  return s?.description ? false : true;
}

movieSelectionStyle = () => {
  return this.state.movies.length ? "" : "none";
}

movieInfoStyle = () => {
  return this.state.selectedMovie?.description ? "" : "none";
}
</code></pre>

<h4>Result</h4>
<div class="result">
  <select-demo></select-demo>
</div>

<h3>#3: Todo app</h3>

<pre><code>${this.encodeHTMLEntities(`/* Template */
<input type="text" data-bind="value: todoText, event: { input: setTodoText, keyup: detectTodoEnter }" />
<button data-bind="event: { click: addTodo }, disabled: addTodoStateIsDisabled">Add</button>
<ul data-bind="foreach: todo of todos">
  <li>
    <span data-bind="innerText: todo"></span>
    <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</a>
  </li>
</ul>`)}

/* JS */
addTodoStateIsDisabled = () => {
  return this.state.todoText ? false : true;
}

addTodo = () => {
  this.state.todos = [...this.state.todos, this.state.todoText];
  this.state.todoText = "";
}

removeTodo = (ev: Event, todo: string) => {
  const newArray = this.state.todos.slice();
  newArray.splice(this.state.todos.indexOf(todo), 1);
  this.state.todos = newArray;
}

setTodoText = async (e: InputEvent) => {
  this.state.todoText = (e.target as HTMLInputElement).value;
}

detectTodoEnter = async (e: KeyboardEvent) => {
  if (e.code == "Enter" && this.state.todoText) {
    this.addTodo();
  }
}
</code></pre>

<h4>Result</h4>
<div class="result">
  <todo-demo></todo-demo>
</div>

<h3>#4: Pass state to child components</h3>

<p>Assume we have a component named <code>SimpleElement</code> with this template:</p>
<pre><code>${this.encodeHTMLEntities(`<h4>Simple element</h4>
<p>
  <span data-bind="innerText: firstname"></span>
  <span data-bind="innerText: lastname"></span>
</p>`)}</pre></code>

<p>We can then set the <code>state</code> property of the element to set its state:</p>

<pre><code>${this.encodeHTMLEntities(`/* Template */
<div data-bind="foreach: e of simpleElements">
  <simple-element data-bind="state: e"></simple-element>
</div>`)}

/* JS: Define the model */
export class SimpleModel {
  constructor(public firstname: string, public lastname: string) {}
}

/* JS: Set the state */
this.state.simpleElements = [
  new SimpleModel("Alex", "Kidd"), 
  new SimpleModel("Sonic", "Hedgehog, the")];
</code></pre>
<h4>Result</h4>
<div class="result">
  <childcomponent-demo></childcomponent-demo>
</div>

<h3>Want to try it out yourself?</h3>
<p>Check out the <a href="/gettingstarted">Getting started</a> page to discover how easy it is to get this running yourself!</p>
`;
  }

  styles() {
    return /*CSS*/`
    ${CssRegistry.get("common")}
    `;
  }
}
