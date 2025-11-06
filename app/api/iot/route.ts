import { NextResponse } from "next/server"

// Simulação de endpoint para comunicação com bancada IoT
export async function GET() {
  // Simular dados de sensores
  const sensorData = {
    timestamp: new Date().toISOString(),
    devices: [
      {
        id: 1,
        type: "temperature",
        value: Math.floor(Math.random() * 5) + 22,
        unit: "°C",
        status: "online",
      },
      {
        id: 2,
        type: "humidity",
        value: Math.floor(Math.random() * 10) + 60,
        unit: "%",
        status: "online",
      },
      {
        id: 3,
        type: "led",
        value: Math.random() > 0.5 ? "on" : "off",
        status: "online",
      },
      {
        id: 4,
        type: "motion",
        value: Math.random() > 0.7 ? "detected" : "clear",
        status: "online",
      },
    ],
  }

  return NextResponse.json(sensorData)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simular envio de comando para atuador
  console.log("[v0] Comando enviado para dispositivo IoT:", body)

  return NextResponse.json({
    success: true,
    message: "Comando enviado com sucesso",
    device: body.deviceId,
    action: body.action,
  })
}
