import api from '../../../utils/api'
import styles from './AddImovel.module.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

/**Components */
import ImovelForm from '../../form/ImovelForm'

/**Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddImovel() {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerImovel(moves) {
        let msgType = 'success'
        console.log(moves)

        const formData = new FormData()

        await Object.keys(moves).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < moves[key].length; i++) {
                    formData.append("images", moves[key][i])
                }
            } else {
                formData.append(key, moves[key])
            }
        })

        await api.post(`moves/create`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        navigate('/mymoves')
    }
    return (
        <section className={styles.addimovel_header}>
            <div>
                <h1>Cadastre um Imovel</h1>
                <p>Disponivel para alugar</p>
            </div>
            <ImovelForm handleSubmit={registerImovel} btnText="Cadastrar Imovel"/>
        </section>
    )
}

export default AddImovel
