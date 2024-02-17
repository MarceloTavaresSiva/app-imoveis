import api from '../../../utils/api';
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom';

import useFlashMessage from '../../../hooks/useFlashMessage'
import ImovelForm from '../../form/ImovelForm';


function EditImovel () {
    const [moves, setmoves] = useState({})
    const [token] = useState(localStorage.getItem("token") || "");
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()
 
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
                    formData.append('images', moves[key][i])
                }
            } else {
                formData.append(key, moves[key])
            }
        })

        const data = await api.patch(`moves/${moves.renter._id}`, formData, {
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

    }
    
    return (
        <>

            {/* <h1>Editanto o Imovel: {user.user._id}</h1> */}

            <p>Depois da edição os dados serão atualizados no sistema</p>
            {moves.name && (
                <ImovelForm handleSubmit={updateImovel} btnText="Atualizar" movesData={moves} />
            )}
        </>
    )
}

export default EditImovel;
