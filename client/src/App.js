import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import Search from './pages/Search';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container toggleMenu={toggleMenu}>
        <BrowserRouter>
          <MenuBar toggleMenu={toggleMenu}>
            <Menu darkMode={darkMode} setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} setDarkMode={setDarkMode} />
          </MenuBar>
          <Main>
            <Navbar setToggleMenu={setToggleMenu} />
            <Wrapper>
              <Routes>
                <Route>
                  <Route index element={<Home type={"random"} />} />
                  <Route path='trends' element={<Home type="trend" />} />
                  <Route path='subscriptions' element={<Home type="sub" />} />
                  <Route path='search' element={<Search />} />
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='video' >
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}
const MenuBar = styled.div`
`
const Container = styled.div`
  display: flex;
  @media (max-width:1100px){
    ${MenuBar}{
      display:${({ toggleMenu }) => toggleMenu ? "flex" : "none"} ;
      position:fixed;
      z-index:3 ;
    }
  }
`
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
  padding: 26px;
`
export default App;