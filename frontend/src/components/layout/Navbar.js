import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

/** Context */
import { Context } from "../../context/UserContext"
import { useContext } from "react"

function Navbar() {
    const {authenticated, userInfo, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div>
                <h2>            
                    <Link to="/">Ita-ALuga</Link>
                </h2>
            </div>
            
            <ul>
                {authenticated && userInfo.roles === 'customer' ?  (
                <>
                    <li>
                        <Link to="/">Imovel</Link>
                    </li>
                    <li>
                        <Link to="imovel/listaimoveis">Agendamento</Link>
                    </li>
                    <li>
                        <Link to="/user/profile">Editar Perfil</Link>
                    </li>
                    <li onClick={logout}>Sair</li>
                </>

                ) : authenticated && userInfo.roles === 'owner' ? (
                    <>
                    <li>
                        <Link to="imovel/myadmin">Meus Imóveis</Link>
                    </li>
                    <li>
                        <Link to="/user/profile">Editar Perfil</Link>
                    </li>
                    <li onClick={logout}>Sair</li>
                </>
                
                ) : (
                    <>
                     <li>
                        <Link to="anunciar/sinup-owner">Anunciar</Link>
                    </li>
                    <li>
                        <Link to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link to="/register">Criar Conta</Link>
                    </li>
                </>
                ) }
            </ul>
        </nav>
    )
}


export default Navbar