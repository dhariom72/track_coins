
export const Control = (props) => {
    const {options, handleChange, selectedCoin } = props;
    
    const handleSelect = (event) => {
        handleChange(event.target.value)
    }
    
    return (<div>
        <select className="select" value={selectedCoin} name="coins_list" id="coins_list_id" onChange={handleSelect}>
            {
                options.map(option => {
                    return  <option value={option.code}>{option.code}</option> 
                })
            }
        </select>
    </div>)
}