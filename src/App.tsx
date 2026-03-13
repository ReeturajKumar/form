import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TESTIMONIALS = [
  { name: "Rajesh Kumar", text: "Their guidance helped us reach 5x more clients in just six months. Truly grateful.", country: "in" },
  { name: "Sarah Jenkins", text: "The cloud migration was seamless. Our infrastructure is now rock-solid and scalable.", country: "us" },
  { name: "Amit Sharma", text: "They didn't just design a site; they built a growth engine for our local business.", country: "in" },
  { name: "Elena Petrov", text: "A humble team with world-class talent. They helped us navigate complex tech shifts easily.", country: "ru" },
  { name: "Priya Singh", text: "Their strategic approach to design has made our brand feel much more premium and global.", country: "in" },
  { name: "David Miller", text: "Finally found a partner that understands both business goals and technical excellence.", country: "uk" },
  { name: "Ananya Reddy", text: "The new cloud solutions they provided reduced our costs significantly while improving speed.", country: "in" },
  { name: "Michael Chen", text: "Extremely professional. They provided us with the better cloud solution we've been seeking.", country: "ca" },
  { name: "Vikram Malhotra", text: "Their dedication to our success was evident from day one. Highly recommended.", country: "in" },
  { name: "Sophie Martin", text: "Clean code, beautiful design, and most importantly, they help my business grow daily.", country: "fr" },
  { name: "Arjun Gupta", text: "A truly humbe partnership. They simplified our digital presence across all platforms.", country: "in" },
  { name: "Emma Thompson", text: "They helped us reach a wider audience than we ever thought possible. Outstanding work.", country: "au" },
];

export default function App() {
  const [formData, setFormData] = useState({
    services: [] as string[],
    name: "",
    email: "",
    phone: "",
    message: ""
  });


  return (
    <div className="app-container font-sans overflow-hidden">
      {/* Left Section: Branding & Profile */}
      <section className="left-section">
        {/* Testimonial Infinite Grid */}
        <div className="testimonial-container absolute top-0 left-0 w-full pt-10 px-6 opacity-40 select-none">
          {[0, 1, 2].map((colIndex) => {
            const columnData = [...TESTIMONIALS].sort(() => Math.random() - 0.5);
            return (
              <div key={colIndex} className={cn(
                "testimonial-column",
                colIndex === 1 && "reverse slow",
                colIndex === 2 && "slow"
              )}>
                {[...columnData, ...columnData].map((item, i) => (
                  <div key={i} className="testimonial-card">
                    <p className="testimonial-text">"{item.text}"</p>
                    <div className="testimonial-author">
                      <img src={`https://i.pravatar.cc/100?u=${item.name}`} alt={item.name} />
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
              <a 
                key={i} 
                href="#" 
                className="social-icon hover:bg-black/90 hover:scale-110 transition-all border border-black/5 shadow-sm"
              >
                <Icon size={20} />
              </a>
            ))}
            <a href="#" className="social-icon hover:bg-black/90 hover:scale-110 transition-all border border-black/5 shadow-sm font-bold text-sm">
              Bē
            </a>
          </motion.div>
        </div>
      </section>
  

      {/* Right Section: Form */}
      <section className="right-section flex flex-col">
        <div className="max-w-xl mx-auto w-full">
          {/* Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-5xl md:text-6xl font-display mb-12 leading-[1.1] tracking-tight text-white/90"
          >
            What services <br />
            <span className="text-white/20">we can support <br /> you with?</span>
          </motion.h2>

          {/* Subheader */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-sm font-bold text-white mb-2">About your company</h2>
            <p className="text-white/50 text-base">Let's start with the basics so we can tailor our approach.</p>
          </motion.div>

          <div className="space-y-6">
            {/* Input Group 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="boxed-label">Company name</label>
                <input 
                  type="text" 
                  placeholder="Acme Corp"
                  className="boxed-input" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="boxed-label">Industry</label>
                <select className="boxed-input cursor-pointer appearance-none">
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

            {/* Input Group 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="boxed-label">Company size</label>
                <select className="boxed-input cursor-pointer appearance-none">
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
                />
              </div>
            </motion.div>

            {/* Website Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            >
              <label className="boxed-label">Website (optional)</label>
              <input 
                type="text" 
                placeholder="https://"
                className="boxed-input"
              />
            </motion.div>

            {/* Next Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
              className="flex justify-end pt-4"
            >
              <button className="next-btn group">
                Next
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
