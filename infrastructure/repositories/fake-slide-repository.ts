import { PresentationEntity } from "../entities/presentation-entity.js";
import { SlideEntity } from "../entities/slide-entity.js";

export class FakeSlideRepository {
    constructor() {
    }

    async getSlides() : Promise<PresentationEntity> {
        return new PresentationEntity("title", [
            new SlideEntity(`Stackless`, 
                [`<p>Native web development with web components</p>`]),

            new SlideEntity(`JS: The beginning`, 
                [`<p>Producing testable, well factored front end code was hard</p>
                 <p>DOM, JS, and CSS all global and brittle</p>
                 <p>Inconsistent browser behavior</p>`]),

            new SlideEntity(`Build tools to the rescue`, 
                 [`<p>Reusable modules with NPM</p>
                  <p>Transpiling, bundling</p>
                  <p>Mature Frameworks: React, Angular, Vue</p>`]),

            new SlideEntity(`However...`, 
                 [`<p>Tools and dependencies need maintenance</p>
                  <p>=> More complexity</p>`]),

            new SlideEntity(`Things change`, 
                 [`<p>Example: AngularJS vs Angular</p>
                  <p>Framework fatigue</p>
                  <p>No evergreen knowledge?</p>`]),

            new SlideEntity(`The stackless way`, 
                  [`<p>No build tools</p>
                   <p>Well-factored code</p>
                   <p>100% web standards</p>`]),

            new SlideEntity(`ES Modules`, [`
                   <p>Well-factored code without build tools</p>
                   <p>With modules, we can factor code as we see fit</p>
                   <p>The browser is our build tool</p>`]),

            new SlideEntity(`ES Modules: import`, [`
                   <code>import { SampleService } from 'sample-service.js';</code>`]),

            new SlideEntity(`Web components: The non-framework`, [`
                   <p>Custom elements</p>
                   <p>Shadow DOM</p>
                   <p>HTML templates</p>`]),

            new SlideEntity(`You may not need NPM`, 
                [`<p>And other lies I keep telling myself</p>`]),

            new SlideEntity(`My image`, [`
                <img src="images/image.png" />`],
                true),

            new SlideEntity(`The end`, [`
                <p>End</p>`]),
        ]);
    }
}
