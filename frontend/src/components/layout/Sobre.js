import styles from './Sobre.module.css'


function Sobre() {
    return (

        <>
        <div className={styles.container_sobre}>        

        <h1>Objetivo do Sistema</h1 >
        <div className={styles.container_sobre_padding}>
        <p>
            O objetivo deste trabalho é desenvolver uma aplicação web que sirva como facilitador no
            processo de aluguel de imóveis para estudantes universitários do município de Itacoatiara - AM. 
            contribuindo para a facilidade e satisfação dos estudantes que buscam acomodações adequadas
            durante seu período acadêmico. Simplificaram a busca, seleção e processo de locação, 
            promovendo, assim, uma solução mais eficaz e moderna para as necessidades habitacionais
            dos estudantes universitários de Itacoatiara.
        </p>
        </div>
        </div>
        </>
    )
}

export default Sobre
