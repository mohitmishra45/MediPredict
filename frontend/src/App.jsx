import React from 'react'
import MedicalDashboard from './components/MedicalDashboard'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <MedicalDashboard />
    </ErrorBoundary>
  )
}

export default App