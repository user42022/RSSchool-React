import { useAppSelector } from '../../hooks/redux';

interface AutocompleteInputProps {
  labelText: string;
  validationMessage: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const country_list = useAppSelector((state) => state.countriesReducer);

  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input list="country_list" id={props.id} ref={props.inputRef} />
      <datalist id="country_list">
        {country_list.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default AutocompleteInput;
