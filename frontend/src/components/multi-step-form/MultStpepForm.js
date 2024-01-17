import React, { useState } from 'react';
import FormImovel from './FormImovel';
import FormOwner from './FormOwner';
import FormReview from './FormReview';
import styleStep from './MultStep.module.css'
import Steps from './Steps';
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import useFlashMessage from '../../hooks/useFlashMessage'

import { userForm } from '../../hooks/userForm';

const formTemplate = {
  image: '',
  email: '',
  name: '',
  phone: '',
  role: '',
  password: '',
  images: [],
  nameImovel: '',
  preco: '',
  descricao: '',
  tipo: ''
}

const MainForm = () => {


  const [data, setData] = useState(formTemplate);
  const navigate = useNavigate()
  const { setFlashMessage } = useFlashMessage();

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const registerImovel = async () => {
    let msgText = 'Registro realizado com sucesso!'
    let msgType = 'success'


    const formData = new FormData()

    await Object.keys(data).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < data[key].length; i++) {
          formData.append("images", data[key][i])
        }

      } else {
        formData.append(key, data[key])
      }
    })

    await api.post(`moves/create`, formData)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgText = error.response.data.message
        msgType = 'error'
        return err.response
      })

    setFlashMessage(msgText, msgType)
    navigate('/')
  }

  const formComponents = [
    <FormOwner data={data} updateFieldHandler={updateFieldHandler} onFileChange={onFileChange} />,
    <FormImovel data={data} updateFieldHandler={updateFieldHandler} onFileChange={onFileChange} />,
    <FormReview data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep } = userForm(formComponents);

  function onFileChange(e) {
    const { name, value, files } = e.target;

    if (name === 'images') {
      const selectedImages = Array.from(files).slice(0, 3);
      setData({ ...data, images: selectedImages })
    }
    else {
      setData({ ...data, [name]: name.includes('image') ? files[0] : value });
    }


  }

  return (
    <div className={styleStep.form_principal}>
      <div>
        <Steps currentStep={currentStep} />

        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className={styleStep.inputs_container}>{currentComponent}</div>
          <div className={styleStep.actions}>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => changeStep(currentStep - 1)}
            >
              Voltar
            </button>
            {!isLastStep ? (
              <button type="submit" className="btn btn-primary">
                Avançar
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={registerImovel}
              >
                Enviar
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}

export default MainForm;