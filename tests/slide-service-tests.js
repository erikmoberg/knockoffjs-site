import { SlideService } from '../core/services/slide-service.js'
import { Fixture } from './Fixture.js'
import { SlideEntity } from '../infrastructure/entities/slide-entity.js';
import { PresentationEntity } from '../infrastructure/entities/presentation-entity.js';

export class SlideServiceTests extends Fixture {

    constructor() {
        super();

        this.test(async () => {
            const fakeSlideRepository = { getSlides: () => new PresentationEntity('title', [ new SlideEntity('header', ['body']) ]) };
            const slideService = new SlideService(fakeSlideRepository);
            
            const result = await slideService.getSlides();
            
            this.equal('title', result.title, 'getSlides should return a title');
            this.equal(1, result.slides.length, 'getSlides should return a collection');
            this.equal('header', result.slides[0].header, 'getSlides should fill header');
            this.equal('body', result.slides[0].body, 'getSlides should fill body');
        });
    }
}