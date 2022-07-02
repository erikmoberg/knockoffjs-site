export class Fixture {
    constructor() {
        this.tests = [];
    }

    test(fn) {
        this.tests.push(fn);
    }

    async run() {
        for (const test of this.tests) {
            await test();
        }
    }

    equal(expected, actual, desc) {
        if (expected === actual) {
            console.log('%cOK: ' + desc, 'color: green;');
        } else {
            console.error(`Fail in ${desc}: Expected ${expected}, got ${actual}`);
        }
    }

    success(desc) {
        this.equal(1, 1, desc);
    }
}