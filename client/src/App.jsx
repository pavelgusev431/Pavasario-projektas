import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Home from './components/layout/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
