import { MovieModel } from '../../core/models/movie-model.js';
import { MovieService } from '../../core/services/movie-service.js';
import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';
import { ServiceLocator } from '../../framework/service-locator.js';
import { SimpleModel } from './simple-model.js';

class DemosModel {
  name: string;
  movies: MovieModel[];
  selectedMovie: MovieModel;
  todoText: string;
  todos: string[];
  isLoadingMovies: boolean;
  simpleElements: SimpleModel[];
}

export class DemosPage extends FrameworkBase<DemosModel> {

  movieService: MovieService;

  constructor() {
    super();
    this.movieService = ServiceLocator.resolve<MovieService>(MovieService.name)
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
          <input type="text" data-bind="event: {input: showInput}, value: name" />
          <p>You entered: <span data-bind="innerText: name"></span></p>
        </div>

        <h3>#2: Select control with async data loading</h3>
        <pre><code>${this.encodeHTMLEntities(`/* Template */
<button data-bind="event: { click: loadMovies }">Load movies</button>
<span data-bind="attr: { style: isLoadingMoviesStyle }">Loading movies...</span>
<div data-bind="attr: { style: movieSelectionStyle }">
  <p>Select a movie:</p>
  <select data-bind="foreach: m of movies, event: { change: setSelectedMovie }">
    <option data-bind="value: m.title, innerHTML: m.title, attr: { selected: movieIsSelected, hidden: movieIsHidden }"></option>
  </select>
</div>
<div data-bind="attr: { style: movieInfoStyle }">
  <h3>Movie description</h3>
  <p><i data-bind="innerHTML: selectedMovie?.description"></i></p>
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
  return this.state.isLoadingMovies ? null : "display: none";
}

setSelectedMovie = (a: Event) => {
  const title = (a.target as HTMLSelectElement).value;
  this.state.selectedMovie = this.state.movies.filter(s => s.title === title)[0];
}

movieIsSelected = (s: MovieModel) => {
  return s?.title === this.state.selectedMovie?.title ? "selected" : null;
}

movieIsHidden = (s: MovieModel) => {
  return s?.description ? null : "hidden";
}

movieSelectionStyle = () => {
  return this.state.movies.length ? null : "display: none";
}

movieInfoStyle = () => {
  return this.state.selectedMovie?.description ? null : "display: none";
}
</code></pre>

        <h4>Result</h4>
        <div class="result">
          <button data-bind="event: { click: loadMovies }">Load movies</button>
          <span data-bind="attr: { style: isLoadingMoviesStyle }">Loading movies...</span>
          <div data-bind="attr: { style: movieSelectionStyle }">
            <p>Select a movie:</p>
            <select data-bind="foreach: m of movies, event: { change: setSelectedMovie }">
              <option data-bind="value: m.title, innerHTML: m.title, attr: { selected: movieIsSelected, hidden: movieIsHidden }"></option>
            </select>
          </div>
          <div data-bind="attr: { style: movieInfoStyle }">
            <h3>Movie description</h3>
            <p><i data-bind="innerHTML: selectedMovie?.description"></i></p>
          </div>
        </div>

        <h3>#3: Todo app</h3>

        <pre><code>${this.encodeHTMLEntities(`/* Template */
<input type="text" data-bind="value: todoText, event: { input: setTodoText, keyup: detectTodoEnter }" />
<button data-bind="event: { click: addTodo }, attr: { disabled: getAddTodoState }">Add</button>
<ul data-bind="foreach: todo of todos">
  <li>
    <span data-bind="innerHTML: todo"></span>
    <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</span>
  </li>
</ul>`)}

/* JS */
getAddTodoState = () => {
  return this.state.todoText ? null : "disabled";
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
          <input type="text" data-bind="value: todoText, event: { input: setTodoText, keyup: detectTodoEnter }" />
          <button data-bind="event: { click: addTodo }, attr: { disabled: getAddTodoState }">Add</button>
          <ul data-bind="foreach: todo of todos">
            <li>
              <span data-bind="innerHTML: todo"></span>
              <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</a>
            </li>
          </ul>
        </div>
        
        <h3>#4: Pass state to child components</h3>

        <p>Assume we have a component named <code>SimpleElement</code> with this template:</p>
        <pre><code>${this.encodeHTMLEntities(`<h5>Simple element</h5>
<p>
  <span data-bind="innerText: firstname"></span>
  <span data-bind="innerText: lastname"></span>
</p>`)}</pre></code>

<p>We can then set the <code>state</code> property of the element to set its state:</p>

        <pre><code>${this.encodeHTMLEntities(`/* Template */
<div data-bind="foreach: e of simpleElements">
  <simple-element data-bind="state: e"></simple-element>
</div>`)}

/* JS */
this.state.simpleElements = [new SimpleModel("Alex", "Kidd"), new SimpleModel("Sonic", "Hedgehog")];
}
</code></pre>
<h4>Result</h4>
<div class="result">
  <div data-bind="foreach: e of simpleElements">
    <simple-element data-bind="state: e"></simple-element>
  </div>
</div>

<h3>Want to try it out yourself?</h3>
<p>Check out the <a href="/gettingstarted">Getting started</a> page to discover how easy it is to get this running.</p>
`;


  }

  styles() {
    return /*CSS*/`
    ${CssRegistry.get("common")}
    `;
  }

  initState() {
    let model = new DemosModel();
    model.name = "Some text";
    model.movies = [];
    model.selectedMovie = null;
    model.todos = ["Write a framework", "Get famous"];
    model.todoText = "";
    model.simpleElements = [new SimpleModel("Alex", "Kidd"), new SimpleModel("Sonic", "Hedgehog")];
    return model;
  }

  async afterInit() {
  }

  getAddTodoState = () => {
    return this.state.todoText ? null : "disabled";
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

  showInput = async (a: InputEvent) => {
    this.state.name = (a.target as HTMLInputElement).value;
  }

  loadMovies = async () => {
    this.state.isLoadingMovies = true;
    const movies = await this.movieService.getMovies();

    // insert null element that will serve as default
    this.state.movies = [new MovieModel("-- select --", null), ...movies];
    this.state.selectedMovie = this.state.movies[0];
    this.state.isLoadingMovies = false;
  }

  isLoadingMoviesStyle = () => {
    return this.state.isLoadingMovies ? null : "display: none";
  }

  setSelectedMovie = (a: Event) => {
    const title = (a.target as HTMLSelectElement).value;
    this.state.selectedMovie = this.state.movies.filter(s => s.title === title)[0];
  }

  movieIsSelected = (s: MovieModel) => {
    return s?.title === this.state.selectedMovie?.title ? "selected" : null;
  }

  movieIsHidden = (s: MovieModel) => {
    return s?.description ? null : "hidden";
  }

  movieSelectionStyle = () => {
    return this.state.movies.length ? null : "display: none";
  }

  movieInfoStyle = () => {
    return this.state.selectedMovie?.description ? null : "display: none";
  }
}
