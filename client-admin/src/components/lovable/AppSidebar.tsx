import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bike,
  Users,
  Receipt,
  MapPin,
  BarChart3,
  Wallet,
  Settings,
  LifeBuoy,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Rides", url: "/rides", icon: MapPin },
  { title: "Riders", url: "/riders", icon: Bike },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Payments", url: "/payments", icon: Wallet },
  { title: "Invoices", url: "/invoices", icon: Receipt },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const secondaryItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Support", url: "/support", icon: LifeBuoy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => currentPath === p;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">Velocity</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Bike Taxi Admin
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="rounded-lg bg-sidebar-accent/60 p-3">
            <p className="text-xs font-medium">Pro plan</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Unlock advanced rider analytics
            </p>
            <button className="mt-2 w-full rounded-md bg-primary px-2 py-1.5 text-[11px] font-semibold text-primary-foreground hover:opacity-90">
              Upgrade
            </button>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
