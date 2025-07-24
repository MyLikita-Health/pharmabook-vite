function Scrollbar(props) {
  const { children, height } = props
  return (
    <div className="bg-light" {...props} style={{ min: '50vh', maxHeight: height ? height : '65vh', overflow: 'scroll', margin: 0, padding: 0 }}>
      {children}
    </div>
  )
}

export default Scrollbar
