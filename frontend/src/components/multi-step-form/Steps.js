import React from 'react'
import "./MultStep.module.css";

const  Steps = ({currentStep}) =>  {

    return (
        <div className='steps '> Steps 
        <div className={`steps active`}>
            <p> 1 </p>
        </div>
        <div className={`steps ${currentStep >= 1 ? "active" : ""}`}>
            <p> 2 </p>
        </div>
        <div className={`steps ${currentStep >= 2 ? "active" : ""}`}>
            <p> 3 </p>
        </div>
        </div>
    )
};

export default Steps;