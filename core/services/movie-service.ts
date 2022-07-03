import { MovieModel } from '../models/movie-model.js';

export class MovieService {
    async getMovies() : Promise<MovieModel[]> {

        const movies = [ 
            new MovieModel("Disaster Movie", "Over the course of one evening, an unsuspecting group of twenty-somethings find themselves bombarded by a series of natural disasters and catastrophic events."), 
            new MovieModel("Manos: The Hands of Fate", "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo."),
            new MovieModel("Superbabies: Baby Geniuses 2", "A group of smart-talking toddlers find themselves at the center of a media mogul's experiment to crack the code to baby talk. The toddlers must race against time for the sake of babies everywhere."),
            new MovieModel("Birdemic: Shock and Terror", "A horde of mutated birds descends upon the quiet town of Half Moon Bay, California. With the death toll rising, Two citizens manage to fight back, but will they survive Birdemic?"),
            new MovieModel("The Hottie & the Nottie", "A woman agrees to go on a date with a man only if he finds a suitor for her unattractive best friend.")
        ];

        // Return fake data, like we were calling an API
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(movies);
            }, 1000);
          });
    }
}
