import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCoins } from "./store/coins.slice"
import { Layout } from "./components/Layout"

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCoins());
    }, [])

    return (
       <Routes>
            <Route path="/" element={<Layout/>}></Route>
       </Routes>
    )
}