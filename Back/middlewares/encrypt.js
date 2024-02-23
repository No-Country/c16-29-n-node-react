import {hash, compare} from "bcrypt"

export const encrypt = async (pass) => {
    console.log(pass)
    const passHash = await hash(pass, 5)
    console.log(passHash)
    return passHash 
}

export const verified = async (pass, passHash) => {
    const verify = await compare(pass, passHash)
    return verify
}
