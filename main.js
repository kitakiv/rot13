const userFirstNameInput = document.getElementById('name')
const userLastNameInput = document.getElementById('surname')
const userPasswordInput = document.getElementById('password')
const checkPass = document.querySelector('.check')
const popUp = document.querySelector('.pop-up')
const userContent = document.querySelector('.user-content')

checkPass.addEventListener('change', function() {
    if (this.checked) {
        userPasswordInput.type = 'text'
    } else {
        userPasswordInput.type = 'password'
    }
})
function encodeToRot13(str) {
    const originalAlpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const cipher = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM5678901234';
    return str.replace(/[A-Za-z0-9]/g, (letter) => cipher[originalAlpha.indexOf(letter)]);
  }

let users = [{
    name: 'Student1',
    surname: 'SurnameStd1',
    password: '409kbSTD'
}, {
    name: 'Student2',
    surname: 'SurnameStd2',
    password: '410kbSTD'
}]

let admin = [{
    name: 'Admin',
    surname: 'surnameAdmin',
    password: 'admin147258'
}]

function masSfr(mas) {
    const sfr = mas.reduce((acc, elem) => {
        elem.name = encodeToRot13(elem.name);
        elem.surname = encodeToRot13(elem.surname);
        elem.password = encodeToRot13(elem.password);
        return [...acc, elem];
    }, [])
    return sfr
}

if (JSON.parse(localStorage.getItem('usersInformation')) === null) {
    localStorage.setItem('usersInformation', JSON.stringify(masSfr(users)));
    localStorage.setItem('isUser', JSON.stringify(false))
    localStorage.setItem('isAdmin', JSON.stringify(false))
    localStorage.setItem('adminInformation', JSON.stringify(masSfr(admin)))
}

function regUser() {
    let flagUser = JSON.parse(localStorage.getItem('isUser'))
    if (flagUser) {
        if (!popUp.classList.contains('hidden')) {
            popUp.classList.add('hidden');
        }
        document.querySelector('.user-admin').innerHTML = 'User';
        if (userContent.classList.contains('hidden')) {
            userContent.classList.remove('hidden');
        }
    }
}

function loginUser() {
    const usersSfr = masSfr(JSON.parse(localStorage.getItem('usersInformation')));
    const adminSfr =  masSfr(JSON.parse(localStorage.getItem('adminInformation')));
    for (let i = 0; i < users.length; i++) {
        if (usersSfr[i].name === `${userFirstNameInput.value}` &&  usersSfr[i].surname === `${userLastNameInput.value}` && usersSfr[i].password === `${userPasswordInput.value}`) {
            console.log('user')
            localStorage.setItem('isUser', JSON.stringify(true));
            regUser();
        }
    }
    //admin
    for (let a = 0; a < users.length; a++) {
        if (adminSfr[a].name === `${userFirstNameInput.value}` &&  adminSfr[a].surname === `${userLastNameInput.value}` && adminSfr[a].password === `${userPasswordInput.value}`) {
            console.log('admin')
        }
    }

}

if (JSON.parse(localStorage.getItem('isUser'))) {
    regUser()
}

document.getElementById('form').addEventListener('submit', loginUser)