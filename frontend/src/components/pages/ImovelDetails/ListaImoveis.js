import api from '../../../utils/api';
import { useState, useEffect } from "react";
import RoudedImage from '../../layout/RoudedImage';
import {Button, Table} from 'react-bootstrap';
import styles from '../Imovel/TableAdmin.module.css';


function ListaImoveis() {

    const [moves, setMoves] = useState([]);
    const [token] = useState(localStorage.getItem("token") || "");

    //const ownerInfo = location.state ? location.state.ownerInfo : null;

    useEffect(() => {
        api.get('/moves/myimoveloptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setMoves(response.data.moves)
        })
    }, [token])

    return (
        // <section>
        //         <h1>Meus Agendamentos</h1>
        //     <div>
        //         {moves.length > 0 && 
        //             moves.map((imovel) => (
        //                 <div key={imovel._id}>
        //                     <RoudedImage
        //                         src={`${process.env.REACT_APP_API}/images/imoveis/${imovel.images[0]}`}
        //                         alt={imovel.name}
        //                         width="px75"
        //                     />
        //                     <span>{imovel.name}</span>
        //                 <div>
        //                     <p>Nome: {imovel.renter.name}</p>
        //                     <p>Telefone: {imovel.renter.phone}</p>
        //                 </div>

        //                     <div>
        //                         {imovel.available ? (
        //                             <p>Agendamento em processo</p>

        //                         ) : (
        //                             <p>Parabéns, imovel agendado</p>
        //                         )}
        //                     </div>
        //                 </div>
        //             ))}
        //         {moves.length === 0 && <p>Ainda não há imovel listado.</p>}
        //     </div>
        // </section>  
        
        <div className="table-responsive">
                        <h1 className={styles.container_meusImoveis}>Meus Agendamentos</h1>
        <div className={styles.container}>


            <Table className="table" responsive="sm">
                <thead className='thead-dark'>
                    <tr scope="row">
                        <th scope="col">ID</th>
                        <th scope="col">Perfil</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
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
                            {imovel.available ?("Aguarde agendamento em processo ..."):("Visita agendada!")}
                        </td>

                    </tr>))}
                    <tr>{(moves.length == 0) ?('Não ha imoveis cadastrados'):''}</tr>
                </tbody>
            </Table>
    </div>
</div>

    )
}

export default ListaImoveis;
