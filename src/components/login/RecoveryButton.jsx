import Link from "next/link"

const RecoveryButton = () => {
  return (
    <Link
          href="/recuperar-contraseña"
          className="text-sm text-gray-400 hover:underline hover:text-gray-500 transition-all duration-300"
        >
          Recuperar Contraseña
        </Link>
  )
}

export default RecoveryButton