import React, {useState, useEffect } from 'react';
import styles from '../form/Profile.module.css'
import styleStep from './MultStep.module.css'
import Input from '../form/Input'

import RoudedImage from '../layout/RoudedImage'

const FormOwner = ({data, updateFieldHandler, onFileChange}) => {

    const [preview, setPreview] = useState('');

    return (
        <div className={styleStep.inputs_container}>

        <div className={styles.profile_header}>
            <h1>Perfil Proprietario</h1>
            {(data.image || preview) && (
                <RoudedImage
                    src={
                        preview ? URL.createObjectURL(preview)
                            : `${process.env.REACT_APP_API}/images/users/${data.image}`
                    }
                    alt={data.name}
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
            required
            value={data.email || ''}  
            handleOnChange={(e) => updateFieldHandler("email", e.target.value)}
        />

        <Input
            text="Nome e sobrenome"
            type="text"
            name="name"
            id="name"
            placeholder="Digite o nome"
            value={data.name || ''}
            handleOnChange={(e) => updateFieldHandler("name", e.target.value)}
        />

        <Input
            text="Telefone"
            type="text"
            name="phone"
            id="phone"
            value={data.phone || ''}
            handleOnChange={(e) => updateFieldHandler("phone", e.target.value)}
        />

        <Input
            type="hidden"
            name="role"
            id="role"
            defaultValue = {'owner'}
            handleOnChange={(e) => updateFieldHandler("role", e.target.value)}
            value={data.phone || ''}
        />

        <Input
            text="Senha (mínimo 8 caracteres)"
            type="password"
            name="password"
            id="password"
            value={data.password || ''}
            handleOnChange={(e) => updateFieldHandler("password", e.target.value)}
        />

        <Input
            text="Confirmação de senha"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={data.confirmpassword || ''}
            handleOnChange={(e) => updateFieldHandler("confirmpassword", e.target.value)}
        />
    </div>
    );
}

export default FormOwner;