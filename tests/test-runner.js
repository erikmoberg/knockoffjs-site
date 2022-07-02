import { NullishGuardHelperTests } from './nullish-guard-helper-tests.js';
import { NumberHelperTests } from './number-helper-tests.js'
import { SlideServiceTests } from './slide-service-tests.js';

export class TestRunner extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        (await new NumberHelperTests()).run();
        (await new SlideServiceTests()).run();
        (await new NullishGuardHelperTests()).run();
    }
}

customElements.define('test-runner', TestRunner);
