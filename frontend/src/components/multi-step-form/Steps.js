import React from 'react'
import "./Steps.css"

const  Steps = ({currentStep}) =>  {

    return (
        <div className='steps '>
        <div className={`steps active`}>
            <p> Usuário </p>
        </div>
        <div className={`steps ${currentStep >= 1 ? "active" : ""}`}>
            <p> Imóvel </p>
        </div>
        <div className={`steps ${currentStep >= 2 ? "active" : ""}`}>
            <p> Revisão </p>
        </div>
        </div>
    )
};

export default Steps;