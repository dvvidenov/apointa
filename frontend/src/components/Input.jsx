const Input = ({ type, labelName, value, onChange, pattern = '' , isDisabled=false ,error=''}) => {
  
  return (

    <div className="field">
      {labelName && <label className={`input-label ${error}`}>{labelName}</label>}
      <input
        className={`input ${error}`}
        type={type}
        required
        pattern={pattern}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
}

export default Input;