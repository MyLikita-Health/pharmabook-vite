"use client"
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap"
import "./widget-style.css"

const Widget = ({ title, value, icon, color = "primary", trend, subtitle, className = "", onClick }) => {
  return (
    <Card
      className={`widget-card widget-${color} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <CardBody className="widget-body">
        <div className="widget-content">
          <div className="widget-info">
            <CardTitle className="widget-title">{title}</CardTitle>
            <div className="widget-value">{value}</div>
            {subtitle && <CardText className="widget-subtitle">{subtitle}</CardText>}
            {trend && (
              <Badge color={trend.startsWith("+") ? "success" : "danger"} className="widget-trend">
                <i className={`fas fa-arrow-${trend.startsWith("+") ? "up" : "down"} mr-1`}></i>
                {trend}
              </Badge>
            )}
          </div>
          <div className="widget-icon">
            <i className={icon}></i>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Widget
