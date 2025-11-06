"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Wifi,
  WifiOff,
  Thermometer,
  Droplets,
  Zap,
  AlertTriangle,
  Power,
  Radio,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function IoTDashboard() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Sensor de Temperatura - Showroom",
      type: "sensor",
      status: "online",
      value: "24°C",
      icon: Thermometer,
      lastUpdate: "Há 2 minutos",
      vehicle: "Toyota Corolla 2024",
    },
    {
      id: 2,
      name: "Sensor de Umidade - Estoque",
      type: "sensor",
      status: "online",
      value: "65%",
      icon: Droplets,
      lastUpdate: "Há 1 minuto",
      vehicle: "Honda Civic 2023",
    },
    {
      id: 3,
      name: "LED Indicador - Entrada",
      type: "actuator",
      status: "online",
      value: "Ligado",
      icon: Zap,
      lastUpdate: "Há 30 segundos",
      vehicle: null,
    },
    {
      id: 4,
      name: "Sensor de Movimento - Garagem",
      type: "sensor",
      status: "online",
      value: "Detectado",
      icon: Radio,
      lastUpdate: "Há 5 minutos",
      vehicle: "Ford Ranger 2024",
    },
    {
      id: 5,
      name: "Controle de Iluminação",
      type: "actuator",
      status: "offline",
      value: "Desligado",
      icon: Power,
      lastUpdate: "Há 15 minutos",
      vehicle: null,
    },
    {
      id: 6,
      name: "Sensor de Pressão - Pneus",
      type: "sensor",
      status: "warning",
      value: "28 PSI",
      icon: AlertTriangle,
      lastUpdate: "Há 3 minutos",
      vehicle: "Jeep Compass 2023",
    },
  ])

  const [selectedDevice, setSelectedDevice] = useState<any>(null)

  // Simular atualização de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          if (device.type === "sensor" && device.status === "online") {
            // Simular mudança de valores
            if (device.name.includes("Temperatura")) {
              const temp = Math.floor(Math.random() * 5) + 22
              return { ...device, value: `${temp}°C`, lastUpdate: "Agora" }
            }
            if (device.name.includes("Umidade")) {
              const humidity = Math.floor(Math.random() * 10) + 60
              return { ...device, value: `${humidity}%`, lastUpdate: "Agora" }
            }
          }
          return device
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const onlineDevices = devices.filter((d) => d.status === "online").length
  const offlineDevices = devices.filter((d) => d.status === "offline").length
  const warningDevices = devices.filter((d) => d.status === "warning").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-700"
      case "offline":
        return "bg-red-100 text-red-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="w-4 h-4" />
      case "offline":
        return <WifiOff className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return null
    }
  }

  const toggleDevice = (deviceId: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId && device.type === "actuator") {
          const newStatus = device.status === "online" ? "offline" : "online"
          const newValue = newStatus === "online" ? "Ligado" : "Desligado"
          return { ...device, status: newStatus, value: newValue, lastUpdate: "Agora" }
        }
        return device
      }),
    )
  }

  return (
    <>
      {/* Add Device Button */}
      <div className="flex items-center justify-between shrink-0 mb-6">
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full text-xs h-8 flex items-center justify-center gap-1">
          <Plus className="w-3 h-3 text-[#ff5722]" />
          Adicionar dispositivo
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0 mb-6">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Dispositivos Online</div>
                <div className="text-2xl font-bold">{onlineDevices}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Dispositivos Offline</div>
                <div className="text-2xl font-bold">{offlineDevices}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <WifiOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Alertas Ativos</div>
                <div className="text-2xl font-bold">{warningDevices}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices grid */}
      <Card className="bg-white border-none shadow-sm shrink-0 mb-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Todos os Dispositivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devices.map((device) => (
                  <Card key={device.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <device.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{device.name}</h3>
                              <p className="text-xs text-gray-500">{device.type === "sensor" ? "Sensor" : "Atuador"}</p>
                            </div>
                          </div>
                          <Badge
                            className={`${getStatusColor(device.status)} text-xs border-none flex items-center gap-1`}
                          >
                            {getStatusIcon(device.status)}
                            {device.status === "online" ? "Online" : device.status === "offline" ? "Offline" : "Alerta"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Valor atual:</span>
                            <span className="text-sm font-semibold">{device.value}</span>
                          </div>
                          {device.vehicle && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">Veículo:</span>
                              <span className="text-xs font-medium">{device.vehicle}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">Última atualização:</span>
                            <span className="text-xs">{device.lastUpdate}</span>
                          </div>
                        </div>

                        {device.type === "actuator" && (
                          <div className="flex items-center justify-between pt-2 border-t">
                            <Label htmlFor={`device-${device.id}`} className="text-xs">
                              Controle
                            </Label>
                            <Switch
                              id={`device-${device.id}`}
                              checked={device.status === "online"}
                              onCheckedChange={() => toggleDevice(device.id)}
                            />
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full h-8 text-xs bg-transparent"
                          onClick={() => setSelectedDevice(device)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

      {/* API Integration Info */}
      <Card className="bg-white border-none shadow-sm shrink-0">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Integração com Bancada IoT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Status da Conexão
              </h4>
              <p className="text-sm text-gray-700">
                A plataforma está conectada à bancada IoT via WebSocket. Os dados são atualizados em tempo real a
                cada 5 segundos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Endpoint da API</h4>
                <code className="text-xs bg-gray-100 p-2 rounded block">ws://localhost:3000/api/iot/connect</code>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Protocolo</h4>
                <p className="text-sm text-gray-700">WebSocket / MQTT / HTTP</p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Funcionalidades Disponíveis</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Leitura de sensores em tempo real (temperatura, umidade, movimento, pressão)</li>
                <li>Controle de atuadores (LEDs, relés, motores)</li>
                <li>Associação de dispositivos com veículos específicos</li>
                <li>Alertas automáticos para valores fora do padrão</li>
                <li>Histórico de dados coletados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
