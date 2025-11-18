import { useState, useEffect } from "react";
import {
  Menu,
  LayoutDashboard,
  Bell,
  HelpCircle,
  Target,
  Brain,
  Home,
  CreditCard,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { PricingPage } from "./components/PricingPage";
import { EditalChatView } from "./components/EditalChatView";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { WelcomeTour } from "./components/WelcomeTour";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Badge } from "./components/ui/badge";
import logoImage from './assets/logo.png';


type ViewType = "landing" | "login" | "dashboard" | "pricing";

interface Edital {
  id: string;
  title: string;
  organization: string;
  location: string;
  vacancies: number;
  salary: string;
  inscriptionDeadline: string;
  examDate: string;
  status: "aberto" | "previsto" | "encerrado";
  level: string;
}

// Mock editais data
const mockEditais: Edital[] = [
  {
    id: "1",
    title: "Analista Judiciário - TRT 2ª Região",
    organization: "Tribunal Regional do Trabalho",
    location: "São Paulo - SP",
    vacancies: 25,
    salary: "R$ 13.994,78",
    inscriptionDeadline: "15/12/2024",
    examDate: "23/02/2025",
    status: "aberto",
    level: "Superior",
  },
  {
    id: "2",
    title: "Auditor Fiscal - SEFAZ SP",
    organization: "Secretaria da Fazenda do Estado de SP",
    location: "São Paulo - SP",
    vacancies: 50,
    salary: "R$ 22.431,53",
    inscriptionDeadline: "20/12/2024",
    examDate: "15/03/2025",
    status: "aberto",
    level: "Superior",
  },
  {
    id: "3",
    title: "Técnico Administrativo - INSS",
    organization: "Instituto Nacional do Seguro Social",
    location: "Nacional",
    vacancies: 1000,
    salary: "R$ 5.905,79",
    inscriptionDeadline: "10/01/2025",
    examDate: "30/03/2025",
    status: "previsto",
    level: "Médio",
  },
  {
    id: "4",
    title: "Analista do Banco Central - BACEN",
    organization: "Banco Central do Brasil",
    location: "Nacional",
    vacancies: 150,
    salary: "R$ 20.924,80",
    inscriptionDeadline: "05/01/2025",
    examDate: "10/03/2025",
    status: "previsto",
    level: "Superior",
  },
  {
    id: "5",
    title: "Agente da Polícia Federal",
    organization: "Polícia Federal",
    location: "Nacional",
    vacancies: 500,
    salary: "R$ 12.522,50",
    inscriptionDeadline: "18/12/2024",
    examDate: "25/02/2025",
    status: "aberto",
    level: "Superior",
  },
  {
    id: "6",
    title: "Técnico Judiciário - TJ SP",
    organization: "Tribunal de Justiça de São Paulo",
    location: "São Paulo - SP",
    vacancies: 200,
    salary: "R$ 7.648,63",
    inscriptionDeadline: "28/12/2024",
    examDate: "20/03/2025",
    status: "aberto",
    level: "Médio",
  },
];

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("landing");
  const [selectedEdital, setSelectedEdital] =
    useState<Edital | null>(null);
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);

  // Show welcome tour on first visit to dashboard
  useEffect(() => {
    if (currentView === "dashboard") {
      const hasSeenTour = localStorage.getItem(
        "concursoai_tour_completed",
      );
      if (!hasSeenTour) {
        setShowWelcomeTour(true);
      }
    }
  }, [currentView]);

  // Listen for edital chat open events
  useEffect(() => {
    const handleOpenEditalChat = (event: CustomEvent) => {
      const edital = mockEditais.find(
        (e) => e.id === event.detail.editalId,
      );
      if (edital) {
        setSelectedEdital(edital);
      }
    };

    window.addEventListener(
      "openEditalChat",
      handleOpenEditalChat as EventListener,
    );
    return () => {
      window.removeEventListener(
        "openEditalChat",
        handleOpenEditalChat as EventListener,
      );
    };
  }, []);

  const handleCloseTour = () => {
    localStorage.setItem("concursoai_tour_completed", "true");
    setShowWelcomeTour(false);
  };

  const handleBackFromEditalChat = () => {
    setSelectedEdital(null);
  };

  const handleGetStarted = () => {
    setCurrentView("login");
  };

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    setSelectedEdital(null);
  };

  const handleOpenPricing = () => {
    setCurrentView("pricing");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  // Show landing page
  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show login page
  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} onBackToLanding={handleBackToLanding} />;
  }

  // If an edital is selected, show the chat view
  if (selectedEdital) {
    return (
      <div className="h-screen">
        <EditalChatView
          edital={selectedEdital}
          onBack={handleBackFromEditalChat}
        />
      </div>
    );
  }

  // Render the main app layout with header
  const renderContent = () => {
    if (currentView === "pricing") {
      return <PricingPage />;
    }
    return <Dashboard />;
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="ConcursoAI"
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-gray-900">ConcursoAI</h1>
              <p className="text-xs text-gray-500">
                Seu assistente de estudos
              </p>
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Back to Dashboard/Landing Button - Desktop */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              if (currentView === "dashboard") {
                setCurrentView("dashboard");
              } else {
                setCurrentView("dashboard");
              }
            }}
          >
            <Home className="w-4 h-4 mr-2" />
            {currentView === "dashboard" ? "Início" : "Início"}
          </Button>

          {/* Contratar Serviço Button - Desktop */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={handleOpenPricing}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Contratar Serviço
          </Button>

          {/* Mobile Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => {
              if (currentView === "dashboard") {
                setCurrentView("dashboard");
              } else {
                handleBackToLanding();
              }
            }}
          >
            <Home className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={handleOpenPricing}
          >
            <CreditCard className="w-5 h-5" />
          </Button>

          {/* Help Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={() => setShowWelcomeTour(true)}
          >
            <HelpCircle className="w-5 h-5" />
          </Button>

          {/* Notifications - Desktop & Mobile */}
          <Popover
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-600 text-white px-1.5 py-0 h-5 min-w-5 text-xs">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 max-w-[calc(100vw-2rem)]" align="end">
              <NotificationsPanel
                onClose={() => setNotificationsOpen(false)}
              />
            </PopoverContent>
          </Popover>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Welcome Tour */}
      <WelcomeTour
        isOpen={showWelcomeTour}
        onClose={handleCloseTour}
      />
    </div>
  );
}