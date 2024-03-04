import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

import nome from '../../img/nome.png'


/** Context */
import { Context } from "../../context/UserContext"
import { useContext } from "react"

function Navbar() {
    const {authenticated, userInfo, logout} = useContext(Context)


    return (
        <nav className={styles.navbar}>
            <div>
            <Link to="/">
                <img className={styles.img_logo} src={nome} alt="logoIta" />
            </Link>
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
                    <li className={styles.active_create}>
                        <Link to="/register"> Criar Conta</Link>
                    </li>
                </>
                ) }
            </ul>
        </nav>
    )
}


export default Navbar