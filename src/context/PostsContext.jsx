import { createContext, useState } from "react";

export const PostsContext = createContext()

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useState([])
    const [data, setData] = useState(false)

    return (
        <PostsContext.Provider value={{posts, setPosts, data, setData}}>
            {children}
        </PostsContext.Provider>
    )
}