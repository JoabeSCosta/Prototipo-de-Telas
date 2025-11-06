"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function IoTMonitoring() {
  const devices = [
    { name: "Sensor 1", status: "active", activity: [1, 0, 1, 1, 0, 1, 0] },
    { name: "Sensor 2", status: "active", activity: [0, 1, 1, 0, 1, 1, 1] },
    { name: "Sensor 3", status: "inactive", activity: [1, 1, 0, 0, 0, 0, 0] },
    { name: "Atuador 1", status: "active", activity: [0, 0, 1, 1, 1, 0, 1] },
    { name: "Atuador 2", status: "active", activity: [1, 1, 1, 0, 1, 1, 0] },
    { name: "LED 1", status: "active", activity: [0, 1, 0, 1, 0, 1, 1] },
    { name: "LED 2", status: "inactive", activity: [1, 0, 0, 0, 0, 0, 0] },
  ]

  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"]

  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Monitoramento IoT</CardTitle>
          <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
            Últimos 7 dias
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Activity grid */}
          <div className="flex flex-col gap-2">
            {devices.map((device, deviceIndex) => (
              <div key={deviceIndex} className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-600 truncate">{device.name}</div>
                <div className="flex gap-1 flex-1">
                  {device.activity.map((active, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-6 h-6 rounded-full border-2 ${
                        active ? "bg-[#1a1a1a] border-[#1a1a1a]" : "bg-white border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Month labels */}
          <div className="flex items-center gap-2">
            <div className="w-16" />
            <div className="flex gap-1 flex-1 justify-between px-1">
              {months.map((month, index) => (
                <div key={index} className="text-[10px] text-gray-500">
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Status summary */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Dispositivos Ativos</div>
                <div className="text-2xl font-bold text-green-600">5</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Dispositivos Inativos</div>
                <div className="text-2xl font-bold text-red-600">2</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
