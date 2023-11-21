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
const[searchedResults,setSearchedResults]=useState(null)
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

// const handleSearchChange=(e)=>{
//     clearTimeout(searchTimeout)
//     setSearchText(e.target.value);
// setSearchTimeout(
    
//     setTimeout(()=>{
//         const searchResults=allPost.filter((item)=>item.name.toLowerCase()
//         .includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes
//         (searchText.toLowerCase()))

//         setSearchedResults(searchResults)
//     },500)
// )
// }
console.log(allPosts)
  return (
<>
<>


<section className='sec' >
    <div>
        <h1>
            The Community Showcase
        </h1>
       
    </div>
  
    {/* <div className="Inputpair">
            <input
              className="Input inplg"
              type="text"
              name="text"
              placeholder="Search posts"
              value={searchText}
              handleChange={handleSearchChange}
            />
          
          </div> */}
    <div  className="cardbg comcard  ">
{
    allPosts.map((get)=>{
       return <CommunityCard get={get}/>
        // console.log(get)
    })
}
    </div>
</section>
</>
</>  )
}

export default Post