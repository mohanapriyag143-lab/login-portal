export const transactionData = [
  { time: '08:00', safe: 4000, blocked: 240, fraud: 12 },
  { time: '10:00', safe: 3000, blocked: 139, fraud: 20 },
  { time: '12:00', safe: 2000, blocked: 980, fraud: 120 },
  { time: '14:00', safe: 2780, blocked: 390, fraud: 45 },
  { time: '16:00', safe: 1890, blocked: 480, fraud: 80 },
  { time: '18:00', safe: 2390, blocked: 380, fraud: 35 },
  { time: '20:00', safe: 3490, blocked: 430, fraud: 40 },
];

export const riskDistribution = [
  { name: 'Low Risk', value: 85, color: '#00FF66' },
  { name: 'Medium Risk', value: 10, color: '#FF9900' },
  { name: 'High Risk', value: 3, color: '#FF3366' },
  { name: 'Critical', value: 2, color: '#990033' },
];

export const recentAlerts = [
  { id: 'AL-901', customer: 'John Doe', type: 'Impossible Travel', risk: 'Critical', time: '2m ago' },
  { id: 'AL-902', customer: 'Alice Smith', type: 'Multiple Failed Logins', risk: 'High', time: '15m ago' },
  { id: 'AL-903', customer: 'Bob Jones', type: 'New Device', risk: 'Medium', time: '1h ago' },
  { id: 'AL-904', customer: 'Charlie Brown', type: 'VPN Detected', risk: 'Low', time: '2h ago' },
];
