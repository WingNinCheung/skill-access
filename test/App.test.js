const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test("Testing ", async ({ page }) => {
  // go to the website
  await page.goto("http://localhost:3000/");

  // check if there is form rendered
  await expect(page.locator("form")).toBeVisible();

  // enter invalid candidate ID
  await page.fill('label[id="label"] + input', "12345");

  // check if the error message text is present
  const errorMessage = page.locator("ul");
  await expect(errorMessage).toBeVisible();

  // check if the button is not clickable
  const button = page.locator('button[type="submit"]');
  await expect(button).toBeDisabled();

  // enter valid id
  await page.fill('label[id="label"] + input', "889");
  await button.click();

  // check the stats is present
  const container = page.locator(".stats-container");
  await expect(container).toBeVisible();

  // check the plots are present
  const plot = page.locator(".user-select-none");
  await expect(plot).toBeVisible();

  await page.waitForTimeout(5000);
});
