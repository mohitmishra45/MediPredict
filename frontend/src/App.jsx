import React from 'react'
import MedicalDashboard from './components/MedicalDashboard'
import ErrorBoundary from './components/ErrorBoundary'

import InstallPrompt from './components/InstallPrompt'

const App = () => {
  return (
    <ErrorBoundary>
      <MedicalDashboard />
      <InstallPrompt />
    </ErrorBoundary>
  )
}

export default App