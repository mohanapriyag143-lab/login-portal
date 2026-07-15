import { motion } from 'framer-motion';
import { Brain, CheckCircle, AlertTriangle, XCircle, Search } from 'lucide-react';
import styles from './AIAnalysis.module.css';

const AIAnalysis = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="glow-text">AI Risk Analysis</h1>
      </header>

      <div className={styles.grid}>
        {/* Input Panel */}
        <div className={`glass-panel ${styles.inputPanel}`}>
          <h3>Transaction Details</h3>
          <div className={styles.formGroup}>
            <label>Customer ID</label>
            <div className={styles.inputWrapper}>
              <Search size={16} className={styles.inputIcon} />
              <input type="text" defaultValue="CUST-89241" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Amount (USD)</label>
            <input type="text" defaultValue="$45,000.00" />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input type="text" defaultValue="Moscow, Russia (New Location)" />
          </div>
          <div className={styles.formGroup}>
            <label>Device</label>
            <input type="text" defaultValue="Unknown Linux Desktop" />
          </div>
          <button className={styles.analyzeBtn}>
            <Brain size={18} /> Re-Analyze Risk
          </button>
        </div>

        {/* AI Output Panel */}
        <div className={`glass-panel ${styles.outputPanel}`}>
          <h3>Explainable AI Results</h3>
          
          <div className={styles.riskMeterSection}>
            <div className={styles.riskMeter}>
              <div className={styles.meterFill} style={{ width: '92%' }}></div>
              <motion.div 
                className={styles.needle} 
                initial={{ left: '0%' }}
                animate={{ left: '92%' }}
                transition={{ duration: 1.5, type: 'spring' }}
              />
            </div>
            <div className={styles.riskLabels}>
              <span>Safe</span>
              <span>Medium</span>
              <span className={styles.criticalText}>Critical (92%)</span>
            </div>
          </div>

          <div className={styles.aiExplanation}>
            <h4>Why was this blocked?</h4>
            <ul className={styles.reasonList}>
              <li className={styles.danger}>
                <XCircle size={18} /> New Unrecognized Device
              </li>
              <li className={styles.danger}>
                <XCircle size={18} /> Impossible Travel (Login from NY 1h ago)
              </li>
              <li className={styles.warning}>
                <AlertTriangle size={18} /> VPN Usage Detected
              </li>
              <li className={styles.warning}>
                <AlertTriangle size={18} /> Unusually Large Amount
              </li>
              <li className={styles.safe}>
                <CheckCircle size={18} /> Correct Password Entered
              </li>
            </ul>
          </div>

          <div className={styles.confidence}>
            AI Confidence: <strong>96.4%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
