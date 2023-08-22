import React from 'react';

const ATMDeposit = ({ onChange, isDeposit,atmModeexists,isvalid,totalState}) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    atmModeexists &&
    <label className="label huge">
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled = {!isvalid} className="mode-select"></input>
    </label>
  );
};

function App() {
  
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode,setAtmMode] = React.useState('')
  const [atmModeexists, setAtmModeExist] = React.useState(false)
  const [validTransaction, setValidTransaction] = React.useState(false);


  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (event.target.value <= 0){setValidTransaction(false)}
    
    if (atmMode === 'Cash Back' && event.target.value > totalState){
      setValidTransaction(false)
    }else{
      setValidTransaction(true)
    }
    
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    //setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (e) => {
    let mode = e.target.value
    setAtmMode(mode)
    if(mode === 'Deposit'){
      setIsDeposit(true)
      setAtmModeExist(true)
    }else if(mode === 'Cash Back'){
      setIsDeposit(false)
      setAtmModeExist(true)
    }else{
      setAtmModeExist(false)
    }

  }

  return (
    <form onSubmit={handleSubmit} id='form'>
      <h1 id="welcome">¡Welcome!</h1>
      <h2 id="total" className={totalState >= 10 ? 'green-text' : 'red-text'}>{status}</h2>
      <div>
        <label>Select a transaction</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" className="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
      </div>
      <div>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmModeexists = {atmModeexists} isvalid = {validTransaction} totalState = {totalState}></ATMDeposit>
      </div>
    </form>
  );
}

export default App
