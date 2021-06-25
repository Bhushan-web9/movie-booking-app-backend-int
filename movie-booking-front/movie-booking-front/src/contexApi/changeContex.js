import React,{useState,createContext} from 'react';

export const changeContext=createContext();

export const GlobalContext=(props)=>{

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [isOpenModal,setIsOpenModal]=useState(false);

    return(
        <div>
            <changeContext.Provider value={{isLoggedIn,setIsLoggedIn,isOpenModal,setIsOpenModal}}>
            {props.children}

            </changeContext.Provider>
        </div>
    )
}


