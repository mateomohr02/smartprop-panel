
import Leads from "./Leads"
import ActiveProperties from "./ActiveProperties"
import VisitsCounter from "./VisitsCounter"

const DashboardPage = () => {
  return (
    <div 
    className="flex flex-col items-center justify-center gap-2"
    >
        <ActiveProperties/>
        <VisitsCounter/>
        <Leads/>

    </div>
  )
}

export default DashboardPage