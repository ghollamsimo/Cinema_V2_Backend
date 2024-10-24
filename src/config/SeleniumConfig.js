import {Builder, Browser, By, Key, until } from 'selenium-webdriver'

import { setTimeout as sleep } from 'timers/promises';

(async function testing(){
    let driver = await new Builder().forBrowser("chrome").build();

    try {


        await driver.get('http://localhost:5173/login');

        await sleep(1000);

        await driver.wait(until.elementLocated(By.id('registerButton')), 10000);
        await sleep(1000);
        await driver.findElement(By.id('registerButton')).click();
        await driver.wait(until.elementLocated(By.id('registerForm')), 10000);

        await driver.wait(until.urlContains('login'), 2000);
        await sleep(1000);

        for (let character of 'newuser@example.com') {
            await driver.findElement(By.id('email')).sendKeys(character);
            await sleep(100);
        }

        for (let character of 'securePassword123') {
            await driver.findElement(By.id('password')).sendKeys(character);
            await sleep(100);
        }

        await sleep(1000);
        await driver.findElement(By.css('#loginForm button[type="submit"]')).click();


        for (let character of 'newUser') {
            await driver.findElement(By.id('username')).sendKeys(character);
            await sleep(100);
        }
        for (let character of 'newuser@example.com') {
            await driver.findElement(By.id('email')).sendKeys(character);
            await sleep(100);
        }

        for (let character of 'securePassword123') {
            await driver.findElement(By.id('password')).sendKeys(character);
            await sleep(100);
        }

        await driver.findElement(By.css('#registerForm button[type="submit"]')).click();




        await driver.wait(until.urlContains('client-reservation'), 10000);
        await sleep(1000);
        await driver.findElement(By.id('clientAccount')).click();
        await driver.wait(until.urlContains('my-account'), 10000);


    } finally {

        await driver.quit();
    }

})();
