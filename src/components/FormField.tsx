import React from 'react';
import { FormFieldProps } from '../types/form';

interface InputFieldProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password';
  icon?: React.ReactNode;
}

export const FormField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  type = 'text',
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full py-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-slate-900 placeholder-slate-400 transition-all
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
