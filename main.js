#! /usr/bin/env node
import inquirer from 'inquirer';
// Currency conversion rates
const conversionRates = {
    USD_TO_EUR: 0.84,
    USD_TO_GBP: 0.72,
    EUR_TO_USD: 1.19,
    GBP_TO_USD: 1.39,
    EUR_TO_GBP: 0.86,
    GBP_TO_EUR: 1.16,
};
// Function to perform currency conversion
function convertCurrency(amount, from, to) {
    const conversionKey = `${from}_TO_${to}`;
    if (conversionRates.hasOwnProperty(conversionKey)) {
        return amount * conversionRates[conversionKey];
    }
    else {
        throw new Error('Conversion not supported');
    }
}
// Inquirer prompt to get user input
async function getUserInput() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to convert:',
            validate: (input) => {
                return !isNaN(parseFloat(input)) && parseFloat(input) > 0;
            },
        },
        {
            type: 'list',
            name: 'from',
            message: 'Select the currency to convert from:',
            choices: ['USD', 'EUR', 'GBP'],
        },
        {
            type: 'list',
            name: 'to',
            message: 'Select the currency to convert to:',
            choices: ['USD', 'EUR', 'GBP'],
        },
    ]);
    const { amount, from, to } = userInput;
    const convertedAmount = convertCurrency(parseFloat(amount), from, to);
    console.log(`${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`);
}
// Call the function to start the program
getUserInput().catch((error) => console.error(error));
