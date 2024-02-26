/**
 * @param {{ 
 *    tabs: { value: any, label: string }[] 
 *    active: any
 *    onChange: (value: { value: any, label: string }) => void
 * }}
 */
const Tabs = ({ tabs, active, onChange }) => {
  return (
    <ul className="w-full flex border-b">
      {
        tabs.map((tab) => (
          <li
            className={`text-sm basis-32 pl-2 pr-3 py-1 border rounded-t border-[#C6D5DB] ${tab.value === active ? "bg-[#8800FF] text-white" : "bg-[#DCE5E9]"} cursor-pointer`}
            onClick={() => onChange(tab)}
            key={tab.value}
          >
            {tab.label}
          </li>
        ))
      }
    </ul>
  )
}

export default Tabs;