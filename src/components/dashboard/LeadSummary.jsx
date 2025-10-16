// LeadSummary.jsx
import Link from "next/link";
import RecentConsultsCard from "./RecentConsultsCard";

const LeadSummary = ({ leads, loading, error }) => {
  if (loading)
    return (
      <div className="min-w-[340px] max-w-[450px] min-h-[250px] max-h-[360px] bg-gray-100 rounded-lg shadow-md border border-gray-200 relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent animate-shimmer-diagonal" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[250px]">
        <p className="text-red-500">Error cargando las Consultas</p>
      </div>
    );

  return (
    <div className="relative min-w-[340px] max-w-[450px] min-h-[250px] max-h-[360px] bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
      {/* 🧭 Título arriba a la izquierda */}
      <h3 className="font-medium p-4">Consultas Recientes</h3>

      <div className="flex-1 overflow-y-auto">
        {leads.length === 0 ? (
          <div className="flex flex-1 justify-center items-center pb-10">
            <span>No hay Consultas Para Mostrar</span>
          </div>
        ) : (
          leads.map((l) => <RecentConsultsCard key={l.id} consult={l} />)
        )}
      </div>
      {leads.length > 0 && (
        <Link
          href="/consultas"
          className="w-full text-center py-2 border-t hover:bg-third transition-all duration-300"
        >
          Ver Todas
        </Link>
      )}
    </div>
  );
};

export default LeadSummary;
