let passwords = document.querySelectorAll('input[type="password"]')
let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let msgError = document.querySelector('.passwordRestrictionMessage');
let submit = document.querySelector('button');
let form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
let inputsNoPasswords = document.querySelectorAll('input:not([type="password"])');
let popup = document.querySelector('#popup');
let eyes = document.querySelectorAll('.eyeIcon');
let popupText = document.querySelector('.popuptext');

window.addEventListener('load', () => {
    if (eyes.length != 0) {
        setEyesIcons();
    }
    if (popup) {
        setRequirements();
    }
    if (password) {
        let elementNode = buildElement('div');
        password.parentNode.insertBefore(elementNode, password);
    }
})

window.addEventListener('resize', () => {
    if (eyes.length != 0) {
        setEyesIcons();
    }
    if (popup) {
        setRequirements();
    }
});

function setEyesIcons() {
    let pos = password.clientWidth - 24;
    eyes.forEach(eye => {
        eye.setAttribute('style', `left:${pos}px;`)
    })
}

function setRequirements() {
    let pos = password.clientWidth - 32;
    popup.setAttribute('style', `left:${pos}px;`)
}

eyes.forEach(eye => {
    eye.addEventListener('click', () => {
        passwords.forEach(password => {
            if (password.getAttribute('type') == 'password') {
                password.setAttribute('type', 'text');
                eyes.forEach(eyeVisibility => {
                    eyeVisibility.classList.contains('eye_on') ? eyeVisibility.classList.add('hidden') : eyeVisibility.classList.remove('hidden');
                })
            } else {
                password.setAttribute('type', 'password')
                eyes.forEach(eyeVisibility => {
                    eyeVisibility.classList.contains('eye_on') ? eyeVisibility.classList.remove('hidden') : eyeVisibility.classList.add('hidden');
                })
            }
        });
    })
});

function buildElement(element) {
    let elementNode = document.createElement(element);
    elementNode.classList.add("errorMsg");
    elementNode.setAttribute('style', 'position: absolute; bottom:3px')
    return elementNode;
}

function validatePasswords(div) {
    if (!password.validity.valid && password.value) {
        div.textContent = "Password not valid";
        confirmPassword.setCustomValidity("Password not valid");
        password.classList.add('invalid');
    } else {
        div.textContent = "";
        confirmPassword.setCustomValidity('');
        password.classList.remove('invalid');
        confirmPassword.classList.remove('invalid');
        if (password.value && confirmPassword.value) {
            if (password.value != confirmPassword.value) {
                div.textContent = "Passwords do not match!";
                confirmPassword.setCustomValidity('Passwords do not match!');
                password.classList.add('invalid');
                confirmPassword.classList.add('invalid');
            } else {
                div.textContent = "";
                confirmPassword.setCustomValidity('');
                password.classList.remove('invalid');
                confirmPassword.classList.remove('invalid');
            }
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

if (form) {
    form.addEventListener('submit', (event) => {
        if (password.value != confirmPassword.value) {
            event.preventDefault();
        }
    })
}


submit.addEventListener('click', () => {
    inputs.forEach(input => {
        if (!input.value && input.validity.valid == false) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    })
})

function validateInput(elementNode, input) {
    if (input.value && input.validity.valid == false) {
        input.classList.add('invalid');
        let id = input.getAttribute('id')
        let name = id.charAt(0).toUpperCase() + id.slice(1);
        elementNode.textContent = `${name} is invalid!`;
        input.parentNode.insertBefore(elementNode, input);

    } else if (input.value && input.validity.valid == true) {
        elementNode.textContent = ``;
        input.classList.remove('invalid');
    }
}

inputsNoPasswords.forEach(input => {
    let elementNode = buildElement('div');
    input.addEventListener('blur', () => {
        validateInput(elementNode, input);
        input.addEventListener('input', () => {
            validateInput(elementNode, input);
        })
    })
});

if (popup) {

    popup.addEventListener('click', () => {
        popupText.classList.toggle("show");
    })

    popup.addEventListener('mouseout', () => {
        setTimeout(() => {
            popupText.classList.remove("show");
        }, 5000);;
    })

    popup.addEventListener('blur', () => {
        setTimeout(() => {
            popupText.classList.remove("show");
        }, 5000);;
    })
}




const buttons = document.querySelectorAll(".worlds");
for (const button of buttons) {
    button.addEventListener("click", createRipple);
}
submit.addEventListener("click", createRipple);


function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}