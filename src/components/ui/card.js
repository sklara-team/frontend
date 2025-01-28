const Card = ({ className, ...props }) => {
  return <div className={`card ${className}`} {...props} />
}

const CardHeader = ({ className, ...props }) => {
  return <div className={`card-header ${className}`} {...props} />
}

const CardTitle = ({ className, ...props }) => {
  return <h3 className={`card-title ${className}`} {...props} />
}

const CardContent = ({ className, ...props }) => {
  return <div className={`card-content ${className}`} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
