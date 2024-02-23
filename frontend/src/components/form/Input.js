import styles from './Input.module.css'

function Input({
    type,
    text, 
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
    required,  // Adicionando a propriedade 'required'
}) {

    return(
        <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            value={value} 
            {...(multiple ? {multiple} : '')}
            {...(required ? {required: 'required'} : {})}  // Adicionando a validação 'required'
        />
    </div>
    )
}

export default Input




