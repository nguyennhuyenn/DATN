import { createContext, useState } from "react";

export const LoaderContext = createContext({} as { isLoader: boolean, setLoader: React.Dispatch<React.SetStateAction<boolean>> })

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoader, setLoader] = useState(false)
    return (
        <LoaderContext.Provider value={{ isLoader, setLoader }}>
            {children}
        </LoaderContext.Provider>
    )
}
export default LoaderProvider