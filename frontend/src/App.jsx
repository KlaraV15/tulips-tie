import './App.css'
import {BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom'
import { Button } from "@/Components/ui/button"
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='' element={<Button>Button test</Button>}></Route>
      </Routes>


    </Router>
    </>
  )
}

export default App
