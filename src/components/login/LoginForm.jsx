"use client";

import { LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import RecoveryButton from "./RecoveryButton";
import { login } from "@/utils/login";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await login(email, password)
    if (data) {
      router.push('/dashboard')
    }

  };

  return (
    <form
      action="login"
      onSubmit={handleSubmit}
      className="bg-contrast flex flex-col p-4 gap-4 rounded-md max-w-[430px] shadow-sm border-2 border-secondary"
    >
      <h1 className="text-center text-xl font-semibold">Iniciar Sesión</h1>

      {/* Campo Email */}
      <div className="md:flex md:items-baseline md:justify-between relative">
        <p>E-mail:</p>
        <div className="relative w-[300px]">
          <input
            type="email"
            name="email"
            value={email}
            className="my-2 md:mx-2 px-4 py-2 rounded-sm border border-third w-full shadow-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingrese el email del usuario"
          />
        </div>
      </div>

      {/* Campo Contraseña con botón de mostrar/ocultar */}
      <div className="md:flex md:items-baseline md:justify-between relative">
        <p>Contraseña:</p>
        <div className="relative w-[300px]">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            className="my-2 md:mx-2 px-4 py-2 rounded-sm border border-third w-full pr-10 shadow-sm"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="**********"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all"
          >
            {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Botón de login y link */}
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          type="submit"
          className="px-4 py-1 text-lg flex items-center justify-center hover:bg-third hover:rounded-full w-fit transition-all duration-300"
        >
          Iniciar Sesión
          <LogIn className="mx-1 p-0.5" />
        </button>
        <RecoveryButton />
      </div>
    </form>
  );
};

export default LoginForm;
