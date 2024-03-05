const Checkbox = ({ onChange, checked, disabled, className = "" }) => {
  return (
    <input 
      type="checkbox"
      className={`w-4 h-4 ${className}`}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
  )
}

export default Checkbox