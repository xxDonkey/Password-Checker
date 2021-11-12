// Taken from first entries of: https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt
const COMMON_PASSWORDS = [
    "password",
    "123456",
    "12345678",
    "1234",
    "qwerty",
    "12345",
    "dragon",
    "baseball",
    "football",
    "letmein",
    "monkey",
    "696969",
    "abc123",
    "mustang",
    "michael",
    "shadow",
    "master",
    "jennifer",
    "111111",
    "2000",
]

// Character pool for generation
const CHARACTER_POOL = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(!@#$%^&*('

// Will match if password has: at least 8 characters, at least 1 lower case letter,
// at least one digit, and at least one special character in the set ((!@#$%^&*(])
const OK = /^(?=.*[a-z])(?=.*[0-9])(?=.*[(!@#$%^&*(])[!-~]{8,}$/g

// Will match if password has: at least 12 characters, at least 1 lower case letter,
// at least 1 upper case letter, at least one digit, and at least one special character 
// in the set ((!@#$%^&*(])
const GOOD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[(!@#$%^&*(])[!-~]{12,}$/

// computes password strength
const get_pword_str = (password) => {
    if (password.length == 0) { return 0 }

    let str = 1
    
    if (COMMON_PASSWORDS.includes(password))
    { return str }

    if (password.match(GOOD))
    { str = 3 }
    else if (password.match(OK))
    { str = 2 }

    return str
}

// called 20 times per second
// 1 (red) - does not meet requirements
// 2 (yellow) - meets requirements: 8+ characters, 1 lowercase letter, 1 digit, 1 special character
// 3 (green) - yellow requirements plus 1 capital, 12+ characters
const update_pword_str = (password_input, output) => {
    let password = password_input.value
    let str = get_pword_str(password)
    
    for (let i = 1; i <= 3; i++)
    {
        let curr_indicator = document.getElementById("str" + i)
        curr_indicator.hidden = (i > str)
    }
}

// called on page load
const onload = () => {
    let password_input = document.getElementById("password")
    let password_str = document.getElementById("str")
    setInterval(update_pword_str, 1000.0 / 20.0, password_input, password_str)
}

// Causes the website to crash if it is spammed, prolly don't do that
// Called when the `Generate Strong Password` button is pressed
const on_generate_button = () => {
    let password = generate_password(12)
    let output = document.getElementById("password")
    output.value = password
}

// Finds a password with a strength of 3, and returns it.
const generate_password = (len) => {
    let password = __generate_password(len)
    let str = get_pword_str(password)
    while (str < 3)
    {
        console.log('recalculating...')
        password = __generate_password(len)
        str = get_pword_str(password)
    }
    return password
}

// Generates a password of `len` characters from `CHARACTER_POOL`
const __generate_password = (len) => {
    let password = ''
    for (let i = 0; i < len; i++)
    {
        const rnd = Math.round(Math.random() * CHARACTER_POOL.length)
        const ch = CHARACTER_POOL.charAt(rnd)
        password += ch
    }
    return password
}