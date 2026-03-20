import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    text: "Their guidance helped us reach 5x more clients in just six months. Truly grateful.",
    country: "in",
  },
  {
    name: "Sarah Jenkins",
    text: "The cloud migration was seamless. Our infrastructure is now rock-solid and scalable.",
    country: "us",
  },
  {
    name: "Amit Sharma",
    text: "They didn't just design a site; they built a growth engine for our local business.",
    country: "in",
  },
  {
    name: "Elena Petrov",
    text: "A humble team with world-class talent. They helped us navigate complex tech shifts easily.",
    country: "ru",
  },
  {
    name: "Priya Singh",
    text: "Their strategic approach to design has made our brand feel much more premium and global.",
    country: "in",
  },
  {
    name: "David Miller",
    text: "Finally found a partner that understands both business goals and technical excellence.",
    country: "uk",
  },
  {
    name: "Ananya Reddy",
    text: "The new cloud solutions they provided reduced our costs significantly while improving speed.",
    country: "in",
  },
  {
    name: "Michael Chen",
    text: "Extremely professional. They provided us with the better cloud solution we've been seeking.",
    country: "ca",
  },
  {
    name: "Vikram Malhotra",
    text: "Their dedication to our success was evident from day one. Highly recommended.",
    country: "in",
  },
  {
    name: "Sophie Martin",
    text: "Clean code, beautiful design, and most importantly, they help my business grow daily.",
    country: "fr",
  },
  {
    name: "Arjun Gupta",
    text: "A truly humbe partnership. They simplified our digital presence across all platforms.",
    country: "in",
  },
  {
    name: "Emma Thompson",
    text: "They helped us reach a wider audience than we ever thought possible. Outstanding work.",
    country: "au",
  },
];

const CLOUD_PROVIDERS = [
  "AWS",
  "Google Cloud",
  "Azure",
  "DigitalOcean",
  "IBM",
  "Oracle",
  "On-premise",
  "Other",
];
const DEVOPS_TOOLS = ["Yes", "No"];
const MAIN_GOALS = [
  "Cut cloud costs",
  "Improve reliability / uptime",
  "Faster deployments",
  "Security & compliance",
  "Scale infrastructure",
  "Migrate to cloud",
  "Setup CI/CD pipeline",
  "Monitoring & observability",
];

