import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { axiosPrivate } from '../utils/axios';

const Home = ({ type }) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchRandomVideos = async () => {
            try {
                const res = await axiosPrivate.get(`/videos/${type}`)
                setVideos(res.data);
            }
            catch (error) {
                console.log(error.data.message);
            }
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