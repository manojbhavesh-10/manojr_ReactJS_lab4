import { useEffect, useState } from "react";
import IDataList from "../models/IDataList";
import { getDataFromServer } from "../services/DataService";
import ExpenseTracker from "./ExpenseTracker";

const ShowList = () => {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number>(0);

    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    let totalRahulSpent = 0;
    let totalRameshSpent = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataFromServer()
                setItems(data);
                setSum(data.reduce((result, user) => result = result +user.price, 0));
                shares(data);
            } catch(error: any) {
                setError(error);
            }
        }
        fetchData()
    })

    const shares = (data : IDataList[]) => {
            data.map(
                each => (
                    each.payeeName === "Rahul" ? (
                        totalRahulSpent += each.price
                ) : (
                        totalRameshSpent += each.price
                )
            )
       )
       setRahulSpent(totalRahulSpent);
       setRameshSpent(totalRameshSpent);
    }

    const success = () => {
        setShowForm(false)
      }
    
      const cancel = () => {
        setShowForm(false);
      }

    return ( 
        <>
           <header id="page-Header">Expense Tracker</header> 
           <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>

           {
            showForm && (
                <div className="form">
                    <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
                </div>
            )
           }

           <div className="use-inline date header-color">Date</div>
           <div className="use-inline header-color">Product Purchased</div>
           <div className="use-inline price header-color">Price</div>
           <div className="use-inline header-color">Payee</div>
           
           {
                items && (
                    items.map(
                        ({id, product, price, payeeName, setDate}, index) => (
                            <div key={index}>
                                <div className="use-inline date">{setDate}</div>
                                <div className="use-inline">{product}</div>
                                <div className="use-inline price">{price}</div>
                                <div className="use-inline">{payeeName}</div>
                            </div>
                        )    
                    )
                )
            }
            <hr />
            <div className="use-inline">Total Sum</div>
            <div className="use-inline total">{sum}</div><hr />
            <div className="use-inline">Total Rahul spent</div>
            <div className="use-inline total Rahul">{rahulSpent}</div><hr />
            <div className="use-inline">Total ramesh spent</div>
            <div className="use-inline total Ramesh">{rameshSpent}</div><hr />
            <div className="use-inline payable">{rahulSpent > rameshSpent ? "Pay rahul" : "Pay ramesh"}</div>
            <div className="use-inline payabel price">{Math.abs( (rahulSpent - rameshSpent) / 2)}</div>

            {
                error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>  
    );
}
 
export default ShowList;