import SelectWithFilters from "./components/SelectWithFilters"
import { colourOptions } from './utils/data'
import Sidebar from "./components/Sidebar"

function App() {

  return (
    <>
      {/* <Sidebar /> */}
      <div className="w-72">
      <SelectWithFilters data={colourOptions} />
      </div>
      
    </>
  )
}

export default App
