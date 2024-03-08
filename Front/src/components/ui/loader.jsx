import { BeatLoader } from "react-spinners"

const Loader = ({ isLoading }) => {
  if(!isLoading){
    return null
  }
  return (
    <BeatLoader 
      color="#6202B6"
      className="absolute bottom-4 right-4"
    />
  )
}

export default Loader