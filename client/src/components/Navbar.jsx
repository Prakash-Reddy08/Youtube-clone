import React, { useState } from 'react'
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import UploadModal from './UploadModal';
const Navbar = ({ setToggleMenu }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <>
      <Container>
        <Wrapper>
          <HamMenu>
            <MenuIcon onClick={() => setToggleMenu(true)} />
          </HamMenu>
          <Search>
            <Input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search/?q=${query}`)} />
          </Search>
          {currentUser ?
            (<User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar />
              {currentUser.name}
            </User>)
            : <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>}
        </Wrapper>
      </Container>
      {open && <UploadModal setOpen={setOpen} />}
    </>
  )
}

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const HamMenu = styled.div`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`

const Search = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  `;

const Input = styled.input`
  width:100% ;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  ${HamMenu}{
    display:none ;
  }
  @media (max-width: 1100px){
    ${HamMenu}{
      display:block ;
    }
  }
`;
export default Navbar