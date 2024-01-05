
import styles from "../form/HomeSeach.module.css";
import { useState, useEffect } from "react";
import api from "../../utils/api";

import {Card, Nav, Alert, Row, Col } from 'react-bootstrap';


function Home({}) {
  const [imoves, setImoves] = useState([]);
  const [searchItem, setItem] = useState("");
  const [searchTipo, setTipo] = useState("");
  const [filterData, setFilterData] = useState([]);
  const tipos = ["Casa", "Apartamento", "Kitnet"];
  const [noResults, setNoResults] = useState(false);
  // const [token] = useState(localStorage.getItem("token") || "");


  useEffect(() => {
    getAllImoveis();
  }, []);


  const handleReset = () => {
    setItem('');
    setTipo('');
    setFilterData(imoves);
    setNoResults(false);
  };

  const getAllImoveis = async () => {
    const data = await api
      .get(`/moves/all/`)
      .then((response) => {
        setImoves(response.data.moves);
        setFilterData(response.data.moves);
      })
      .catch((err) => {
        console.log(err);
      });

    //console.log(data.moves);
  };

  const handleTipos = (e) => {
    setTipo(e.target.value);
    //setmoves({ ...moves, tipo: e.target.options[e.target.selectedIndex].text });
  };

  const handleChange = (e) => {
    setItem(e.target.value);
    //setmoves({ ...moves, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filterResults = imoves.filter((item) => {
      const matcheSearch = item.preco
        .toString()
        .toLowerCase()
        .includes(searchItem.toLocaleLowerCase());
      const matcheTipo = searchTipo === "" || item.tipo === searchTipo;

      return matcheSearch && matcheTipo;
    });

    if(filterResults.length > 0) {
      setFilterData(filterResults);
      setNoResults(false);
    } else {
      setNoResults(true)
    }
    setFilterData(filterResults);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.SearchBar_card}>
        <label htmlFor="search-form">Preço</label>
        <input
          value={searchItem}
          type="text"
          name="preco"
          placeholder="Preço do imovel"
          onChange={handleChange}
        />

        <label htmlFor="tipos">Tipo:</label>
        <select id="tipos" onChange={handleTipos} value={searchTipo}>
          <option> selecione uma opcao</option>
          {tipos.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          style={{
            padding: "1rem",
            marginLeft: "1rem",
            color: "#fff",
            background: "#0d6efd",
            cursor: "pointer",
            border: "none",
            padding: "15px 32px",
          }}
          type="submit"
        >
          Buscar
        </button>
      </div>

      <Row xs={1} md={2} className="g-4">
        <Col>
          <div style={{ display: "flex", flexWrap: "wrap", textAlign: "center" }}>

          { noResults ? (
          <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <Alert variant="warning">Nenhum resultado encontrado.</Alert>
            <button type="button" onClick={handleReset} style={{ marginTop: '10px' }}>
                ok
            </button>
          </div>

            ):(
             filterData.map((item, index) => (
                  <Card style={{ flex: "22rem", padding: "1rem" }} key={index}>
                    <Card.Img
                      variant="top"
                      style={{
                        width: "100%",
                        height: "25vh",
                        backgroundSize: "cover",
                        backgroundImage: `url(${process.env.REACT_APP_API}/images/imoveis/${item.images[0]})`,
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Title>{item.preco}</Card.Title>
                      <Card.Text>{item.descricao}</Card.Text>
                      <Card.Text>{item.tipo}</Card.Text>
                    </Card.Body>
                    <Nav.Item>
                      <Nav.Link href="#link">Detalhes</Nav.Link>
                    </Nav.Item>
                  </Card>
                ))
            )}
          </div>
        </Col>
      </Row>
    </form>
  );
}

export default Home;
