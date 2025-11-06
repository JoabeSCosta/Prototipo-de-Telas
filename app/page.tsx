import { AppShell } from "@/components/layout-principal/estrutura-app"
import { Button } from "@/components/ui/button"
import { OverviewCards } from "@/components/painel-controle/cartoes-visao-geral"
import { VehiclesSummaryTable } from "@/components/gestao-veiculos/tabela-resumo-veiculos"
import { SalesProgress } from "@/components/gestao-vendas/progresso-vendas"
import { ChevronDown } from "lucide-react"

export default function Page() {
  return (
    <AppShell title="Dashboard">
      {/* Overview section */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold">Visão Geral</h2>
        <Button variant="outline" size="sm" className="bg-white text-xs h-8">
          Últimos 30 dias
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="shrink-0">
        <OverviewCards />
      </div>

      {/* Vehicles summary and Sales progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-2 min-h-0">
          <VehiclesSummaryTable />
        </div>
        <div className="min-h-0">
          <SalesProgress />
        </div>
      </div>
    </AppShell>
  )
}
