import styled from "styled-components"
import logo from '../img/youtube-logo-2431.svg'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'; import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Menu = ({ setDarkMode, darkMode, setToggleMenu, toggleMenu }) => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <Container>
            <Wrapper>
                <Top toggleMenu={toggleMenu}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Logo>
                            <Img src={logo} />
                            Youtube
                        </Logo>
                    </Link>
                    {toggleMenu && <KeyboardArrowLeftIcon onClick={() => setToggleMenu(false)} style={{ cursor: "pointer" }} />}
                </Top>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                {currentUser && <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>}
                <Hr />
                <Item>
                    <VideoLibraryOutlinedIcon />
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                {!currentUser && <><Login>
                    Sign in to like videos, comment, and subscribe
                    <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
                        <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
                    </Link>
                </Login>
                    <Hr /></>}
                <Title>
                    BEST OF YOUTUBE
                </Title>
                <Item>
                    <LibraryMusicOutlinedIcon />
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlinedIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon />
                    Gaming
                </Item>
                <Item>
                    <MovieOutlinedIcon />
                    Movies
                </Item>
                <Item>
                    <ArticleOutlinedIcon />
                    News
                </Item>
                <Item>
                    <LiveTvOutlinedIcon />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <FlagOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(prev => !prev)}>
                    <SettingsBrightnessOutlinedIcon />
                    {darkMode ? "Light Theme" : "Dark Theme"}
                </Item>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    flex:1.3;
    background-color:${({ theme }) => theme.bg} ;
    height:100vh ;
    width:200px ;
    color:${({ theme }) => theme.text} ;
    font-size:14px ;
    position:sticky ;
    top:0 ;
    overflow-y:scroll ;
`
const Top = styled.div`
    display:flex ;
    flex-direction:${({ toggleMenu }) => toggleMenu && "row-reverse"} ;
    justify-content:space-between;
`
const Wrapper = styled.div`
   padding:18px 26px ;
`
const Logo = styled.div`
    display:flex ;
    align-items:center;
    gap:5px;
    font-weight:bold ;
    margin-bottom: 25px;
`
const Img = styled.img`
    height: 25px;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    gap:20px;
    cursor: pointer;
    padding:7.5px 0 ;

    &:hover{
        background-color:${({ theme }) => theme.soft} ;
    }
`
const Hr = styled.hr`
    margin:15px 0 ;
    border:0.5px solid ${({ theme }) => theme.soft} ;
`
const Login = styled.div``
const Button = styled.button`
    padding:5px 15px ;
    background-color:transparent ;
    border:1px solid #3ea6ff ;
    color:#3ea6ff ;
    border-radius:3px ;
    font-weight:500 ;
    margin-top:10px ;
    cursor: pointer;
    display:flex ;
    align-items:center ;
    gap:5px
`
const Title = styled.h2`
    font-size:14px ;
    font-weight:500 ;
    color:#aaaaaa;
    margin-bottom:20px ;
`
export default Menu