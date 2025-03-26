import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import Public from './pages/Public'
import Protected from './components/Protected'
import Layout from './components/Layout'

const Assistant = lazy(() => import('./pages/Assistant'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="assistant" element={<Protected />}>
          <Route index element={<Assistant />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
