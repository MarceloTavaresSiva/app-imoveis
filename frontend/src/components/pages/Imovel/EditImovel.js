import api from '../../../utils/api';
import { useState, useEffect } from 'react'

import useFlashMessage from '../../../hooks/useFlashMessage'
import ImovelForm from '../../form/ImovelForm';


import { useNavigate, useParams } from 'react-router-dom'


function EditImovel () {
    const [moves, setmoves] = useState({})
    const [token] = useState(localStorage.getItem("token") || "");
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()
    const navigate = useNavigate()

 
    useEffect(() => {
        api.get(`/moves/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setmoves(response.data.move)
            
        })
    },[token, id])
  
    async function updateImovel(moves) {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(moves).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < moves[key].length;  i++) {
                    formData.append("images", moves[key][i])
                }
            } else {
                formData.append(key, moves[key])
            }
        })
        console.log(formData.entries());
        const data = await api.patch(`moves/${moves._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        .then((response) => {
            return response.data
        })
          .catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
        navigate('/imovel/myadmin')
    }
    
    return (
        <>

            {/* <h1>Editanto o Imovel: {user.user._id}</h1> */}
            {moves.name && (
                <ImovelForm handleSubmit={updateImovel} btnText="Atualizar" movesData={moves} />
            )}
        </>
    )
}

export default EditImovel;
