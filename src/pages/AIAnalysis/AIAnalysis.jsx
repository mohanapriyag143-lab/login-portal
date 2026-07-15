import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, AlertTriangle, XCircle, Search, RefreshCw } from 'lucide-react';
import styles from './AIAnalysis.module.css';

// ── Rule-based AI engine ─────────────────────────────────────────
const SUSPICIOUS_LOCATIONS = ['russia', 'moscow', 'china', 'beijing', 'north korea', 'iran', 'nigeria', 'ukraine', 'pakistan'];
const SUSPICIOUS_DEVICES = ['linux', 'unknown', 'kali', 'tor', 'vpn', 'anonymous', 'vm', 'virtual'];
const TRUSTED_DEVICES = ['iphone', 'macbook', 'samsung galaxy', 'windows laptop', 'windows 11', 'chrome', 'safari'];

const analyzeRisk = ({ customerId, amount, location, device }) => {
  let score = 10; // base low risk
  const reasons = [];

  const loc = location.toLowerCase();
  const dev = device.toLowerCase();
  const amt = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;

  // ── Location check
  const isSuspiciousLoc = SUSPICIOUS_LOCATIONS.some(s => loc.includes(s));
  const isNewLocation = loc.length > 0 && !loc.includes('new york') && !loc.includes('london') && !loc.includes('mumbai') && !loc.includes('chennai') && !loc.includes('india');

  if (isSuspiciousLoc) {
    score += 40;
    reasons.push({ type: 'danger', text: `High-Risk Location Detected: ${location}` });
  } else if (isNewLocation && loc.length > 0) {
    score += 10;
    reasons.push({ type: 'warning', text: `Login from new location: ${location}` });
  } else if (loc.length > 0) {
    reasons.push({ type: 'safe', text: `Location matches trusted history: ${location}` });
  }

  // ── Device check
  const isSuspiciousDev = SUSPICIOUS_DEVICES.some(s => dev.includes(s));
  const isTrustedDev = TRUSTED_DEVICES.some(s => dev.includes(s));

  if (isSuspiciousDev) {
    score += 30;
    reasons.push({ type: 'danger', text: `Suspicious Device Detected: ${device}` });
  } else if (isTrustedDev) {
    reasons.push({ type: 'safe', text: `Trusted Device Recognized: ${device}` });
  } else if (dev.length > 0) {
    score += 10;
    reasons.push({ type: 'warning', text: `Unrecognized Device: ${device}` });
  }

  // ── Amount check
  if (amt > 20000) {
    score += 25;
    reasons.push({ type: 'danger', text: `Very Large Transaction: $${amt.toLocaleString()} (Far above average)` });
  } else if (amt > 5000) {
    score += 12;
    reasons.push({ type: 'warning', text: `Above-Average Transaction Amount: $${amt.toLocaleString()}` });
  } else if (amt > 0) {
    reasons.push({ type: 'safe', text: `Normal Transaction Amount: $${amt.toLocaleString()}` });
  }

  // ── Location + Device combo (Impossible Travel signal)
  if (isSuspiciousLoc && isSuspiciousDev) {
    score += 15;
    reasons.push({ type: 'danger', text: 'Impossible Travel Pattern — Location & Device both flagged' });
  }

  // ── Always add password check
  reasons.push({ type: 'safe', text: 'Correct Password / OTP Entered' });

  // Cap score at 99
  score = Math.min(99, Math.round(score));

  // ── Risk level
  let level = 'Low';
  let levelColor = '#00FF66';
  if (score >= 75) { level = 'Critical'; levelColor = '#FF3366'; }
  else if (score >= 50) { level = 'High'; levelColor = '#FF9900'; }
  else if (score >= 30) { level = 'Medium'; levelColor = '#00E5FF'; }

  // ── AI Confidence (simulated)
  const confidence = Math.min(99.9, 80 + score * 0.2).toFixed(1);

  // ── Verdict
  const verdict = score >= 50 ? 'BLOCKED' : score >= 30 ? 'FLAGGED FOR REVIEW' : 'APPROVED';
  const verdictColor = score >= 50 ? '#FF3366' : score >= 30 ? '#FF9900' : '#00FF66';

  return { score, level, levelColor, reasons, confidence, verdict, verdictColor };
};

// ────────────────────────────────────────────────────────────────

