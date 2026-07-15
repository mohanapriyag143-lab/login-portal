import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, ShieldCheck, Activity } from 'lucide-react';
import styles from './Executive.module.css';

const Executive = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="glow-text">Executive Summary</h1>
        <div className={styles.cyberClock}>
          Last Scan: <span className={styles.pulseDot}></span> Just Now
        </div>
      </header>

      <div className={styles.ceoGrid}>
        <div className={`glass-panel ${styles.mainMetric}`}>
          <div className={styles.metricIcon}><ShieldCheck size={40} /></div>
          <div className={styles.metricInfo}>
            <h3>Total Blocked Fraud</h3>
            <div className={styles.hugeValue}>$42.8M</div>
            <div className={styles.trendUp}>↑ 24% from last quarter</div>
          </div>
        </div>

        <div className={styles.subGrid}>
          <CeoCard title="Today's Revenue Protected" value="$5.2M" icon={<DollarSign />} />
          <CeoCard title="Total Active Users" value="1.2M" icon={<Users />} />
          <CeoCard title="AI Accuracy Rate" value="99.9%" icon={<TrendingUp />} />
          <CeoCard title="Current Risk Level" value="LOW" icon={<Activity />} highlight="safe" />
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={`glass-panel ${styles.healthCard}`}>
          <h3>Overall Security Health</h3>
          <div className={styles.healthScore}>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreText}>94%</span>
            </div>
            <div className={styles.healthStatus}>Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CeoCard = ({ title, value, icon, highlight }) => (
  <motion.div whileHover={{ scale: 1.02 }} className={`glass-panel ${styles.ceoCard} ${highlight ? styles[highlight] : ''}`}>
    <div className={styles.iconWrapper}>{icon}</div>
    <div className={styles.cardContent}>
      <h4>{title}</h4>
      <div className={styles.value}>{value}</div>
    </div>
  </motion.div>
);

export default Executive;
