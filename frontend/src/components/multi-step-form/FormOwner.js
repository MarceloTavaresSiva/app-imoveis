import React, { useState, useEffect } from "react";
import styles from "../form/Profile.module.css";
import styleStep from "./MultStep.module.css";
import Input from "../form/Input";

import RoudedImage from "../layout/RoudedImage";

const FormOwner = ({
    data,
    updateFieldHandler,
    authenticated,
    onFileChange,
}) => {
    const [preview, setPreview] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const handleFileChange = (event) => {
        setPreview(event.target.files[0]);
    };

    const formatPhone = (value) => {
        if (!value) {
            return ""; // Se o valor for indefinido ou nulo, retorne uma string vazia
        }

        const numericValue = value.replace(/[^\d]/g, "");

        if (!numericValue) {
            return ""; 
        }

        if (numericValue.length === 11) {
            return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (numericValue.length === 10) {
            return numericValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        } else {
            return numericValue;
        }
    };

    const formatName = (value) => {
        if (value) {
            return value.replace(/\b\w/g, (string) => string.toUpperCase());
        }
        return "";
    };

    return (
        <div className={styleStep.inputs_container}>
            <div className={styles.profile_header}>
                <h1>Perfil Proprietario</h1>
                {(data.image || preview) && (
                    <RoudedImage
                        //src={`${process.env.REACT_APP_API}/images/users/${data.image}`}
                        src={data.image ? URL.createObjectURL(preview || data.image) : `${process.env.REACT_APP_API}/images/imoveis/${image}`}
                       // src={ data.image ? URL.createObjectURL(data.image): `${process.env.REACT_APP_API}/images/imoveis/${image}`}


                        alt={data.name}
                    />
                )}
            </div>

            <Input
                text="E-mail"
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                required
                value={data.email || ""}
                handleOnChange={(e) => updateFieldHandler("email", e.target.value)}
            />

            <Input
                text="Nome e sobrenome"
                type="text"
                name="name"
                id="name"
                maxLength={50}
                required
                placeholder="Digite o nome"
                value={formatName(data.name) || ""}
                handleOnChange={(e) => updateFieldHandler("name", e.target.value)}
            />

            <Input
                text="Telefone"
                type="text"
                name="phone"
                id="phone"
                placeholder="DDD + número"
                required
                value={formatPhone(data.phone) || ""}
                handleOnChange={(e) => updateFieldHandler("phone", e.target.value)}
            />

            <Input
                type="hidden"
                name="role"
                id="role"
                defaultValue={"owner"}
                handleOnChange={(e) => updateFieldHandler("role", e.target.value)}
                value={data.phone || ""}
            />
            {!authenticated ? (
                <>
                    <Input
                        text="Image"
                        type="file"
                        name="image"
                        handleOnChange={onFileChange}
                    />
                    <Input
                        text="Senha (mínimo 6 caracteres)"
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={data.password || ""}
                        handleOnChange={(e) => {
                            const newPassword = e.target.value;
                            updateFieldHandler("password", newPassword);
            
                            // Adicione a validação para pelo menos 6 caracteres
                            if (newPassword.length < 6) {
                                setPasswordError("A senha deve ter pelo menos 6 caracteres.");
                            } else {
                                setPasswordError("");
                            }
                        }}
                    />
                    <Input
                        text="Confirmação de senha"
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        required
                        value={data.confirmpassword || ""}
                        handleOnChange={(e) => updateFieldHandler("confirmpassword", e.target.value)}
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default FormOwner;
