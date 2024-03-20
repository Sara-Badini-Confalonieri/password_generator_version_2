document.addEventListener("DOMContentLoaded", function () {
    var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
    var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var upperCasedCharacters = lowerCasedCharacters.map(char => char.toUpperCase());

    var passwordForm = document.querySelector('#passwordForm');
    var copyPasswordBtn = document.querySelector('#copyPasswordBtn');

    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        writePassword();
    });

    function getPasswordOptions() {
        var passwordLength = parseInt(document.querySelector("#passwordLength").value);

        if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
            alert('Invalid input. Password length must be a number between 8 and 128.');
            return null;
        }

        var uppercaseOptions = document.querySelector("#uppercaseCheckbox").checked;
        var lowercaseOptions = document.querySelector("#lowercaseCheckbox").checked;
        var numericOptions = document.querySelector("#numericCheckbox").checked;
        var symbolsOptions = document.querySelector("#symbolsCheckbox").checked;

        if (!uppercaseOptions && !lowercaseOptions && !numericOptions && !symbolsOptions) {
            alert('At least one option must be selected.');
            return null;
        }

        return {
            passwordLength: passwordLength,
            uppercaseOptions: uppercaseOptions,
            lowercaseOptions: lowercaseOptions,
            numericOptions: numericOptions,
            symbolsOptions: symbolsOptions
        };
    }

    function generatePassword() {
        var options = getPasswordOptions();
        if (!options) return "";

        var optionsSelected = [];

        if (options.lowercaseOptions) {
            optionsSelected = optionsSelected.concat(lowerCasedCharacters);
        }
        if (options.uppercaseOptions) {
            optionsSelected = optionsSelected.concat(upperCasedCharacters);
        }
        if (options.numericOptions) {
            optionsSelected = optionsSelected.concat(numericCharacters);
        }
        if (options.symbolsOptions) {
            optionsSelected = optionsSelected.concat(specialCharacters);
        }

        var generatedPassword = '';
        for (var i = 0; i < options.passwordLength; i++) {
            var randomChar = getRandom(optionsSelected);
            generatedPassword += randomChar;
        }

        return generatedPassword;
    }

    function getRandom(arr) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    function writePassword() {
        var password = generatePassword();
        var passwordText = document.querySelector('#password');
        passwordText.value = password;

        if (!copyPasswordBtn._listenerAdded) {
            copyPasswordBtn.addEventListener('click', function () {
                copyToClipboard(password);
            });
            copyPasswordBtn._listenerAdded = true;
        }
    }

    function copyToClipboard(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Password copied to clipboard!');
    }
});


function addLetterToBackground(event) {
    const letter = document.createElement('span');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    letter.textContent = randomLetter;
    letter.style.position = 'absolute';
    letter.style.color = '#589490'; 
    letter.style.fontWeight = 'bold'; 
    letter.style.fontSize = '30px';
    letter.style.zIndex = '-1'; 

    const newX = event.clientX - 10; 
    const newY = event.clientY - 20; 

    letter.style.left = `${newX}px`;
    letter.style.top = `${newY}px`;

    document.body.appendChild(letter);

    setTimeout(() => {
        letter.remove();
    }, 1000);
}


let lastUpdateTime = Date.now();
document.body.addEventListener('mousemove', function(event) {
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime > 150) {
        addLetterToBackground(event);
        lastUpdateTime = currentTime;
    }
});
