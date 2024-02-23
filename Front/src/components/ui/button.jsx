
const CLASSNAMES_VARIANTS_MAP = {
  "purple": "bg-purple-600 hover:bg-purple-700 text-white",
  "purple-outlined": "bg-white border-purple-600 border-2 text-purple-600",
  "red": "bg-red-600 hover:bg-red-700 text-white",
  "gray-outlined": "bg-white border-gray-600 border-2 text-gray-600"
}

const CLASSNAMES_SIZES_MAP = {
  "xs": "text-xs",
  "sm": "text-sm",
  "md": "text-md",
  "lg": "text-lg",
  "xl": "text-xl",
}
/**
 * @function Button
 * @param {React.ButtonHTMLAttributes & { variant: Record<keyof CLASSNAMES_VARIANTS_MAP, string>, size: Record<keyof CLASSNAMES_SIZES_MAP, string> }}
 * @returns {JSX.Element}
 *  */
const Button = ({ className, children, variant = "purple", size = "md", ...props }) => {
  return (
    <button
      className={`px-4 py-2 border ${CLASSNAMES_VARIANTS_MAP[variant]} ${CLASSNAMES_SIZES_MAP[size]} rounded disabled:opacity-30 transition duration-300 ease-in-out ${className}`}
      { ...props }
    >
      { children }
    </button>
  )
}

export default Button