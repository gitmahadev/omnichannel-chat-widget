// DotEnv allows local variables for process.env
require("dotenv").config();
// timeout for waiting for a specific test to complete.
require("dotenv").config();
jest.setTimeout((process.env.TestTimeoutMinutes || 10) * 60 * 1000);
jest.retryTimes(process.env.TestRetryCount || 0);
if (!process.env.Verbose) {
  console.log = function (data) {};
}
