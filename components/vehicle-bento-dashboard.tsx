'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car, Calendar, DollarSign, PieChart, CreditCard, MessageSquare, Users, Pencil } from 'lucide-react'

// This would typically come from your API or database
const initialCarData = {
  id: 1,
  brand: "Toyota",
  chasisNumber: "ABC123XYZ",
  registration: "KAA 123A",
  userId: "user123",
  dates: {
    orderDate: new Date("2023-01-01"),
    finalPaymentDate: new Date("2023-02-15"),
    deliveryAtPortDate: new Date("2023-03-01"),
    exitFromPortDate: new Date("2023-03-05"),
    customerAcquisitionDate: new Date("2023-03-10"),
    finalClientPaymentDate: new Date("2023-04-01"),
    totalDuration: 90
  },
  costs: {
    landingCost: 10000,
    duty: 2000,
    portCharges: 500,
    clearingCost: 300,
    fuelAndDriver: 200,
    insurance: 500,
    serviceCost: 300,
    otherCost: 100,
    brokerCost: 200,
    totalCost: 14100
  },
  sales: {
    targetMarkup: 20,
    targetSellingPrice: 16920,
    actualSellingPrice: 17000,
    discountPremium: 0.5
  },
  margins: {
    marginAbsolute: 2900,
    marginRelative: 17.06
  },
  creditSales: [
    {
      amountPaidSoFar: 15000,
      pendingBalance: 2000,
      totalAmount: 17000,
      paymentNotes: "Final installment due next month",
      status: "Pending"
    }
  ],
  remarks: [
    {
      notes: "Vehicle in excellent condition",
      pendingItems: "Final inspection",
      userId: 1
    }
  ],
  investments: [
    {
      investorId: 1,
      investorName: "John Doe",
      initialAmount: 5000,
      profitShare: 1000,
      commission: 100,
      totalBalance: 5900,
      remarks: "Investment fully paid"
    }
  ]
}

type EditModalProps = {
  title: string
  data: any
  onSave: (data: any) => void
}

const EditModal: React.FC<EditModalProps> = ({ title, data, onSave }) => {
  const [editedData, setEditedData] = useState(data)

  const handleChange = (key: string, value: any) => {
    setEditedData((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave(editedData)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit {title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={key} className="text-right">
              {key}
            </Label>
            <Input
              id={key}
              value={editedData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSave}>Save changes</Button>
    </DialogContent>
  )
}

export function VehicleBentoDashboardComponent() {
  const [carData, setCarData] = useState(initialCarData)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const calculateProgress = (current: number, total: number) => {
    return (current / total) * 100
  }

  const handleSave = (section: string, newData: any) => {
    setCarData((prev) => ({ ...prev, [section]: newData }))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main Info Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Vehicle Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit vehicle overview</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Vehicle Overview"
                  data={{
                    brand: carData.brand,
                    chasisNumber: carData.chasisNumber,
                    registration: carData.registration,
                    userId: carData.userId,
                  }}
                  onSave={(newData) => handleSave('overview', newData)}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Brand</p>
                <p className="text-2xl font-bold">{carData.brand}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Chasis Number</p>
                <p className="text-2xl font-bold">{carData.chasisNumber}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Registration</p>
                <p className="text-2xl font-bold">{carData.registration || 'N/A'}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-2xl font-bold">{carData.userId || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates Card */}
        <Card className="col-span-1 row-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Important Dates</CardTitle>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit important dates</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Important Dates"
                  data={carData.dates}
                  onSave={(newData) => handleSave('dates', newData)}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(carData.dates).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">{key}</span>
                  <span className="text-sm font-bold">
                    {value instanceof Date ? formatDate(value) : value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Costs Card */}
        <Card className="col-span-1 row-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Costs Breakdown</CardTitle>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit costs breakdown</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Costs Breakdown"
                  data={carData.costs}
                  onSave={(newData) => handleSave('costs', newData)}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(carData.costs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">{key}</span>
                  <span className="text-sm font-bold">${value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Sales Information</CardTitle>
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit sales information</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Sales Information"
                  data={carData.sales}
                  onSave={(newData) => handleSave('sales', newData)}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(carData.sales).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">{key}</span>
                  <span className="text-sm font-bold">
                    {typeof value === 'number' ? `$${value.toFixed(2)}` : `${value}%`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Margins Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Margins</CardTitle>
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit margins</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Margins"
                  data={carData.margins}
                  onSave={(newData) => handleSave('margins', newData)}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(carData.margins).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-muted-foreground">{key}</span>
                    <span className="text-sm font-bold">
                      {key.includes('Relative') ? `${value}%` : `$${value}`}
                    </span>
                  </div>
                  <Progress value={key.includes('Relative') ? value : (value / carData.sales.actualSellingPrice) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit Sales Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Credit Sales</CardTitle>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit credit sales</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Credit Sales"
                  data={carData.creditSales[0]}
                  onSave={(newData) => handleSave('creditSales', [newData])}
                />
              </Dialog>
            </div>
          
          </CardHeader>
          <CardContent>
            {carData.creditSales.map((sale, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">Amount Paid</span>
                  <span className="text-sm font-bold">${sale.amountPaidSoFar.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                  <span className="text-sm font-medium text-muted-foreground">Pending Balance</span>
                  <span className="text-sm font-bold">${sale.pendingBalance.toFixed(2)}</span>
                </div>
                <Progress value={calculateProgress(sale.amountPaidSoFar, sale.totalAmount)} className="h-2" />
                <Badge variant={sale.status === 'Pending' ? 'secondary' : 'default'}>{sale.status}</Badge>
                <p className="text-sm text-muted-foreground">{sale.paymentNotes}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Remarks Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Remarks</CardTitle>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit remarks</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Remarks"
                  data={carData.remarks[0]}
                  onSave={(newData) => handleSave('remarks', [newData])}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {carData.remarks.map((remark, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm bg-muted/50 p-2 rounded-md">{remark.notes}</p>
                {remark.pendingItems && (
                  <div className="bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">Pending Items:</span>
                    <span className="text-sm ml-2">{remark.pendingItems}</span>
                  </div>
                )}
                {remark.userId && (
                  <div className="bg-muted/50 p-2 rounded-md">
                    <span className="text-sm font-medium text-muted-foreground">User ID:</span>
                    <span className="text-sm ml-2">{remark.userId}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Investments Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Investments</CardTitle>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit investments</span>
                  </Button>
                </DialogTrigger>
                <EditModal
                  title="Investments"
                  data={carData.investments[0]}
                  onSave={(newData) => handleSave('investments', [newData])}
                />
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carData.investments.map((investment, index) => (
                <div key={index} className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Investor</span>
                    <span className="text-sm font-bold">{investment.investorName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Initial Amount</span>
                    <span className="text-sm font-bold">${investment.initialAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Profit Share</span>
                    <span className="text-sm font-bold">${investment.profitShare.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Commission</span>
                    <span className="text-sm font-bold">${investment.commission.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
                    <span className="text-sm font-bold">${investment.totalBalance.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">{investment.remarks}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}