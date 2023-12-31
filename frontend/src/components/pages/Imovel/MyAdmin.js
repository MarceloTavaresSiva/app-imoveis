import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function MyAdmin() {
    const [moves, setmoves] = useState([])

    return (
        <section>
            <div>
                <h1>MyAdmin</h1>
                <Link to="/imovel/add">Cadastrar imovel</Link>
            </div>
            <div>
                {moves.length > 0 && <p>Meus imoveis cadastrados</p>}
                {moves.length == 0 && <p>Não ha imoveis cadastrados</p>}
            </div>
        </section>
    )
}

export default MyAdmin

