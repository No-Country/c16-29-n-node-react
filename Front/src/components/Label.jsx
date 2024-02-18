export const Label = ({htmlFor, children}) =>{
    return(
        <label htmlFor={htmlFor} className="font-poppins text-base font-medium">
            {children}
        </label>
    )
}
export default Label;