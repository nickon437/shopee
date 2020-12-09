import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';  
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
