import { CircleDot } from "lucide-react"
import Link from "next/link"

const RecentConsultsCard = ({consult}) => {
  return (
    <Link href={`/consultas/${consult.id}`} className="flex justify-between w-full py-2 px-4 border-b hover:bg-third transition-all duration-300">
        <h5>{consult.name}</h5>
        <CircleDot className="text-primary p-0.5"/>
    </Link>
  )
}

export default RecentConsultsCard