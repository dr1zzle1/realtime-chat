import { HashRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppRouter from './components/AppRouter';
import { Context } from './';
import { useContext } from 'react';
import Loader from './components/Loader';

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <HashRouter>
      <Navbar />
      <AppRouter />
    </HashRouter>
  );
}

export default App;
