import { SalesManagement } from "@/components/gestao-vendas/gerenciamento-vendas"
import { AppShell } from "@/components/layout-principal/estrutura-app"

export default function SalesPage() {
  return (
    <AppShell title="Vendas">
      <SalesManagement />
    </AppShell>
  )
}
