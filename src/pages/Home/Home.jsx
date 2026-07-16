import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, Lock, X, CheckCircle, AlertTriangle, Globe, Brain } from 'lucide-react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const demoSteps = [
  { icon: <Globe size={28} />, title: "Live Threat Map", desc: "Real-time global attack detection across 50+ countries. Pulsing red nodes show active banking fraud attempts.", color: "#FF3366" },
  { icon: <Activity size={28} />, title: "Security Dashboard", desc: "1.2M transactions monitored daily. AI flags 15,400 suspicious activities. Live Recharts visualizations with fraud trend analysis.", color: "#00E5FF" },
  { icon: <Brain size={28} />, title: "Explainable AI Analysis", desc: "AI risk score: 92% Critical. Reasons: Impossible Travel, New Device, VPN Usage. 96.4% model confidence.", color: "#FF9900" },
  { icon: <ShieldAlert size={28} />, title: "Digital Twin", desc: "Every customer has a digital twin. Normal: New York + iPhone. Current: Moscow + Linux VM. Anomaly: 87%.", color: "#00FF66" },
  { icon: <CheckCircle size={28} />, title: "Investigation Report", desc: "Auto-generated PDF reports with incident timeline, root cause, AI explanation & recommended actions.", color: "#22D3EE" },
];

const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.homeContainer}>
      {/* Background Particles Simulation */}
      <div className={styles.particlesContainer}>
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
      </div>

      <div className={styles.heroSection}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={`glow-text ${styles.title}`}>FortiSentinel AI</h1>
          <h2 className={styles.subtitle}>
            One Platform. Every Signal. Zero Blind Spots.
          </h2>
          <p className={styles.description}>
            AI-Driven Correlation of Cybersecurity Telemetry & Transaction Behaviour.
            Continuously monitoring logs and transactions to detect fraud, insider threats, 
            and compromised accounts in real time using Explainable AI.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link to="/dashboard" className={`${styles.primaryBtn} glow-border`}>
              Launch Dashboard
            </Link>
            <button className={styles.secondaryBtn} onClick={() => setShowDemo(true)}>
              ▶ Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.heroVisual}
        >
          <div className={styles.aiShieldContainer}>
            <ShieldAlert size={120} className={styles.shieldIcon} />
            <div className={styles.scanningLine}></div>
          </div>
        </motion.div>
      </div>

      <div className={styles.statsSection}>
        <StatCard title="Total Transactions" value="2.4M" icon={<Activity />} trend="+12%" />
        <StatCard title="Fraud Prevented" value="$14.2M" icon={<ShieldAlert />} trend="+5%" />
        <StatCard title="AI Accuracy" value="99.8%" icon={<Lock />} trend="+0.2%" />
      </div>

      {/* ── Demo Modal ── */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              className={`glass-panel ${styles.modalBox}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className={styles.modalHeader}>
                <div>
                  <h2 className="glow-text">FortiSentinel AI Platform Demo</h2>
                  <p className={styles.modalSub}>AI-Powered Banking Cybersecurity — Feature Walkthrough</p>
                </div>
                <button className={styles.closeBtn} onClick={() => setShowDemo(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Step Tabs */}
              <div className={styles.stepTabs}>
                {demoSteps.map((step, i) => (
                  <button
                    key={i}
                    className={`${styles.stepTab} ${activeStep === i ? styles.activeTab : ''}`}
                    style={activeStep === i ? { borderColor: step.color, color: step.color } : {}}
                    onClick={() => setActiveStep(i)}
                  >
                    Step {i + 1}
                  </button>
                ))}
              </div>

              {/* Active Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  className={styles.stepContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.stepIcon} style={{ color: demoSteps[activeStep].color, background: `${demoSteps[activeStep].color}18`, border: `1px solid ${demoSteps[activeStep].color}44` }}>
                    {demoSteps[activeStep].icon}
                  </div>
                  <h3 style={{ color: demoSteps[activeStep].color }}>{demoSteps[activeStep].title}</h3>
                  <p className={styles.stepDesc}>{demoSteps[activeStep].desc}</p>

                  {/* Visual bar */}
                  <div className={styles.demoBar}>
                    <div className={styles.demoBarFill} style={{ background: demoSteps[activeStep].color, width: `${(activeStep + 1) * 20}%` }}></div>
                  </div>
                  <div className={styles.demoProgress}>{activeStep + 1} / {demoSteps.length} features</div>
                </motion.div>
              </AnimatePresence>

              {/* Footer Buttons */}
              <div className={styles.modalFooter}>
                <button
                  className={styles.prevBtn}
                  onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                  disabled={activeStep === 0}
                >
                  ← Previous
                </button>
                {activeStep < demoSteps.length - 1 ? (
                  <button className={styles.nextBtn} onClick={() => setActiveStep(s => s + 1)}>
                    Next Feature →
                  </button>
                ) : (
                  <Link to="/dashboard" className={styles.nextBtn} onClick={() => setShowDemo(false)}>
                    🚀 Launch Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-panel ${styles.statCard}`}
  >
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <h3>{title}</h3>
      <div className={styles.statValueRow}>
        <span className={styles.statValue}>{value}</span>
        <span className={styles.statTrend}>{trend}</span>
      </div>
    </div>
  </motion.div>
);

export default Home;
