var passwordGenerator = (function () {
    'use strict'
    //DOMs instead of VARs
    const resultEl = document.getElementById('result');
    const lengthEl = document.getElementById('length');
    const lengthNumberElement = document.getElementById('length-number');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateEl = document.getElementById('generate');
    const clipboardEl = document.getElementById('clipboard');
    const copiedElement = document.getElementById('copied');

    //calls on the function that creates random letters, numbers and symbols
    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    const maxLength = 128;

    function assignEvents() {
        lengthEl.addEventListener('input', (event) => {
            lengthNumberElement.value = event.target.value;
            autoGeneratePassword();
        });

        lengthNumberElement.addEventListener('change', (event) => {
            lengthEl.value = event.target.value;
            autoGeneratePassword();
        });

        lengthNumberElement.addEventListener('keydown', (event) => {
            if (event.target.value > maxLength) {
                event.target.value = maxLength;
            }
        });

        uppercaseEl.addEventListener('change', () => {
            autoGeneratePassword();
        });

        lowercaseEl.addEventListener('change', () => {
            autoGeneratePassword();
        });

        numbersEl.addEventListener('change', () => {
            autoGeneratePassword();
        });

        symbolsEl.addEventListener('change', () => {
            autoGeneratePassword();
        });

        generateEl.addEventListener('click', () => {
            autoGeneratePassword();
            hideCopiedNotification();
        });

        clipboardEl.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            const password = resultEl.value;

            if (!password) { return; }

            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            showCopiedNotification();
        });
    }

    function hideCopiedNotification() {
        if (copiedElement.classList.contains("show")) {
            copiedElement.classList.remove("show");
        }
    }

    function showCopiedNotification() {
        hideCopiedNotification();
        copiedElement.classList.add("show");
        setTimeout(hideCopiedNotification, 1000);
    }

    function autoGeneratePassword() {
        const length = +lengthEl.value;
        const hasLower = lowercaseEl.checked;
        const hasUpper = uppercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    }

    function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

        // no type
        if (typesCount === 0) {
            return '';
        }

        // makes a loop
        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        return generatedPassword.slice(0, length);
    }

    //creates random letters, numbers and symbols
    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
        return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
        const symbols = "!@#$%^&*()`'-+/";
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    return {
        init: function () {
            lengthNumberElement.value = lengthEl.value;
            assignEvents();
            autoGeneratePassword();
        }
    }
})();

passwordGenerator.init();