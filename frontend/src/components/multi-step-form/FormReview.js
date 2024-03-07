import React, { useState } from 'react';
import styleStep from './MultStep.module.css';
import formStyles from '../form/Form.module.css'
import Input from '../form/Input'

import RoudedImage from '../layout/RoudedImage'

const FormReview = ({ data, updateFieldHandler,authenticated }) => {

const image = data.image
  return (
    <>
      <div className={styleStep.form_principal}>
        <h2> Resumo Proprietario</h2>
      </div>
      <hr />
      <div className={formStyles.preview_pet_images}>

             {!authenticated?
                <RoudedImage
                //src={ data.image ? URL.createObjectURL(data.image): `${process.env.REACT_APP_API}/images/users/${image}`}

                    //src={`${process.env.REACT_APP_API}/images/users/${data.image}`}
                    src={ data.image ? URL.createObjectURL(data.image): `${process.env.REACT_APP_API}/images/users/${data.image}`}
                    alt={data.name}
                />: 
                ''
            }

      </div>
      <div className={styleStep.form_principal}>
        <Input
          text={<strong>Nome do proprietario</strong>}
          type="text"
          id="name"
          name="name"
          value={data.name}
          readOnly={true} />
        <Input
          text={<strong>E-mail</strong>}
          id="email"
          type="text"
          name="email"
          value={data.email}
          readOnly={true} />
        <Input
          text={<strong>Telefone</strong>}
          type="text"
          name="phone"
          id="phone"
          value={data.phone}
          readOnly={true} />
      </div>
      <hr />

      <div className={styleStep.form_principal}>
        <h2> Resumo Imovel</h2>
      </div>
      <div className={styleStep.form_principal}>

      <Input
            text="Nome do Imovel"
            type="text"
            name="nameImovel"
            id="nameImovel"
            value={data.nameImovel}
            readOnly={true}
        />
        <Input
            text="Preço do imovel"
            type="text"
            id="preco"
            name="preco"
            value={data.preco}
            readOnly={true}
        />

        <Input
            text="CEP"
            type="text"
            name="cep"
            id="cep"
            value={data.cep}
            readOnly={true}
        />

        <Input
            text="Rua"
            type="text"
            name="rua"
            id="rua"
            value={data.rua}
            readOnly={true}
        />

        <Input
            text="Número da residência"
            type="text"
            name="numero"
            id="numero"
            value={data.numero}
            readOnly={true}
        />

        <Input
          text="Complemento"
          type="text"
          name="complemento"
          id="complemento"
          value={data.complemento}
          readOnly={true}
        />

        <Input
          text="Bairro"
          type="text"
          name="bairro"
          id="bairro"
          value={data.bairro}
          readOnly={true}
        />

        <Input
          text="Cidade"
          type="text"
          name="cidade"
          id="cidade"
          value={data.cidade}
          readOnly={true}
        />

        <Input
          text="Estado"
          type="text"
          name="estado"
          id="estado"
          value={data.estado}
          readOnly={true}
        />

        <Input
            text="Descricão do imovel"
            type="text"
            name="descricao"
            id= "descricao"
            value={data.descricao}
            readOnly={true}
        />
        <Input
            name="tipo"
            id= "tipo"
            text="Tipo do imovel"
            value={data.tipo}
            readOnly={true}
        />
      </div>
      <div className={styleStep.form_principal}>
        <div className={styleStep.form_container }>
          <span><strong>Imagens do Imovel :</strong></span>
          </div>
            {  data.images &&
            data.images.map((image, index) => (
              <RoudedImage key={index} src={URL.createObjectURL(image)} alt={`${index + 1} Preview`} style={{ maxWidth: '100px' }} />
            ))}
        </div>
    </>
  );
}
export default FormReview;