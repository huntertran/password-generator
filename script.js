var passwordGenerator = (function () {
    'use strict'
    const resultElement = document.getElementById('result');
    const lengthElement = document.getElementById('length');
    const lengthNumberElement = document.getElementById('length-number');
    const uppercaseElement = document.getElementById('uppercase');
    const lowercaseElement = document.getElementById('lowercase');
    const numbersElement = document.getElementById('numbers');
    const symbolsElement = document.getElementById('symbols');
    const generateElement = document.getElementById('generate');
    const clipboardElement = document.getElementById('clipboard');
    const copiedElement = document.getElementById('copied');

    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    const maxLength = 128;

    function assignEvents() {
        lengthElement.addEventListener('input', (event) => {
            lengthNumberElement.value = event.target.value;
            autoGeneratePassword();
        });

        lengthNumberElement.addEventListener('change', (event) => {
            lengthElement.value = event.target.value;
            autoGeneratePassword();
        });

        lengthNumberElement.addEventListener('keydown', (event) => {
            if (event.target.value > maxLength) {
                event.target.value = maxLength;
            }
        });

        uppercaseElement.addEventListener('change', () => {
            autoGeneratePassword();
        });

        lowercaseElement.addEventListener('change', () => {
            autoGeneratePassword();
        });

        numbersElement.addEventListener('change', () => {
            autoGeneratePassword();
        });

        symbolsElement.addEventListener('change', () => {
            autoGeneratePassword();
        });

        generateElement.addEventListener('click', () => {
            autoGeneratePassword();
            hideCopiedNotification();
        });

        clipboardElement.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            const password = resultElement.value;

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
        const length = +lengthElement.value;
        const hasLower = lowercaseElement.checked;
        const hasUpper = uppercaseElement.checked;
        const hasNumber = numbersElement.checked;
        const hasSymbol = symbolsElement.checked;

        resultElement.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    }

    function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

        if (typesCount === 0) {
            return 'no type selected';
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

    function checkServiceWorker() {
        if ('serviceWorker' in navigator) {
            console.log('CLIENT: service worker registration in progress.');
            navigator.serviceWorker.register('service-worker.js').then(function () {
                console.log('CLIENT: service worker registration complete. The APP now can work offline');
            }, function () {
                console.log('CLIENT: service worker registration failure.');
            });
        } else {
            console.log('CLIENT: service worker is not supported.');
        }
    }

    return {
        init: function () {
            lengthNumberElement.value = lengthElement.value;
            assignEvents();
            autoGeneratePassword();
            checkServiceWorker();
        }
    }
})();

passwordGenerator.init();