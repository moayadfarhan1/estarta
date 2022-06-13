import {createContext, useContext, useState, useMemo} from 'react';

const StoreContext = createContext();
export const StoreContextProvider = ({children}) => {
    const [filter, setFilter] = useState();
    return (
        <StoreContext.Provider value={{filter,setFilter}
        }>
            {children}
        </StoreContext.Provider>
    )
}
export default function useStore(){
    const store = useContext(StoreContext);
    return store;
}