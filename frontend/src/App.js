import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'





/*components */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';

/*pages */
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';

import Container from './components/layout/Container';

/**Context */
import { UserProvider } from './context/UserContext';
import Profile from './components/pages/User/Profile';
import MyAdmin from './components/pages/Imovel/MyAdmin';
//import AddImovel from './components/pages/Imovel/AddImovel';
import RegisterOwner from './components/pages/Owner/Register';
import DetailsImovel from './components/pages/ImovelDetails/DetailsImovel';
import ListaImoveis from './components/pages/ImovelDetails/ListaImoveis';
import EditImovel from './components/pages/Imovel/EditImovel';
import Contato from './components/layout/Contato';

//<Route path="/imovel/addimoveis" element={<AddImovel/>} />

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message />
      <Container>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contato" element={<Contato />} />


          <Route path="/imovel/myadmin" element={<MyAdmin />} />  
          
          <Route path="/imovel/listaimoveis" element={<ListaImoveis/>} />

          <Route path="/imovel/edit/:id" element={<EditImovel/>} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="anunciar/sinup-owner" element={<RegisterOwner />} />
          <Route path="/imoveldetails/:id" element={< DetailsImovel/>} />
          <Route path="/" element={<Home />} />
      </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;




