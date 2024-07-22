import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  disabled: true,
  errorMsg: ''
};
const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ACCOUNT":
      return { ...state, balance: 500, disabled: false };
    case "LOAN":
      return {
        ...state,
        loan: state.loan ===0? action.payload : state.loan,
        balance: state.loan ===0?  state.balance + action.payload : state.balance,
      };
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      return { ...state, balance:state.balance>0 ? state.balance - action.payload : state.balance};
    case "PAY_LOAN":
      return { ...state, balance: state.balance - state.loan, loan: 0 };

      case "CLOSE_ACCOUNT":
          return {
              ...state,
              disabled: state.balance === 0 && state.loan === 0,
              errorMsg: state.balance > 0 || state.loan > 0 ? "Cannot close account with balance or loan." : false
          };
      
        
        
    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, disabled, loan, errorMsg} = state;
  return (
    <div className="App">
      <h1>UseReducer Bank Account 🏦</h1>
      <i>{errorMsg}</i>
      <p>Balance:${balance}</p>
      <p>Loan:${loan}</p>
      <button onClick={() => dispatch({ type: "OPEN_ACCOUNT" })} disabled={!disabled}>
        Open account
      </button>
      <button disabled={disabled} onClick={() => dispatch({ type: "DEPOSIT", payload:150 })}>
        Deposit 150
      </button>
      <button
        disabled={disabled}
        onClick={() => dispatch({ type: "WITHDRAW", payload:50})}
      >
        Withdraw 50
      </button>
      <button disabled={disabled} onClick={() => dispatch({ type: "LOAN", payload:5000 })}>
        Request a loan of 5000
      </button>
      <button
        disabled={disabled}
        onClick={() => dispatch({ type: "PAY_LOAN",})}
      >
        Pay a loan
      </button>
      <button disabled={disabled} onClick={()=>dispatch({type:'CLOSE_ACCOUNT'})}>Close account</button>
    </div>
  );
}

export default App;
