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
            console.log(moves)
        })
    },[token, id])

    async function updateImovel(imovel) {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(imovel).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < imovel[key].length;  i++) {
                    formData.append('images', imovel[key][i])
                }
            } else {
                formData.append(key, imovel[key])
            }
        })

        const data = await api.patch(`moves/${imovel.renter._id}`, formData, {
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
        console.log(imovel)
    }
    
    return (
        <>
            <h1>Editanto o Imovel: {imovel.user}</h1>
            <p>Depois da edição os dados serão atualizados no sistema</p>
            {imovel.name && (
                <ImovelForm handleSubmit={updateImovel} btnText="Atualizar" movesData={imovel} />
            )}
        </>
    )
}

export default EditImovel;
