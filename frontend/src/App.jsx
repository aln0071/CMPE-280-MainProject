import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import BlogEdit from './components/BlogDisplay/BlogEdit';
import BlogListing from './components/BlogListing/BlogListing';
import HompageListing from './components/BlogListing/HompageListing';
import Blog from './components/BlogDisplay/Blog';
import Profile from './components/Profile/Profile';
import './App.css';
import TopNavbar from './components/Utilities/TopNavbar';
import LoginForm from './components/Login/Login';
import RegisterForm from './components/Login/Register';
import EditProfile from './components/Profile/EditProfile';
import 'react-toastify/dist/ReactToastify.css';
import { MESSAGE_TYPE } from './reducers/message';

function App() {
  const navbarRef = React.useRef(null);
  const [offsetTop, setOffsetTop] = React.useState(0);
  React.useEffect(() => {
    if (navbarRef.current) {
      setOffsetTop(navbarRef.current.getBoundingClientRect().height);
    }
  }, [navbarRef]);
  const message = useSelector((state) => state.message);
  React.useEffect(() => {
    if (JSON.stringify(message) !== '{}') {
      switch (message.type) {
        case MESSAGE_TYPE.ERROR:
          toast.error(message.message);
          break;
        case MESSAGE_TYPE.SUCCESS:
          toast.success(message.message);
          break;
        case MESSAGE_TYPE.INFO:
          toast.info(message.message);
          break;
      }
    }
  }, [message]);
  return (
    <div>
      <TopNavbar navRef={navbarRef} />
      <Container
        style={{
          paddingTop: `${offsetTop}px`
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/createBlog" element={<BlogEdit />} />
          <Route path="/blogListing" element={<BlogListing />} />
          <Route path="/home" element={<HompageListing />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route exact path="/*" element={<Navigate to="/home" replace />} />
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
