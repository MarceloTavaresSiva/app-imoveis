
import { FaLink } from "react-icons/fa6";



import styles from './Validation.module.css'

function Validation() {


    return (
        <>
            <div className={styles.validation_container}>
                <div>
                    <p className={styles.validation_paragraph}>gostaríamos de convidá-lo(a) a clicar no link abaixo e dedicar alguns minutos para nos fornecer seu feedback.
                        Sua opinião é extremamente valiosa para nós e nos ajudará a tornar nossa aplicação ainda melhor.</p>
                    <div className={styles.Validation_box}>
                        <FaLink /> <a className={styles.img_validation} href="https://forms.gle/qPWpcAXJpxrPu4NZ7">Avaliar Agora</a>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Validation
