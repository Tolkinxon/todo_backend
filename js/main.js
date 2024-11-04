const elSignUp = document.querySelector('.signup');
const elSignUpInputs = document.querySelectorAll('.signup__input');

const elLogin = document.querySelector('.login');
const elLoginInputs = document.querySelectorAll('.login__input');

elSignUp.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newUser = {
            user_name: elSignUpInputs[0].value.trim(),
            email: elSignUpInputs[1].value.trim(),
            phone: elSignUpInputs[2].value.trim(),
            password: elSignUpInputs[3].value.trim() 
    }

    const signupfetching = async () => {
    const res = await fetch('http://localhost:5000/user/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    const data = await res.json();
    if(data.token) {
        localStorage.setItem('token', data.token);
        window.location = '/html/index.html'
    }
    }
    signupfetching();
})

elLogin.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const loginUser = {
            email: elLoginInputs[0].value.trim(),
            password: elLoginInputs[1].value.trim() 
    }

    const loginFetching = async () => {
        const res = await fetch('http://localhost:5000/user/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginUser)
        });
        const data = await res.json();
        if(data.token) {
            localStorage.setItem('token', data.token);
            window.location = '/html/index.html'
        }
    }
    loginFetching();
})










