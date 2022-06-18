let passwords = document.querySelectorAll('input[type="password"]')
let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let msgError = document.querySelector('.passwordRestrictionMessage');
let submit = document.querySelector('button');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('input');

function buildElement(element) {
    let elementNode = document.createElement(element);
    elementNode.classList.add("errorMsg");
    elementNode.setAttribute('style', 'position: absolute; top:55px')
    return elementNode;
}

window.addEventListener('load', () => {
    let elementNode = buildElement('div');
    password.parentNode.insertBefore(elementNode, password);
})

function validatePasswords(div) {
    if (password.value && confirmPassword.value) {
        if (password.value != confirmPassword.value) {
            div.textContent = "Passwords do not match!";
            confirmPassword.setCustomValidity('Passwords do not match!');
        } else {
            div.textContent = "";
            confirmPassword.setCustomValidity('');
            password.classList.remove('invalid');
            confirmPassword.classList.remove('invalid');
        }
    }
}

passwords.forEach(pass => {
    pass.addEventListener('blur', () => {
        let div = document.querySelector('[for="password"]+div')
        validatePasswords(div);
        pass.addEventListener('input', () => {
            validatePasswords(div);
        })
    })


});

form.addEventListener('submit', (event) => {
    if (password.value != confirmPassword.value) {
        event.preventDefault();
    }
})

submit.addEventListener('click', () => {
    inputs.forEach(input => {
        if (!input.value && input.validity.valid == false) {
            input.classList.add('invalid');
        }
    })
})

inputs.forEach(input => {
    if (!input.classList.contains('password')) {
        let div = document.createElement('div');
        div.classList.add("errorMsg");
        input.addEventListener('blur', () => {
            if (input.value && input.validity.valid == false) {
                input.classList.add('invalid');

                let id = input.getAttribute('id')
                let name = id.charAt(0).toUpperCase() + id.slice(1);
                div.textContent = `${name} is invalid!`
                div.setAttribute('style', 'position: absolute; top:55px')
                input.parentNode.insertBefore(div, input);

            } else if (input.value && input.validity.valid == true) {
                input.classList.remove('invalid');
            }
        })
    }

});

let eyes = document.querySelectorAll('.eyeIcon');
let eyesIcon = document.querySelectorAll('.eye_on');
let eyesIconOff = document.querySelectorAll('.eye_off');
let p = document.querySelector('h1+p');

eyes.forEach(eye => {
    eye.addEventListener('click', () => {
        passwords.forEach(password => {
            if (password.getAttribute('type') == 'password') {
                password.setAttribute('type', 'text');
                eyesIcon.forEach(eyeIcon => {
                    eyeIcon.classList.add('hidden');
                });
                eyesIconOff.forEach(eyeIconOff => {
                    eyeIconOff.classList.remove('hidden');
                })
            } else {
                password.setAttribute('type', 'password')
                eyesIcon.forEach(eyeIcon => {
                    eyeIcon.classList.remove('hidden');
                });
                eyesIconOff.forEach(eyeIconOff => {
                    eyeIconOff.classList.add('hidden');
                })
            }
        });
    })
});

window.addEventListener('resize', () => {
    setEyesIcons();
});

window.addEventListener('load', () => {
    setEyesIcons();
})

function setEyesIcons() {
    let pos = password.clientWidth - 24;
    eyes.forEach(eye => {
        eye.setAttribute('style', `left:${pos}px;`)
    })
}