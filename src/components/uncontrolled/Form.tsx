import { useRef, useState } from 'react';
import Input from './Input';
import Select from './Select';
import AutocompleteInput from './AutocompleteInput';
import PasswordInput from './PasswordInput';
import './form-styles.css';
import * as v from './../../utils/validations';
import { useAppDispatch } from '../../hooks/redux';
import { formSlice } from '../store/reducers/FormSlice';

const Form = () => {
  const dispatch = useAppDispatch();
  const { pushSubmited } = formSlice.actions;

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTCRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [nameValidation, setNameValidation] = useState('');
  const [ageValidation, setAgeValidation] = useState('');
  const [emailValidation, setEmailValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState('');
  const [genderValidation, setGenderValidation] = useState('');
  const [acceptTCValidation, setAcceptTCValidation] = useState('');
  const [fileValidation, setFileValidation] = useState('');
  const [countryValidation, setCountryValidation] = useState('');
  const [passStr, setPassStr] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resolved = await Promise.all([
      v.validateCommon(nameRef.current?.value, v.nameSchema, setNameValidation),
      v.validateCommon(ageRef.current?.value, v.ageSchema, setAgeValidation),
      v.validateCommon(
        emailRef.current?.value,
        v.emailSchema,
        setEmailValidation
      ),
      v.validatePassword(
        passwordRef.current?.value || '',
        setPasswordValidation,
        setPassStr
      ),
      v.validateCommon(
        confirmPasswordRef.current?.value,
        v.confirmPasswordSchema(passwordRef.current?.value || ''),
        setConfirmPasswordValidation
      ),
      v.validateCommon(
        genderRef.current?.value,
        v.genderSchema,
        setGenderValidation
      ),
      v.validateCommon(
        acceptTCRef.current?.checked,
        v.acceptTCSchema,
        setAcceptTCValidation
      ),
      v.validateCommon(fileRef.current?.files, v.fileSchema, setFileValidation),
      v.validateCommon(
        countryRef.current?.value,
        v.countrySchema,
        setCountryValidation
      ),
    ]);
    if (!resolved.some((isSuccess) => !isSuccess)) {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        dispatch(
          pushSubmited({
            name: nameRef.current?.value || '',
            age: ageRef.current?.value || '',
            email: passwordRef.current?.value || '',
            password: confirmPasswordRef.current?.value || '',
            gender: genderRef.current?.value || '',
            accept: `${acceptTCRef.current?.checked || ''}`,
            image: fileReader.result,
            country: countryRef.current?.value || '',
          })
        );
      };
      if (fileRef.current?.files && fileRef.current.files[0]) {
        fileReader.readAsDataURL(fileRef.current.files[0]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        inputRef={nameRef}
        id="name"
        validationMessage={nameValidation}
        labelText={'Name'}
      />
      <Input
        type="number"
        inputRef={ageRef}
        id="age"
        validationMessage={ageValidation}
        labelText={'Age'}
      />
      <Input
        type="text"
        inputRef={emailRef}
        id="email"
        validationMessage={emailValidation}
        labelText={'Email'}
      />

      <PasswordInput
        labelText={'Password'}
        validationMessage={passwordValidation}
        id={'password'}
        inputRef={passwordRef}
        passwordStrength={passStr ? `type${passStr}` : ''}
      />

      <Input
        type="password"
        inputRef={confirmPasswordRef}
        id="confirmPassword"
        validationMessage={confirmPasswordValidation}
        labelText={'ConfirmPassword'}
      />
      <Select
        labelText={'Select gender'}
        id={'gender'}
        inputRef={genderRef}
        validationMessage={genderValidation}
      />
      <Input
        type="checkbox"
        inputRef={acceptTCRef}
        id="acceptTC"
        validationMessage={acceptTCValidation}
        labelText={'Accept T&C'}
      />
      <Input
        type="file"
        inputRef={fileRef}
        id="file"
        validationMessage={fileValidation}
        labelText={'Upload file'}
      />
      <AutocompleteInput
        labelText={'Select country'}
        validationMessage={countryValidation}
        id={'country'}
        inputRef={countryRef}
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;
