import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

/** Context */
import { Context } from "../../context/UserContext"
import { useContext } from "react"

function Navbar() {
    const {authenticated, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div>
                <h2>            
                    <Link to="/">AppMoveis</Link>
                </h2>

            </div>

            <ul>
                <li>
                    <Link to="/">Alugar</Link>
                </li>
                
                {authenticated ? (
                <>
                <li>
                    <Link to="imovel/myadmin">Imoveis</Link>
                </li>
                <li>
                    <Link to="/user/profile">Perfil</Link>
                </li>
                <li onClick={logout}>Sair</li>
                </>
                ) :(  
                <>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastrar</Link>
                    </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar