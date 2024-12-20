export function validatePassword(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^\/&-]).{8,}$/; // vérifie qu'il y a bien une majusc....
    console.log("test", re, re.test, password, validatePassword)
    return re.test(password);
}
export function validateFirstname(firstname) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,60}$/; // vérifie le prénom (pas de chiffre, pas de caractères spécial)
    return re.test(firstname);
}

export function validateCity(city) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,60}$/; // vérifie la ville (pas de chiffre, pas de caractères spécial)
    return re.test(city);
}

export function validateLastname(lastname) {
    const re = /^(?=.[a-z])(?=.*[A-Z])[a-zA-Z]{2,60}$/; // vérifie le nom (pas de chiffre, pas de caractères spécial)
    return re.test(lastname);
}
export function validatePhone(phone) {
    const re = /^[0-9]{10,10}$/; // vérifie le telephone (que des chiffres)
    return re.test(phone);
}

export function validateZip(zip) {
    const re = /^[0-9]{5,5}$/; // vérifie le zip (que des chiffres)
    return re.test(zip);
}

export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,253}.[a-zA-Z]{2,}$/; // vérifie l'email (@ et .)
    return email.length <= 90 && re.test(email);
}

//Axel16--