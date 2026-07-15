import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ThreatMap.module.css';

const attacks = [
  { id: 1, name: "Moscow, Russia", x: 57, y: 22, type: "Critical", user: "ivan.petrov", ip: "185.220.101.x", device: "Linux VM", attackType: "Account Takeover", time: "08:14 PM" },
  { id: 2, name: "Beijing, China", x: 75, y: 33, type: "Critical", user: "unknown_cn", ip: "103.45.67.x", device: "Android Phone", attackType: "Card Fraud", time: "08:10 PM" },
  { id: 3, name: "New York, USA", x: 20, y: 30, type: "High", user: "j.smith", ip: "72.14.192.x", device: "Chrome / Win", attackType: "Phishing Login", time: "07:58 PM" },
  { id: 4, name: "São Paulo, Brazil", x: 28, y: 68, type: "Medium", user: "carlos.m", ip: "189.28.128.x", device: "Mobile Safari", attackType: "SIM Swap", time: "07:45 PM" },
  { id: 5, name: "Mumbai, India", x: 65, y: 43, type: "High", user: "unknown_in", ip: "45.120.62.x", device: "iPhone 13", attackType: "OTP Bypass", time: "07:40 PM" },
  { id: 6, name: "Berlin, Germany", x: 50, y: 22, type: "Medium", user: "h.mueller", ip: "91.108.56.x", device: "Firefox / Mac", attackType: "Brute Force", time: "07:30 PM" },
  { id: 7, name: "Singapore", x: 76, y: 52, type: "Low", user: "sg_user99", ip: "202.166.205.x", device: "Safari / iOS", attackType: "VPN Login", time: "07:15 PM" },
];

const colorMap = {
  Critical: '#FF3366',
  High: '#FF9900',
  Medium: '#00E5FF',
  Low: '#00FF66',
};

const ThreatMap = () => {
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (attack, e) => {
    const rect = e.currentTarget.closest('[data-mapbox]').getBoundingClientRect();
    const dotRect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: dotRect.left - rect.left + 16,
      y: dotRect.top - rect.top - 10,
    });
    setHovered(attack);
  };

  const handleMouseLeave = () => setHovered(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className="glow-text">🌍 Live Global Threat Map</h1>
          <p className={styles.subheader}>Real-time banking attack detection across the globe</p>
        </div>
        <div className={styles.attackCounter}>
          <div className={styles.counterValue}>129</div>
          <div className={styles.counterLabel}>Today's Attacks <span className={styles.trend}>↑ +18%</span></div>
        </div>
      </header>

      {/* Map Box */}
      <div className={styles.mapWrapper} data-mapbox>
        <div className={styles.mapBackground} data-mapbox="true">
          {/* Grid */}
          <svg className={styles.gridSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {[10,20,30,40,50,60,70,80,90].map(y => (
              <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(0,229,255,0.05)" strokeWidth="0.2"/>
            ))}
            {[10,20,30,40,50,60,70,80,90].map(x => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="rgba(0,229,255,0.05)" strokeWidth="0.2"/>
            ))}
          </svg>

          {/* Connection lines */}
          <svg className={styles.connectionsSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {attacks.filter(a => a.type === 'Critical').map((attack, i, arr) => {
              if (i === 0) return null;
              const prev = arr[i - 1];
              return (
                <line key={attack.id}
                  x1={prev.x} y1={prev.y} x2={attack.x} y2={attack.y}
                  stroke="rgba(255,51,102,0.25)" strokeWidth="0.3" strokeDasharray="1 1"
                />
              );
            })}
          </svg>

          {/* Attack Markers */}
          {attacks.map((attack) => (
            <div
              key={attack.id}
              className={styles.attackMarker}
              style={{ left: `${attack.x}%`, top: `${attack.y}%` }}
              onMouseEnter={(e) => handleMouseEnter(attack, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.pulseRing} style={{ borderColor: colorMap[attack.type] }}></div>
              <div className={styles.pulseRing2} style={{ borderColor: colorMap[attack.type] }}></div>
              <div className={styles.dot} style={{ background: colorMap[attack.type], boxShadow: `0 0 10px ${colorMap[attack.type]}` }}></div>
              <div className={styles.markerLabel}>{attack.name}</div>
            </div>
          ))}

          {/* Floating Tooltip — renders INSIDE map, above overflow */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className={`${styles.tooltip}`}
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
              >
                <div className={styles.tooltipBadge} style={{ background: colorMap[hovered.type] }}>
                  {hovered.type} THREAT
                </div>
                <div className={styles.tooltipTitle}>{hovered.attackType}</div>
                <div className={styles.tooltipDivider}></div>
                <div className={styles.tooltipRow}><span>📍</span><span>{hovered.name}</span></div>
                <div className={styles.tooltipRow}><span>👤</span><span>{hovered.user}</span></div>
                <div className={styles.tooltipRow}><span>🌐</span><span>{hovered.ip}</span></div>
                <div className={styles.tooltipRow}><span>📱</span><span>{hovered.device}</span></div>
                <div className={styles.tooltipRow}><span>🕐</span><span>{hovered.time}</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottomSection}>
        <div className={`glass-panel ${styles.legend}`}>
          <h4>Threat Levels</h4>
          {Object.entries(colorMap).map(([level, color]) => (
            <div key={level} className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: color, boxShadow: `0 0 6px ${color}` }}></div>
              <span>{level}</span>
            </div>
          ))}
        </div>

        <div className={`glass-panel ${styles.liveFeed}`}>
          <h4>⚡ Live Attack Feed</h4>
          <div className={styles.feedList}>
            {attacks.map((attack) => (
              <motion.div key={attack.id} className={styles.feedItem}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: attack.id * 0.08 }}
              >
                <div className={styles.feedDot} style={{ background: colorMap[attack.type], boxShadow: `0 0 6px ${colorMap[attack.type]}` }}></div>
                <div className={styles.feedInfo}>
                  <span className={styles.feedType}>{attack.attackType}</span>
                  <span className={styles.feedLocation}>{attack.name} · {attack.ip}</span>
                </div>
                <span className={styles.feedBadge} style={{ color: colorMap[attack.type], borderColor: colorMap[attack.type] }}>
                  {attack.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
