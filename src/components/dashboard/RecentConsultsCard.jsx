import { CircleDot } from "lucide-react";
import Link from "next/link";

const RecentConsultsCard = ({ consult }) => {
  return (
    <Link
      href={`/consultas/${consult.id}`}
      className="flex justify-between w-full py-2 px-4 border-b hover:bg-third transition-all duration-300"
    >
      <h5>{consult.name}</h5>
      <CircleDot
        className={`${
          consult.status === "new"
            ? "text-primary"
            : consult.status === "seen"
            ? "text-gray-400"
            : consult.status === "replied"
            ? "hidden"
            : "text-red-500"
        } p-0.5`}
      />
    </Link>
  );
};

export default RecentConsultsCard;
