const mocha = require('mocha');
const { EVENT_TEST_FAIL, EVENT_TEST_PASS } = mocha.Runner.constants;

class SimpleReporter {
  constructor(runner) {
    runner.on(EVENT_TEST_PASS, test => console.log(`${test.fullTitle()}\n<passed>`))
          .on(EVENT_TEST_FAIL, (test, err) => console.log(`${err.message}\n<failed>`));
  }
}

module.exports = SimpleReporter;
