import { useState } from 'react';
import './CelebrityCard.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { generateAge } from '../../utils/constants';

const CelebrityCard = ({data, openedAccordion, handleShowDetails}) => {
    return(
        <div className="celebrity-card-wrapper" key={data?.id} onClick={()=>handleShowDetails(data?.id)}>
            <div className='celebrity-card-header'>
                <div className='celebrity-profile-details-section'>
                    <img src={data?.picture} alt='profile-pic' loading='lazy' className='celebrity-profile-pic'/>
                    <span className='celebrity-name'>{data?.first +" "+ data?.last}</span>
                </div>
                {
                    openedAccordion === data?.id 
                    ?
                    <FaAngleUp fill='#767679'/> 
                    :
                    <FaAngleDown fill='#767679'/> 
                }
            </div>
            <div className='celebrity-card-body' style={{display: openedAccordion === data?.id ? 'block' : 'none'}}>
                <div className='grid'>
                    <span className='grid-item celebrity-details-label'>Age</span>
                    <span className='grid-item celebrity-details-label'>Gender</span>
                    <span className='grid-item celebrity-details-label'>Country</span>
                    <span className='grid-item celebrity-details'>{generateAge(data?.dob)}</span>
                    <span className='grid-item celebrity-details'>{data?.gender}</span>
                    <span className='grid-item celebrity-details'>{data?.country}</span>
                </div>
                <div style={{margin:'10px 0px', display:'flex', flexDirection:'column'}}>
                    <span className='celebrity-details-label'>Description</span>
                    <span className='celebrity-details' style={{margin:'5px 0px'}}>
                        {data?.description}
                    </span>
                </div>
            </div>
            </div>
    )
}

export default CelebrityCard