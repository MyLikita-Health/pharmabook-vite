"use client"

import { useSelector } from "react-redux"
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap"
import BackButton from "./BackButton"
import { MoreVertical } from "react-feather"
import './custom-card.css'

function CustomCard(props) {
  const {
    header,
    footer,
    back,
    headerRight,
    full_width,
    container,
    body,
    style,
    children,
    variant = "default",
    size = "md",
    borderless = false,
    shadow = "md",
    headerIcon,
    loading = false,
    collapsible = false,
    collapsed = false,
    onToggleCollapse,
  } = props

  const activeBusiness = useSelector((state) => state.app?.theme || {})
  const primaryColor = activeBusiness.primary_color || "#3b82f6"
  const secondaryColor = activeBusiness.secondary_color || "#ffffff"

  const getCardClasses = () => {
    let classes = "custom-card"

    classes += ` custom-card--${variant}`
    classes += ` custom-card--${size}`

    if (!borderless && shadow !== "none") {
      classes += ` custom-card--shadow-${shadow}`
    }

    if (borderless) {
      classes += " custom-card--borderless"
    }

    if (loading) {
      classes += " custom-card--loading"
    }

    if (collapsed) {
      classes += " custom-card--collapsed"
    }

    if (container) {
      classes += ` ${container}`
    }

    return classes
  }

  const getCardStyle = () => {
    const baseStyle = {
      ...style,
    }

    if (variant === "default" && !borderless) {
      baseStyle.borderColor = primaryColor
      baseStyle.borderWidth = "1px"
      baseStyle.borderStyle = "solid"
    }

    return baseStyle
  }

  const getHeaderStyle = () => {
    const headerStyle = {}

    switch (variant) {
      case "gradient":
        headerStyle.background = `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
        headerStyle.color = secondaryColor
        headerStyle.borderBottom = "none"
        break
      case "glass":
        headerStyle.background = "rgba(255, 255, 255, 0.1)"
        headerStyle.backdropFilter = "blur(10px)"
        headerStyle.borderBottom = "1px solid rgba(255, 255, 255, 0.2)"
        headerStyle.color = primaryColor
        break
      case "minimal":
        headerStyle.background = "transparent"
        headerStyle.borderBottom = `2px solid ${primaryColor}20`
        headerStyle.color = primaryColor
        break
      case "elevated":
        headerStyle.background = "#f8fafc"
        headerStyle.borderBottom = `1px solid #e2e8f0`
        headerStyle.color = primaryColor
        break
      default:
        headerStyle.borderBottom = `1px solid ${primaryColor}`
        headerStyle.color = primaryColor
        headerStyle.background = "transparent"
    }

    return headerStyle
  }

  const getFooterStyle = () => {
    const footerStyle = {}

    switch (variant) {
      case "gradient":
        footerStyle.background = `linear-gradient(135deg, ${primaryColor}dd, ${primaryColor})`
        footerStyle.color = secondaryColor
        footerStyle.borderTop = "none"
        break
      case "glass":
        footerStyle.background = "rgba(255, 255, 255, 0.1)"
        footerStyle.backdropFilter = "blur(10px)"
        footerStyle.borderTop = "1px solid rgba(255, 255, 255, 0.2)"
        footerStyle.color = primaryColor
        break
      case "minimal":
        footerStyle.background = "transparent"
        footerStyle.borderTop = `2px solid ${primaryColor}20`
        footerStyle.color = primaryColor
        break
      case "elevated":
        footerStyle.background = "#f8fafc"
        footerStyle.borderTop = `1px solid #e2e8f0`
        footerStyle.color = primaryColor
        break
      default:
        footerStyle.borderTop = `1px solid ${primaryColor}`
        footerStyle.backgroundColor = primaryColor
        footerStyle.color = secondaryColor
    }

    return footerStyle
  }

  return (
    <Card className={getCardClasses()} style={getCardStyle()}>
      {loading && (
        <div className="custom-card__loading-overlay">
          <div className="custom-card__loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {header && (
        <CardHeader className="custom-card__header" style={getHeaderStyle()}>
          {full_width ? (
            <Row className="custom-card__header-row">
              <Col className="custom-card__header-content">
                {headerIcon && <div className="custom-card__header-icon">{headerIcon}</div>}
                <div className="custom-card__header-text">{header}</div>
              </Col>
              {(headerRight || collapsible) && (
                <Col xs="auto" className="custom-card__header-actions">
                  {headerRight}
                  {collapsible && (
                    <button
                      className="custom-card__collapse-btn"
                      onClick={onToggleCollapse}
                      aria-label={collapsed ? "Expand card" : "Collapse card"}
                    >
                      <MoreVertical size={16} />
                    </button>
                  )}
                </Col>
              )}
            </Row>
          ) : (
            <Row className="custom-card__header-row">
              <Col xs="auto">
                {back && (
                  <BackButton size="sm" outline text="Go Back" className="custom-card__back-btn" />
                )}
              </Col>
              <Col className="custom-card__header-main">
                <div className="custom-card__header-content">
                  {headerIcon && <div className="custom-card__header-icon">{headerIcon}</div>}
                  <h5 className="custom-card__header-title">{header}</h5>
                </div>
              </Col>
              <Col xs="auto" className="custom-card__header-actions">
                {headerRight}
                {collapsible && (
                  <button
                    className="custom-card__collapse-btn"
                    onClick={onToggleCollapse}
                    aria-label={collapsed ? "Expand card" : "Collapse card"}
                  >
                    <MoreVertical size={16} />
                  </button>
                )}
              </Col>
            </Row>
          )}
        </CardHeader>
      )}

      <CardBody className={`custom-card__body ${body || ""} ${collapsed ? "custom-card__body--collapsed" : ""}`}>
        {children}
      </CardBody>

      {footer && !collapsed && (
        <CardFooter className="custom-card__footer" style={getFooterStyle()}>
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

export default CustomCard
