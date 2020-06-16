// http://nightwatchjs.org/gettingstarted#settings-file

module.exports = {
  test_settings: {
    chrome: {
      desiredCapabilities: {
        chromeOptions: {
          args: ['--headless'],
        },
      },
    },
  },
};
