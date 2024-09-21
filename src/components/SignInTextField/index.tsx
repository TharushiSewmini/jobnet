import React from 'react'
import "./index.css"
interface SignInTextFieldProps{
     placeHolderValue : string,
     value : string,
     onChange:(e:any)=> void;

}
const SignInTextField = ({placeHolderValue , value , onChange}:SignInTextFieldProps) => {
  return (
    <div className='signin-textfield-container'>
        <input
        className='signin-textfield-content'
        placeholder={placeHolderValue}
        value={value}
        onChange={e=>onChange(e)}

        />
    </div>
  )
}

export default SignInTextField