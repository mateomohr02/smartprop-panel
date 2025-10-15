
import Leads from "./Leads"
import ActiveProperties from "./ActiveProperties"

const DashboardPage = () => {
  return (
    <div 
    className="flex flex-col items-center justify-center gap-2 py-2"
    >
        
        <ActiveProperties/>
        <Leads/>

    </div>
  )
}

export default DashboardPage