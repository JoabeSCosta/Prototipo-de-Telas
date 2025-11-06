import { AppShell } from "@/components/layout-principal/estrutura-app"
import { SettingsPanel } from "@/components/layout-principal/painel-configuracoes"

export default function ConfiguracoesPage() {
  return (
    <AppShell title="Configurações">
      <SettingsPanel />
    </AppShell>
  )
}
