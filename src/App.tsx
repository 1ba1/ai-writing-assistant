import { Route, Routes } from 'react-router'
import Public from './pages/Public'
import Assistant from './pages/Assistant'
import Protected from './components/Protected'
import Layout from './components/Layout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="assistant" element={<Protected />}>
          <Route index element={<Assistant />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
