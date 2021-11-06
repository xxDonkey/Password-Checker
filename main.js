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

const OK = /^(?=.*[a-z])(?=.*[0-9])(?=.*[0-9])(?=.*[(!@#$%^&*(])[!-~]{8,}$/g
const GOOD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[0-9])(?=.*[(!@#$%^&*(])[!-~]{12,}$/

// computes password strength
const get_pword_str = (password) => {
    let str = 1
    
    if (COMMON_PASSWORDS.includes(password))
    {
        return str
    }

    if (password.match(GOOD))
    {
        str = 3
    }
    else if (password.match(OK))
    {
        str = 2
    }

    return str
}

// called 20 times per second
// 1 (red) - does not meet requirements
// 2 (yellow) - meets requirements: 8+ characters, 1 lowercase letter, 1 digit, 1 special character
// 3 (green) - yellow requirements plus 1 capital, 12+ characters
const update_pword_str = (password_input, output) => {
    let password = password_input.value
    output.innerText = (password == "" ? "" : get_pword_str(password))
}

// called on page load
const onload = () => {
    let password_input = document.getElementById("password")
    let password_str = document.getElementById("str")
    setInterval(update_pword_str, 1000.0 / 20.0, password_input, password_str)
    
}