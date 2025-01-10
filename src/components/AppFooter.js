import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.neonflake.com/" target="_blank" rel="noopener noreferrer">
          NeonFlake
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.neonflake.com/" target="_blank" rel="noopener noreferrer">
          NeonFlake Sklara 2024
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
