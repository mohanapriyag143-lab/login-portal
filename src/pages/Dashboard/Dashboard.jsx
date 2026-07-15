import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Activity, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import { transactionData, riskDistribution, recentAlerts } from '../../mockData';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className="glow-text">Security Dashboard</h1>
        <div className={styles.lastUpdated}>
          <span className={styles.pulseDot}></span>
          Live Monitoring Active
        </div>
      </header>

      {/* Top Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard title="Today's Transactions" value="1.2M" icon={<Activity />} color="--accent-blue" />
        <StatCard title="Safe Transactions" value="1.18M" icon={<CheckCircle />} color="--safe-green" />
        <StatCard title="Blocked Fraud" value="15.4K" icon={<ShieldAlert />} color="--danger-red" />
        <StatCard title="Active Threats" value="128" icon={<AlertTriangle />} color="--warning-orange" />
      </div>

      {/* Charts Section */}
      <div className={styles.chartsGrid}>
        <div className={`glass-panel ${styles.chartCard} ${styles.span2}`}>
          <h3>Transaction & Fraud Trend (Live)</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--safe-green)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--safe-green)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--danger-red)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--danger-red)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--glass-border)' }} />
                <Area type="monotone" dataKey="safe" stroke="var(--safe-green)" fillOpacity={1} fill="url(#colorSafe)" />
                <Area type="monotone" dataKey="fraud" stroke="var(--danger-red)" fillOpacity={1} fill="url(#colorFraud)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`glass-panel ${styles.chartCard}`}>
          <h3>Risk Distribution</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--glass-border)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className={`glass-panel ${styles.tableCard}`}>
        <h3>Recent Security Alerts</h3>
        <table className={styles.alertsTable}>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Customer</th>
              <th>Attack Type</th>
              <th>Risk Level</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentAlerts.map((alert) => (
              <motion.tr 
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td>{alert.id}</td>
                <td>{alert.customer}</td>
                <td>{alert.type}</td>
                <td>
                  <span className={`${styles.riskBadge} ${styles[alert.risk.toLowerCase()]}`}>
                    {alert.risk}
                  </span>
                </td>
                <td>{alert.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`glass-panel ${styles.topStatCard}`}
    style={{ '--stat-color': `var(${color})` }}
  >
    <div className={styles.statIconWrapper}>{icon}</div>
    <div className={styles.statInfo}>
      <h4>{title}</h4>
      <div className={styles.statValue}>{value}</div>
    </div>
  </motion.div>
);

export default Dashboard;
