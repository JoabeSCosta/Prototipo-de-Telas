import { IoTDashboard } from "@/components/monitoramento-iot/painel-iot"
import { AppShell } from "@/components/layout-principal/estrutura-app"

export default function IoTPage() {
  return (
    <AppShell title="IoT Monitor">
      <IoTDashboard />
    </AppShell>
  )
}
