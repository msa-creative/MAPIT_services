"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Menu, Satellite, Map, Globe, BarChart3, Database, Shield, GitMerge, BookOpen, UserPlus, HelpCircle, Newspaper, Palette, Camera, Layers, Target, Settings, Zap, Users, ChevronDown, ChevronRight } from "lucide-react";

const GeoAnalyticsLogo = () => (
  <div className="relative">
    <img
      src="/mapit.webp"
      alt="MAPIT Logo"
      className="h-22 w-auto max-w-[140px]"
    />
  </div>
);

const solutions = [
  
  { icon: <Map className="h-5 w-5 text-primary" />, title: "Geospatial Mapping", description: "Professional mapping solutions with real-time data integration", href: "/solutions/geospatial-mapping" },

  { icon: <BarChart3 className="h-5 w-5 text-primary" />, title: "Data Visualization", description: "Transform complex geospatial data into actionable insights", href: "/solutions/data-visualization" },
];

const portfolio = [
  { icon: <Camera className="h-5 w-5 text-primary" />, title: "Satellite Imagery Projects", description: "Showcase of our advanced satellite data processing capabilities", href: "/portfolio/satellite-projects" },
  { icon: <Layers className="h-5 w-5 text-primary" />, title: "Mapping Solutions", description: "Professional mapping and cartographic projects we've delivered", href: "/portfolio/mapping-solutions" },
  { icon: <BookOpen className="h-5 w-5 text-primary" />, title: "All Projects", description: "Browse all our GIS, cadastral, and digitizing projects", href: "/portfolio/all-projects" },
];

const services = [
  /*{/* icon: <Settings className="h-5 w-5 text-primary" />, title: "GIS Consulting", description: "Expert consulting services for spatial data strategy and implementation", href: "/services/gis-consulting" },
       */
  { icon: <Satellite className="h-5 w-5 text-primary" />, title: "Satellite Imagery Analysis", description: "Advanced satellite imagery processing and analysis for earth observation", href: "/solutions/satellite-analysis" },    
  { icon: <Zap className="h-5 w-5 text-primary" />, title: "Web-Gis Development", description: "Tailored GIS applications and spatial analysis tools with web GIS solutions", href: "/services/custom-development" },
 
];

