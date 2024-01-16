import { useState, useEffect } from "react";
import api from '../../../utils/api'
import { useParams, Link } from 'react-router-dom'

import styles from "../ImovelDetails/DetailsImovel.module.css";

function DetailsImovel({}) {
  const [imovel, setImovel] = useState(null);
  const { id } = useParams()


  useEffect(() => {
    const getImovelDetails = async () => {
      try {
        const response = await api.get(`/moves/${id}`);
        setImovel(response.data.move);
      } catch (error) {
        console.error("Error fetching imovel details", error);
      }
    };

    getImovelDetails();
  }, [id]);

  if (!imovel) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className={styles.details_imovel}>
      <div>
        {imovel.images.map((image, index) => (
            <img
                src={`${process.env.REACT_APP_API}/images/imoveis/${image}`}
                alt={imovel.name}
                key={index} 
            />
        ))}
    </div>
        <div className={styles.details_desc}>
            <h1>{imovel.name}</h1>
            <p>{imovel.descricao}</p>
            <p>Tipo: {imovel.tipo}</p>
            <p className={styles.desc_preco}>Preço: R$ {imovel.preco} /mês</p>
        </div>
      </section>
    </>
  );
}

export default DetailsImovel;
