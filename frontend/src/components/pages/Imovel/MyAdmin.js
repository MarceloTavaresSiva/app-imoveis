import api from '../../../utils/api';
import styles from './TableAdmin.module.css';
import { useState, useEffect } from 'react';
import {Button, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import RoudedImage from '../../layout/RoudedImage';

/** Components */
/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyAdmin() {

    const [moves, setmoves] = useState([])
    const [token] = useState(localStorage.getItem("token") || "");
    const { setFlashMessage } = useFlashMessage()

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

        const data = await api.patch(`/moves/remove/${id}`, {
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
                return err.data
                
            })

        setFlashMessage(data.message, msgType)
    }
    return (



        <div className="table-responsive">
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>Meus Imoveis</h1>
                <Link to="/anunciar/sinup-owner">Cadastrar imovel</Link>
            </div>


                <Table className="table" responsive="sm">
                    <thead className='thead-dark'>
                        <tr scope="row">
                            <th scope="col">ID</th>
                            <th scope="col">Perfil</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Preco</th>
                            <th scope="col">Disponibilidade</th>
                            <th scope="col">Opcoes</th>
                        </tr>
                    </thead>
                    <tbody>{moves.length > 0 && moves.map((imovel, item) => (

                        <tr key={imovel._id}>
                            <th scope="row">{item+1}</th>
                            <td>
                                <RoudedImage
                                    src={`${process.env.REACT_APP_API}/images/imoveis/${imovel.images[0]}`}
                                    alt={imovel.name}
                                    width="px75" />
                            </td>
                            <td>{imovel.name}</td>
                            <td>{imovel.tipo}</td>
                            <td>{imovel.preco}</td>
                            <td>
                                {imovel.available && !imovel.renter ? ("Imovel disponivel!") : (!imovel.available  && imovel.renter) ? ("Agendado para visita!"): ("Aguardando confirmação ...!")}
                            </td>
                            <td>
                                {
                                    // <Button className={styles.button_danger} onClick={() => { removeImovel(imovel.renter._id) }}> Excluir </Button>
                                    (imovel.available && !imovel.renter) ? (<><Link to={`/imovel/edit/${imovel._id}`}><Button className={styles.button_blue}>Editar</Button></Link> </>) :
                                    (!imovel.available && imovel.renter) ? (<>
                                    <Button className={styles.button_blue} onClick={() => {concludeAgendamento(imovel._id)}}> Confirmar </Button> 
                                    <Link to={`/imovel/edit/${imovel._id}`}><Button className={styles.button_blue}>Editar</Button></Link> 
                                    <Button className={styles.button_danger} onClick={() => { removeImovel(imovel._id) }}> Excluir </Button>
                                    </>):
                                    <><Link to={`/imovel/edit/${imovel._id}`}><Button className={styles.button_blue}>Editar</Button></Link> 
                                    <Button className={styles.button_danger} onClick={() => { removeImovel(imovel._id) }}> Excluir </Button>
                                    </> 
                                }
                            </td>
                        </tr>))}
                        <tr>{(moves.length == 0) ?('Não ha imoveis cadastrados'):''}</tr>
                    </tbody>
                </Table>
        </div>
    </div>
        
    )
}

export default MyAdmin

