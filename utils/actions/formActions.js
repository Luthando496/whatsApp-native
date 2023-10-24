import { validateString,validateEmail,validatePassword,validateLength } from "../validationConstraints"

export const validateInput =(inputID,inputText)=>{
    if (inputID === "name" || inputID === "surname") {

        return validateString(inputID, inputText)
  
      } else if (inputID === "email") {
        return validateEmail(inputID, inputText)
        
      } else if (inputID === "password") {
        return validatePassword(inputID, inputText)
      }
       else if (inputID === "about") {
        return validateLength(inputID, inputText,0,200,true)
      }
}