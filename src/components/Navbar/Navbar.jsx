import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Map, Brain, Users, FileText } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Shield size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Activity size={18} /> },
    { name: 'Threat Map', path: '/threat-map', icon: <Map size={18} /> },
    { name: 'AI Analysis', path: '/analysis', icon: <Brain size={18} /> },
    { name: 'Digital Twin', path: '/digital-twin', icon: <Users size={18} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={18} /> }
  ];

  return (
    <nav className={`glass-panel ${styles.navbar}`}>
      <div className={styles.logo}>
        <Shield className={styles.logoIcon} size={24} />
        <span className={`glow-text ${styles.logoText}`}>SentinelAI</span>
      </div>
      
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.statusIndicator}>
          <div className={styles.pulseDot}></div>
          <span>System Active</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
