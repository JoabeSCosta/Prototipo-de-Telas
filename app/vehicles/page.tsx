import { VehiclesManagement } from "@/components/gestao-veiculos/gerenciamento-veiculos"
import { AppShell } from "@/components/layout-principal/estrutura-app"

export default function VehiclesPage() {
  return (
    <AppShell title="Veículos">
      <VehiclesManagement />
    </AppShell>
  )
}
