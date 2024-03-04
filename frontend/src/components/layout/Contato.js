
import styles from './Contato.module.css'
function Contato() {
    return (

    <>
    <div className={styles.container_sobre}>
        <h1>Bem-vindo ao ItaAluga</h1>
        <div className={styles.container_sobre_padding}>
        <p>
            O sistema Ita-Aluga foi desenvolvido no ãmbito do Instituto de Ciencias Exatas e Tecnologia (ICET)
            da Universidade Federal do Amazonas (UFAM), através de um trabalho de Conclusão de Curso, no periodo de 2023/2 ano civil de 2024 
        </p>
        </div>
    </div>

    <div className={styles.contato}>
        <ul>
            <li><span>Nome do Aluno: </span>Marcelo Tavares</li>
            <li><span>Orientador: </span>Rainer Xavier de Amorim</li>
            <li><span>Curso: </span>sistema de Informação</li>
            <li><span>E-mail: </span>marcelo.marcelotavares889@gmail.com</li>
        </ul>
    </div>
        
    </>
    )
}

export default Contato
