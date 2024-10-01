import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className='main'>
      <section className='container'>
        <Header />
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}

export default App;
