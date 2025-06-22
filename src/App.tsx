import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import useUser from './hooks/useUser';
import Movies from './components/Movies';
import Favorites from './components/Favorites';
import EditUser from './components/EditUser';
import PageNotFound from './components/Pnf';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import About from './components/About';
import BecomeCreator from './components/BecomeCreator';
import Profile from './components/Profile';
import Market from './components/Market';
import { getStorageUser } from './services/userService';
import TransitionPage from './components/smallComp/TransitionPage';
import AdminChat from './components/AdminChat';

function App() {
  const userData = useSelector((state: RootState) => state.usersState.currentUser);
  const { user } = useUser()
  const storedUser = getStorageUser()
  return (
    <div className="App" style={storedUser.theme && { backgroundImage: `url(${storedUser.theme.src})` }}>
      <ToastContainer />
      <Router>
        <Navbar userData={user} />
        <Sidebar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/editUser/:userId' element={<EditUser />} />
          <Route path='/editMovie/:movieId' element={<EditMovie />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/market' element={<Market />} />
          <Route path='/about' element={<About />} />
          <Route path="/transition" element={<TransitionPage message='' />} />

          <Route path='/favorites' element={<Favorites />} />
          <Route path='/addMovie' element={<AddMovie />} />
          <Route path='/becomeCreator' element={<BecomeCreator />} />
          <Route path='/chat' element={<AdminChat />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
