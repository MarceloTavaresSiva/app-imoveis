import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

import nome from '../../img/nome.png'


/** Context */
import { Context } from "../../context/UserContext"
import { useContext, useEffect, useState  } from "react"

function Navbar() {
    const {authenticated, userInfo, logout} = useContext(Context)
    
    const [authenticatedState, setAuthenticatedState] = useState(authenticated);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        // Verifica se houve mudança no estado de autenticação
        if (authenticated !== authenticatedState) {
            // Atualiza o estado de autenticação
            setAuthenticatedState(authenticated);
            // Atualiza os menus com base no tipo de usuário
            updateMenus(authenticated, userInfo.roles);
        }
    }, [authenticated, authenticatedState, userInfo.roles]);

    useEffect(() => {
        // Atualiza os menus quando o componente for montado inicialmente
        updateMenus(authenticated, userInfo.roles);
    }, []);

    const updateMenus = (isAuthenticated, userRole) => {
        if (isAuthenticated) {
            switch(userRole) {
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
    };



    return (
        <nav className={styles.navbar}>
            <div>
            <Link to="/">
                <img className={styles.img_logo} src={nome} alt="logoIta" />
            </Link>
            </div>
            <ul>

            {menus.map((menu, index) => (
                    <li key={index}>
                        <Link to={menu.to}>{menu.label}</Link>
                    </li>
                ))}
                {authenticated && (
                    <li onClick={logout}>Sair</li>
                )}
 
            </ul>
        </nav>
    )
}


export default Navbar