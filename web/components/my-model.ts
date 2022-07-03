import { MovieModel } from "../../core/models/movie-model";

export class MyModel {
    name: string;
    movies: MovieModel[];
    selectedMovie: MovieModel;
    todoText: string;
    todos: string[];
    isLoadingMovies: boolean;
}