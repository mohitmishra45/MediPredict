import React from 'react'
import MedicalDashboard from './components/MedicalDashboard'
import ErrorBoundary from './components/ErrorBoundary'

import { Toaster } from 'react-hot-toast';
import InstallPrompt from './components/InstallPrompt';

const App = () => {
  return (
    <ErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <MedicalDashboard />
      <InstallPrompt />
    </ErrorBoundary>
  )
}

export default App