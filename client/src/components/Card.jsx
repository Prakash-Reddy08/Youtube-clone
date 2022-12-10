import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'
import { instance } from '../utils/axios'
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState([])
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await instance.get(`/users/find/${video.userId}`)
      setChannel(res.data);
    }
    fetchChannel();
  }, [video.userId]);
  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "auto"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  max-width:300px ;
  cursor: pointer;
  justify-self:stretch ;
  border-radius:6% ;
  display: ${(props) => props.type === "sm" && "flex"};
`;

const Image = styled.img`
  width: 100%;
  border-radius:5% ;
  height: ${(props) => (props.type === "sm" ? "120px" : "167px")};
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  margin-left:7px ;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export default Card