import Join from 'joi';

const PASSWORD_PATTERN = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};\':"\\\\|,.<>/?]).+$');

export const userSchema = Join.object({
    username: Join.string()
        .trim()
        .min(4)
        .max(20)
        .required()
        .messages({
            "string.min": "The username must be at least 8 characters long.",
            "string.max": "The username cannot be more than 30 characters long.",
            "any.required": "The username is required."
        }),
    password: Join.string()
        .trim()
        .min(8)
        .max(30).pattern(PASSWORD_PATTERN)
        .required()
        .messages({
            "string.min": "The password must be at least 8 characters long.",
            "string.max": "The password cannot be more than 30 characters long.",
            "string.pattern.base": "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
            "any.required": "The password is required."
        }),
    email: Join.string().trim().email()
})