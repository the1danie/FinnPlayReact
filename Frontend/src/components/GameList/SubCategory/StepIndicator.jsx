import React, { useState } from 'react';
import './StepIndicator.css'; // Make sure to create this CSS file

const StepIndicator = () => {
    const [activeStep, setActiveStep] = useState(2); // Initial step is 2

    const handleClick = (step) => {
        setActiveStep(step);
    };

    return (
        <div className="step-indicator">
            {[2, 3, 4].map((step) => (
                <div
                    key={step}
                    className={`step ${activeStep >= step ? 'active' : ''}`}
                    data-step={step}
                    onClick={() => handleClick(step)}
                >
                    {step}
                </div>
            ))}
            <div className="line-container">
                <div
                    className="line"
                    style={{
                        width:
                            activeStep === 2 ? 'calc(33.33% - 7rem)' :
                                activeStep === 3 ? 'calc(66.66% - 3rem)' :
                                    'calc(100%)',
                        backgroundColor: activeStep >= 2 ? '#f0ad4e' : 'grey',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default StepIndicator;
