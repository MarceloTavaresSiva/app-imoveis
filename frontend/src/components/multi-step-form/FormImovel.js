import React, { useState } from 'react';
import formStyles from '../form/Form.module.css'
import styleStep from './MultStep.module.css'
import Input from '../form/Input'
import Select from "../form/Select"

import RoudedImage from '../layout/RoudedImage'


const FormImovel = ({data, updateFieldHandler, onFileChange, authenticated}) => {

    const tipos = ['Casa', 'Apartamento', 'Kitnet']

    return (
        <div className={styleStep.form_principal}>
            <div>
                <h1>Cadastre um Imovel</h1>
                {/* <p>Disponivel para alugar</p> */}
            </div>
            <div className={formStyles.preview_pet_images}>

            {data.images  &&
                data.images.map((image, index) => (
                <RoudedImage key={index}
                src={ image ? URL.createObjectURL(image): `${process.env.REACT_APP_API}/images/imoveis/${image}`}
                />
            ))}
            </div>

            <Input
                text="Imagem do Imovel"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Imovel"
                type="text"
                name="nameImovel"
                id="nameImovel"
                placeholder="Digite o nome"
                value={data.nameImovel || ''}  
                handleOnChange={(e) => updateFieldHandler("nameImovel", e.target.value)}
            />
            <Input
                text="Preço do imovel"
                type="text"
                id="preco"
                name="preco"
                placeholder="Preço do imovel"
                value={data.preco || ''}  
                handleOnChange={(e) => updateFieldHandler("preco", e.target.value)}
            />
            <Input
                text="descricão do imovel"
                type="text"
                name="descricao"
                id= "descricao"
                placeholder="Digite a descrição do Imovel"
                value={data.descricao || ''}  
                handleOnChange={(e) => updateFieldHandler("descricao", e.target.value)}
            />
            <Select
                name="tipo"
                id= "tipo"
                text="Selecione o tipo de imovel"
                options={tipos}
                value={data.tipo || ''}  
                handleOnChange={(e) => updateFieldHandler("tipo", e.target.value)}
            />
        </div>
    )
}

export default FormImovel;