import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './ImageCard.css'
import uploadIcon from '../../Images/uploadIcon.png'
import Spinner from 'react-bootstrap/Spinner';

const ImageCard = () => {

    const [id, setId] = useState('');
    const [imageURL, setImageURL] = useState('')

    const [imageVisible, setImageVisible] = useState(true)
    const [uploading, setUploading] = useState(false)

    const imageStorageKey = 'e173d65fb81685c62a9cce273af76eaf'

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();


    useEffect(() => {
        fetch('https://snapwrite.herokuapp.com/image')
        .then(res => res.json())
        .then(data => {
            setImageURL(data[0].imageURL)
            setId(data[0]._id)
        })
    }, [])


    const onSubmit = data => {

        setUploading(true)

        const formData = new FormData()
        const image = data.image[0]
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url

                    fetch('https://snapwrite.herokuapp.com/saveImage', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'Application/json',
                        },
                        body: JSON.stringify({ imageURL: img, id })

                    })
                        .then(res => res.json())
                        .then(data => {
                            setImageURL(img)
                            setUploading(false)        
                        })
                }
            })
    }


    function MouseOver(event) {
        setImageVisible(false)
    }
    function MouseOut(event) {
        setImageVisible(true)
    }

    return (
        <div onMouseOver={MouseOver} onMouseOut={MouseOut} className='image-container'>
            <div className='upload-card'>
                {imageURL && imageVisible && <img className='image' src={imageURL} alt="" />}
                <div>
                    <img className='upload-icon' src={uploadIcon} alt="" srcSet="" />
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <input className='upload-input' type="file" name="" id="" {...register("image", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        })} />
                        <p>PNG, JPEG Files Only</p>
                        <input className='upload-btn' type="submit" value="Upload" />
                        {uploading && <Spinner className='spinner' animation='border' variant='primary'></Spinner>}
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ImageCard;