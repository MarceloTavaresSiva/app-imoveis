import api from '../../../utils/api';

import { useState, useEffect } from "react";

import { Link, useParams } from 'react-router-dom';
  
import styles from "../ImovelDetails/DetailsImovel.module.css";

/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

/** SWiper */ 
import {Swiper, SwiperSlide} from 'swiper/react'


function DetailsImovel() {
  const [imovel, setImovel] = useState({});
  const [otherImoveis, setOtherImoveis] = useState([]);

  const { id } = useParams();
  const {setFlashMessage} = useFlashMessage()
  const [token] = useState(localStorage.getItem("token") || "");


  useEffect(() => {
    const getImovelDetails = async () => {
      try {
        const response = await api.get(`/moves/${id}`);
        setImovel(response.data.move);

        //Obtenha outros imoveis,
        const otherImoveisResponse = await api.get(`/moves/all`);
        const filteredOtherImoveis = otherImoveisResponse.data.moves.filter((move) => move._id !== id);
        setOtherImoveis(filteredOtherImoveis);

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
    const data = await api.patch(`moves/schedule/${imovel._id}`, null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
   
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error'
      return err.response.data
    })
    console.log(data)

    setFlashMessage(data.message, msgType)

    //if (data.ownerInfo) {
     // navigate('/imovel/listaimoveis', { state: { ownerInfo: data.ownerInfo } });
    //}
  }

  return (
    <>
    <div className={styles.container_details}>
    {imovel.name && (
       <div className={styles.details_img}>
      
        <Swiper
          slidesPerView={1}
          pagination={{clickable: true}}
          navigation 
          loop
          >
          
          {imovel.images.map((image, index) => (
            <div className={styles.img_border}>
              <SwiperSlide key={index}>
                <img className={styles.slide_item}
                  src={`${process.env.REACT_APP_API}/images/imoveis/${image}`}
                  alt={imovel.name} />
            </SwiperSlide>
            </div>
          ))}
        </Swiper>
        </div>
      )}
    </div>
          <div>
            <div className={styles.details_desc}>
                <h1>{imovel.name}</h1>
                <p>{imovel.descricao}</p>
                <p>Tipo: {imovel.tipo}</p>
                <p className={styles.desc_preco}>Preço: R$ {imovel.preco} /mês</p>
            </div>
            <div>
                {token ? (
                    <button onClick={schedule}>Solicitar uma visita</button>
                  ) : (
                    <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita</p>
                )}
            </div>
          </div>

      <h2 className={styles.text_h2}>Veja outros imóveis</h2>
      <div className={styles.card}>
      {otherImoveis.map((item, index) => (
        <div className={styles.card_flex} key={index}>
          <div className={styles.img_flex}>
            <img
                src={`${process.env.REACT_APP_API}/images/imoveis/${item.images[0]}`}
                alt={index} />
          </div>

          <div className={styles.card_text}>
              <h3>{item.tipo}</h3>
              <p className={styles.container_desc}>{item.name}</p>
              <p className={styles.container_desc}>{item.descricao}</p>
              <h3 className={styles.card_text_h3}>R$ {item.preco} /mêS</h3>
              <Link to={`/imoveldetails/${item._id}`} className={styles.bnt_desc}>Mais Detalhes</Link>
          </div>
        </div>
    ))}
      </div>
    </>
  );
}

export default DetailsImovel;
