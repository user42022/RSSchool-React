import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getPasswordStrength } from '../../utils/validations';
import './PasswordInput.css';

interface InputProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  validationErrors?: FieldError;
  id: string;
}

const PasswordInput = (props: InputProps) => {
  const [passStr, setPassStr] = useState('');

  useEffect(() => {
    setPassStr(getPasswordStrength(props.validationErrors?.types?.matches));
  }, [props.validationErrors]);

  useEffect(() => {
    setPassStr('');
  }, []);

  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        {...props.useFormRegisterReturn}
        autoComplete="off"
        id={props.id}
        type="password"
      />
      <div className={`password-strength ${passStr}`}></div>
      <div className="validation-message">
        {props.validationErrors?.types?.required || ''}{' '}
        {props.validationErrors?.types?.matches
          ? `Password must contain at least: ${props.validationErrors.types.matches}`
          : ''}
      </div>
    </>
  );
};

export default PasswordInput;
