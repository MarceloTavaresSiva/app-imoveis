import api from '../../../utils/api';
import { useState, useEffect } from "react";
import RoudedImage from '../../layout/RoudedImage';


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
        <section>
                <h1>Meus Agendamentos</h1>
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
                        <div>
                            <p>Nome: {imovel.renter.name}</p>
                            <p>Telefone: {imovel.renter.phone}</p>
                        </div>

                            <div>
                                {imovel.available ? (
                                    <p>Agendamento em processo</p>

                                ) : (
                                    <p>Parabéns, imovel agendado</p>
                                )}
                            </div>
                        </div>
                    ))}
                {moves.length === 0 && <p>Ainda não há imovel listado.</p>}
            </div>
        </section>   
    )
}

export default ListaImoveis;
