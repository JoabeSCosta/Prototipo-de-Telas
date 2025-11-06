import { AppShell } from "@/components/layout-principal/estrutura-app"
import { EmployeesTable } from "@/components/tabelas/tabela-funcionarios"

export default function FuncionariosPage() {
  return (
    <AppShell title="Funcionários">
      <EmployeesTable />
    </AppShell>
  )
}
