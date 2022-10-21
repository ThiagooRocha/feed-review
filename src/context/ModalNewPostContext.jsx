import { createContext, useState } from "react";

export const ModalNewPostContext = createContext()

export const ModalNewPostProvider = ({children}) => {
    const [modalPost, setModalPost] = useState(false)

    return (
        <ModalNewPostContext.Provider value={{modalPost, setModalPost}}>
            {children}
        </ModalNewPostContext.Provider>
    )
}