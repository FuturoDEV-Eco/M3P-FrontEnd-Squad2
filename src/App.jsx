import Header from './components/Header';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className='main'>
      <Header />
      <section className='container'>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}

export default App;
