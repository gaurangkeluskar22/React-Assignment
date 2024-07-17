import { useState } from "react"
import {data} from '../../utils/constants'
import Celebrity from '../../Types/Celebrity'
import './HomePage.css'
import CelebrityCard from "../../Components/CelebrityCard/CelebrityCard"
import { HiMagnifyingGlass } from "react-icons/hi2";

const HomePage = () => {
    const [celebrityData, setCelebrityData] = useState<Celebrity[]>(data)
    const [openedAccordion, setOpenedAccordion] = useState(null)

    const handleShowDetails = (id : any) =>{
        setOpenedAccordion((prev : any)=>{
            return prev!== id ? id : null 
        })
    }

    const handleSearch = (e:any) =>{
        const value = e?.target?.value;
        setTimeout(()=>{
        if(value?.length){
        const searchData = data.filter((item)=> (item.first+" "+item.last).includes(value))
        setCelebrityData(searchData)
        }else{
            setCelebrityData(data)
        }
        },500)
    }
    return(
       <div className="celebrity-page-wrapper">
        <div className="celebrity-search-box-wrapper">
            <HiMagnifyingGlass fontSize="25" fill="#767679"/>
            <input type="text" placeholder="Search user" className="celebrity-search-box" onChange={(e)=>handleSearch(e)} />
        </div>
            <div>
                {
                    celebrityData?.map((item, index)=>{
                        return(
                            <CelebrityCard data={item} openedAccordion={openedAccordion} handleShowDetails={handleShowDetails}/>
                        )
                    })
                }
            </div>
       </div>
    )
}

export default HomePage