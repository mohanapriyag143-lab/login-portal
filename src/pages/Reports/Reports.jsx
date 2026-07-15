import { motion } from 'framer-motion';
import { Download, AlertTriangle, CheckCircle, Clock, Shield, Brain, ChevronRight } from 'lucide-react';
import styles from './Reports.module.css';

const incidents = [
  {
    id: 'IR-2024-089241', customer: 'John Doe', custId: 'CUST-89241', type: 'Account Takeover',
    risk: 'Critical', time: '2 min ago', status: 'Blocked', riskScore: 92, aiConfidence: '96.4%',
    normalLoc: 'New York, USA', currentLoc: 'Moscow, Russia',
    normalDevice: 'iPhone 13 Pro', currentDevice: 'Linux Desktop',
    normalAmt: '$1,200', currentAmt: '$45,000', ip: '185.220.101.x',
    reasons: ['Impossible Travel — 9,000 km in 20 min', 'New Unrecognized Device (Linux VM)', 'VPN IP flagged in threat intelligence', 'Amount 37.5x above average'],
    timeline: [
      { time: '07:50 PM', event: 'Normal login — New York, iPhone 13 Pro', safe: true },
      { time: '08:10 PM', event: 'Login attempt — Moscow, Russia (Linux VM)', safe: false },
      { time: '08:14 PM', event: 'New device fingerprint detected', safe: false },
      { time: '08:15 PM', event: '$45,000 transfer initiated', safe: false },
      { time: '08:15 PM', event: 'AI Alert — Transaction BLOCKED', safe: false },
    ],
    actions: ['Freeze account CUST-89241 immediately', 'Contact customer: +91-XXXXXX7821', 'Force password reset + re-enroll device', 'File SAR with RBI/FinCEN', 'Full account audit for past 30 days'],
  },
  {
    id: 'IR-2024-089240', customer: 'Alice Smith', custId: 'CUST-74512', type: 'Multiple Failed Logins',
    risk: 'High', time: '1h ago', status: 'Investigating', riskScore: 74, aiConfidence: '91.2%',
    normalLoc: 'London, UK', currentLoc: 'London, UK (Incognito)',
    normalDevice: 'MacBook Safari', currentDevice: 'Chrome Incognito',
    normalAmt: '$800', currentAmt: '$5,200', ip: '91.108.56.x',
    reasons: ['8 failed login attempts in 3 minutes', 'Incognito browser — no session cookie', 'Transaction at 2:45 AM (unusual time)', 'Different browser fingerprint'],
    timeline: [
      { time: '02:40 AM', event: 'First failed login attempt', safe: false },
      { time: '02:42 AM', event: '7 more failed attempts (brute force pattern)', safe: false },
      { time: '02:45 AM', event: 'Successful login via Chrome Incognito', safe: false },
      { time: '02:46 AM', event: '$5,200 transfer attempted', safe: false },
      { time: '02:46 AM', event: 'AI flagged — Under investigation', safe: false },
    ],
    actions: ['Temporarily lock account CUST-74512', 'Send security alert to registered email', 'Enable 2FA enforcement', 'Review login logs for past 7 days'],
  },
  {
    id: 'IR-2024-089239', customer: 'Bob Jones', custId: 'CUST-38901', type: 'VPN + New Device',
    risk: 'Medium', time: '3h ago', status: 'Resolved', riskScore: 48, aiConfidence: '83.7%',
    normalLoc: 'Chicago, USA', currentLoc: 'Chicago, USA (VPN)',
    normalDevice: 'Windows Chrome', currentDevice: 'Android Firefox',
    normalAmt: '$2,000', currentAmt: '$3,400', ip: '45.120.62.x (VPN)',
    reasons: ['VPN usage detected — IP masked', 'New mobile device not in trusted list', 'Slightly above average transaction amount'],
    timeline: [
      { time: '05:10 PM', event: 'Login via VPN from Chicago', safe: false },
      { time: '05:12 PM', event: 'New Android device fingerprint registered', safe: false },
      { time: '05:15 PM', event: '$3,400 transfer — within acceptable range', safe: true },
      { time: '05:16 PM', event: 'AI medium-risk flag raised', safe: false },
      { time: '05:20 PM', event: 'Customer verified via OTP — Resolved', safe: true },
    ],
    actions: ['Add new device to trusted list after OTP verify', 'Monitor account for next 48 hours', 'Send VPN usage advisory to customer'],
  },
  {
    id: 'IR-2024-089238', customer: 'Priya Sharma', custId: 'CUST-92017', type: 'Impossible Travel',
    risk: 'Critical', time: '5h ago', status: 'Blocked', riskScore: 96, aiConfidence: '98.1%',
    normalLoc: 'Mumbai, India', currentLoc: 'Beijing, China',
    normalDevice: 'iPhone 14', currentDevice: 'Unknown Android',
    normalAmt: '$500', currentAmt: '$28,000', ip: '103.45.67.x',
    reasons: ['Impossible Travel — Mumbai to Beijing in 30 min', 'Unknown Android device — no prior history', 'Amount 56x above average', 'Transaction to overseas unregistered account'],
    timeline: [
      { time: '03:00 PM', event: 'Normal login — Mumbai, iPhone 14', safe: true },
      { time: '03:30 PM', event: 'Login from Beijing — unknown Android device', safe: false },
      { time: '03:31 PM', event: '$28,000 wire transfer to overseas account', safe: false },
      { time: '03:31 PM', event: 'AI Critical alert — 96% risk score', safe: false },
      { time: '03:31 PM', event: 'Transaction BLOCKED — Account frozen', safe: false },
    ],
    actions: ['Freeze account CUST-92017 — immediate', 'Contact customer: +91-XXXXXX2290', 'Escalate to fraud department', 'File SAR with RBI', 'Notify correspondent bank of blocked transfer'],
  },
];

