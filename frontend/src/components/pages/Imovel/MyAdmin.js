import api from '../../../utils/api';

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import RoudedImage from '../../layout/RoudedImage';

/** Components */
/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyAdmin() {

    const [moves, setmoves] = useState([])
    const [token] = useState(localStorage.getItem("token") || "");
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/moves/admin/imoveis', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setmoves(response.data.moves)
        })
    }, [token])

    async function removeImovel(id) {
        let msgType = 'success'

        const data = await api.delete(`/moves/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })

        .then((response) => {
            const updateImoveis = moves.filter((imovel) => imovel._id !== id)
            setmoves(updateImoveis)
            return response.data
        })
          .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        console.log(moves)
    }

    async function concludeAgendamento(id) {
        let msgType = 'sucess'

        const data = await api.patch(`/moves/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
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
        <section>
            <div>
                <h1>Meus Imoveis</h1>
                <Link to="/anunciar/sinup-owner">Cadastrar imovel</Link>
            </div>
            <div>
                {moves.length > 0 && 
                    moves.map((imovel) => ( 
                        <div key={imovel._id}>
                            <RoudedImage
                                src={`${process.env.REACT_APP_API}/images/imoveis/${imovel.images[0]}`}
                                alt={imovel.name}
                                width="px75"
                            />
                            <span>{imovel.name}</span>
                            <span>{imovel.tipo}</span>
                            <span>{imovel.preco}</span>
                            <div>
                                {imovel.available ? 
                                    (<>
                                        {imovel.renter && (
                                            <button onClick={() => {
                                                concludeAgendamento(imovel.renter._id) 
                                        }}>
                                            Concluir agendamento
                                            </button>
                                        )}
                                        <Link to={`/imovel/edit/${imovel.renter._id}`}>Editar</Link>
                                        <button onClick={() => {
                                            removeImovel(imovel.renter._id)
                                        }}>Excluir</button>
                                    </>
                                    ) : (
                                    <p>Imovel Agendado</p>
                                )}
                            </div>
                        </div>
                    ))}
                {moves.length == 0 && <p>Não ha imoveis cadastrados</p>}
            </div>

        </section>
    )
}

export default MyAdmin

