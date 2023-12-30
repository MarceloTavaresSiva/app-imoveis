import { useState } from "react"

import formStyles from './Form.module.css'

import Input from './Input'
import Select from "./Select"

function ImovelForm({handleSubmit, movesData, btnText}) {
    const [moves, setmoves] = useState(movesData || {})
    const [preview, setPreview] = useState([])

    function onFileChange(e) {}

    function handleChange (e) {}

    return <form className={formStyles.form_container}>
        <Input 
            text="Imagens do Imovel"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
        />
        <Input 
            text="Nome do Imovel"
            type="text"
            name="name"
            placeholder="Digite o nome"
            handleOnChange={handleChange}
            value={moves.name || ''}
        />
        <Input 
            text="Preço do Imovel"
            type="text"
            name="preco"
            placeholder="Preço do imovel"
            handleOnChange={handleChange}
            value={moves.name || ''}
        />
        <Input 
            text="descricao do Imovel"
            type="text"
            name="description"
            placeholder="Digite a descrição do Imovel"
            handleOnChange={handleChange}
            value={moves.name || ''}
        />
        <Select 
            name="descriçao"
            text="tipo"
            value={moves.value || ''}
        
        />
        <input type="submit" value={btnText} />

    </form>
}

export default ImovelForm



