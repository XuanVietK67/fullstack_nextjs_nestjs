import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
export const HashPassword = async (Password: string) => {
    try {
        return await bcrypt.hash(Password, saltOrRounds)
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (plainPassword: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword,hashPassword)
    } catch (error) {
        console.log(error)
    }
}