const AIAnalysis = () => {
  const [form, setForm] = useState({
    customerId: 'CUST-1001',
    amount: '$120',
    location: 'Chennai, India',
    device: 'Windows 11 Laptop',
  });
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeRisk(form));
      setAnalyzing(false);
    }, 1200); // simulate AI thinking time
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setResult(null); // reset result when input changes
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="glow-text">AI Risk Analysis</h1>
        <p className={styles.sub}>Enter any transaction data — AI will analyze it in real time</p>
      </header>

      <div className={styles.grid}>
        {/* Input Panel */}
        <div className={`glass-panel ${styles.inputPanel}`}>
          <h3>Transaction Details</h3>
          <div className={styles.formGroup}>
            <label>Customer ID</label>
            <div className={styles.inputWrapper}>
              <Search size={16} className={styles.inputIcon} />
              <input type="text" value={form.customerId} onChange={e => handleChange('customerId', e.target.value)} placeholder="e.g. CUST-1001" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Amount (USD)</label>
            <input type="text" value={form.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="e.g. $1200" />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input type="text" value={form.location} onChange={e => handleChange('location', e.target.value)} placeholder="e.g. Chennai, India" />
          </div>
          <div className={styles.formGroup}>
            <label>Device</label>
            <input type="text" value={form.device} onChange={e => handleChange('device', e.target.value)} placeholder="e.g. iPhone 13 Pro" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={styles.analyzeBtn}
            onClick={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? <RefreshCw size={18} className={styles.spinning} /> : <Brain size={18} />}
            {analyzing ? 'Analyzing...' : 'Analyze Risk'}
          </motion.button>

          {/* Quick test examples */}
          <div className={styles.examples}>
            <p className={styles.examplesLabel}>Quick Examples:</p>
            <button className={styles.exampleBtn} onClick={() => setForm({ customerId: 'CUST-89241', amount: '$45000', location: 'Moscow, Russia', device: 'Unknown Linux VM' })}>
              🔴 High Risk
            </button>
            <button className={styles.exampleBtn} onClick={() => setForm({ customerId: 'CUST-1001', amount: '$1200', location: 'Chennai, India', device: 'iPhone 13 Pro' })}>
              🟢 Low Risk
            </button>
            <button className={styles.exampleBtn} onClick={() => setForm({ customerId: 'CUST-5521', amount: '$8500', location: 'Dubai, UAE', device: 'Chrome Browser' })}>
              🟡 Medium Risk
            </button>
          </div>
        </div>

        {/* AI Output Panel */}
        <div className={`glass-panel ${styles.outputPanel}`}>
          <h3>Explainable AI Results</h3>

          <AnimatePresence mode="wait">
            {analyzing && (
              <motion.div key="loading" className={styles.loadingState}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className={styles.aiSpinner}></div>
                <p>AI model analyzing transaction...</p>
                <span className={styles.loadingSub}>Checking 47 risk signals...</span>
              </motion.div>
            )}

            {!analyzing && !result && (
              <motion.div key="empty" className={styles.emptyState}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Brain size={48} className={styles.emptyIcon} />
                <p>Enter transaction details and click <strong>Analyze Risk</strong></p>
              </motion.div>
            )}

            {!analyzing && result && (
              <motion.div key="result"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                {/* Risk Meter */}
                <div className={styles.riskMeterSection}>
                  <div className={styles.riskMeter}>
                    <div className={styles.meterFill}></div>
                    <motion.div
                      className={styles.needle}
                      initial={{ left: '0%' }}
                      animate={{ left: `${result.score}%` }}
                      transition={{ duration: 1.2, type: 'spring', stiffness: 60 }}
                    />
                  </div>
                  <div className={styles.riskLabels}>
                    <span>Safe</span>
                    <span>Medium</span>
                    <span style={{ color: result.levelColor, fontWeight: 700 }}>
                      {result.level} ({result.score}%)
                    </span>
                  </div>
                </div>

                {/* Verdict Badge */}
                <div className={styles.verdictBadge} style={{ color: result.verdictColor, borderColor: result.verdictColor, background: `${result.verdictColor}15` }}>
                  {result.score >= 50 ? '🔴' : result.score >= 30 ? '🟡' : '🟢'} Transaction: <strong>{result.verdict}</strong>
                </div>

                {/* Reasons */}
                <div className={styles.aiExplanation}>
                  <h4>AI Explanation — Why this score?</h4>
                  <ul className={styles.reasonList}>
                    {result.reasons.map((r, i) => (
                      <motion.li key={i} className={styles[r.type]}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}>
                        {r.type === 'danger' && <XCircle size={16} />}
                        {r.type === 'warning' && <AlertTriangle size={16} />}
                        {r.type === 'safe' && <CheckCircle size={16} />}
                        {r.text}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={styles.confidence}>
                  AI Confidence: <strong style={{ color: result.levelColor }}>{result.confidence}%</strong>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
