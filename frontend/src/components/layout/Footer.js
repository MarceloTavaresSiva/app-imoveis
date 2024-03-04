import styles from './Footer.module.css'

import { Link } from "react-router-dom"

import Sobre from '../layout/Sobre'



function Footer() {
    return (
        <footer className= {styles.footer}>
            <li>
                <Link to="footer/sobre">Sobre</Link>
            </li>
            <li>
                <Link to="footer/contato">Contato</Link>
            </li>
            <li>
                <span className="bold"> &copy; 2024 Marcelo T. - Todos os direitos reservados.</span>
            </li>
        </footer>
        
    )
}

export default Footer