const generateReport = (inc) => {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const riskColor = inc.riskScore >= 80 ? '#ff3366' : inc.riskScore >= 60 ? '#ff9900' : '#00c853';
  const reasonsHTML = inc.reasons.map(r => `<div class="ri">&#10007; ${r}</div>`).join('');
  const timelineHTML = inc.timeline.map(t =>
    `<div class="ti"><div class="tl">${t.time}</div><div>${t.safe ? '&#10003;' : '&#9679;'} ${t.event}</div></div>`
  ).join('');
  const actionsHTML = inc.actions.map((a, i) => `<p>${i + 1}. ${a}</p>`).join('');

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>SentinelAI ${inc.id}</title>
<style>
*{box-sizing:border-box}body{font-family:Arial,sans-serif;margin:40px;color:#111;background:#fff;font-size:13px}
.hdr{display:flex;justify-content:space-between;border-bottom:3px solid #00bcd4;padding-bottom:14px;margin-bottom:20px}
.logo{font-size:20px;font-weight:800;color:#00bcd4}.meta{text-align:right;color:#666;font-size:11px}
.banner{background:${riskColor};color:#fff;padding:10px 16px;border-radius:6px;font-weight:700;margin-bottom:18px}
h2{font-size:13px;color:#00bcd4;border-bottom:1px solid #ddd;padding-bottom:4px;margin-top:18px;margin-bottom:6px}
table{width:100%;border-collapse:collapse;font-size:12px}th{background:#f0f0f0;padding:6px 10px;text-align:left}td{padding:6px 10px;border-bottom:1px solid #eee}
.bc{background:#ff3366;color:#fff;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700}
.bs{background:#00c853;color:#fff;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700}
.bar{background:#eee;height:10px;border-radius:5px;margin:4px 0}.fill{background:${riskColor};height:10px;border-radius:5px;width:${inc.riskScore}%}
.ti{display:flex;gap:12px;margin-bottom:8px}.tl{width:70px;color:#888;font-size:11px;font-weight:600;flex-shrink:0}
.ri{margin:4px 0;color:#cc0000}
.ft{margin-top:30px;border-top:1px solid #eee;padding-top:12px;font-size:10px;color:#999;text-align:center}
</style></head><body>
<div class="hdr"><div class="logo">SentinelAI</div><div class="meta"><div><b>Report ID:</b> ${inc.id}</div><div><b>Generated:</b> ${now}</div><div><b>Classification:</b> CONFIDENTIAL</div></div></div>
<div class="banner">SECURITY INCIDENT — ${inc.risk.toUpperCase()} — ${inc.status.toUpperCase()}</div>
<h2>1. Incident Summary</h2>
<table><tr><th>Field</th><th>Details</th></tr><tr><td>Customer</td><td>${inc.customer} (${inc.custId})</td></tr><tr><td>Incident Type</td><td>${inc.type}</td></tr><tr><td>IP Address</td><td>${inc.ip}</td></tr><tr><td>Status</td><td><span class="bc">${inc.status.toUpperCase()}</span></td></tr></table>
<h2>2. AI Risk Score: ${inc.riskScore}/100</h2><div class="bar"><div class="fill"></div></div><p>AI Confidence: ${inc.aiConfidence}</p>
<h2>3. Fraud Timeline</h2>${timelineHTML}
<h2>4. Explainable AI Reasons</h2>${reasonsHTML}
<h2>5. Digital Twin Comparison</h2>
<table><tr><th>Attribute</th><th>Normal</th><th>Current</th></tr>
<tr><td>Location</td><td><span class="bs">${inc.normalLoc}</span></td><td><span class="bc">${inc.currentLoc}</span></td></tr>
<tr><td>Device</td><td><span class="bs">${inc.normalDevice}</span></td><td><span class="bc">${inc.currentDevice}</span></td></tr>
<tr><td>Amount</td><td><span class="bs">${inc.normalAmt}</span></td><td><span class="bc">${inc.currentAmt}</span></td></tr></table>
<h2>6. Recommended Actions</h2>${actionsHTML}
<div class="ft">SentinelAI | ${inc.id} | CONFIDENTIAL — For Internal Use Only</div>
<script>window.onload=()=>window.print()</script></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

const riskColor = { Critical: '#FF3366', High: '#FF9900', Medium: '#00E5FF', Low: '#00FF66' };
const statusColor = { Blocked: '#FF3366', Investigating: '#FF9900', Resolved: '#00FF66' };

const Reports = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div>
        <h1 className="glow-text">AI Investigation Reports</h1>
        <p className={styles.sub}>AI-generated incident reports with root cause analysis</p>
      </div>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        className={styles.downloadBtn} onClick={() => generateReport(incidents[0])}>
        <Download size={18} /> Download Latest PDF
      </motion.button>
    </header>

    <div className={styles.statsRow}>
      <StatMini icon={<AlertTriangle />} label="Critical Incidents" value="12" color="#FF3366" />
      <StatMini icon={<Clock />} label="Under Investigation" value="4" color="#FF9900" />
      <StatMini icon={<CheckCircle />} label="Resolved Today" value="38" color="#00FF66" />
      <StatMini icon={<Shield />} label="Auto-Blocked" value="15.4K" color="#00E5FF" />
    </div>

    <div className={`glass-panel ${styles.featuredCard}`}>
      <div className={styles.featuredBadge}>🔴 LATEST CRITICAL INCIDENT</div>
      <div className={styles.featuredGrid}>
        <div className={styles.incidentMeta}>
          <h2>IR-2024-089241 — Account Takeover</h2>
          <p className={styles.incidentSub}>John Doe (CUST-89241) · 2 min ago</p>
          <div className={styles.detailsList}>
            <DetailRow icon={<Brain size={16}/>} label="AI Risk Score" value="92% — CRITICAL" danger />
            <DetailRow icon={<AlertTriangle size={16}/>} label="Attack Type" value="Impossible Travel + New Device" danger />
            <DetailRow icon={<Shield size={16}/>} label="Action" value="Transaction Blocked Automatically" />
            <DetailRow icon={<Clock size={16}/>} label="Response" value="0.8 seconds (AI auto-response)" />
          </div>
        </div>
        <div className={styles.timelineSection}>
          <h4>Fraud Timeline</h4>
          {incidents[0].timeline.map((item, i) => (
            <motion.div key={i} className={styles.timelineItem}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <span className={styles.timeTag}>{item.time}</span>
              <ChevronRight size={12} className={styles.chevron} />
              <span className={`${styles.eventText} ${item.safe ? styles.safeText : styles.dangerText}`}>{item.event}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <div className={`glass-panel ${styles.tableCard}`}>
      <h3>All Incident Reports</h3>
      <table className={styles.table}>
        <thead>
          <tr><th>Report ID</th><th>Customer</th><th>Incident Type</th><th>Risk</th><th>Time</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <motion.tr key={inc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <td className={styles.reportId}>{inc.id}</td>
              <td>{inc.customer}</td>
              <td>{inc.type}</td>
              <td><span className={styles.badge} style={{ color: riskColor[inc.risk], borderColor: riskColor[inc.risk] }}>{inc.risk}</span></td>
              <td className={styles.dimText}>{inc.time}</td>
              <td><span className={styles.badge} style={{ color: statusColor[inc.status], borderColor: statusColor[inc.status] }}>{inc.status}</span></td>
              <td>
                <button className={styles.viewBtn} onClick={() => generateReport(inc)}>
                  <Download size={13} /> PDF
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StatMini = ({ icon, label, value, color }) => (
  <motion.div whileHover={{ y: -3 }} className={`glass-panel ${styles.statMini}`} style={{ borderLeftColor: color }}>
    <div className={styles.statIcon} style={{ color, background: `${color}18` }}>{icon}</div>
    <div><div className={styles.statValue}>{value}</div><div className={styles.statLabel}>{label}</div></div>
  </motion.div>
);

const DetailRow = ({ icon, label, value, danger }) => (
  <div className={styles.detailRow}>
    <span className={styles.detailIcon} style={{ color: danger ? '#FF3366' : '#00E5FF' }}>{icon}</span>
    <span className={styles.detailLabel}>{label}:</span>
    <span className={`${styles.detailValue} ${danger ? styles.dangerText : ''}`}>{value}</span>
  </div>
);

export default Reports;
