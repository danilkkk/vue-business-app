const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Пользователя с таким email не существует',
    INVALID_PASSWORD: 'Неверный пароль',
    auth: 'Необходимо войти в систему'

}


export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}