const ListItem = ({ href, title, icon, children }: { href: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link href={href} className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-secondary">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{children}</p>
      </div>
    </Link>
  );

const MobileNavItem = ({ title, items }: { title: string; items: Array<{ href: string; title: string; icon: React.ReactNode; description: string }> }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 font-normal text-base border-b border-border/30 hover:text-primary transition-colors">
        {title}
        {isOpen ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-surface-dark/50 rounded-lg mt-2 mb-4 border border-border/20">
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-start gap-3 px-4 py-3 text-sm hover:bg-primary/10 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{item.icon}</div>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function Navigation() {
  const [openSolution, setOpenSolution] = React.useState<boolean>(false);
  const [openPortfolio, setOpenPortfolio] = React.useState<boolean>(false);
  const [openServices, setOpenServices] = React.useState<boolean>(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowHeader(true); // always show at top
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true); // scrolling up
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(false); // scrolling down
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b border-primary/20 bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-xl transition-transform duration-300 hover:shadow-lg hover:shadow-primary/25",
        showHeader ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="container mx-auto flex h-20 items-center justify-between px-4 relative z-10">
        <div className="flex items-center">
          <Link href="/" aria-label="GeoAnalytics Home">
            <GeoAnalyticsLogo />
          </Link>
        </div>

        <nav className="hidden lg:flex lg:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent text-base font-normal hover:bg-primary/20 hover:text-primary transition-all"
                  onPointerEnter={() => setOpenSolution(true)}
                  onPointerLeave={() => setOpenSolution(false)}
                  onClick={() => setOpenSolution(!openSolution)}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[680px] grid-cols-[1fr_1fr_0.8fr] gap-4 p-4 bg-surface-dark/95 backdrop-blur-xl border border-primary/20">
                    <div className="flex flex-col gap-1">{solutions.slice(0, 2).map((item) => <ListItem key={item.title} {...item}>{item.description}</ListItem>)}</div>
                    <div className="flex flex-col gap-1">{solutions.slice(2, 4).map((item) => <ListItem key={item.title} {...item}>{item.description}</ListItem>)}</div>
                    <div className="flex flex-col justify-between rounded-md bg-primary/10 border border-primary/30 p-4">
                        <div>
                            <h3 className="text-base font-medium text-primary">Advanced GIS & Remote Sensing</h3>
                            <p className="mt-2 text-xs text-muted-foreground">Find the right geospatial solution for your organization</p>
                        </div>
                        <Button size="sm" asChild className="w-full mt-4 text-xs bg-primary hover:bg-primary/90 text-black"><Link href="/contact">Contact Us</Link></Button>
                    </div>
                   </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent text-base font-normal hover:bg-primary/20 hover:text-primary transition-all"
                  onPointerEnter={() => setOpenPortfolio(true)}
                  onPointerLeave={() => setOpenPortfolio(false)}
                  onClick={() => setOpenPortfolio(!openPortfolio)}
                >
                  Portfolio
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[620px] grid-cols-[1fr_0.8fr] gap-4 p-4 bg-surface-dark/95 backdrop-blur-xl border border-primary/20">
                    <div className="flex flex-col gap-1 pr-4 border-r border-primary/20">{portfolio.map((item) => <ListItem key={item.title} {...item}>{item.description}</ListItem>)}</div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-medium text-primary">Our Project Portfolio</h3>
                            <p className="mt-2 text-xs text-muted-foreground">Explore our successful GIS and remote sensing projects</p>
                        </div>
                        <Button size="sm" asChild className="w-full mt-4 text-xs bg-primary hover:bg-primary/90 text-black"><Link href="portfolio/all-projects">View all projects</Link></Button>
                    </div>
                   </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent text-base font-normal hover:bg-primary/20 hover:text-primary transition-all"
                  onPointerEnter={() => setOpenServices(true)}
                  onPointerLeave={() => setOpenServices(false)}
                  onClick={() => setOpenServices(!openServices)}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                <div className="grid w-[680px] grid-cols-[1fr_1fr_0.8fr] gap-4 p-4 bg-surface-dark/95 backdrop-blur-xl border border-primary/20">
                    <div className="flex flex-col gap-1">{services.slice(0, 3).map((item) => <ListItem key={item.title} {...item}>{item.description}</ListItem>)}</div>
                    <div className="flex flex-col gap-1">{services.slice(3, 5).map((item) => <ListItem key={item.title} {...item}>{item.description}</ListItem>)}</div>
                    <div className="flex flex-col justify-between rounded-md bg-primary/10 border border-primary/30 p-4">
                        <div>
                            <h3 className="text-base font-medium text-primary">Professional GIS Services</h3>
                            <p className="mt-2 text-xs text-muted-foreground">Comprehensive spatial data solutions for your business</p>
                        </div>
                        <Button size="sm" asChild className="w-full mt-4 text-xs bg-primary hover:bg-primary/90 text-black"><Link href="/contact">Get started</Link></Button>
                    </div>
                   </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90 text-black rounded-md text-sm font-medium px-5 py-2.5 h-auto hover:shadow-lg hover:shadow-primary/25 transition-all">
                <Link href="/contact">Contact Us</Link>
            </Button>
        </div>

        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary transition-colors">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm bg-gradient-to-b from-surface-dark/95 to-black/95 backdrop-blur-xl border-l border-primary/20 p-6 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <nav className="flex flex-col space-y-2 text-lg mt-8 relative z-10">
                         <MobileNavItem title="Solutions" items={solutions} />
                         <MobileNavItem title="Portfolio" items={portfolio} />
                         <MobileNavItem title="Services" items={services} />
                    </nav>
                    <div className="mt-auto flex flex-col gap-4 pt-8 relative z-10">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-black rounded-md text-base font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
                          <Link href="/contact">Contact Us</Link>
                        </Button>
                   </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
