import styles from "../form/HomeSeach.module.css";
import { useState, useEffect } from "react";
import api from "../../utils/api";

import CurrencyInput from 'react-currency-input-field';

import { Link } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";


function Home({ excludeId }) {
  const [imoves, setImoves] = useState([]);
  const [searchItem, setItem] = useState("");
  const [searchTipo, setTipo] = useState("");
  const [filterData, setFilterData] = useState([]);
  const tipos = ["Casa", "Apartamento", "Kitnet"];
  const [noResults, setNoResults] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const [maxPrice, setMaxPrice] = useState("");

  // const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    getAllImoveis();
  }, []);
  const handleReset = () => {
    setItem("");
    setTipo("");
    setMaxPrice(""); // Limpar o valor do input de max preço
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTipos = (e) => {
    setTipo(e.target.value);
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchItem || !searchTipo || searchTipo === "Selecione uma opção!" || !maxPrice) {
      setShowEmpty(true);
      return;
    }

    const filterResults = imoves.filter((item) => {
      const price = parseFloat(item.preco);

      const matcheSearch =
        price >= parseFloat(searchItem) && price <= parseFloat(maxPrice);

      const matcheTipo = searchTipo === "" || item.tipo === searchTipo;

      return matcheSearch && matcheTipo;

    });

    if (filterResults.length > 0) {
      setFilterData(filterResults);
      setNoResults(false);
    } else {
      setNoResults(true);
    }
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
        <div className={styles.container_title_h2}>
          <h2>Pesquisar imóveis por filtro</h2>
        </div>

        <div className={styles.form_continer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.box}>
              <span> R$: </span>
              <input
                value={searchItem}
                type="text"
                name="preco"
                placeholder="Min"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.box}>
              <span> R$: </span>
              <input
                value={maxPrice}
                type="text"
                name="maxPrice"
                placeholder="Max"
                required
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className={styles.box}>
              <span> Tipo de Imóvel: </span>
              <select className={styles.form_select}
                id="tipoImovel"
                name="tipoImovel"
                required
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
              <button className={styles.btn_search} type="submit">Buscar</button>
            </div>
          </form>
        </div>
        {showEmpty && (
          <div className={styles.menssage}>
            Preencha todos os campos antes de bsucar.
          </div>
        )}
      </div>

      <div className={styles.container_card}>
        <div className={styles.card}>
          {noResults ? (
            <div className={styles.card_filter_pesquisa}>
              <p>Nenhum resultado encontrado.</p>
              <button className={styles.card_result_button} type="button" onClick={handleReset} >ok</button>
            </div>
          ) : (
            filterData.map((item, index) => (
              <div className={styles.flex_box}>
                <img
                  src={`${process.env.REACT_APP_API}/images/imoveis/${item.images[0]}`}
                  alt={index} />

                <CurrencyInput decimalsLimit={2} decimalScale={2} inputMode="numeric" intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} defaultValue={item.preco}

                  disabled
                  style={{
                    border: "none", fontSize: "20px",
                    color: "#000", fontWeight: "bold",
                    marginTop: "1rem"
                  }} /> 

                <h3 className={styles.title_card}>Tipo do imovel: {item.tipo}</h3>
                <ul className={styles.location_list}>
                  <li><FaLocationDot /> {item.rua} - {item.bairro}, {item.cidade} - AM </li>
                </ul>
                <Link to={`/imoveldetails/${item._id}`} className={styles.bnt_desc}> Mais Detalhes</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
