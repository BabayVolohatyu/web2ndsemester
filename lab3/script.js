function sum(){
    let sum = 0;
    let i = 1;

    while (i <= 50) {
        sum += i;
        i++;
    }
    return sum;
}
console.log('Sum of first 50 natural:', sum());

function factorial(number){
    if(number === 1 || number === 0) return 1;
    else return number*factorial(number-1);
}

let number = parseInt(prompt("Enter number to give factorial:"));
console.log(`Factorial of ${number} equals`, factorial(number));

function month(number){
    switch (number) {
        case 1:
            console.log("January");
            break;
        case 2:
            console.log("February");
            break;
        case 3:
            console.log("March");
            break;
        case 4:
            console.log("April");
            break;
        case 5:
            console.log("May");
            break;
        case 6:
            console.log("June");
            break;
        case 7:
            console.log("July");
            break;
        case 8:
            console.log("August");
            break;
        case 9:
            console.log("September");
            break;
        case 10:
            console.log("October");
            break;
        case 11:
            console.log("November");
            break;
        case 12:
            console.log("December");
            break;
        default:
            console.log("Invalid number: "+number);
    }
}

let monthNumber = parseInt(prompt("Enter number to give month:"));
month(monthNumber);

function sumOfEvenNumbers(arr) {
    let sum = 0;
    for (let num of arr) {
        if (num % 2 === 0) {
            sum += num;
        }
    }
    return sum;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Sum of even:", sumOfEvenNumbers(numbers));

const countVowels = (str) => {
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
};

let inputString = "Fifth task";
console.log("Number of vowels:", countVowels(inputString));

function power(base, exponent) {
    return Math.pow(base, exponent);
}

const base = 7;
const exponent = 5;
console.log(`${base} to power of ${exponent} equals ${power(base, exponent)}`);