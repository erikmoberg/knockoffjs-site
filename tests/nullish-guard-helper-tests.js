import { NullishGuard } from '../core/utils/nullish-guard.js';
import { Fixture } from './Fixture.js'

export class NullishGuardHelperTests extends Fixture {

    constructor() {
        super();

        this.test(() => {
            let ex = null;
            try {
                NullishGuard.guard(null, 'test');
            } catch (e) {
                ex = e;
            }
            
            this.equal('test is null or undefined.', ex.message, 'guard with null should throw');
        });

        this.test(() => {
            let ex = null;
            try {
                NullishGuard.guard(undefined, 'test');
            } catch (e) {
                ex = e;
            }
            
            this.equal('test is null or undefined.', ex.message, 'guard with undefined should throw');
        });

        this.test(() => {
            NullishGuard.guard('not null', 'test');
            this.success('guard with not null should not throw');
        });
    }
}