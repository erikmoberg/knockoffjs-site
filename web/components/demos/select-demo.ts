import { MovieModel } from "../../../core/models/movie-model.js";
import { MovieService } from "../../../core/services/movie-service.js";
import { KnockoffJsBase } from "../../../node_modules/knockoffjs/knockoffjs-base.js";
import { ServiceLocator } from "../../../node_modules/knockoffjs/service-locator.js";

class SelectDemoModel {
  isLoadingMovies: boolean;
  movies: MovieModel[];
  selectedMovie: MovieModel;
}

export class SelectDemo extends KnockoffJsBase<SelectDemoModel> {

  movieService: MovieService;
  
  constructor() {
    let model = new SelectDemoModel();
    model.movies = [];
    model.selectedMovie = null;
    
    super(model);

    this.movieService = ServiceLocator.resolve<MovieService>(MovieService.name)
  }

  template(): string {
    return /*html*/`
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
    </div>`;
  }

  styles() {
    return /*CSS*/`
    `;
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
}
