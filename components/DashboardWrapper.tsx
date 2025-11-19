import Dashboard from '../dashboard';
import { LanguageProvider } from '../contexts/LanguageContext';

type Page = 'home' | 'login' | 'signup' | 'dashboard';
type Plan = 'starter' | 'professional' | 'business';
type Language = 'pt' | 'en';

interface DashboardWrapperProps {
  onNavigate: (page: Page) => void;
  userPlan?: Plan;
  signupData?: { company?: string; service?: string } | null;
  language?: Language;
}

export default function DashboardWrapper({ onNavigate, userPlan, signupData, language = 'pt' }: DashboardWrapperProps) {
  return (
    <LanguageProvider initialLanguage={language}>
      <Dashboard onNavigate={onNavigate} userPlan={userPlan} signupData={signupData} />
    </LanguageProvider>
  );
}