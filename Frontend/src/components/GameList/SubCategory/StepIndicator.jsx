import React, { useState } from 'react';
import './StepIndicator.css';

const StepIndicator = ({ onStepChange }) => {
    const [activeStep, setActiveStep] = useState(4);

    const handleClick = (step) => {
        setActiveStep(step);
        onStepChange(step);
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
                        backgroundColor: activeStep >= 2 ? '#FDBC11' : '#F2F2F2',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default StepIndicator;
