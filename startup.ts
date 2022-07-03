import { HomePage } from "./web/components/home-page.js"
import { ServiceLocator } from "./framework/service-locator.js"
import { MovieService } from "./core/services/movie-service.js";
import { DemosPage } from "./web/components/demos-page.js";
import { Router } from "./framework/router.js";
import { GettingStartedPage } from "./web/components/gettingstarted-page.js";
import { CssRegistry } from "./framework/css-registry.js";
import { DocumentationPage } from "./web/components/documentation-page.js";

// register services
ServiceLocator.register(MovieService.name, () => new MovieService());

// register components
customElements.define("home-page", HomePage);
customElements.define("demos-page", DemosPage);
customElements.define("gettingstarted-page", GettingStartedPage);
customElements.define("documentation-page", DocumentationPage);

// register common styles
CssRegistry.register("common", /* CSS */
`code, pre code {
    background-color: var(--dark-lighter);
    color: var(--light);
  }
  code {
    padding: 0.15rem;
    border-radius: 0.15rem;
  }
  pre code {
    display: block;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  a, a:visited {
    color: var(--accent);
  }
  a:hover {
    color: var(--accent-alt);
  }
`);

// init router
Router.init("home-page");