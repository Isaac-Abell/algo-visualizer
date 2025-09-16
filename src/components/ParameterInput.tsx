import React from 'react';
import type { AlgorithmParam } from './Algorithms';

interface ParameterInputProps {
  param: AlgorithmParam;
  value: string | number | undefined;
  onChange: (paramName: string, value: string) => void;
}

export function ParameterInput({ param, value, onChange }: ParameterInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(param.name, e.target.value);
  };

  return (
    <div className="param-container">
      <label className="param-label">
        {param.label} {param.required && <span className="param-required">*</span>}
      </label>
      
      {param.type === 'text' && (
        <input
          type="text"
          placeholder={param.placeholder}
          value={value?.toString() || ''}
          onChange={handleChange}
          className="param-input"
          required={param.required}
        />
      )}
      
      {param.type === 'number' && (
        <input
          type="number"
          placeholder={param.placeholder}
          min={param.min}
          max={param.max}
          value={value?.toString() || ''}
          onChange={handleChange}
          className="param-input"
          required={param.required}
        />
      )}
      
      {param.type === 'select' && param.options && (
        <select
          value={value?.toString() || param.default || ''}
          onChange={handleChange}
          className="param-select"
        >
          {param.options.map((option: string) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      )}
      
      {param.type === 'textarea' && (
        <textarea
          placeholder={param.placeholder}
          value={value?.toString() || ''}
          onChange={handleChange}
          rows={4}
          className="param-textarea"
          required={param.required}
        />
      )}
    </div>
  );
}