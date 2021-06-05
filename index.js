const fetch = require('node-fetch');
const chalk = require('chalk');

// fetched data will be stored in the array:
let receiptData = [];

async function getDataFromURL() {
    const url = 'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1';
    const res = await fetch(url);
    const data = await res.json();
    receiptData = data.slice()
    printReceipt();
};
getDataFromURL();

function productsPrint(arr) {
    arr.map((item) => {
        let name = item.name;
        console.log(chalk.green(`... ${name}`));

        let price = String(item.price.toFixed(1)).replace(/\./g, ',');
        console.log(`   Price: $${price}`);

        let desc = item.description.substring(0, 29);
        console.log(`   ${desc}...`);

        let weight = item.weight ? (item.weight + 'g') : "N/A";
        console.log(`   Weight: ${weight}`);
    });
};

function printReceipt() {
    // DOMESTIC
    console.log(chalk.magenta('. Domestic'));
    let domestic = receiptData.filter((item) => item.domestic === true);
    sortedDomestic = domestic.sort((a, b) => (a.name > b.name ? 1 : -1));
    productsPrint(sortedDomestic);

    // IMPORTED
    console.log(chalk.cyan('. Imported'));
    let imported = receiptData.filter((item) => item.domestic === false);
    sortedImported = imported.sort((a, b) => (a.name < b.name ? 1 : -1));
    productsPrint(sortedImported);

    // COSTS
    let domesticPrices = [];
    sortedDomestic.forEach((item) => {
        domesticPrices.push(item.price);
    });
    let domesticTotalPrice = domesticPrices.reduce((acc, val) => acc + val, 0);
    console.log(chalk.magenta(`Domestic cost: $${String(parseInt(domesticTotalPrice).toFixed(1)).replace(/\./g, ',')}`));

    let importedPrices = [];
    sortedImported.forEach((item) => {
        importedPrices.push(item.price);
    });
    let importedTotalPrice = importedPrices.reduce((acc, val) => acc + val, 0);
    console.log(chalk.cyan(`Imported cost: $${String(parseInt(importedTotalPrice).toFixed(1)).replace(/\./g, ',')}`));

    // COUNTS
    console.log(chalk.magenta(`Domestic count: ${sortedDomestic.length}`));
    console.log(chalk.cyan(`Imported count: ${sortedImported.length}`));
};




