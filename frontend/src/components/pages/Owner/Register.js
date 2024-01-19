import Input from "../../form/Input"
import styles from '../../form/Form.module.css'
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import MultiStepForm from '../../multi-step-form/MultStpepForm'

/**Contexts */
import { Context } from "../../../context/OwnerContext"

function Register() {

    const [user, setUser] = useState({})
    // const {register} = useContext(Context)

    function handleChange(e) {
        
    }

    function handleSubmit(e) {
        
    }

    return (

    <div className="App">
        <MultiStepForm />
      </div>
    )
}

export default Register
