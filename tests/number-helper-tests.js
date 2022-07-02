import { NumberHelper } from '../core/utils/number-helper.js'
import { Fixture } from './Fixture.js'

export class NumberHelperTests extends Fixture {

    constructor() {
        super();

        this.test(() => {
            const result = NumberHelper.getWithWrap(0, 1, 5);
            this.equal(1, result, 'getWithWrap should add 1');
        });

        this.test(() => {
            const result = NumberHelper.getWithWrap(3, 1, 3);
            this.equal(0, result, 'getWithWrap should wrap at max value');
        });

        this.test(() => {
            const result = NumberHelper.getWithWrap(0, -1, 3);
            this.equal(3, result, 'getWithWrap should wrap at min value');
        });
    }
}