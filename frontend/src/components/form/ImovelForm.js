import { useState } from "react"

import formStyles from './Form.module.css'

import Input from './Input'
import Select from "./Select"

function ImovelForm({handleSubmit, movesData, btnText}) {
    const [moves, setmoves] = useState(movesData || {})
    const [preview, setPreview] = useState([])
    const tipos = ['Casa', 'Apartamento', 'Kitnet']

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setmoves({...moves, images: [...e.target.files]})
    }

    function handleChange (e) {
        setmoves({...moves, [e.target.name]: e.target.value})
    }

    function handleTipos(e) {
        setmoves({...moves, tipo: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(moves)
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0 
                    ? preview.map((image, index) => (   
                        <img 
                            src={URL.createObjectURL(image)} 
                            alt={moves.name} 
                            key={`${moves.name}+${index}`}
                        />
                    )) 
                    : moves.images &&  
                      moves.images.map((image, index) => (
                    <img 
                        src={`${process.env.REACT_APP_API}/images/imoveis/${image}`} 
                        alt={moves.name} 
                        key={`${moves.name}+${index}`}
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
            id="name"
            name="name"
            placeholder="Digite o nome"
            handleOnChange={handleChange}
            value={moves.name || ''}
        />


        <Input
            text="CEP"
            type="text"
            name="cep"
            id="cep"
            placeholder="Digite o CEP"
            required
            handleOnChange={handleChange}
            value={moves.cep || ''}
        />


            <Input
                text="Rua"
                type="text"
                name="rua"
                id="rua"
                placeholder="Rua"
                required
                handleOnChange={handleChange}
                value={moves.rua || ''}
            />

            <Input
                text="Número da residência"
                type="text"
                name="numero"
                id="numero"
                placeholder="Número"
                required
                handleOnChange={handleChange}
                value={moves.numero || ''}

            />

            <Input
                text="Complemento"
                type="text"
                name="complemento"
                id="complemento"
                placeholder="Complemento"
                handleOnChange={handleChange}
                value={moves.complemento || ''}
            />

            <Input
                text="Bairro"
                type="text"
                name="bairro"
                id="bairro"
                placeholder="Bairro"
                required
                handleOnChange={handleChange}
                value={moves.bairro || ''}
            />

            <Input
                text="Cidade"
                type="text"
                name="cidade"
                id="cidade"
                placeholder="Cidade"
                required
                handleOnChange={handleChange}
                value={moves.cidade || ''}
            />

            <Input
                text="Estado"
                type="text"
                name="estado"
                id="estado"
                placeholder="Estado"
                required
                handleOnChange={handleChange}
                value={moves.estado || ''}
            />









        <Input 
            text="Preço do imovel"
            type="text"
            id = "preco"
            name="preco"
            placeholder="Preço do imovel"
            handleOnChange={handleChange}
            value={moves.preco || ''}
        />
        <Input 
            text="descricão do imovel"
            type="text"
            name="descricao"
            placeholder="Digite a descrição do Imovel"
            handleOnChange={handleChange}
            value={moves.descricao || ''}
        />

        <option>Selecione uma opcão</option>
        <Select
            name="tipo"
            text="Selecione o tipo de imovel"
            options={tipos}
            handleOnChange={handleTipos}
            value={moves.tipo || ''}
        />
        <input type="submit" value={btnText} />
    </form>
    )
}

export default ImovelForm
