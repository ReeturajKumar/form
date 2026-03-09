import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  Cloud, 
  Users, 
  Mail, 
  Phone, 
  User, 
  TrendingUp, 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import HERO_IMAGE from "../src/assets/1.webp"
import HERO_IMAGE2 from "../src/assets/2.webp"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  companySize: string;
  cloudPlatform: string;
  cloudSpend: string;
  infraManagement: string;
  problems: string[];
  mostImpactful: string;
  requestedSupport: string[];
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  role: "",
  companySize: "",
  cloudPlatform: "",
  cloudSpend: "",
  infraManagement: "",
  problems: [],
  mostImpactful: "",
  requestedSupport: [],
};

const STEPS = [
  { title: "Basics", subtitle: "Lead Information" },
  { title: "Org", subtitle: "Company Profile" },
  { title: "Cloud", subtitle: "Tech Infrastructure" },
  { title: "Challenges", subtitle: "Current Problems" },
  { title: "Impact", subtitle: "Business Impact" },
  { title: "Support", subtitle: "Desired Outcomes" },
  { title: "Review", subtitle: "Confirm Details" }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const next = () => setCurrentStep(i => (i >= STEPS.length - 1 ? i : i + 1));
  const back = () => setCurrentStep(i => (i <= 0 ? i : i - 1));

  const toggleSupport = (support: string) => {
    setFormData(prev => ({
      ...prev,
      requestedSupport: prev.requestedSupport.includes(support)
        ? prev.requestedSupport.filter(s => s !== support)
        : [...prev.requestedSupport, support]
    }));
  };

  const toggleProblem = (problem: string) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter(p => p !== problem)
        : [...prev.problems, problem]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
      case 1:
        return formData.role !== "" && formData.companySize !== "";
      case 2:
        return formData.cloudPlatform !== "" && formData.cloudSpend !== "" && formData.infraManagement !== "";
      case 3:
        return formData.problems.length > 0;
      case 4:
        return formData.mostImpactful !== "";
      case 5:
        return formData.requestedSupport.length > 0;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_650px] bg-white overflow-x-hidden">
        {/* Left Hero: Success Visual */}
        <div className="hidden md:block relative h-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.5 }}
            src={HERO_IMAGE2} 
            alt="Success" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Right Content */}
        <div className="flex flex-col bg-white h-full relative overflow-hidden">
          <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full flex flex-col items-center text-center space-y-8"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="w-24 h-24 lg:w-32 lg:h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={1.5} />
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-display font-medium tracking-tight text-neutral-900">
                  Thank you{formData.name ? `, ${formData.name.split(' ')[0]}` : ''}!
                </h1>
                <p className="text-neutral-500 text-base lg:text-lg leading-relaxed font-light max-w-sm mx-auto">
                  We've received your details. One of our team members will be in touch with you shortly.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8 w-full"
              >
                <button 
                  onClick={() => { setIsSubmitted(false); setCurrentStep(0); setFormData(initialData); }}
                  className="w-full py-4 lg:py-5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors font-medium tracking-wide text-sm lg:text-base cursor-pointer rounded-xl flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} />
                  Return Home
                </button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="p-4 lg:p-6 border-t border-neutral-50 flex justify-center items-center bg-white shrink-0">
            <span className="text-xs text-neutral-400 font-light">&copy; {new Date().getFullYear()} Greamio Technologies - IT Solutions | Software Development</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_650px] bg-white font-sans text-neutral-900 overflow-x-hidden">
      
      {/* Left Section: Hero & Branding */}
      <section className="hidden md:block relative h-full overflow-hidden">
        <img src={HERO_IMAGE} alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover" />
      </section>

      {/* Right Section: Form */}
      <section className="flex flex-col bg-white overflow-hidden h-full">
        {/* Universal Header (Hidden on LG) */}
        <div className="lg:hidden p-5 px-6 flex justify-between items-center bg-white shrink-0">
          <span className="font-display font-bold tracking-tight text-primary">INFRACORE</span>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Step {currentStep + 1} / {STEPS.length}</span>
        </div>

        {/* Form Body - Centered */}
        <div className="flex-grow flex flex-col justify-start lg:justify-center overflow-hidden">
          <div className="px-6 md:px-10 lg:px-16 py-4 md:py-4 lg:py-8 max-w-[600px] lg:max-w-[700px] mx-auto w-full">
            <header className="mb-4 lg:mb-8">
              <div className="flex items-center gap-1.5 lg:gap-2.5 mb-2 lg:mb-4">
                {STEPS.map((_, i) => (
                  <div key={i} className={cn(
                    "h-0.5 flex-grow transition-all duration-500 rounded-full",
                    i <= currentStep ? "bg-primary" : "bg-neutral-100"
                  )} />
                ))}
              </div>
              <div className="space-y-0 lg:space-y-2">
                <p className="text-[8px] lg:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
                  {STEPS[currentStep].subtitle}
                </p>
                <h2 className="text-lg lg:text-3xl font-display font-medium tracking-tight">
                  {STEPS[currentStep].title}
                </h2>
              </div>
            </header>

            <main className="min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {currentStep === 0 && (
                    <div className="space-y-4 lg:space-y-6">
                      <Input icon={<User size={16} className="lg:w-5 lg:h-5" />} label="Full Name" placeholder="Jane Cooper" value={formData.name} onChange={v => updateFields({ name: v })} />
                      <Input icon={<Mail size={16} className="lg:w-5 lg:h-5" />} label="Professional Email" type="email" placeholder="jane@company.com" value={formData.email} onChange={v => updateFields({ email: v })} />
                      <Input icon={<Phone size={16} className="lg:w-5 lg:h-5" />} label="Contact Number" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={v => updateFields({ phone: v })} />
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4 lg:space-y-6">
                      <Select 
                        icon={<Users size={16} className="lg:w-5 lg:h-5" />} 
                        label="Your role in the organization" 
                        options={["Founder / Co-Founder", "CTO / VP Engineering", "Engineering Manager", "Product Manager", "DevOps / Cloud Engineer", "Other"]}
                        value={formData.role} 
                        onChange={v => updateFields({ role: v })} 
                      />
                      <div className="space-y-2 lg:space-y-4">
                        <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-neutral-400">Company Size</label>
                        <div className="grid grid-cols-2 gap-2 lg:gap-4">
                          {["1–10", "11–50", "51–200", "200+"].map(opt => (
                            <OptionCard key={opt} active={formData.companySize === opt} onClick={() => updateFields({ companySize: opt })}>{opt}</OptionCard>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 lg:space-y-6">
                      <Select 
                        icon={<Cloud size={16} className="lg:w-5 lg:h-5" />} 
                        label="Primary cloud platform" 
                        options={["AWS", "Azure", "GCP", "OCI", "Hybrid / On-prem", "Not sure"]}
                        value={formData.cloudPlatform} 
                        onChange={v => updateFields({ cloudPlatform: v })} 
                      />
                      <Select 
                        icon={<Users size={16} className="lg:w-5 lg:h-5" />} 
                        label="How is infrastructure currently managed?" 
                        options={[
                          "Manual (console / CLI)", 
                          "Partial automation (scripts)", 
                          "IaC (Terraform / CloudFormation)", 
                          "Managed by internal DevOps team", 
                          "Outsourced / Freelancer"
                        ]}
                        value={formData.infraManagement} 
                        onChange={v => updateFields({ infraManagement: v })} 
                      />
                      <div className="space-y-2 lg:space-y-4">
                        <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-neutral-400">Monthly cloud spend (approx.)</label>
                        <div className="grid grid-cols-2 gap-2 lg:gap-4">
                          {["< $1k", "$1k–$5k", "$5k–$20k", "$20k+", "Not tracked"].map(opt => (
                            <OptionCard key={opt} active={formData.cloudSpend === opt} onClick={() => updateFields({ cloudSpend: opt })}>{opt}</OptionCard>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4 lg:space-y-6 max-h-[50vh] overflow-y-auto pr-1 pb-4 custom-scrollbar">
                      <div className="space-y-1.5 lg:space-y-3">
                        <label className="text-[9px] lg:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">What problems are you currently facing?</label>
                        <div className="grid grid-cols-1 gap-1.5 lg:gap-2">
                          {[
                            "Cloud costs increasing without clear visibility",
                            "Difficulty identifying unused or over-provisioned resources",
                            "Production downtime or unexpected outages",
                            "Slow or risky deployments",
                            "Manual or error-prone infrastructure changes",
                            "No proper rollback process during failures",
                            "Scaling issues during traffic spikes",
                            "Performance issues (slow APIs, high latency)",
                            "Security gaps or access mismanagement",
                            "No centralized monitoring or alerting",
                            "Dev team spending too much time on infra issues",
                            "Dependency on one or two key engineers",
                            "No major issues currently (just exploring improvements)"
                          ].map(opt => (
                            <Checkbox key={opt} label={opt} checked={formData.problems.includes(opt)} onToggle={() => toggleProblem(opt)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4 lg:space-y-6">
                      <Select 
                        icon={<TrendingUp size={14} className="lg:w-5 lg:h-5" />} 
                        label="Which of these impacts your business the MOST today?" 
                        options={[
                          "High cloud cost",
                          "Downtime / reliability risk",
                          "Slow product releases",
                          "Security / compliance concerns",
                          "Scaling for growth",
                          "Team productivity & burnout",
                          "Not sure yet"
                        ]}
                        value={formData.mostImpactful} 
                        onChange={v => updateFields({ mostImpactful: v })} 
                      />
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4 lg:space-y-6 max-h-[50vh] overflow-y-auto pr-1 pb-4 custom-scrollbar">
                      <div className="space-y-1.5 lg:space-y-3">
                        <label className="text-[9px] lg:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">What kind of support are you looking for?</label>
                        <div className="grid grid-cols-1 gap-1.5 lg:gap-2">
                          {[
                            "Cloud migration (on-prem → cloud / cloud → cloud)",
                            "Infrastructure automation (IaC, CI/CD, reducing manual work)",
                            "Cloud cost optimization",
                            "Reliability & uptime improvement",
                            "Scaling & performance optimization",
                            "Security hardening & access control",
                            "Monitoring, logging & alerting setup",
                            "Ongoing DevOps management & support",
                            "Advisory / architecture review",
                            "Not sure – need guidance"
                          ].map(opt => (
                            <Checkbox key={opt} label={opt} checked={formData.requestedSupport.includes(opt)} onToggle={() => toggleSupport(opt)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-2 flex flex-col h-full overflow-hidden">
                      <div className="grid grid-cols-2 gap-2 lg:gap-2.5 overflow-hidden">
                        {/* Identity Section */}
                        <div className="col-span-2 p-2 lg:p-3 bg-white border border-neutral-100 shadow-[0_1px_5px_rgba(0,0,0,0.02)] space-y-1 relative group">
                          <SectionHeader title="Account Identity" />
                          <div className="space-y-0 pt-0.5">
                            <ReviewRow label="Client" value={formData.name} />
                            <ReviewRow label="Email" value={formData.email} />
                            <ReviewRow label="Line" value={formData.phone} />
                          </div>
                        </div>

                        {/* Org & Platform */}
                        <div className="p-2 lg:p-3 bg-white border border-neutral-100 space-y-1">
                          <SectionHeader title="Organization" />
                          <div className="space-y-0 pt-0.5">
                            <ReviewRow label="Role" value={formData.role} />
                            <ReviewRow label="Scale" value={formData.companySize} />
                          </div>
                        </div>

                        <div className="p-2 lg:p-3 bg-white border border-neutral-100 space-y-1">
                          <SectionHeader title="Infrastructure" />
                          <div className="space-y-0 pt-0.5">
                            <ReviewRow label="Cloud" value={formData.cloudPlatform} />
                            <ReviewRow label="Tier" value={formData.cloudSpend} />
                          </div>
                        </div>

                        {/* Strategy */}
                        <div className="col-span-2 p-2 lg:p-3 bg-white border border-neutral-100 space-y-1">
                          <SectionHeader title="Status & Objectives" />
                          <div className="space-y-1">
                            <ReviewRow label="KPI" value={formData.mostImpactful} />
                            <ReviewRow label="Mgmt" value={formData.infraManagement} />
                            <div className="pt-1">
                              <div className="flex flex-wrap gap-1 lg:gap-1.5">
                                {formData.problems.slice(0, 3).map(p => (
                                  <span key={p} title={p} className="px-1.5 py-0.5 lg:px-2 lg:py-0.5 bg-red-50 text-red-600 border border-red-100 text-[6px] lg:text-[7px] uppercase tracking-widest font-bold max-w-[150px] truncate">
                                    {p}
                                  </span>
                                ))}
                                {formData.requestedSupport.slice(0, 3).map(s => (
                                  <span key={s} title={s} className="px-1.5 py-0.5 lg:px-2 lg:py-0.5 bg-neutral-900 text-white text-[6px] lg:text-[7px] uppercase tracking-widest font-bold max-w-[150px] truncate">
                                    {s}
                                  </span>
                                ))}
                                {(formData.problems.length + formData.requestedSupport.length) > 6 && (
                                  <span className="px-1.5 py-0.5 lg:px-2 lg:py-0.5 bg-neutral-100 text-neutral-500 text-[6px] lg:text-[7px] uppercase tracking-widest font-bold">
                                    +{formData.problems.length + formData.requestedSupport.length - 6} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Fixed Footer */}
        <footer className="p-4 md:p-6 lg:px-16 border-t border-neutral-50 flex items-center justify-between bg-white shrink-0">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className={cn(
              "w-11 h-11 lg:w-14 lg:h-14 flex items-center justify-center border border-neutral-100 rounded-full hover:bg-neutral-50 transition-colors disabled:opacity-0 cursor-pointer",
              currentStep === 0 && "invisible"
            )}
          >
            <ChevronLeft size={18} className="lg:w-6 lg:h-6" strokeWidth={1.5} />
          </button>
          <button
            onClick={currentStep === STEPS.length - 1 ? handleSubmit : next}
            disabled={!isStepValid()}
            className={cn(
              "px-8 py-3.5 lg:px-10 lg:py-5 transition-all font-medium flex items-center gap-3 uppercase text-[10px] lg:text-sm tracking-[0.2em]",
              isStepValid() 
                ? "bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 cursor-pointer" 
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            )}
          >
            {currentStep === STEPS.length - 1 ? "Submit Details" : "Next Step"}
            {currentStep === STEPS.length - 1 ? <Send size={12} className="lg:w-4 lg:h-4" /> : <ChevronRight size={12} className="lg:w-4 lg:h-4" />}
          </button>
        </footer>
      </section>
    </div>
  );
}

function Input({ icon, label, onChange, ...props }: { 
  icon: React.ReactNode, 
  label: string,
  onChange: (value: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div className="space-y-1.5 lg:space-y-2.5">
      <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</label>
      <div className="relative border-b-2 border-neutral-100 focus-within:border-primary transition-colors">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400">
          {icon}
        </div>
        <input 
          {...props} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 lg:h-14 pl-10 lg:pl-12 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-300 font-light text-sm lg:text-base" 
        />
      </div>
    </div>
  );
}

function Select({ icon, label, options, value, onChange }: { icon: React.ReactNode, label: string, options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1 lg:space-y-2.5">
      <label className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-neutral-400">{label}</label>
      <div className="relative border-b border-neutral-100 focus-within:border-primary transition-colors">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
          {icon}
        </div>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full h-10 lg:h-14 pl-9 lg:pl-12 bg-transparent outline-none text-neutral-900 appearance-none font-light text-xs lg:text-base"
        >
          <option value="">Choose an option</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
          <ChevronRight className="rotate-90 lg:w-5 lg:h-5" size={16} />
        </div>
      </div>
    </div>
  );
}

function OptionCard({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 lg:py-3.5 border text-xs lg:text-sm transition-all duration-300 font-medium cursor-pointer",
        active 
          ? "bg-primary border-primary text-white shadow-md shadow-orange-500/10" 
          : "bg-white border-neutral-100 text-neutral-500 hover:border-primary"
      )}
    >
      {children}
    </button>
  );
}

function Checkbox({ label, checked, onToggle }: { label: string, checked: boolean, onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between p-2 md:p-2.5 lg:p-4 border text-left transition-all cursor-pointer gap-2",
        checked ? "border-primary bg-orange-50/20" : "border-neutral-50 bg-white hover:border-neutral-200"
      )}
    >
      <span className={cn("text-[10px] lg:text-xs font-medium leading-snug", checked ? "text-primary" : "text-neutral-500")}>
        {label}
      </span>
      {checked && <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full shadow-sm shrink-0" />}
    </button>
  );
}


function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
      <div className="flex items-center gap-2">
        <div className="w-1 h-3 lg:h-3.5 bg-primary" />
        <span className="text-[10px] lg:text-[10px] uppercase font-bold tracking-[0.25em] text-primary">
          {title}
        </span>
      </div>
      <div className="w-1 h-1 bg-neutral-200 rounded-full" />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="group flex justify-between items-center py-1 border-b border-neutral-50 last:border-0">
      <span className="text-[7px] lg:text-[8px] font-bold tracking-widest text-neutral-300 group-hover:text-primary transition-colors uppercase">{label}</span>
      <div className="flex items-center gap-1.5 lg:gap-2">
        <div className="w-[1px] h-2 bg-neutral-100 group-hover:bg-primary/20 transition-colors" />
        <span className="text-[10px] lg:text-[11px] font-medium text-right text-neutral-800 tabular-nums">{value || "—"}</span>
      </div>
    </div>
  );
}
