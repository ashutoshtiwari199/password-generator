const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

let capital = 'QWERTYUIOPASDFGHJKLZXCVBNM'
let lower = 'qwertyuiopzxcvbnmasdfglkjh'
let symbol = '!@#$%^&*';
let number = '1234567890'

clipboardEl.addEventListener('click', () => {
    navigator.clipboard.writeText(resultEl.innerText);
    alert(`Text Copied: ${resultEl.innerText}`)
})

generateEl.addEventListener('click', () => {
    generatePassword(lowercaseEl?.checked, numbersEl?.checked,
         symbolsEl?.checked, uppercaseEl?.checked, lengthEl.value) 
})

function generatePassword(lower, number, symbol, upper, length) {
    let password = '';    
    if(!lower && !number && !symbol && !upper) alert("Mark at least one option")
    for(let i=0; i<length; i++ ){
        if(length < 8) {
            alert('Password must be 8-20 charecter');
            break;
        }
        if(lower) password += getRandomLower();
        if(number) password += getRandomNumber();
        if(symbol) password += getRandomSymbol();
        if(upper) password += getRandomUpper();
    }
    password = password.slice(0, length);
    resultEl.innerText = randomize(password); 
}

function getRandomLower() {
    return lower.split('')[Math.ceil(Math.random() * 15)]
}

console.log(getRandomLower())

function getRandomUpper() {
    return capital.split('')[Math.ceil(Math.random() * 15)]

}

function getRandomNumber() {
    return number.split('')[Math.floor(Math.random() * 10)]
}

function getRandomSymbol() {
    let value =symbol.split('')[Math.ceil(Math.random() * 8) -1 ]
    return value
}


/*
* Since I am calling the function in sequence, Randomize the text is required
* Hence adding a prototype to randomize the string.
*/

__proto__.randomize = function (passwordText){

    let pwArray = passwordText.split('');
    for (let i = pwArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pwArray[i], pwArray[j]] = [pwArray[j], pwArray[i]];
    }
    return pwArray.join('');
}
