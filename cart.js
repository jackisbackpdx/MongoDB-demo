const email = document.getElementById('email');
const password = document.getElementById('password');
const register = document.getElementById('register');
const login = document.getElementById('login')

register.addEventListener('click', function() {
    const newUserEmail = email.value;
    const newUserPassword = password.value;

    let JSONcart;
    JSONcart = JSON.parse(localStorage.getItem('USERS'));
    console.log(JSONcart);
    if(!JSONcart) {
        JSONcart = [];
    }

    if (!email.value || !password.value) return alert('Please fill out required fields');
    if (JSONcart.find(user => user.email === newUserEmail)) return alert('There is an account with that email already registered');
    let user = {
        email: newUserEmail,
        password: newUserPassword,
    };

    
    JSONcart.push(user);

    const stringifiedCart = JSON.stringify(JSONcart);

    localStorage.setItem('USERS', stringifiedCart);
    console.log(JSON.parse(window.localStorage.getItem('USERS')));
    email.value = ' ';
    password.value = '';
});

login.addEventListener('click', function() {
    const storage = localStorage.getItem('USERS');
    const users = JSON.parse(storage);
    console.log(users);
    users.find(user => {
        if(user.email === email.value) {
            if(user.password === password.value) {
                console.log('Logging in...');
            }
            if(user.password !== password.value) {
                console.log('invalid Password');
            }
        }
    });
});