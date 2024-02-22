import styles from "../form/HomeSeach.module.css";
import { useState, useEffect } from "react";
import api from "../../utils/api";

/**Cards Bootstrap */
import { Card, Nav, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ excludeId }) {
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
        // exclua o imovel atual da lista
        if (excludeId) {
          const filteredMoves = response.data.moves.filter(
            (move) => move._id !== excludeId
          );
          setFilterData(filteredMoves);
        } else {
          setFilterData(response.data.moves);
        }
        //setFilterData(response.data.moves);
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
    if (!searchItem || !searchTipo || searchTipo === "Selecione uma opção!") {
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
      <section className={styles.main_banner_img}>
        <div className={styles.main_banner_title}>
          <h1>Aluguel Universitário Descomplicado: Encontre seu Lar Ideal em Nossa Aplicação Web!</h1>
        </div>
      </section>

      <div className={styles.container_searh}>
          <form onSubmit={handleSubmit}>
            <div className={styles.box}>
              <span>Preço:</span>
              <input
                value={searchItem}
                type="text"
                name="preco"
                placeholder="Digite o preço (R$)"
                onChange={handleChange}
              />
            </div>
            <div className={styles.box}>
              <span>Tipo de Imóvel:</span>
              <select
                id="tipoImovel"
                name="tipoImovel"
                onChange={handleTipos}
                value={searchTipo}
              >
                <option> selecione uma opcão</option>
                {tipos.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.box}>
              <button className={styles.btn_search} type="submit">
                Buscar
              </button>
            </div>
          </form>
          {showEmpty && (
            <div className={styles.menssage}>
              Preencha todos os campos antes de bsucar.
            </div>
          )}
        </div>









      <div className={styles.container_card}>
        <div className={styles.card}>
        {noResults ? (
          <div>
            <div>Nenhum resultado encontrado.</div>
            <button type="button" onClick={handleReset} >ok</button>
          </div>
        ) : (
          filterData.map((item, index) => (
            <div className={styles.card_flex} key={index}>
              <div className={styles.img_flex}>
                <img
                    src={`${process.env.REACT_APP_API}/images/imoveis/${item.images[0]}`}
                    alt={index} />
              </div>

              <div className={styles.card_text}>
                  <h3 className={styles.title_card}>{item.tipo}</h3>
                  <p className={styles.container_desc}>{item.name}</p>
                  <p className={styles.container_desc}>{item.descricao}</p>
                  <h3 className={styles.card_text_h3}>R$ {item.preco} /mêS</h3>
                  <Link to={`/imoveldetails/${item._id}`} className={styles.bnt_desc}>Mais Detalhes</Link>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </>
  );
}

export default Home;
