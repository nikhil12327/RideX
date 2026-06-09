import { MoreHorizontal, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type RideStatus = "Completed" | "In Progress" | "Cancelled" | "Pending";

const rides: {
  id: string;
  customer: string;
  rider: string;
  pickup: string;
  drop: string;
  fare: string;
  status: RideStatus;
}[] = [
  {
    id: "RD-8421",
    customer: "Maya Sharma",
    rider: "Rohit V.",
    pickup: "Indiranagar",
    drop: "Koramangala",
    fare: "$4.20",
    status: "Completed",
  },
  {
    id: "RD-8420",
    customer: "Liam Carter",
    rider: "Anil K.",
    pickup: "MG Road",
    drop: "HSR Layout",
    fare: "$6.85",
    status: "In Progress",
  },
  {
    id: "RD-8419",
    customer: "Priya Nair",
    rider: "Sandeep R.",
    pickup: "Whitefield",
    drop: "Marathahalli",
    fare: "$3.10",
    status: "Pending",
  },
  {
    id: "RD-8418",
    customer: "Noah Patel",
    rider: "Vikram S.",
    pickup: "Jayanagar",
    drop: "BTM",
    fare: "$2.90",
    status: "Cancelled",
  },
  {
    id: "RD-8417",
    customer: "Aisha Khan",
    rider: "Manish T.",
    pickup: "Hebbal",
    drop: "Yelahanka",
    fare: "$5.40",
    status: "Completed",
  },
];

const statusStyles: Record<RideStatus, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Pending: "bg-primary/15 text-primary border-primary/30",
  Cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export function RecentRidesTable() {
  return (
    <Card className="border-border/80 bg-card lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Recent rides</CardTitle>
          <p className="text-xs text-muted-foreground">Latest activity across the fleet</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[130px] border-border bg-muted/40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="pl-6 text-xs uppercase tracking-wider text-muted-foreground">
                Ride
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                Customer
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                Route
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                Fare
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((r) => (
              <TableRow key={r.id} className="border-border/60 hover:bg-muted/30">
                <TableCell className="pl-6 font-mono text-xs text-muted-foreground">
                  {r.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-muted text-[10px]">
                        {r.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="text-sm font-medium">{r.customer}</p>
                      <p className="text-[11px] text-muted-foreground">{r.rider}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {r.pickup} → {r.drop}
                </TableCell>
                <TableCell className="font-medium">{r.fare}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("rounded-md font-medium", statusStyles[r.status])}
                  >
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const approvals = [
  { name: "Devansh Joshi", city: "Bengaluru", vehicle: "Honda Activa", docs: "Verified" },
  { name: "Sara Lopez", city: "Pune", vehicle: "TVS Jupiter", docs: "Pending" },
  { name: "Karthik Iyer", city: "Mumbai", vehicle: "Yamaha Ray", docs: "Verified" },
  { name: "Hina Mehta", city: "Delhi", vehicle: "Suzuki Access", docs: "Verified" },
];

export function PendingRidersTable() {
  return (
    <Card className="border-border/80 bg-card">
      <CardHeader className="space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">Pending rider approvals</CardTitle>
        <p className="text-xs text-muted-foreground">
          {approvals.length} riders awaiting review
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {approvals.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-3"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-muted text-[11px]">
                {a.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">{a.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {a.city} · {a.vehicle}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "rounded-md text-[10px]",
                a.docs === "Verified"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-primary/30 bg-primary/15 text-primary",
              )}
            >
              {a.docs}
            </Badge>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-rose-400 hover:bg-rose-500/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
