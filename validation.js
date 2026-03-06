document.addEventListener('DOMContentLoaded', function () {
    const RegisterForm = document.querySelector('.register-form');

    if (!RegisterForm) { return; }

    const registerButton = RegisterForm.querySelector('.btn-success');

    if (registerButton) {
        registerButton.addEventListener('click', function (event) {
            event.preventDefault();

            clearOldErrors();

            let isValid = true;

            const nameInput = document.getElementById('reg-name');
            const nameValue = nameInput.value.trim();

            if (nameValue === "") {
                showError(nameInput, 'Введите имя');
                isValid = false;
            } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
                showError(nameInput, 'Введите фамилию и имя');
                isValid = false;
            }

            const emailInput = document.getElementById('reg-email');
            const emailValue = emailInput.value.trim();

            if (emailValue === "") {
                showError(emailInput, 'Введите email');
                isValid = false;
            } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
                showError(emailInput, 'Введите корректный email');
                isValid = false;
            }

            const passwordInput = document.getElementById('reg-password');
            const passwordValue = passwordInput.value.trim();

            if (passwordValue === "") {
                showError(passwordInput, 'Введите пароль');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showError(passwordInput, 'Пароль должен быть минимум 6 символов');
                isValid = false;
            }

            const passwordInputConfirm = document.getElementById('reg-password-confirm');
            const passwordValueConfirm = passwordInputConfirm.value.trim();

            if (passwordValueConfirm !== passwordValue) {
                showError(passwordInputConfirm, 'Пароли не совпадают');
                isValid = false;
            }

            const agreeCheck = document.getElementById('agree');
            if (!agreeCheck.checked) {
                alert('Необходимо согласиться с условиями использования');
                isValid = false;
            }

            if (isValid) {
                const formData = {
                    name: nameValue,
                    email: emailValue,
                    password: passwordValue,
                };

                const event = new CustomEvent('formValid', { detail: formData });
                document.dispatchEvent(event);

                alert('Регистрация прошла успешно!');
            }
        });
    }

    function showError(input, message) {
        input.style.border = '2px solid #ff3860';

        const parent = input.closest('.input-field');
        if (parent) {
            const oldError = parent.querySelector('.error-message');
            if (oldError) oldError.remove();

            const errorMsg = document.createElement('small');
            errorMsg.classList.add('error-message');
            errorMsg.style.color = '#ff3860';
            errorMsg.style.fontSize = '12px';
            errorMsg.style.marginLeft = '15px';
            errorMsg.textContent = message;
            parent.appendChild(errorMsg);
        }
    }
    function clearOldErrors() {
        document.querySelectorAll('.input-field input').forEach(input => {
            input.style.border = '';
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
});