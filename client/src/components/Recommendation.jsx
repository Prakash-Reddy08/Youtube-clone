import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { instance } from '../utils/axios';
import Card from './Card';

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await instance.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);
    return (
        <Container>
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    )
}
const Container = styled.div`
  flex: 2;
`;
export default Recommendation