import { HomePage } from './web/components/home-page.js'
import { ServiceLocator } from './framework/service-locator.js'
import { SlideService } from './core/services/slide-service.js';
import { SlideRepository } from './infrastructure/repositories/slide-repository.js';
import { HttpAdapter } from './infrastructure/repositories/http-adapter.js';
import { Config } from './core/cross-cutting/config.js';
import { ExamplePage } from './web/components/example-page.js';
import { Router } from './framework/router.js';
import { GettingStartedPage } from './web/components/gettingstarted-page.js';

// register services
ServiceLocator.register(SlideService.name, () => new SlideService(ServiceLocator.resolve(SlideRepository.name), ServiceLocator.resolve(Config.name)));
ServiceLocator.register(SlideRepository.name, () => new SlideRepository(ServiceLocator.resolve(HttpAdapter.name), ServiceLocator.resolve(Config.name)));
ServiceLocator.register(HttpAdapter.name, () => new HttpAdapter());
ServiceLocator.register(Config.name, () => new Config());

// register components
customElements.define('home-page', HomePage);
customElements.define('example-page', ExamplePage);
customElements.define('gettingstarted-page', GettingStartedPage);

// init router
Router.init("home-page");