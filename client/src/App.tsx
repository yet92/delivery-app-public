import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useRoutes } from './routes';
import { Navbar } from './components/Navbar';

function App() {

  const routes = useRoutes();

  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </>
  )
}

export default App
