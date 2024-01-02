import Input from "../form/Input";
import Select from "../form/Select";

import styles from "../form/HomeSeach.module.css";
import { useState, useEffect } from "react";

import api from "../../utils/api";

/*** CARDS*/
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import cachoro from "../../assets/images/cachorrinho.jpg";

function Home({ dataMoves, btnText }) {
  const [imoves, setImoves] = useState([]);
  const [moves, setmoves] = useState(dataMoves || "");
  const tipos = ["Casa", "Apartamento", "Kitnet"];
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const getAllImoveis = async () => {
      const data = await api
        .get(`/moves/all/`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          msgType = "error";
          return err.response.data;
        });

      setImoves(data.moves);
      console.log(data.moves);
    };

    getAllImoveis();
  }, []);

  function handleTipos(e) {
    setmoves({ ...moves, tipo: e.target.options[e.target.selectedIndex].text });
  }

  function handleChange(e) {
    setmoves({ ...moves, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
  }

  return (

    <form onSubmit={submit}>
      <div className={styles.SearchBar_card}>
        <label htmlFor="search-form">Preço</label>
        <Input
          type="text"
          name="preco"
          placeholder="Preço do imovel"
          handleOnChange={handleChange}
        />
        <Select
          name="tipo"
          options={tipos}
          handleOnChange={handleTipos}
          value={moves.tipo || ""}
        />
        <input type="submit" value={btnText} />
      </div>


    <Row xs={1} md={2} className="g-4">
      <Col>
        <div style={{display:'flex', flexWrap:'wrap', textAlign:'center'}}>
        {imoves.length > 0 && imoves.map((item, index) => (
          
        <Card style={{ flex:'22rem',padding: '1rem'}} key={index} >
          <Card.Img variant="top"
          style={{
            width: "100%",
            height: "25vh",
            backgroundSize:'cover',
            backgroundImage: `url(${process.env.REACT_APP_API}/images/imoveis/${item.images[0]})`,
          }}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.descricao}</Card.Text>
          </Card.Body>
          <Nav.Item>
            <Nav.Link href="#link">Detalhes</Nav.Link>
          </Nav.Item>
        </Card>
         ))}
      </div>
    </Col>
  </Row>

  </form>
);}

export default Home;
