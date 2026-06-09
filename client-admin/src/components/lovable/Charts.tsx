import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueData = [
  { day: "Mon", revenue: 4200, rides: 280 },
  { day: "Tue", revenue: 5100, rides: 340 },
  { day: "Wed", revenue: 4800, rides: 310 },
  { day: "Thu", revenue: 6200, rides: 410 },
  { day: "Fri", revenue: 7400, rides: 480 },
  { day: "Sat", revenue: 8800, rides: 560 },
  { day: "Sun", revenue: 7200, rides: 470 },
];

const statusData = [
  { name: "Completed", value: 1240, color: "var(--chart-1)" },
  { name: "In Progress", value: 320, color: "var(--chart-2)" },
  { name: "Cancelled", value: 96, color: "var(--chart-5)" },
  { name: "Pending", value: 184, color: "var(--chart-3)" },
];

const riderActivity = [
  { hour: "6a", active: 42 },
  { hour: "8a", active: 96 },
  { hour: "10a", active: 138 },
  { hour: "12p", active: 172 },
  { hour: "2p", active: 154 },
  { hour: "4p", active: 188 },
  { hour: "6p", active: 224 },
  { hour: "8p", active: 196 },
  { hour: "10p", active: 112 },
];

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

export function RevenueChart() {
  return (
    <Card className="border-border/80 bg-card lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Revenue overview
          </CardTitle>
          <p className="mt-1 text-2xl font-semibold">$43,720</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="h-8 w-[110px] border-border bg-muted/40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--border)" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#revGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function RideStatusChart() {
  const total = statusData.reduce((s, d) => s + d.value, 0);
  return (
    <Card className="border-border/80 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Ride status
        </CardTitle>
        <p className="mt-1 text-2xl font-semibold">{total.toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-3 space-y-1.5">
          {statusData.map((s) => (
            <li key={s.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name}
              </span>
              <span className="font-medium text-foreground">{s.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function RiderActivityChart() {
  return (
    <Card className="border-border/80 bg-card lg:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Rider activity by hour
        </CardTitle>
        <p className="mt-1 text-2xl font-semibold">1,322 active</p>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riderActivity} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="hour"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="active" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
