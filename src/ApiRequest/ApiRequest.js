import axios from "axios";


// const API = axios.create({baseURL:'http://localhost:5000'})

const API = axios.create({baseURL:'https://recipe-application-backend.onrender.com/'})

//Athentication-folder
export const login=(values)=>API.post(`/auth/login`,values)
export const registerUser=(values)=>API.post(`/auth/register`,values)


//Home-folder
export const getUser=(userId)=>API.get(`/user/getuser/${userId}`)

//Profile-folder
export const getPost=()=>API.get(`/recipe/get_all_recipe`)

export const removeImage=(userId,sendData)=> API.put(`/user/removeimg/${userId}`,sendData);
export const UpdateUser=(userId,formData)=>API.put(`/user/update/${userId}`,formData)


export const createRecipe=(values)=>API.post(`/recipe/create`,values)
export const editRecipe=(_id,values)=>API.put(`/recipe/update/${_id}`,values)
export const dltRecipe=(_id)=>API.delete(`/recipe/delete/${_id}`)



export const getUserRecipeOnly=(userId)=>API.get(`/recipe/get_user_recipe/${userId}`)