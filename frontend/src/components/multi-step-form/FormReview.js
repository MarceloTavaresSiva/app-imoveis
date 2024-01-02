import React from 'react';
import styleStep from './MultStep.module.css'

function FormReview({ formData }) {
  return (
    <div>
      <h2> Preview</h2>
      <div className={styleStep.form_control}>
        <strong>First Name:</strong> {formData.preco}
      </div>
      <div className={styleStep.form_control}>
        <strong>Last Name:</strong> {formData.name}
      </div>
    </div>
  );
}
export default FormReview;