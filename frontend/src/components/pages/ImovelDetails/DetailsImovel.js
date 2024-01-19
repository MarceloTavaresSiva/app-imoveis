import api from '../../../utils/api';

import { useState, useEffect } from "react";

import { Link, useParams } from 'react-router-dom';
  
import styles from "../ImovelDetails/DetailsImovel.module.css";

/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function DetailsImovel() {
  const [imovel, setImovel] = useState({});
  const { id } = useParams();
  const {setFlashMessage} = useFlashMessage()
  const [token] = useState(localStorage.getItem("token") || "");

  
  useEffect(() => {
    const getImovelDetails = async () => {
      try {
        const response = await api.get(`/moves/${id}`);
        setImovel(response.data.move);
      } catch (error) {
        console.error("Erro ao buscar detalhes do imovel", error);
      }
    };

    getImovelDetails();
  }, [id]);

  if (!imovel) {
    return <div>Loading...</div>;
  }

  async function schedule() {
    let msgType = 'success'

    const data = await api.patch(`moves/schedule/${imovel._id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`
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
      {imovel.name && (
        <section className={styles.details_imovel}>
          <div className={styles.card_img}>
            {imovel.images.map((image, index) => (
              <div className={styles.card} key={index}>
                <img 
                  src={`${process.env.REACT_APP_API}/images/imoveis/${image}`}
                  alt={imovel.name}
                />
              </div>
            ))}
          </div>
          <div className={styles.details_desc}>
            <h1>{imovel.name}</h1>
            <p>{imovel.descricao}</p>
            <p>Tipo: {imovel.tipo}</p>
            <p className={styles.desc_preco}>Preço: R$ {imovel.preco} /mês</p>
          </div>
          {token ? (
              <button onClick={schedule}>Solicitar uma visitar</button>
            ) : (
              <p>
                Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita
              </p>
          )}
        </section>
      )}
    </>
  );
}

export default DetailsImovel;
