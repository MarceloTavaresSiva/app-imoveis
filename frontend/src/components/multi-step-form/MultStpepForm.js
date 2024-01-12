import React, { useState } from 'react';
import FormImovel from './FormImovel';
import FormOwner from './FormOwner';
import FormReview from './FormReview';
import Input from '../form/Input'
import styleStep from './MultStep.module.css'
import Steps from './Steps';
import {useNavigate} from 'react-router-dom'
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
  imagesImovel: [],
  nameImovel: '',
  preco: '',
  descricao: '',
  tipo: ''
}

const MainForm = () => {


  const [data, setData]  = useState(formTemplate);
  const navigate = useNavigate()
  const {setFlashMessage} = useFlashMessage();

  // const formComponentes = [<FormOwner/>, <FormImovel/>,<FormReview/>]

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  
  const registerImovel = async () => {
    let msgType = 'success'
    

    const formData = new FormData()
    
    await Object.keys(data).forEach((key) => {
        if(key === 'imagesImovel') {
            for(let i = 0; i < data[key].length; i++) {
                formData.append("images", data[key][i])
                console.log("log do for ",  formData);
            }
            
        } else {
            formData.append(key, data[key])
        }
    })
    
    

    await api.post(`moves/create`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    })
    .then((response) => {
        // console.log(response.data)
        return response.data
    })
    .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
    })

    setFlashMessage(data.message, msgType)
    // navigate('/')
}


// const registerImovel = async () => {
//     let msgType = 'success';

//     try {
//         const formData = new FormData();

//         Object.keys(data).forEach((key) => {
//             if (key === 'imagesImovel') {
//                 for (let i = 0; i < data[key].length; i++) {
//                     formData.append("imagesImovel", data[key][i]);
//                 }
//             } else {
//                 formData.append(key, data[key]);
//             }
//         });
//         const response = await api.post(`moves/create`, formData);

//         console.log("ler response: ",response);
//         setFlashMessage(response.data.message, msgType);
//         // navigate('/');
//     } catch (err) {
//         console.log(err);
//         msgType = 'error';
//         setFlashMessage(err.response.data.message, msgType);
//     }
// }


  const formComponents = [
    <FormOwner data={data} updateFieldHandler={updateFieldHandler} onFileChange={onFileChange}/>,
    <FormImovel data={data} updateFieldHandler={updateFieldHandler} onFileChange={onFileChange} />,
    <FormReview data={data} />,
  ];

  const {currentStep, currentComponent, changeStep, isLastStep} = userForm(formComponents);

  function onFileChange(e) {
    const { name, value, files } = e.target;

    if (name === 'imagesImovel') {
      const selectedImages = Array.from(files).slice(0, 3);
      setData({ ...data, imagesImovel: selectedImages})
    }
    else {
      setData({ ...data, [name]: name.includes('image') ? files[0] : value });
    }
    
    
  }

  return (
    <div className={styleStep.form_principal}>
      <div>
        <p> Etapas</p>
      {/* onSubmit={(e) => changeStep(currentStep + 1, e)} */}
      {/* <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
      <div className={styleStep.inputs_container}> {currentComponent}</div>
        <div className={styleStep.actions} >

            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => changeStep(currentStep -1)}
            > Voltar
            </button>
            {!isLastStep ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => changeStep(currentStep)}
            > Avançar</button>
            ) : (
              <button
              onClick={registerImovel}
              type="submit"
              className="btn btn-primary"
            > Enviar</button>
            )}
        </div>
      </form> */}

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