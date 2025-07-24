
import React from 'react';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendDirection = 'up',
  color = 'blue',
  animated = true 
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      text: 'text-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-200'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      text: 'text-green-600',
      light: 'bg-green-50',
      border: 'border-green-200'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-200'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      text: 'text-orange-600',
      light: 'bg-orange-50',
      border: 'border-orange-200'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`metric-card group ${animated ? 'animate-scale-in' : ''}`}>
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentColor.bg}`} />
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${currentColor.text} mb-2 group-hover:scale-105 transition-transform duration-200`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                trendDirection === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trendDirection === 'up' ? '↗' : '↘'} {trend}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`flex-shrink-0 w-12 h-12 ${currentColor.light} ${currentColor.border} border rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <div className={`text-xl ${currentColor.text}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
