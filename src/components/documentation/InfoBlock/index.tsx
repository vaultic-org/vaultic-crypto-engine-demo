import { InfoBlockProps } from '../types';
import { CheckCircle, AlertTriangle, Lock } from 'lucide-react';

const iconMap = {
  green: <CheckCircle size={28} strokeWidth={2.2} className="text-green-400 shrink-0" />, // Security
  yellow: <AlertTriangle size={28} strokeWidth={2.2} className="text-yellow-400 shrink-0" />, // Warning
  blue: <Lock size={28} strokeWidth={2.2} className="text-blue-400 shrink-0" />, // Best practices
};

export const InfoBlock = ({ color, title, children }: InfoBlockProps) => (
  <div
    className="feature-card-modern flex items-start gap-4 p-5 mb-6 border-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-lg"
    style={{ borderLeft: `5px solid var(--tw-${color}-400, ${color})` }}
  >
    <div className="mt-1">{iconMap[color]}</div>
    <div>
      <h3 className={`font-semibold text-${color}-400 mb-1 text-lg`}>{title}</h3>
      <div className="text-gray-200 text-base leading-relaxed">{children}</div>
    </div>
  </div>
);

export default InfoBlock; 