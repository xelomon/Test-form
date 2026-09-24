document.addEventListener('DOMContentLoaded', function() {
    const birthDateInput = document.getElementById('birth-day');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('pass-verific');
    const form = document.getElementById('form');
    const birthErrorElement = document.getElementById('birth-error');
    const passErrorElement = document.getElementById('pass-error');

    // Функции проверки возраста
    function calculateAge(birthDateValue) {
        const today = new Date();
        const birth = new Date(birthDateValue);
        let age = today.getFullYear() - birth.getFullYear();

        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    function showBirthError(message) {
        birthErrorElement.textContent = message;
        birthErrorElement.style.display = 'block';
        birthDateInput.style.outline = '2px solid #FFA100';
    }

    function hideBirthError() {
        birthErrorElement.style.display = 'none';
        birthDateInput.style.outline = '';
    }

    // Функции проверки паролей
    function checkPasswordStrength(pass) {
        let errorMessage = '';
        
        if (pass.length < 8) errorMessage += 'не менее 8 символов, ';
        if (!/[a-z]/.test(pass)) errorMessage += 'строчные буквы, ';
        if (!/[A-Z]/.test(pass)) errorMessage += 'прописные буквы, ';
        if (!/\d/.test(pass)) errorMessage += 'цифры, ';
        if (!/[@$!%*?&]/.test(pass)) errorMessage += 'специальные символы (@$!%*?&), ';
        
        // Убирать последнюю запятую и пробел
        if (errorMessage) {
            errorMessage = errorMessage.slice(0, -2);
        }
        
        return {
            isValid: errorMessage === '',
            errorMessage: errorMessage
        };
    }

    function showPassError(message) {
        passErrorElement.textContent = message;
        passErrorElement.style.display = 'block';
        password.style.outline = '2px solid #FFA100';
        confirmPassword.style.outline = '2px solid #FFA100';
    }

    function hidePassError() {
        passErrorElement.style.display = 'none';
        password.style.outline = '';
        confirmPassword.style.outline = '';
    }

    // Обработчики для скрытия ошибок при вводе
    birthDateInput.addEventListener('input', hideBirthError);
    password.addEventListener('input', hidePassError);
    confirmPassword.addEventListener('input', hidePassError);

    // Общая обработка отправки формы
    form.addEventListener('submit', function(event) {
        let hasErrors = false;

        // Проверка возраста
        const birthDateValue = birthDateInput.value;
        const age = calculateAge(birthDateValue);
        if (age < 18) {
            showBirthError('Отправка невозможна, возраст меньше 18 лет');
            hasErrors = true;
        } else {
            hideBirthError();
        }

        // Проверка сложности пароля
        const passValidation = checkPasswordStrength(password.value);
        if (!passValidation.isValid) {
            showPassError('Пароль должен содержать: ' + passValidation.errorMessage);
            hasErrors = true;
        }

        // Проверка совпадения паролей
        if (password.value !== confirmPassword.value) {
            showPassError('Пароли не совпадают');
            hasErrors = true;
        }

        // Если пароль прошел проверку сложности и совпадения, ошибка скрывается
        if (passValidation.isValid && password.value === confirmPassword.value) {
            hidePassError();
        }

        // Блокировка отправки при ошибках
        if (hasErrors) {
            event.preventDefault();
        }
    });

    // Сброс всех ошибок при очистке формы
    form.addEventListener('reset', function() {
        hideBirthError();
        hidePassError();
    });
});