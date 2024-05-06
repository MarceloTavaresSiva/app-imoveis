import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

import nome from '../../img/nome.png'

/** Context */
import { Context } from "../../context/UserContext"

import { useContext, useState, useEffect } from "react"


function Navbar() {
    const { authenticated, userInfo, logout } = useContext(Context)
    const [authenticatedState, setAuthenticatedState] = useState(authenticated);
    const [menus, setMenus] = useState([]);


    useEffect(() => {
        // Atualiza os menus quando o componente for montado inicialmente
        if (authenticated) {
            console.log(userInfo.roles);
            switch (userInfo.roles) {
                case "customer":
                    setMenus([
                        { to: "/", label: "Imovel" },
                        { to: "imovel/listaimoveis", label: "Agendamento" },
                        { to: "/user/profile", label: "Editar Perfil" }
                    ]);
                    break;
                case "owner":
                    setMenus([
                        { to: "imovel/myadmin", label: "Meus Imóveis" },
                        { to: "/user/profile", label: "Editar Perfis" }
                    ]);
                    break;
                default:
                    setMenus([
                        {},
                    ]);
            }
        } else {
            setMenus([
                { to: "anunciar/sinup-owner", label: "Anunciar" },
                { to: "/register", label: "Criar Conta" },
                { to: "/login", label: "Entrar" }
            ]);
        }
    }, [authenticated]);

    return (
        
            <nav className={styles.navbar}>
                <div>
                    <Link to="/">
                        <img className={styles.img_logo} src={nome} alt="logoIta" />
                    </Link>
                </div>
                <ul>

                    {authenticated ? (

                        <>
                            {menus.map((menu, index) => (
                                <li key={index}>
                                    <Link to={menu.to}>{menu.label}</Link>
                                </li>
                            ))}
                            {authenticated && (
                                <li onClick={logout}>Sair</li>
                            )}
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
                    )
                    }
                </ul>
            </nav>
    );
}

export default Navbar;