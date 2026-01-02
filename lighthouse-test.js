import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

(async () => {
  try {
    const chrome = await launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'seo'],
      port: chrome.port
    };
    const runnerResult = await lighthouse('http://localhost:9006', options);

    // runnerResult.lhr is the JSON Lighthouse Result object
    console.log(JSON.stringify(runnerResult.lhr, null, 2));

    await chrome.kill();
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    process.exit(1);
  }
})();