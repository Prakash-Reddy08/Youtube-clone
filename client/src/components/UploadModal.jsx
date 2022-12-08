import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { axiosFile } from '../utils/axios';

const UploadModal = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        const base64Image = await convertBase64(img)
        formData.append("videos", video)
        for (let key in inputs) {
            formData.append(key, inputs[key])
        }
        formData.append("imgUrl", base64Image)
        formData.append('tags', tags)
        const res = await axiosFile.post("/videos", formData, {
            onUploadProgress: (data) => {
                setVideoPerc(Math.round((data.loaded / data.total) * 100));
            }
        })
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPerc > 0 ? (
                    "Uploading:" + videoPerc
                ) : (
                    <Input
                        type="file"
                        accept=".mp4,.mkv"
                        name="videos"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                )}
                <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <Desc
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChange={handleTags}
                />
                <Label>Image:</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                />

                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

export default UploadModal