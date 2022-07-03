import { MovieModel } from '../../core/models/movie-model.js';
import { MovieService } from '../../core/services/movie-service.js';
import { CssRegistry } from '../../framework/css-registry.js';
import { FrameworkBase } from '../../framework/framework-base.js';
import { ServiceLocator } from '../../framework/service-locator.js';
import { MyModel } from './my-model.js';

export class DemosPage extends FrameworkBase<MyModel> {

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
        <h2>Examples</h2>
        <h3>#1: Text input</h3>
        <pre><code>${this.encodeHTMLEntities(`/* Template */
<input type="text" data-bind="event: {input: showInput}, value: name" />
<p>You entered: <span data-bind="innerHTML: name"></span></p>`)}

/* JS */
showInput = async (a: InputEvent) => {
  this.state.name = (a.target as HTMLInputElement).value;
}
</code></pre>

        <h4>Result</h4>
        <div class="result">
          <input type="text" data-bind="event: {input: showInput}, value: name" />
          <p>You entered: <span data-bind="innerHTML: name"></span></p>
        </div>

        <h3>#2: Select control</h3>
        <pre><code>${this.encodeHTMLEntities(`/* Template */
<button data-bind="event: { click: loadMovies }">Load movies</button>
<select data-bind="event: { change: setSelectedMovie }">
  <option data-bind="value: m.title, innerHTML: m.title, attr: { selected: movieIsSelected }"></option>
</select>
<p data-bind="innerHTML: selectedMovie.description"></p>`)}

/* JS */
loadData = async () => {
  const presentation = await this.slideService.getSlides();
  this.state.slides = presentation.slides;
}

setSelectedSlide = (a: Event) => {
  const slideHeader = (a.target as HTMLSelectElement).value;
  this.state.selectedSlideText = this.state.slides.filter(s => s.header === slideHeader)[0].body;
}

slideIsSelected = (s: SlideModel) => {
  return s?.body === this.state.selectedSlideText ? "selected" : null;
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
              <a href="javascript:void(0);" data-bind="event: { click: removeTodo }">Remove</span>
            </li>
          </ul>
        </div>
        `;
  }

  styles() {
    return /*CSS*/`
    ${CssRegistry.get("common")}
    .result {
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--light);
      background-color: #fff;
    }
    `;
  }

  initState() {
    let model = new MyModel();
    model.name = "Some text";
    model.movies = [];
    model.selectedMovie = null;
    model.todos = ["Write a framework", "Get famous"];
    model.todoText = "";
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
