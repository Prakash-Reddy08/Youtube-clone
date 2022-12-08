import React, { useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosPrivate, instance } from '../utils/axios';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../features/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../features/userSlice';

const Video = () => {
  const { currentUser } = useSelector(state => state.user);
  const { currentVideo, loading } = useSelector(state => state.video);
  const dispatch = useDispatch();

  const { id } = useParams()
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart())
        const video = await instance.get(`/videos/find/${id}`)
        const channel = await instance.get(`/users/find/${video.data.userId}`)
        setChannel(channel.data);
        dispatch(fetchSuccess(video.data))
      } catch (error) {
        dispatch(fetchFailure())
        console.log(error.response.data.message);
      }
    }
    fetchData();
  }, [id])

  const handleLike = async () => {
    await axiosPrivate.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }
  const handleDislike = async () => {
    await axiosPrivate.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSub = async () => {
    try {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axiosPrivate.put(`/users/unsub/${channel._id}`)
        : await axiosPrivate.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    }
    catch (error) {
      console.log(error.response.data.message);
    }
  };
  const url = process.env.REACT_APP_SERVER_URL.replace("/api", "")
  if (loading) {
    return <>
      Loading...
    </>
  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame controls><source src={url + currentVideo.videoUrl} /></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.disLikes?.includes(currentUser?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id)
            ? "SUBSCRIBED"
            : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
export default Video