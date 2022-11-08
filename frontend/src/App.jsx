import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import BlogEdit from './Components/BlogEdit';
import BlogListing from './Components/BlogListing';
import HompageListing from './Components/HompageListing';
import Blog from './Components/BlogDisplay/Blog';
import './App.css';
import TopNavbar from './Components/TopNavbar';
import LoginForm from './Components/Login/Login';
import RegisterForm from './Components/Login/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navbarRef = React.useRef(null);
  const [offsetTop, setOffsetTop] = React.useState(0);
  React.useEffect(() => {
    if (navbarRef.current) {
      setOffsetTop(navbarRef.current.getBoundingClientRect().height);
    }
  }, [navbarRef]);
  return (
    <div>
      <TopNavbar navRef={navbarRef} />
      <Container
        style={{
          paddingTop: `${offsetTop}px`
        }}>
        <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/createBlog" element={<BlogEdit />} />
          <Route exact path="/blogListing" element={<BlogListing />} />
          <Route exact path="/home" element={<HompageListing />} />
          <Route exact path="/blog/:id" element={<Blog />} />
          <Route path="/*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
