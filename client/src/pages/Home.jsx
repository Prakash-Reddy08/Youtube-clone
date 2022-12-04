import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { instance } from '../utils/axios';

const Home = ({ type }) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchRandomVideos = async () => {
            const res = await instance.get(`/videos/${type}`)
            setVideos(res.data);
        }
        fetchRandomVideos();
    }, [type]);
    return (
        <Container>
            {
                videos.map((video) => {
                    return <Card key={video._id} video={video} />
                })
            }
        </Container>
    )
}

const Container = styled.div`
    display:grid ;
    grid-template-columns:repeat(auto-fit,minmax(240px,1fr)) ;
    gap: 1.4rem ;
    justify-items:center ;
    align-items:center ;
`
export default Home