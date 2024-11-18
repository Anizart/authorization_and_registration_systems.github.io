window.addEventListener('DOMContentLoaded', () => {

    const inputNameRegistration = document.querySelector('[data-name-registration]'),
          inputPasRegistration = document.querySelector('[data-password-registration]'),
          inputNameAuthorization = document.querySelector('[data-name-authorization]'),
          inputPasAuthorization = document.querySelector('[data-password-authorization]'),

          btnRegistration = document.querySelector('[data-btn-registration]'),
          btnAuthorization = document.querySelector('[data-btn-authorization]'),
          exit = document.querySelector('.user-panel__exit'),

          userNameText = document.querySelector('.user-panel__text');

    const userDB = [
        {
            userID: 1,
            userName: 'Alex',
            password: '12111211121',
        },
        {
            userID: 2,
            userName: 'Emma',
            password: '18812346501',
        },
    ];

    //+ Вызов displayCurrentUser при загрузке страницы:
    displayCurrentUser();

    document.querySelectorAll('.subscribe__form').forEach(form => form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Ваши данные приняты!');
        
        validateForm(btnRegistration);
        validateForm(btnAuthorization);
        event.target.reset();
    }));

    //+ Обработка кнопки регистрации:
    btnRegistration.addEventListener('click', (e) => {
        e.preventDefault();
        userVerification(inputNameRegistration, inputPasRegistration, 'Такой пользователь уже существует...', 'Добро пожаловать ');
        createObject(inputNameRegistration, inputPasRegistration);
    });

    //+ Обработка кнопки авторизации:
    btnAuthorization.addEventListener('click', (e) => {
        e.preventDefault();
        userVerification(inputNameAuthorization, inputPasAuthorization, 'Добро пожаловать ', 'Что-то набрано не верно');
    });

    //+ Выход:
    exit.addEventListener('click', () => {
        const currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            localStorage.removeItem('currentUser');
            alert('Вы вышли из аккаунта');
            location.reload();
        } else {
            alert('Сначало войдите, чтоб выйти ツ');
        }
    });

    function userVerification(inputName, inputPassword, answerOne, answerTwo) {
        const userName = inputName.value,
              userPassword = inputPassword.value;

        const isUserFound = userDB.find(user => {
            if (user.userName === userName && String(user.password) === userPassword) {
                alert(answerOne);
                localStorage.setItem('currentUser', JSON.stringify(user));
                displayCurrentUser();
                return true;
            }
            return false;
        });

        if (!isUserFound) {
            alert(answerTwo);
        }
    }

    function displayCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && userNameText) {
            userNameText.innerHTML = `
                <div>${currentUser.userName}</div>
            `;
        } else {
            userNameText.innerHTML = `
                <div>Войдите в систему</div>
            `
        }
    }

    function createObject(inputName, inputPassword) {
        const userName = inputName.value,
              userPassword = inputPassword.value;

        const neuUser = {
            userID: userDB.length + 1,
            userName,
            password: userPassword
        };

        userDB.push(neuUser);
        console.log(userDB);

        localStorage.setItem('userDB', JSON.stringify(userDB));
        localStorage.setItem('currentUser', JSON.stringify(neuUser));
        displayCurrentUser();
    }

    //+ Валидация:
    inputNameRegistration.addEventListener('input', () => validateForm(btnRegistration));
    inputPasRegistration.addEventListener('input', () => validateForm(btnRegistration));
    inputNameAuthorization.addEventListener('input', () => validateForm2(btnAuthorization));
    inputPasAuthorization.addEventListener('input', () => validateForm2(btnAuthorization));

    function validateName(username) {
        const name = username.value.trim();
        return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(name);
    }

    function validatePas(pas) {
        const password = pas.value.trim();
        return /^\d{11}$/.test(password);
    }

    function validateForm(btn) {
        const isNameValid = validateName(inputNameRegistration),
              isPasValid = validatePas(inputPasRegistration);

        if (isNameValid && isPasValid) {
            btn.classList.add('active-btn');
            btn.disabled = false;
        } else {
            btn.classList.remove('active-btn');
            btn.disabled = true;
        }
    }
    
    function validateForm2(btn) {
        const isNameValid = validateName(inputNameAuthorization),
              isPasValid = validatePas(inputPasAuthorization);

        if (isNameValid && isPasValid) {
            btn.classList.add('active-btn');
            btn.disabled = false;
        } else {
            btn.classList.remove('active-btn');
            btn.disabled = true;
        }
    }

    console.debug(userDB);
});
