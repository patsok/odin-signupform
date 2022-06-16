let passwords = document.querySelectorAll('input[type="password"]')
let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let msgError = document.querySelector('.passwordRestrictionMessage');
let submit = document.querySelector('button');
let form = document.querySelector('form');

passwords.forEach(pass => {
    pass.addEventListener('blur', () => {
        if (password.value && confirmPassword.value) {
            password.value == confirmPassword.value ? msgError.textContent = "All okay!" : msgError.textContent = "Passwords do not match!";
        } else {
            msgError.textContent = "";
        }

    })
});

form.addEventListener('submit', (event) => {
    if (password.value != confirmPassword.value) {
        event.preventDefault();
    }
})