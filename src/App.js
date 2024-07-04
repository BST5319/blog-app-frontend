import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Header from './components/header/Header';
import Contact from './components/contact/Contact';
import Home from "./components/home/Home";
import About from './components/about/About';
import Login from './components/login/Login';
import SignUp from "./components/signup/SignUp";
import Missing from "./components/404page/Missing";
import EditPost from "./components/home/EditPost";
import PostPage from "./components/home/PostPage";
import NewPost from "./components/home/NewPost";
import MyPosts from "./components/home/MyPosts";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from "./context/DataContext";




function App() {

  return (
    <>
      <DataProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
          <Route path="/myposts" element={<MyPosts />}></Route>
          <Route element={<PersistLogin />}>
            <Route path="/edit/:id" element={<EditPost />}></Route>
            <Route path="/post/newPost" element={<NewPost />}></Route>
            <Route path='*' element={<Missing />}></Route>
          </Route>
        </Routes>
      </DataProvider>

    </>
  );
}

export default App;
