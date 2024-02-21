import {hash, compare} from "bcrypt"

export const encrypt = async (pass) => {
    const passHash = await hash(pass, 5)
    console.log(passHash) 
}

export const verified = async (pass, passHash) => {
    const verify = await compare(pass, passHash)
    return verify
}

export default encrypt("N0t3d1g0")