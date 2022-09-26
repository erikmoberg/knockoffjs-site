import { CssRegistry } from '../../node_modules/knockoffjs/css-registry.js';
import { KnockoffJsBase } from '../../node_modules/knockoffjs/knockoffjs-base.js';

export class HomePage extends KnockoffJsBase<any> {
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
            <p>Built completely on web standards, such as web components, to ensure future compatibility. Mostly.</p>
          </div>
          <div>
            <h2>Extend</h2>
            <p>Adds features such reactivity and client-side routing and lets you focus on what matters: Messy business code.</p>
          </div>
          <div>
            <h2>Extinguish</h2>
            <p>Superior to other popular frameworks in any conceivable way; start using it now or be left in the dust.</p>
          </div>
        </section>
        <h3>Clients</h3>
        <p>Our (not fake) clients have happily been using KnockoffJS in production for several years with 100% satisfaction.</p>
        <div class="client-grid">
          <div><span>☣ biowastR</span></div>
          <div><span>☠ WebLurker</span></div>
          <div><span>♙ Chessify</span></div>
          <div><span>❽ 7Ball</span></div>
          <div><span>⚔ FancyFencing</span></div>
          <div><span>☢ Nukely</span></div>
        </div>

        <h3>Convinced yet?</h3>
        <p>We thought so! Now continue on to the <a href="/demos">Demos</a> to see what KnockoffJS can do.</p>
        `;
  }

  styles() {
    return /* CSS */`
    ${CssRegistry.get("common")}
    section {
      display: flex;
      justify-content: space-between;
    }
    section div {
      background-color: var(--dark-lighter);
      color: var(--light);
      padding: 1rem;
      border-radius: 0.5rem;
      flex: 0 27%;
      margin: 5px 0;
    }
    @media (max-width: 600px) {
      section {
        display: block;
      }
    }
    section div h2 {
      color: #fff;
      margin-top: 0;
    }
    .client-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
      column-gap: 2px;
      row-gap: 2px;
    }
    .client-grid div {
      height: 5rem;
      background-color: var(--light);
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-around;
      font-size: 2rem;
    }
    .client-grid div span {
      display: flex;
      align-items: center;
    }`;
  }
}
