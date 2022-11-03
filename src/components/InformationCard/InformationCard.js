import React, { useEffect, useState } from 'react';
import './InformationCard.css';
import { useForm } from "react-hook-form";


const InformationCard = () => {

    const [id, setId] = useState("");

    const [paragraphOne, setParagraphOne] = useState("");
    const [paragraphTwo, setParagraphTwo] = useState("");
    const [paragraphThree, setParagraphThree] = useState("");

    useEffect(() => {
        fetch('https://snapwrite.herokuapp.com/data')
            .then(res => res.json())
            .then(data => {
                setId(data[0]?._id)
                setParagraphOne(data[0]?.paragraphOne)
                setParagraphTwo(data[0]?.paragraphTwo)
                setParagraphThree(data[0]?.paragraphThree)
            })
    }, [])

    const onChange = (e) => {
        const data = e.target.value
        const paragraphName = e.target.className;
        let newDoc;

        if(paragraphName === 'paragraphOne') {
            setParagraphOne(data); 
            newDoc = {id, paragraphOne: data, paragraphTwo, paragraphThree}
        } 
        else if(paragraphName === 'paragraphTwo') {
            setParagraphTwo(data); 
            newDoc = {id, paragraphOne, paragraphTwo: data, paragraphThree}
        } 
        else if(paragraphName === 'paragraphThree') {
            setParagraphThree(data); 
            newDoc = {id, paragraphOne, paragraphTwo, paragraphThree: data}
        }

        fetch('https://snapwrite.herokuapp.com/mod', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDoc)
        })
        .then(res => res.json())
        .then(data => console.log('Success', data))
        .catch((error) => {
            console.error('Error:', error);
          });

    }

    return (
        <div className='information-card'>
            <div className="text-heading">
                <p>Text Box</p>
            </div>
            <div className='body-texts'>
                <textarea className='paragraphOne' name="" id="" cols="75" rows="5" onChange={onChange} value={paragraphOne}></textarea>
                <br />
                <textarea className='paragraphTwo' name="" id="" cols="75" rows="5" onChange={onChange} value={paragraphTwo}></textarea>
                <br />
                <textarea className='paragraphThree' name="" id="" cols="75" rows="5" onChange={onChange} value={paragraphThree}></textarea>
                <hr />
            </div>
        </div>
    );
};

export default InformationCard;
