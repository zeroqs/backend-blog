import {body} from "express-validator";


export const isValidSignUp = [
    body("email", "Неверный формат почты").isEmail().normalizeEmail(),
    body("password", "Пароль должен быть больше пяти символов").isLength({ min: 5 }),
    body("fullName", "Укажите имя").isLength({ min: 2 }),
    body("avatarUrl", "Неверная ссылка").optional().isURL(),
]

export const isValidLogIn = [
    body("email", "Неверный формат почты").isEmail().normalizeEmail(),
    body("password", "Пароль должен быть больше пяти символов").isLength({ min: 5 }),
]

export const isValidPost = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];