import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogEdit from './Components/BlogEdit';
import BlogListing from './Components/BlogListing';
import HompageListing from './Components/HompageListing';
import './App.css';
import TopNavbar from "./Components/TopNavbar";
import Container from "react-bootstrap/esm/Container";

function App() {
  const navbarRef = React.useRef(null);
  const [offsetTop, setOffsetTop] = React.useState(0);
  React.useEffect(() => {
    if(navbarRef.current) {
      setOffsetTop(navbarRef.current.getBoundingClientRect().height)
    }
  }, [navbarRef])
  return (
    <div>
      <TopNavbar navRef={navbarRef} />
      <Container
        style={{
          paddingTop: `${offsetTop}px`
        }}
      >
        <Routes>
          <Route path="/createBlog" element={<BlogEdit />} />
          <Route path="/blogListing" element={<BlogListing />} />
          <Route path="/home" element={<HompageListing />} />
          <Route exact path="/" element={<BlogEdit />} />
          <Route exact element={Error} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
