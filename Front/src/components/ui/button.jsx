/**
 * @function Button
 * @param {React.ButtonHTMLAttributes}
 * @returns {JSX.Element}
 *  */
const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition duration-300 ease-in-out ${className}`}
      { ...props }
    >
      { children }
    </button>
  )
}

export default Button