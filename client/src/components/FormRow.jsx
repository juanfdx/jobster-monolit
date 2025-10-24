
export const FormRow = ({ type, name, labelText, defaultValue = '', onChange }) => {

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className='form-input'
        defaultValue={defaultValue}
        required
        autoComplete='off'
        onChange={onChange}
      />
    </div>
  );
}