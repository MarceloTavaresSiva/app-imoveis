import React, {useState, useEffect } from 'react';
import formStyles from '../form/Form.module.css'
import styles from '../form/Profile.module.css'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import styleStep from './MultStep.module.css'
import Input from '../form/Input'

import RoudedImage from '../layout/RoudedImage'

function FormOwner({ formData, setFormData }) {

    const [user, setUser] = useState({});
    const [preview, setPreview] = useState('');
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    // useEffect(() => {
    //     api.get('/users/checkuser', {
    //         headers: {
    //             Authorization: `Bearer ${JSON.parse(token)}`,
    //         },
    //     }).then((response) => {
    //         setUser(response.data)
    //     })
    // }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    return (

        <div className={styleStep.form_principal }>

            <div className={styles.profile_header}>
                <h1>Perfil Proprietario</h1>
                {(user.image || preview) && (
                    <RoudedImage
                        src={
                            preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`
                        }
                        alt={user.name}
                    />
                )}
            </div>

            <Input
                text="Image"
                type="file"
                name="image"
                handleOnChange={onFileChange}
            />

            <Input
                text="E-mail"
                id="email"
                type="text"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}  
                handleOnChange={handleChange}   
                // handleOnChange={handleChange}
                // value={user.email || ''}
            />

            <Input
                text="Nome e sobrenome"
                type="text"
                name="name"
                id="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={formData.name}
            />

            <Input
                text="Telefone"
                type="text"
                name="phone"
                id="phone"
                handleOnChange={handleChange}
                value={formData.phone}
            />

            <Input
                type="hidden"
                name="role"
                id="role"
                value="owner"
            />

            <Input
                text="Senha (mínimo 8 caracteres)"
                type="password"
                name="password"
                id="password"
                handleOnChange={handleChange}
                value={formData.password}
            />

            <Input
                text="Confirmação de senha"
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                handleOnChange={handleChange}
                value={formData.confirmpassword}
            />
        </div>
    );
}

export default FormOwner;