import { SlideModel } from '../../core/models/slide-model.js';
import { SlideService } from '../../core/services/slide-service.js';
import { FrameworkBase } from '../../framework/framework-base.js';
import { ServiceLocator } from '../../framework/service-locator.js';
import { MyModel } from './my-model.js';

export class HomePage extends FrameworkBase<any> {
  constructor() {
    super();
  }

  template(): string {
    return /*html*/`
        <h2>About the framework</h2>
        <p>KnockoffJS is a new type of framework, as it both embraces web standards when it fits, and other things when that
        turns out to be too hard. Also, instead of imagining a new, modern syntax, it (mostly) uses the binding syntax from Knockout,
        a framework that was popular around 2011. Go figure.</p>
        <p>KnockoffJS was implemented with three values in mind: Embrace, Extend, and Extinguish.</p>
        <section>
          <div>
            <h2>Embrace</h2>
            <p>Built completely on web standards, such as web components, to ensure future compatibility.</p>
          </div>
          <div>
            <h2>Extend</h2>
            <p>Adds features such reactivity and client-side routing and lets you focus on what matters: Great code.</p>
          </div>
          <div>
            <h2>Extinguish</h2>
            <p>Superior to other popular frameworks in any conceivable way; start using it now or be left in the dust.</p>
          </div>
        </section>
        `;
  }

  styles() {
    return `
    section {
      display: flex;
    }`;
  }

  initState() {
    return {}
  }

  async afterInit() {
  }
}
