import React, { createContext, useEffect, useState } from "react";
// import { getUser } from "./api/ChatRequest";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [forLoad, setForLoad] = useState("");
  const [data,setData]=useState([])


  // const[overAllCondition,setOverAllCondition]=useState([])

 

  
  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
        searchUser,
        setSearchUser,
        setForLoad,
        forLoad,
        data,
        setData
        // overAllCondition,
        // setOverAllCondition
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
