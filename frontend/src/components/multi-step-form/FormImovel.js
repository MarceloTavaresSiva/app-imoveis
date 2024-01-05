import React, { useState } from 'react';
import formStyles from '../form/Form.module.css'
import styleStep from './MultStep.module.css'
import Input from '../form/Input'
import Select from "../form/Select"
import RoudedImage from '../layout/RoudedImage'


function FormImovel({ formData, setFormData }) {

    const [moves, setmoves] = useState({})
    const [preview, setPreview] = useState([])
    const tipos = ['Casa', 'Apartamento', 'Kitnet']

    function onFileChange(e) {
        console.log(e.target.files)
        setPreview(Array.from(e.target.files))
        setmoves({ ...moves, images: [...e.target.files] })
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleTipos(e) {
        setFormData({ ...formData, tipo: e.target.options[e.target.selectedIndex].text })
    }

    return (
        <div className={styleStep.form_principal}>
            <div>
                <h1>Cadastre um Imovel</h1>
                {/* <p>Disponivel para alugar</p> */}
            </div>

            <div className={formStyles.preview_pet_images}>
                {/* {preview.length > 0
                    ? moves.images &&
                    moves.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/images/imoveis/${image}`}
                            alt={moves.name}
                            key={`${moves.name}+${index}`}
                        />
                    )) 
                    : preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={moves.name}
                            key={`${moves.name}+${index}`}
                        />
                    ))
                    } */}

                {(preview || []).map((url, index) => (
                    <img src={url} alt="..." key={index} />
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
                handleOnChange={handleChange}
                value={formData.nameImovel}
            />
            <Input
                text="Preço do imovel"
                type="text"
                id="preco"
                name="preco"
                placeholder="Preço do imovel"
                handleOnChange={handleChange}
                value={formData.preco}
            />
            <Input
                text="descricão do imovel"
                type="text"
                name="descricao"
                id= "descricao"
                placeholder="Digite a descrição do Imovel"
                handleOnChange={handleChange}
                value={formData.descricao}
            />
            <Select
                name="tipo"
                id= "tipo"
                text="Selecione o tipo de imovel"
                options={tipos}
                handleOnChange={handleTipos}
                value={formData.tipo}
            />
        </div>
    )
}

export default FormImovel;