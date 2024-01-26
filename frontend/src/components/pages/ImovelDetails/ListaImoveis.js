import api from '../../../utils/api';

import { useState, useEffect } from "react";

import RoudedImage from '../../layout/RoudedImage';


function ListaImoveis() {
    const [imovel, setImovel] = useState([]);
    const [token] = useState(localStorage.getItem("token") || "");


    useEffect(() => {
        api.get('/moves/listaimoveis', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            },
        })
        .then((response) => {
            setImovel(response.data.imovel)
        })
    }, [token])

    return (
        <section>
            <div>
                <h1>Lista de Imoveis</h1>
            </div>
            <div>
                {imovel.length > 0 && 
                    imovel.map((imovel) => (
                        <di Key={imovel._id}>
                            <RoudedImage
                                src={`${process.env.REACT_APP_API}/images/imoveis/${images[0]}`}
                                alt={imovel.name}
                                width="px75"
                            />
                            <span>{imovel.name}</span>
                            <div>
                                <p>Ligue para: {imovel.user.phome}</p>
                                <p>Fale com: {imovel.user.name}</p>
                            </div>
                            <div>
                                {imovel.available ? (
                                    <p>Imovel em processo</p>

                                ) : (
                                    <p>Parabéns, imovel agendado</p>
                                )}
                            </div>
                        </di>
                    ))}
                {imovel.length === 0 && <p>Ainda não há imovel listado.</p>}
            </div>
        </section>   
    )
}

export default ListaImoveis;

