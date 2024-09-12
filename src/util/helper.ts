import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
export const HashPassword=async (Password:string)=>{
    try{
        return await bcrypt.hash(Password,saltOrRounds)
    }catch(error){
        console.log(error)
    }
}