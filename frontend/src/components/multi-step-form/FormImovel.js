import React, { useState } from 'react';
import formStyles from '../form/Form.module.css'
import styleStep from './MultStep.module.css'
import Input from '../form/Input'
import Select from "../form/Select"


const FormImovel = ({data, updateFieldHandler, onFileChange}) => {

    const [preview, setPreview] = useState([])
    const tipos = ['Casa', 'Apartamento', 'Kitnet']

    return (
        <div className={styleStep.form_principal}>
        <div>
            <h1>Cadastre um Imovel</h1>
            {/* <p>Disponivel para alugar</p> */}
        </div>
    
        <div className={formStyles.preview_pet_images}>
            { data.imagesImovel && data.imagesImovel.map((image, index) => (
                <img 
                src={
                    image ? URL.createObjectURL(image) : `${process.env.REACT_APP_API}/images/users/${data.image}`
                }
                    alt={data.nameImovel} 
                    key={`${data.nameImovel}+${index}`}
                />
                ))
                }
        </div>
         
        <Input
            text="Imagem do Imovel"
            type="file"
            name="imagesImovel"
            handleOnChange={onFileChange}
            multiple={true}
        />
        <Input
            text="Nome do Imovel"
            type="text"
            name="nameImovel"
            id="nameImovel"
            placeholder="Digite o nome"
            handleOnChange={(e) => updateFieldHandler("nameImovel", e.target.value)}
            value={data.nameImovel || ''}
        />
        <Input
            text="Preço do imovel"
            type="text"
            id="preco"
            name="preco"
            placeholder="Preço do imovel"
            handleOnChange={(e) => updateFieldHandler("preco", e.target.value)}
            value={data.preco || ''}
        />
        <Input
            text="descricão do imovel"
            type="text"
            name="descricao"
            id= "descricao"
            placeholder="Digite a descrição do Imovel"
            handleOnChange={(e) => updateFieldHandler("descricao", e.target.value)}
            value={data.descricao || ''}
        />
        <Select
            name="tipo"
            id= "tipo"
            text="Selecione o tipo de imovel"
            options={tipos}
            handleOnChange={(e) => updateFieldHandler("tipo", e.target.value)}
            value={data.tipo || ''}
        />
        </div>
    )
}

export default FormImovel;