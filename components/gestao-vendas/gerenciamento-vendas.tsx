"use client"

import { useState } from "react"
import {
  Plus,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SalesManagement() {
  const [sales, setSales] = useState([
    {
      id: 1,
      customer: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      vehicle: "Toyota Corolla 2024",
      vehiclePrice: 125000,
      date: "2024-01-15",
      status: "Concluída",
      paymentMethod: "Financiamento",
      downPayment: 25000,
      installments: 60,
      notes: "Cliente aprovado pelo banco",
    },
    {
      id: 2,
      customer: "Maria Santos",
      cpf: "987.654.321-00",
      email: "maria@email.com",
      phone: "(11) 91234-5678",
      vehicle: "Honda Civic 2023",
      vehiclePrice: 145000,
      date: "2024-01-18",
      status: "Em andamento",
      paymentMethod: "Financiamento",
      downPayment: 30000,
      installments: 48,
      notes: "Aguardando aprovação do crédito",
    },
    {
      id: 3,
      customer: "Pedro Oliveira",
      cpf: "456.789.123-00",
      email: "pedro@email.com",
      phone: "(11) 99876-5432",
      vehicle: "Ford Ranger 2024",
      vehiclePrice: 235000,
      date: "2024-01-20",
      status: "Aguardando docs",
      paymentMethod: "À vista",
      downPayment: 235000,
      installments: 1,
      notes: "Falta enviar documentação pessoal",
    },
    {
      id: 4,
      customer: "Ana Costa",
      cpf: "321.654.987-00",
      email: "ana@email.com",
      phone: "(11) 97654-3210",
      vehicle: "Jeep Compass 2023",
      vehiclePrice: 185000,
      date: "2024-01-22",
      status: "Concluída",
      paymentMethod: "Financiamento",
      downPayment: 40000,
      installments: 48,
      notes: "Venda finalizada com sucesso",
    },
    {
      id: 5,
      customer: "Carlos Mendes",
      cpf: "789.123.456-00",
      email: "carlos@email.com",
      phone: "(11) 96543-2109",
      vehicle: "Volkswagen T-Cross 2024",
      vehiclePrice: 135000,
      date: "2024-01-25",
      status: "Cancelada",
      paymentMethod: "Financiamento",
      downPayment: 20000,
      installments: 60,
      notes: "Cliente desistiu da compra",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-green-100 text-green-700"
      case "Em andamento":
        return "bg-orange-100 text-orange-700"
      case "Aguardando docs":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelada":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluída":
        return <CheckCircle className="w-4 h-4" />
      case "Em andamento":
        return <Clock className="w-4 h-4" />
      case "Aguardando docs":
        return <FileText className="w-4 h-4" />
      case "Cancelada":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const totalSales = sales.reduce((acc, sale) => acc + sale.vehiclePrice, 0)
  const completedSales = sales.filter((s) => s.status === "Concluída").length
  const pendingSales = sales.filter((s) => s.status === "Em andamento" || s.status === "Aguardando docs").length

  return (
    <>
      {/* Add New Sale Button */}
      <div className="flex items-center justify-between shrink-0 mb-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-100 rounded-full text-xs h-8 flex items-center justify-center gap-1">
              <Plus className="w-3 h-3 text-[#ff5722]" />
              Nova venda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Nova Venda</DialogTitle>
            </DialogHeader>
            <SaleForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Total em Vendas</div>
                <div className="text-2xl font-bold">R$ {totalSales.toLocaleString()}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Vendas Concluídas</div>
                <div className="text-2xl font-bold">{completedSales}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Vendas Pendentes</div>
                <div className="text-2xl font-bold">{pendingSales}</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales table */}
      <Card className="bg-white border-none shadow-sm flex-1 min-h-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Todas as Vendas</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="andamento">Em andamento</SelectItem>
                  <SelectItem value="aguardando">Aguardando docs</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigas</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Veículo</th>
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Data</th>
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-600 pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="text-sm font-medium">{sale.customer}</div>
                      <div className="text-xs text-gray-500">{sale.email}</div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{sale.vehicle}</td>
                    <td className="py-4 text-sm font-semibold">R$ {sale.vehiclePrice.toLocaleString()}</td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(sale.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-4">
                      <Badge
                        className={`${getStatusColor(sale.status)} text-xs font-normal border-none flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(sale.status)}
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Dialog
                        open={isViewDialogOpen && selectedSale?.id === sale.id}
                        onOpenChange={(open) => {
                          setIsViewDialogOpen(open)
                          if (!open) setSelectedSale(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs bg-transparent"
                            onClick={() => setSelectedSale(sale)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Ver detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalhes da Venda</DialogTitle>
                          </DialogHeader>
                          <SaleDetails sale={sale} />
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function SaleForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Informações do Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Nome Completo</Label>
            <Input id="customer" placeholder="Ex: João Silva" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" placeholder="000.000.000-00" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="cliente@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" placeholder="(00) 00000-0000" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm">Informações do Veículo</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Veículo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o veículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Toyota Corolla 2024 - R$ 125.000</SelectItem>
                <SelectItem value="2">Honda Civic 2023 - R$ 145.000</SelectItem>
                <SelectItem value="3">Ford Ranger 2024 - R$ 235.000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehiclePrice">Valor do Veículo</Label>
            <Input id="vehiclePrice" type="number" placeholder="125000" />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm">Forma de Pagamento</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vista">À vista</SelectItem>
                <SelectItem value="financiamento">Financiamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="downPayment">Entrada (R$)</Label>
            <Input id="downPayment" type="number" placeholder="25000" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="installments">Parcelas</Label>
            <Input id="installments" type="number" placeholder="60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="andamento">Em andamento</SelectItem>
                <SelectItem value="aguardando">Aguardando docs</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" placeholder="Informações adicionais sobre a venda..." rows={3} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#ff5722] hover:bg-[#ff5722]/90">
          Registrar Venda
        </Button>
      </div>
    </form>
  )
}

function SaleDetails({ sale }: { sale: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Informações do Cliente</h3>
          <Badge
            className={`${sale.status === "Concluída" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"} border-none`}
          >
            {sale.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">Nome</div>
            <div className="font-medium">{sale.customer}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">CPF</div>
            <div className="font-medium">{sale.cpf}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">E-mail</div>
            <div className="font-medium">{sale.email}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Telefone</div>
            <div className="font-medium">{sale.phone}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Informações do Veículo</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">Veículo</div>
            <div className="font-medium">{sale.vehicle}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Valor</div>
            <div className="font-medium text-[#ff5722]">R$ {sale.vehiclePrice.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Pagamento</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">Método</div>
            <div className="font-medium">{sale.paymentMethod}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Entrada</div>
            <div className="font-medium">R$ {sale.downPayment.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Parcelas</div>
            <div className="font-medium">{sale.installments}x</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Data da Venda</div>
            <div className="font-medium">{new Date(sale.date).toLocaleDateString("pt-BR")}</div>
          </div>
        </div>
      </div>

      {sale.notes && (
        <div className="space-y-2 pt-4 border-t">
          <h3 className="font-semibold">Observações</h3>
          <p className="text-sm text-gray-600">{sale.notes}</p>
        </div>
      )}
    </div>
  )
}
