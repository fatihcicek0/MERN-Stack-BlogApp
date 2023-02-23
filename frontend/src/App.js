import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/Header';
import Layout from './pages/home/Layout';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import PostsByCategory from './pages/home/PostsByCategory';
import AddPost from './pages/user/AddPost';
import UserPosts from './pages/user/UserPosts';
import EditPost from './pages/user/EditPost';
import PostDetail from './pages/PostDetail/PostDetail';
import Footer from './components/Footer';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className="App" >
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path=':categoryName/:categoryId' element={<PostsByCategory />}></Route>
        </Route>
        <Route path='/post/:postId' element={<PostDetail />}></Route>
        <Route path='/add_post' element={<PrivateRoute><AddPost /></PrivateRoute>}></Route>
        <Route path='/user_post' element={<PrivateRoute><UserPosts /></PrivateRoute>}></Route>
        <Route path='/post/edit/:postId' element={<PrivateRoute><EditPost /></PrivateRoute>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}
export default App;
