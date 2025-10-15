"use client";

import { useFetchLeads } from "@/hooks/useFetchLeads";
import LeadCounter from "./LeadCounter";
import LeadSummary from "./LeadSummary";

const Leads = () => {
  const { leads, loading, error } = useFetchLeads();
  
  return (
    <div className="flex flex-col gap-2 ">
      <LeadCounter counter={leads.length} loading={loading} error={error} />

      <LeadSummary leads={leads} loading={loading} error={error} />
    </div>
  );
};

export default Leads;
