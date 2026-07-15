import { motion } from 'framer-motion';
import { User, Smartphone, MapPin, Download, FileText } from 'lucide-react';
import styles from './DigitalTwin.module.css';

const generateReport = () => {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const reportHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>SentinelAI - Incident Report #IR-2024-089241</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #111; background: #fff; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00bcd4; padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 22px; font-weight: 800; color: #00bcd4; letter-spacing: 1px; }
        .report-id { font-size: 12px; color: #666; text-align: right; }
        .critical-banner { background: #ff3366; color: #fff; padding: 12px 20px; border-radius: 8px; font-size: 16px; font-weight: 700; margin-bottom: 24px; }
        h2 { font-size: 16px; color: #00bcd4; border-bottom: 1px solid #e0e0e0; padding-bottom: 6px; margin-top: 28px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        th { background: #f5f5f5; padding: 8px 12px; text-align: left; font-weight: 600; color: #333; }
        td { padding: 8px 12px; border-bottom: 1px solid #eee; }
        .badge-critical { background: #ff3366; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
        .badge-safe { background: #00c853; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
        .timeline-item { display: flex; gap: 16px; margin-bottom: 12px; }
        .time-label { width: 80px; font-size: 12px; color: #888; font-weight: 600; flex-shrink: 0; }
        .time-event { font-size: 13px; color: #333; }
        .risk-bar-bg { background: #eee; height: 12px; border-radius: 6px; margin-top: 6px; }
        .risk-bar-fill { background: linear-gradient(90deg, #ff9900, #ff3366); height: 12px; border-radius: 6px; width: 92%; }
        .reason-item { margin: 6px 0; font-size: 13px; }
        .reason-item::before { content: "✗ "; color: #ff3366; font-weight: 700; }
        .safe-item::before { content: "✓ "; color: #00c853; font-weight: 700; }
        .footer { margin-top: 40px; border-top: 1px solid #eee; padding-top: 16px; font-size: 11px; color: #999; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🛡 SentinelAI</div>
        <div class="report-id">
          <div><strong>Report ID:</strong> IR-2024-089241</div>
          <div><strong>Generated:</strong> ${now}</div>
          <div><strong>Classification:</strong> CONFIDENTIAL</div>
        </div>
      </div>

      <div class="critical-banner">⚠ CRITICAL SECURITY INCIDENT — IMMEDIATE ACTION REQUIRED</div>

      <h2>1. Incident Summary</h2>
      <table>
        <tr><th>Field</th><th>Details</th></tr>
        <tr><td>Customer Name</td><td>John Doe</td></tr>
        <tr><td>Customer ID</td><td>CUST-89241</td></tr>
        <tr><td>Account Number</td><td>HDFC-XXXX-XXXX-4821</td></tr>
        <tr><td>Incident Type</td><td>Account Takeover / Impossible Travel</td></tr>
        <tr><td>Detection Time</td><td>${now}</td></tr>
        <tr><td>Status</td><td><span class="badge-critical">BLOCKED</span></td></tr>
      </table>

      <h2>2. AI Risk Score</h2>
      <p><strong>Overall Risk Score: 92 / 100 — CRITICAL</strong></p>
      <div class="risk-bar-bg"><div class="risk-bar-fill"></div></div>
      <p style="font-size:12px; color:#888; margin-top:4px;">AI Confidence: 96.4% | Model: SentinelAI XGBoost v3.1</p>

      <h2>3. Fraud Timeline</h2>
      <div class="timeline-item"><div class="time-label">07:50 PM</div><div class="time-event">✅ Normal login from New York, USA (iPhone 13 Pro)</div></div>
      <div class="timeline-item"><div class="time-label">08:10 PM</div><div class="time-event">⚠ Login attempt from Moscow, Russia (Linux Desktop)</div></div>
      <div class="timeline-item"><div class="time-label">08:12 PM</div><div class="time-event">⚠ OTP sent — unrecognized device requesting access</div></div>
      <div class="timeline-item"><div class="time-label">08:14 PM</div><div class="time-event">🔴 New device fingerprint detected — unknown Linux VM</div></div>
      <div class="timeline-item"><div class="time-label">08:15 PM</div><div class="time-event">🔴 Large transfer attempted: $45,000 to overseas account</div></div>
      <div class="timeline-item"><div class="time-label">08:15 PM</div><div class="time-event">🤖 AI Alert generated — Risk Score: 92%</div></div>
      <div class="timeline-item"><div class="time-label">08:15 PM</div><div class="time-event">🔒 Transaction BLOCKED automatically by SentinelAI</div></div>

      <h2>4. Explainable AI — Reasons for Block</h2>
      <div class="reason-item">Impossible Travel — Login from NY (7:50 PM) + Moscow (8:10 PM) — 9,000 km in 20 minutes</div>
      <div class="reason-item">New Unrecognized Device — Linux Desktop fingerprint not in trusted device list</div>
      <div class="reason-item">VPN Usage Detected — IP flagged in threat intelligence database</div>
      <div class="reason-item">Unusually Large Transaction — $45,000 vs avg $1,200 (37.5x normal)</div>
      <div class="reason-item safe-item" style="">Correct password entered — no brute force detected</div>

      <h2>5. Digital Twin Comparison</h2>
      <table>
        <tr><th>Attribute</th><th>Normal Behaviour</th><th>Current Behaviour</th></tr>
        <tr><td>Location</td><td><span class="badge-safe">New York, USA</span></td><td><span class="badge-critical">Moscow, Russia</span></td></tr>
        <tr><td>Device</td><td><span class="badge-safe">iPhone 13 Pro</span></td><td><span class="badge-critical">Linux Desktop</span></td></tr>
        <tr><td>Transaction</td><td><span class="badge-safe">~$1,200</span></td><td><span class="badge-critical">$45,000</span></td></tr>
        <tr><td>Login Time</td><td><span class="badge-safe">9 AM – 6 PM</span></td><td><span class="badge-critical">8:10 PM (Night)</span></td></tr>
      </table>

      <h2>6. Recommended Actions</h2>
      <p>1. 🔒 Immediately freeze account CUST-89241</p>
      <p>2. 📞 Contact customer via registered mobile: +91-XXXXXX7821</p>
      <p>3. 🔄 Force password reset + re-enroll device</p>
      <p>4. 📧 Send security alert email to registered address</p>
      <p>5. 🧾 File SAR (Suspicious Activity Report) with RBI/FinCEN</p>
      <p>6. 🕵 Initiate full account audit for past 30 days</p>

      <div class="footer">
        Generated by SentinelAI — AI-Powered Banking Cybersecurity Platform &nbsp;|&nbsp;
        Report ID: IR-2024-089241 &nbsp;|&nbsp; CONFIDENTIAL — For Internal Use Only
      </div>

      <script>window.onload = () => window.print();</script>
    </body>
    </html>
  `;

  const blob = new Blob([reportHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.onload = () => {
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    };
  }
};

const DigitalTwin = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="glow-text">Customer Digital Twin</h1>
      </header>

      <div className={styles.twinGrid}>
        <div className={`glass-panel ${styles.profilePanel}`}>
          <div className={styles.avatar}>
            <User size={40} />
          </div>
          <h2>John Doe</h2>
          <p className={styles.customerId}>CUST-89241</p>
          <div className={styles.anomalyScore}>
            Anomaly Score: <span className={styles.critical}>87%</span>
          </div>
        </div>

        <div className={styles.comparisonSection}>
          <div className={`glass-panel ${styles.normalBehavior}`}>
            <h3><CheckIcon /> Normal Behavior</h3>
            <BehaviorItem icon={<MapPin />} label="Usual Location" value="New York, USA" />
            <BehaviorItem icon={<Smartphone />} label="Trusted Device" value="iPhone 13 Pro" />
            <BehaviorItem icon={<FileText />} label="Avg Transaction" value="$1,200" />
          </div>

          <div className={styles.vsCircle}>VS</div>

          <div className={`glass-panel ${styles.currentBehavior}`}>
            <h3><AlertIcon /> Current Behavior</h3>
            <BehaviorItem icon={<MapPin />} label="Current Location" value="Moscow, Russia" danger />
            <BehaviorItem icon={<Smartphone />} label="Current Device" value="Linux Desktop" danger />
            <BehaviorItem icon={<FileText />} label="Current Amount" value="$45,000" danger />
          </div>
        </div>
      </div>

      <div className={`glass-panel ${styles.reportSection}`}>
        <h3>Investigation Report</h3>
        <p>AI has generated a comprehensive PDF report detailing the anomaly analysis, fraud timeline, digital twin comparison, and recommended lockdown procedures.</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={styles.downloadBtn}
          onClick={generateReport}
        >
          <Download size={18} /> Download PDF Report
        </motion.button>
      </div>
    </div>
  );
};

const BehaviorItem = ({ icon, label, value, danger }) => (
  <div className={styles.behaviorItem}>
    <div className={`${styles.icon} ${danger ? styles.dangerText : styles.safeText}`}>{icon}</div>
    <div className={styles.info}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${danger ? styles.dangerText : ''}`}>{value}</span>
    </div>
  </div>
);

const CheckIcon = () => <span className={styles.safeText}>✓</span>;
const AlertIcon = () => <span className={styles.dangerText}>⚠</span>;

export default DigitalTwin;
