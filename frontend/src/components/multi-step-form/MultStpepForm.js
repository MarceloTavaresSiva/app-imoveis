import React, { useState } from 'react';
import FormImovel from './FormImovel';
import FormOwner from './FormOwner';
import FormReview from './FormReview';
import Input from '../form/Input'
import styleStep from './MultStep.module.css'

function MainForm() {
  const [formData, setFormData] = useState({
    name: '',
    preco: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormOwner formData={formData} setFormData={setFormData} />;
      case 2:
        return <FormImovel formData={formData} setFormData={setFormData} />;
      case 3:
        return <FormReview formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className={styleStep.form_principal}>
      <form>
        {renderStep()}
        <div className={styleStep.actions} >
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MainForm;