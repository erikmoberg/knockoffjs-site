import { NullishGuardHelperTests } from './nullish-guard-helper-tests.js';

export class TestRunner extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        (await new NullishGuardHelperTests()).run();
    }
}

customElements.define('test-runner', TestRunner);
