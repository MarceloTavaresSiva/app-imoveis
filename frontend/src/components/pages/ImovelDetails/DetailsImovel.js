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
          <div className={styles.flex_Container_Principal}>
            <div className={styles.flex_card_Descricao}>
                <h1>{imovel.name}</h1>
                <p>Tipo do Imovel: {imovel.tipo}</p>
                <div className={styles.Descricao_imovel}>
                <h2 > Descrição do Imóvel</h2>
                <p>{imovel.descricao}</p>
                </div>
            </div>

            <div className={styles.flex_card_Proprietario}>
              <h4>Preço do Imóvel: R$ {imovel.preco} /mês</h4>

              <h4>Nome do Proprietario: {imovel.user ? imovel.user.name : ""}</h4>
              <h4>Telefone: {imovel.user ? imovel.user.phone : ""}</h4>

              {token ? (
                      <button onClick={schedule} className={styles.bnt_desc}> <span>Solicitar uma visita</span> </button>
                    ) : (
                      <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita</p>
                  )}
            </div>
          </div>

      <h2 className={styles.text_h2}>Veja outros imóveis</h2>
      <div className={styles.container_card}>
        <div className={styles.card}>
        {otherImoveis.map((item, index) => (
          <div className={styles.flex_box}>
            <img
              src={`${process.env.REACT_APP_API}/images/imoveis/${item.images[0]}`}
                alt={index} />
                      
                <h3 className={styles.title_card}>{item.tipo}</h3>
                <p className={styles.container_desc}>{item.name}</p>
                <p className={styles.container_desc}>{item.descricao}</p>
                <h3 className={styles.card_text_h3}>R$ {item.preco} /mêS</h3>
                <Link to={`/imoveldetails/${item._id}`} className={styles.bnt_desc}> Mais Detalhes</Link>
            </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default DetailsImovel;
