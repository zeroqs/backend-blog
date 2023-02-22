import bcrypt from 'bcrypt'

const saltRounds = 10;

export const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    return bcrypt.hash(password,salt)
}