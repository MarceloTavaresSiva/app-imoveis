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
                required
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Imovel"
                type="text"
                name="nameImovel"
                id="nameImovel"
                placeholder="Digite o nome"
                required
                value={data.nameImovel || ''}  
                handleOnChange={(e) => updateFieldHandler("nameImovel", e.target.value)}
            />
            <Input
                text="Preço do imovel"
                type="text"
                id="preco"
                name="preco"
                placeholder="Preço do imovel"
                required
                mascara={{
                    mask: Number,
                }}
                value={data.preco || ''}
                handleOnChange={(e) => updateFieldHandler("preco", e.target.value)}
            />

            <Input
                text="CEP"
                type="text"
                name="cep"
                id="cep"
                placeholder="Digite o CEP"
                required
                handleOnChange={(e) => updateFieldHandler("cep", e.target.value)}
            />

            <Input
                text="Rua"
                type="text"
                name="rua"
                id="rua"
                placeholder="Rua"
                required
                value={data.rua || ''}
                handleOnChange={(e) => updateFieldHandler('rua', e.target.value)}
            />

            <Input
                text="Número da residência"
                type="text"
                name="numero"
                id="numero"
                placeholder="Número"
                required
                value={data.numero || ''}
                handleOnChange={(e) => updateFieldHandler('numero', e.target.value)}
            />

            <Input
                text="Complemento"
                type="text"
                name="complemento"
                id="complemento"
                placeholder="Complemento"
                value={data.complemento || ''}
                handleOnChange={(e) => updateFieldHandler('complemento', e.target.value)}
            />

            <Input
                text="Bairro"
                type="text"
                name="bairro"
                id="bairro"
                placeholder="Bairro"
                required
                value={data.bairro || ''}
                handleOnChange={(e) => updateFieldHandler('bairro', e.target.value)}
            />

            <Input
                text="Cidade"
                type="text"
                name="cidade"
                id="cidade"
                placeholder="Cidade"
                required
                value={data.cidade || ''}
                handleOnChange={(e) => updateFieldHandler('cidade', e.target.value)}
            />

            <Input
                text="Estado"
                type="text"
                name="estado"
                id="estado"
                placeholder="Estado"
                required
                value={data.estado || ''}
                handleOnChange={(e) => updateFieldHandler('estado', e.target.value)}
            />
                
            <Input
                text="descricão do imovel"
                type="text"
                name="descricao"
                id= "descricao"
                required
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