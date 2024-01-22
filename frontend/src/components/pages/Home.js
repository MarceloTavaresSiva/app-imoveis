import styles from "../form/HomeSeach.module.css";
import { useState, useEffect } from "react";
import api from "../../utils/api";

/**Cards Bootstrap */
import { Card, Nav, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [imoves, setImoves] = useState([]);
  const [searchItem, setItem] = useState("");
  const [searchTipo, setTipo] = useState("");
  const [filterData, setFilterData] = useState([]);
  const tipos = ["Casa", "Apartamento", "Kitnet"];
  const [noResults, setNoResults] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  // const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    getAllImoveis();
  }, []);

  const handleReset = () => {
    setItem("");
    setTipo("");
    setFilterData(imoves);
    setNoResults(false);
    setShowEmpty(false); 
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

    //Verificar se ambos os campos estão preenchidos
    if(!searchItem || !searchTipo || searchTipo === "Selecione uma opção!") {
      setShowEmpty(true);
      return;
    }


    const filterResults = imoves.filter((item) => {
      const matcheSearch = item.preco
        .toString()
        .toLowerCase()
        .includes(searchItem.toLocaleLowerCase());
      const matcheTipo = searchTipo === "" || item.tipo === searchTipo;

      return matcheSearch && matcheTipo;
    });

    if (filterResults.length > 0) {
      setFilterData(filterResults);
      setNoResults(false);
    } else {
      setNoResults(true);
    }
    setFilterData(filterResults);
    setShowEmpty(false);
  };

  return (
    <>
      <div className={styles.container_searh}>
      <form onSubmit={handleSubmit}>
          <label htmlFor="search-form"><span>Preço:</span></label>
          <input
            value={searchItem} type="text" name="preco" placeholder="Digite o preço (R$)" onChange={handleChange} />
          <label htmlFor="tipoImovel"> <span>Tipo de Imóvel:</span></label>
          <select id="tipoImovel" name="tipoImovel" onChange={handleTipos} value={searchTipo}>
            <option> selecione uma opcão</option>
            {tipos.map((item, index) => (
              <option key={index} value={item}>{item}</option>))}
          </select>
          <button className={styles.btn_search} type="submit">Buscar</button>
      </form>
      {showEmpty && (
        <div>Preencha todos os campos antes de bsucar.</div>
      )}
      </div>

  <Row xs={1} md={3} className="g-4">
  <Col>
  <div className={styles.container_card}>
      {noResults ? (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Alert variant="warning">Nenhum resultado encontrado.</Alert>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginTop: "10px" }}
          >
            ok
          </button>
        </div>
      ) : (
        filterData.map((item, index) => (
          <Card  className={styles.card_flex}  key={index}>
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
        ))
      )}
    </div>
  </Col>
  </Row>

  </>
  );
}

export default Home;
