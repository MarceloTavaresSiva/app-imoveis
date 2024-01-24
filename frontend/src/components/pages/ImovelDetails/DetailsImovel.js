import api from '../../../utils/api';

import { useState, useEffect } from "react";

import { Link, useParams } from 'react-router-dom';
  
import styles from "../ImovelDetails/DetailsImovel.module.css";


/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'
import Home from '../Home';

import { Card, Nav, Alert, Row, Col } from "react-bootstrap";


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

      <h2>Veja outros imóveis</h2>
      <div className={styles.container_card}>
        {otherImoveis.map((item, index) =>(
          <Card className={styles.card_flex} key={index} >
            <Card.Img
              variant="top"
              style={{
                width: "100%",
                height: "26vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${process.env.REACT_APP_API}/images/imoveis/${item.images[0]})`,
              }}
            />
            <div className={styles.card_text}>
              <Card.Body>
              <Card.Text><span>{item.tipo}</span></Card.Text>
                <Card.Title><span className={styles.container_desc}>{item.name}</span></Card.Title>
                <Card.Text> <span className={styles.container_desc}> {item.descricao}</span> </Card.Text>
                <Card.Title><span>R$ {item.preco} /mêS</span> </Card.Title>
              </Card.Body>
              <Nav.Item>
                <Link to={`/imoveldetails/${item._id}`} className={styles.bnt_desc}>Mais Detalhes </Link>
              </Nav.Item>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default DetailsImovel;
