"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Mail, Phone, UserCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Employee = {
  id: number
  nome: string
  cargo: string
  email: string
  telefone: string
  vendas: number
  status: "ativo" | "inativo"
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    nome: "João Silva",
    cargo: "Vendedor",
    email: "joao.silva@salesight.com",
    telefone: "(11) 98765-4321",
    vendas: 45,
    status: "ativo",
  },
  {
    id: 2,
    nome: "Maria Santos",
    cargo: "Gerente de Vendas",
    email: "maria.santos@salesight.com",
    telefone: "(11) 98765-4322",
    vendas: 78,
    status: "ativo",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    cargo: "Vendedor",
    email: "pedro.oliveira@salesight.com",
    telefone: "(11) 98765-4323",
    vendas: 32,
    status: "ativo",
  },
  {
    id: 4,
    nome: "Ana Costa",
    cargo: "Vendedor",
    email: "ana.costa@salesight.com",
    telefone: "(11) 98765-4324",
    vendas: 56,
    status: "inativo",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    cargo: "Supervisor",
    email: "carlos.ferreira@salesight.com",
    telefone: "(11) 98765-4325",
    vendas: 89,
    status: "ativo",
  },
]

export function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
    status: "ativo" as "ativo" | "inativo",
  })

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    const employee: Employee = {
      id: employees.length + 1,
      ...newEmployee,
      vendas: 0,
    }
    setEmployees([...employees, employee])
    setNewEmployee({
      nome: "",
      cargo: "",
      email: "",
      telefone: "",
      status: "ativo",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const activeEmployees = employees.filter((emp) => emp.status === "ativo").length
  const totalSales = employees.reduce((sum, emp) => sum + emp.vendas, 0)

  return (
    <div className="space-y-4 flex-1 flex flex-col min-h-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{employees.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Funcionários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeEmployees}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSales}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="bg-white border-none shadow-sm flex-1 flex flex-col min-h-0">
        <CardHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Lista de Funcionários</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Funcionário
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
                  <DialogDescription>Preencha os dados do novo funcionário</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={newEmployee.nome}
                      onChange={(e) => setNewEmployee({ ...newEmployee, nome: e.target.value })}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Select
                      value={newEmployee.cargo}
                      onValueChange={(value) => setNewEmployee({ ...newEmployee, cargo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vendedor">Vendedor</SelectItem>
                        <SelectItem value="Gerente de Vendas">Gerente de Vendas</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      placeholder="email@salesight.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={newEmployee.telefone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, telefone: e.target.value })}
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newEmployee.status}
                      onValueChange={(value: "ativo" | "inativo") => setNewEmployee({ ...newEmployee, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90">
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, cargo ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-secondary border-none"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          <div className="space-y-3">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{employee.nome}</h3>
                      <Badge
                        variant={employee.status === "ativo" ? "default" : "secondary"}
                        className={employee.status === "ativo" ? "bg-green-500" : ""}
                      >
                        {employee.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{employee.cargo}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {employee.telefone}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Vendas</div>
                    <div className="text-xl font-bold text-primary">{employee.vendas}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
