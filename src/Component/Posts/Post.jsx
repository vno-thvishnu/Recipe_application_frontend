import React, { useEffect, useState } from 'react'
import Card from '../ProfileModel/Card'
import { getPost } from '../../ApiRequest/ApiRequest';
import { Link } from 'react-router-dom'
import CommunityCard from './CommunityCard';



const Post=()=> {
const[allPosts,setAllPosts]=useState([])

const [loading,setLoading]=useState(false)
// const [allPost,setAllPost]=useState(null)

const[searchText,setSearchText]=useState("")
const[searchedResults,setSearchedResults]=useState([])
const[searchTimeout,setSearchTimeout]=useState(null)
useEffect(()=>{
    const getallpost =async()=>{
        try {
            const getting = await getPost();
            setAllPosts(getting.data.reverse())
            
        } catch (error) {
            
        }
    };
    getallpost()
},[]);

const handleSearchChange=(e)=>{
    // console.log(e.target.value)

    clearTimeout(searchTimeout)
    setSearchText(e.target.value);
setSearchTimeout(
    
    setTimeout(()=>{
        const searchResults=allPosts.filter((item)=>item.title.toLowerCase()
        .includes(searchText.toLowerCase()) || item.userName.toLowerCase().includes
        (searchText.toLowerCase()))
        setSearchedResults(searchResults)
    },500)
)
}
// console.log(allPosts)
  return (
<>
<>


<section className='sec' >
    {/* <div>
        <h1>
            The Community Showcase
        </h1>
       
    </div>
   */}
    <div className="Inputpair">
            <input
              className="Input inplg"
              type="text"
              name="text"
              placeholder="Search recipe's or people"
            //   value={searchText}
              onChange={handleSearchChange}
            />
          
          </div>
    <div  className="cardbg comcard  ">
{/* {
    allPosts.map((get)=>{
       return <CommunityCard get={get}/>
    })
} */}

{searchText?(
     <>
      {
            searchedResults.map((get)=>{
                return <CommunityCard get={get}/>
             })
           }
     </>
    ):(
      <>
       {
        allPosts.map((get)=>{
            return <CommunityCard get={get}/>
         })
       }
      </>
    )}
    </div>
</section>
</>
</>  )
}

export default Post