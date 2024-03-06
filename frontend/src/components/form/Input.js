import styles from './Input.module.css'
import React from 'react';
import CurrencyInput from 'react-currency-input-field';

function Input({
    type,
    text, 
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
    required,
    maxLength,
    mascara,
}) {

    const inputComponent = mascara ? (
        <CurrencyInput 
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalSeparator="," groupSeparator="."
            // type={type}
            name={name} 
            id={name} 
            placeholder={placeholder} 
            // onInput={handleOnChange}
            onValueChange={(value) => handleOnChange({ target: { name, value } })}
            value={value} 
            {...(multiple ? {multiple} : '')}
            {...(required ? {required: 'required'} : {})}
            {...(maxLength ? {maxLength} : {})}
        />
    ) : (
        <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            value={value} 
            {...(multiple ? {multiple} : '')}
            {...(required ? {required: 'required'} : {})}
            {...(maxLength ? {maxLength} : {})}
        />
    );

    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            {inputComponent}
             {/* <div className={styles.form_control}>

        <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value} 
                {...(multiple ? {multiple} : '')}
                {...(required ? {required: 'required'} : {})}
                {...(maxLength ? {maxLength} : {})}
            /> 
        </div> */}
        </div>
       
    )
}

export default Input




