import api from '../../../utils/api'

import styles from './AddImovel.module.css'

import {useState} from 'react'
import {useHistory} from 'react-router-dom'


/**Components */
import ImovelForm from '../../form/ImovelForm'


/**Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'


function AddImovel() {
    return (
        <section className={styles.addimovel_header}>
            <div>
                <h1>Cadastre um Imovel</h1>
                <p>Disponivel para alugar</p>
            </div>
            <ImovelForm btnText="Cadastrar Imovel"/>
        </section>
    )
}

export default AddImovel


