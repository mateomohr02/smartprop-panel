import { CircleDot } from "lucide-react"

const RecentConsultsCard = ({consult}) => {
  return (
    <div className="flex justify-between w-full py-2 px-4 border-b  ">
        <h5>{consult.name}</h5>
        <CircleDot className="text-primary p-0.5"/>
    </div>
  )
}

export default RecentConsultsCard