const COLUMNS = [
  [...TESTIMONIALS].sort(() => 0.5 - Math.random()),
  [...TESTIMONIALS].sort(() => 0.5 - Math.random()),
  [...TESTIMONIALS].sort(() => 0.5 - Math.random()),
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const STEPS_TOTAL = 5;
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    phone: "",
    name: "",
    industry: "",
    companySize: "",
    role: "",
    website: "",
    cloudProviders: [] as string[],
    devOpsTools: [] as string[],
    cloudSpend: "",
    mainGoals: [] as string[],
    painPoint: "",
    budget: "",
    startDate: "",
    engagementType: "",
    notes: "",
  });

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, STEPS_TOTAL));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Uses native HTML5 validation UI (required/select/etc).
    if (formRef.current && !formRef.current.reportValidity()) return;

    if (step >= STEPS_TOTAL) setIsSubmitted(true);
    else nextStep();
  };

  return (
    <div className="app-container font-sans overflow-hidden">
      {/* Left Section: Branding & Profile */}
      <section className="left-section">
        {/* Testimonial Infinite Grid */}
        <div className="testimonial-container absolute top-0 left-0 w-full pt-10 px-6 opacity-40 select-none">
          {COLUMNS.map((columnData, colIndex) => {
            return (
              <div
                key={colIndex}
                className={cn(
                  "testimonial-column",
                  colIndex === 1 && "reverse slow",
                  colIndex === 2 && "slow",
                )}
              >
                {[...columnData, ...columnData].map((item, i) => (
                  <div key={i} className="testimonial-card">
                    <p className="testimonial-text">"{item.text}"</p>
                    <div className="testimonial-author">
                      <img
                        src={`https://i.pravatar.cc/100?u=${item.name}`}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Grouping Bottom Content */}
        <div className="mt-auto space-y-6">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-[5.5rem] font-display font-medium text-black leading-[0.9] tracking-tighter overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="block"
            >
              Every project
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="text-black/20 block"
            >
              starts with a plan.
            </motion.span>
          </h1>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex items-center gap-4"
          >
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <Link
                key={i}
                to="/"
                className="social-icon transition-all border border-black/5 shadow-sm"
              >
                <Icon size={20} />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Right Section: Form */}
      <section className="right-section flex flex-col justify-center relative py-8">
        {/* Premium Step Indicator */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-10 right-10 z-10"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />

              {/* SVG Progress Ring */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  className="stroke-white/5 fill-none"
                  strokeWidth="1.5"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="26"
                  className="stroke-white fill-none"
                  strokeWidth="2"
                  strokeDasharray="163" // 2 * PI * r (r=26)
                  animate={{ strokeDashoffset: 163 - 163 * (step / STEPS_TOTAL) }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Step Info */}
              <div className="flex flex-col items-center justify-center">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold text-white leading-none"
                >
                  {step}
                </motion.span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-bold mt-1">
                  Step
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="max-w-xl mx-auto w-full">
          {/* Static Main Heading for all steps */}
          {!isSubmitted && (
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-5xl md:text-6xl font-display mb-10 leading-[1.05] tracking-tight text-white/90"
            >
              What services <br />
              <span className="text-white/20">
                we can support <br /> you with?
              </span>
            </motion.h2>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="w-full">
            <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="success-screen"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="success-icon-container"
                >
                  <div className="success-icon-bg" />
                  <div className="success-icon">
                    <Check size={48} strokeWidth={3} />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text-gold"
                >
                  Thank You!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/60 text-lg max-w-md mx-auto leading-relaxed"
                >
                  We've received your plan. Our team will review the details and
                  reach out to you within 24 hours.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    className="secondary-btn"
                  >
                    Back to Home
                  </button>
                </motion.div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subheader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="mb-4"
                >
                  <h2 className="text-sm font-bold text-white mb-1">
                    Your contact details
                  </h2>
                </motion.div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4,
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="boxed-label">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="boxed-input"
                        value={formData.contactName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="boxed-label">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="boxed-input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.5,
                    }}
                  >
                    <div>
                      <label className="boxed-label">Phone number</label>
                      <input
                        type="tel"
                        placeholder="+1 555 123 4567"
                        className="boxed-input"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6,
                    }}
                    className="flex justify-end pt-2"
                  >
                    <button type="submit" className="next-btn group">
                      Next
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subheader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="mb-4"
                >
                  <h2 className="text-sm font-bold text-white mb-1">
                    About your company
                  </h2>
                </motion.div>

                <div className="space-y-4">
                  {/* Step 1 Input Groups... */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4,
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="boxed-label">Company name</label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        className="boxed-input"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="boxed-label">Industry</label>
                      <select
                        className="boxed-input cursor-pointer appearance-none"
                        required
                      >
                        <option value="">Select industry</option>
                        <option value="saas">SaaS / Software</option>
                        <option value="fintech">Fintech</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="media">Media & Entertainment</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.5,
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="boxed-label">Company size</label>
                      <select
                        className="boxed-input cursor-pointer appearance-none"
                        required
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-1000">201-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="boxed-label">Your role</label>
                      <input
                        type="text"
                        placeholder="CTO, DevOps Lead..."
                        className="boxed-input"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6,
                    }}
                  >
                    <label className="boxed-label">Website</label>
                    <input
                      type="text"
                      placeholder="https://"
                      className="boxed-input"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.7,
                    }}
                    className="flex justify-end pt-2"
                  >
                    <button type="submit" className="next-btn group">
                      Next
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ) : step === 3 ? (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subheader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="mb-4"
                >
                  <h2 className="text-sm font-bold text-white mb-1">
                    Current infrastructure
                  </h2>
                </motion.div>

                <div className="space-y-4">
                  {/* Cloud Providers Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4,
                    }}
                  >
                    <label className="boxed-label">
                      Which cloud providers are you currently using?
                    </label>
                    <select
                      className="boxed-input cursor-pointer appearance-none mt-1"
                      value={formData.cloudProviders[0] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cloudProviders: [e.target.value],
                        })
                      }
                      required
                    >
                      <option value="">Select provider</option>
                      {CLOUD_PROVIDERS.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* DevOps Tools Multi-select */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.5,
                    }}
                  >
                    <label className="boxed-label">
                      What DevOps tools do you use?
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {DEVOPS_TOOLS.map((value) => {
                        const isSelected = formData.devOpsTools.includes(value);
                        return (
                          <button
                            type="button"
                            key={value}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                devOpsTools: [value],
                              }))
                            }
                            className={cn(
                              "px-3 py-1.5 rounded-full border text-xs transition-all duration-300",
                              isSelected
                                ? "bg-white text-black border-white font-bold"
                                : "bg-white/5 text-white/50 border-white/10 hover:border-white/30",
                            )}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                    {/* Required validator for the pill-based selector */}
                    <input
                      type="text"
                      className="sr-only"
                      required
                      name="devOpsTools"
                      value={formData.devOpsTools.length ? "selected" : ""}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </motion.div>

                  {/* Cloud Spend */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6,
                    }}
                  >
                    <label className="boxed-label">
                      Monthly cloud spend (approx.)
                    </label>
                    <select
                      className="boxed-input cursor-pointer appearance-none mt-1"
                      value={formData.cloudSpend}
                      onChange={(e) =>
                        setFormData({ ...formData, cloudSpend: e.target.value })
                      }
                      required
                    >
                      <option value="">Select spend</option>
                      <option value="<500">Less than $500</option>
                      <option value="500-2000">$500–$2,000</option>
                      <option value="2000-10000">$2,000–$10,000</option>
                      <option value="10000-50000">$10,000–$50,000</option>
                      <option value="50000+">$50,000+</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </motion.div>

                  {/* Footer Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.7,
                    }}
                    className="flex justify-between items-center pt-4"
                  >
                    <button type="button" onClick={prevStep} className="secondary-btn">
                      Back
                    </button>
                    <button type="submit" className="next-btn group">
                      Next
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ) : step === 4 ? (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subheader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="mb-4"
                >
                  <h2 className="text-sm font-bold text-white mb-1">
                    Goals & pain points
                  </h2>
                </motion.div>

                <div className="space-y-4">
                  {/* Goals Multi-select Pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4,
                    }}
                  >
                    <label className="boxed-label">
                      What are your main goals?
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {MAIN_GOALS.map((goal) => {
                        const isSelected = formData.mainGoals.includes(goal);
                        return (
                          <button
                            type="button"
                            key={goal}
                            onClick={() => {
                              setFormData((prev) => {
                                const updated = isSelected
                                  ? prev.mainGoals.filter((g) => g !== goal)
                                  : [...prev.mainGoals, goal];
                                return { ...prev, mainGoals: updated };
                              });
                            }}
                            className={cn(
                              "px-3 py-1.5 rounded-full border text-[11px] transition-all duration-300",
                              isSelected
                                ? "bg-white text-black border-white font-bold"
                                : "bg-white/5 text-white/50 border-white/10 hover:border-white/30",
                            )}
                          >
                            {goal}
                          </button>
                        );
                      })}
                    </div>
                    {/* Required validator for the pill-based multi-select */}
                    <input
                      type="text"
                      className="sr-only"
                      required
                      name="mainGoals"
                      value={formData.mainGoals.length ? "selected" : ""}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </motion.div>

                  {/* Pain Points Textarea */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.5,
                    }}
                  >
                    <label className="boxed-label">
                      Biggest pain point right now
                    </label>
                    <textarea
                      placeholder="e.g. Deployments take too long and are error-prone..."
                      className="boxed-input min-h-[80px] py-3 resize-none"
                      value={formData.painPoint}
                      onChange={(e) =>
                        setFormData({ ...formData, painPoint: e.target.value })
                      }
                      required
                    />
                  </motion.div>

                  {/* Footer Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.7,
                    }}
                    className="flex justify-between items-center pt-2"
                  >
                    <button type="button" onClick={prevStep} className="secondary-btn">
                      Back
                    </button>
                    <button type="submit" className="next-btn group">
                      Next
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subheader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="mb-4"
                >
                  <h2 className="text-sm font-bold text-white mb-1">
                    Budget & timeline
                  </h2>
                </motion.div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Budget Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4,
                      }}
                    >
                      <label className="boxed-label">
                        Project budget range
                      </label>
                      <select
                        className="boxed-input cursor-pointer appearance-none mt-1"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                      required
                      >
                        <option value="">Select range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000–$15,000</option>
                        <option value="15k-50k">$15,000–$50,000</option>
                        <option value="50k-150k">$50,000–$150,000</option>
                        <option value="150k-plus">$150,000+</option>
                        <option value="to-be-discussed">To be discussed</option>
                      </select>
                    </motion.div>

                    {/* Start Date */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.5,
                      }}
                    >
                      <label className="boxed-label">Expected start date</label>
                      <input
                        type="date"
                        className="boxed-input mt-1"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Engagement Type Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.6,
                    }}
                  >
                    <label className="boxed-label">Engagement type</label>
                    <select
                      className="boxed-input cursor-pointer appearance-none mt-1"
                      value={formData.engagementType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          engagementType: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select type</option>
                      <option value="One-time project">One-time project</option>
                      <option value="Ongoing retainer">Ongoing retainer</option>
                      <option value="Advisory / consulting">
                        Advisory / consulting
                      </option>
                      <option value="Training / upskilling">
                        Training / upskilling
                      </option>
                    </select>
                  </motion.div>

                  {/* Additional Notes */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.7,
                    }}
                  >
                    <label className="boxed-label">
                      Anything else we should know?
                    </label>
                    <textarea
                      placeholder="Special requirements, compliance needs, team structure..."
                      className="boxed-input min-h-[80px] py-3 resize-none"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      required
                    />
                  </motion.div>

                  {/* Footer Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.8,
                    }}
                    className="flex justify-between items-center pt-2"
                  >
                    <button type="button" onClick={prevStep} className="secondary-btn">
                      Back
                    </button>
                    <button type="submit" className="next-btn group">
                      Submit
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
}
