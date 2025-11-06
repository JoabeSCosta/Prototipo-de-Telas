"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function VehiclesSummaryTable() {
  const vehicles = [
    {
      name: "Toyota Corolla 2024",
      category: "Sedan",
      price: "R$ 125.000",
      status: "Disponível",
      statusColor: "bg-green-100 text-green-700",
      stock: "high",
    },
    {
      name: "Honda Civic 2023",
      category: "Sedan",
      price: "R$ 145.000",
      status: "Reservado",
      statusColor: "bg-orange-100 text-orange-700",
      stock: "medium",
    },
    {
      name: "Ford Ranger 2024",
      category: "Pickup",
      price: "R$ 235.000",
      status: "Em negociação",
      statusColor: "bg-red-100 text-red-700",
      stock: "low",
    },
    {
      name: "Jeep Compass 2023",
      category: "SUV",
      price: "R$ 185.000",
      status: "Disponível",
      statusColor: "bg-green-100 text-green-700",
      stock: "high",
    },
    {
      name: "Volkswagen T-Cross 2024",
      category: "SUV",
      price: "R$ 135.000",
      status: "Vendido",
      statusColor: "bg-blue-100 text-blue-700",
      stock: "medium",
    },
  ]

  return (
    <Card className="bg-white border-none shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Resumo de Veículos</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
              Categoria
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
              Preço
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
              Status
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-600 pb-2">Nome</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-2">Categoria</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-2">Preço</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-2">Status</th>
                <th className="text-left text-xs font-medium text-gray-600 pb-2">Estoque</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium">{vehicle.name}</td>
                  <td className="py-3 text-sm text-gray-600">{vehicle.category}</td>
                  <td className="py-3 text-sm text-gray-600">{vehicle.price}</td>
                  <td className="py-3">
                    <Badge className={`${vehicle.statusColor} text-xs font-normal border-none`}>{vehicle.status}</Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      {vehicle.stock === "high" && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {vehicle.stock === "medium" && <Minus className="w-4 h-4 text-orange-600" />}
                      {vehicle.stock === "low" && <TrendingDown className="w-4 h-4 text-red-600" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
