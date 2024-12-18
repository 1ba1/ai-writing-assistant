import { Route, Routes } from 'react-router'
import Public from './pages/Public'
import Assistant from './pages/Assistant'
import Protected from './components/Protected'

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Public />} />
        <Route path="assistant" element={<Protected />}>
          <Route index element={<Assistant />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
