import React, { useEffect, useRef } from 'react';
import './RangeSlider.css';

const RangeSlider = () => {
    const sliderRef = useRef(null);
    const labelsRef = useRef([]);

    useEffect(() => {
        updateLabels();
    }, []);

    const updateLabels = () => {
        const slider = sliderRef.current;
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const range = max - min;

        labelsRef.current.forEach(label => {
            const labelValue = parseInt(label.getAttribute('data-value'));
            const percentage = ((labelValue - min) / range) * 100;
            label.style.left = `calc(${percentage}% - 12px)`;
        });
    };

    return (
        <div className="columns">
            <p>Columns</p>
            <div className="range-slider-container">
                <input
                    id="column-slider"
                    type="range"
                    min="2"
                    max="4"
                    defaultValue="3"
                    className="column-slider"
                    ref={sliderRef}
                    onInput={updateLabels}
                />
                <div className="labels">
                    {[2, 3, 4].map((value, index) => (
                        <span
                            key={value}
                            className="label"
                            data-value={value}
                            ref={el => (labelsRef.current[index] = el)}
                        >
              {value}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
