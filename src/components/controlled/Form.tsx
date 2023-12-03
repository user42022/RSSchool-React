import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as v from './../../utils/validations';
import Input from './Input';
import PasswordInput from './PasswordInput';
import Select from './Select';
import AutocompleteInput from './AutocompleteInput';
import { useAppDispatch } from '../../hooks/redux';
import { formSlice } from '../store/reducers/FormSlice';
import { useNavigate } from 'react-router-dom';

interface FormDetails {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  file: FileList;
  country: string;
}

const Form = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { pushSubmited } = formSlice.actions;

  const schema = yup.object().shape({
    name: v.nameSchema,
    age: v.ageSchema,
    email: v.emailSchema,
    password: v.passwordSchema,
    confirmPassword: yup
      .string()
      .required('Please input password to confirm')
      .oneOf([yup.ref('password')], 'Passwords not match'),
    gender: v.genderSchema,
    acceptTC: v.acceptTCSchema,
    file: v.fileSchema,
    country: v.countrySchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormDetails>({
    resolver: yupResolver<FormDetails>(schema, { abortEarly: false }),
    criteriaMode: 'all',
    mode: 'all',
  });

  const onSubmit = (data: FormDetails) => {
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      dispatch(
        pushSubmited({
          name: data.name,
          age: `${data.age}`,
          email: data.email,
          password: data.password,
          gender: data.gender,
          accept: `${data.acceptTC}`,
          image: fileReader.result,
          country: data.country,
          date: Date.now(),
        })
      );

      navigator('/');
    };

    if (data.file[0]) {
      fileReader.readAsDataURL(data.file[0]);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        useFormRegisterReturn={register('name')}
        type="text"
        id="name"
        validationMessage={errors.name?.message || ''}
        labelText={'Name'}
      />
      <Input
        useFormRegisterReturn={register('age')}
        type="number"
        id="age"
        validationMessage={errors.age?.message || ''}
        labelText={'Age'}
      />
      <Input
        useFormRegisterReturn={register('email')}
        type="text"
        id="email"
        validationMessage={errors.email?.message || ''}
        labelText={'Email'}
      />
      <PasswordInput
        useFormRegisterReturn={register('password')}
        labelText={'Password'}
        validationErrors={errors.password}
        id={'password'}
      />
      <Input
        useFormRegisterReturn={register('confirmPassword')}
        type="password"
        id="confirmPassword"
        validationMessage={errors.confirmPassword?.message || ''}
        labelText={'ConfirmPassword'}
      />
      <Select
        useFormRegisterReturn={register('gender')}
        labelText={'Select gender'}
        id={'gender'}
        validationMessage={errors.gender?.message || ''}
      />
      <Input
        useFormRegisterReturn={register('acceptTC')}
        type="checkbox"
        id="acceptTC"
        validationMessage={errors.acceptTC?.message || ''}
        labelText={'Accept T&C'}
      />
      <Input
        useFormRegisterReturn={register('file')}
        type="file"
        id="file"
        validationMessage={errors.file?.message || ''}
        labelText={'Upload file'}
      />
      <AutocompleteInput
        useFormRegisterReturn={register('country')}
        labelText={'Select country'}
        validationMessage={errors.country?.message || ''}
        id={'country'}
      />
      <button disabled={!isValid}>Submit</button>
    </form>
  );
};

export default Form;
