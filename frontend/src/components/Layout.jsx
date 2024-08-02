import { useDispatch, useSelector } from "react-redux"
import { Control } from "./Control"
import { Table } from "./Table"
import { Modal } from './Modal'
import { getCoinsSelector, setSelectedCoin } from "../store/coins.slice"
import { fetchHistory, getHistorySelector } from "../store/history.slice"
import { useEffect, useState } from 'react'

let pollingInterval = null;

export const Layout = () => {
    const dispatch = useDispatch();
    const { data, loading, selectedCoin } = useSelector(getCoinsSelector);
    const history = useSelector(getHistorySelector);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        if(data && data.length){
            dispatch(setSelectedCoin(data[0].code));
        }
    }, [data])

    useEffect(() => {
        if(selectedCoin){
            function init(){
                dispatch(fetchHistory(selectedCoin))
            }

            init()
        
            // Set up polling
            pollingInterval = setInterval(init, 2000);
        }
        // Cleanup on component unmount
        return () => clearInterval(pollingInterval);
    }, [selectedCoin]);

    const handleChange = (coin) => {
        dispatch(setSelectedCoin(coin));
        handleCloseModal();
    }

    return (
        <main className="main">
            { loading ? "loading..." :
                <>  
                    <div className="header">
                        <h3>Track Coins</h3>
                        <button onClick={handleOpenModal}>Select coin</button>
                    </div>
                    <Table data={history}/>
                </> 
            }
            <Modal show={showModal} onClose={handleCloseModal}>
                <Control options={data} handleChange={handleChange} selectedCoin={selectedCoin}/>
            </Modal>
        </main>
    )
}