import {Component, ChangeEvent, FormEvent} from "react";
import { pushDataToServer } from "../services/DataService";

type Props = {
    onTrue: any,
    onClose : any
}

type State = {
    payeeName : string,
    product : string,
    price : number,
    setDate : string
}


class ExpenseTracker extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            payeeName: "",
            product : "",
            price : 0,
            setDate: this.setDefaultDate()
        }

        this.setPayee = this.setPayee.bind(this)
        this.setProduct = this.setProduct.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.entryDate = this.entryDate.bind(this)
    }

    setDefaultDate = () => {
        const today = new Date();
        return today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    }

    setPayee = ( event : ChangeEvent<HTMLSelectElement> ) => {
        this.setState({
            payeeName: event.target.value
        })
    }

    setProduct = ( event : ChangeEvent<HTMLInputElement> ) => {
        this.setState({
            product: event.target.value
        })
    }

    setPrice = ( event : ChangeEvent<HTMLInputElement> ) => {
        this.setState({
            price: parseInt(event.target.value) 
        })
    }

    entryDate = ( event : ChangeEvent<HTMLInputElement> ) => {
        this.setState({
            setDate: event.target.value
        })
    }

    submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const finalData = {
            ...this.state
        }

        const res = await pushDataToServer(finalData)
        this.props.onTrue()
    }


    render() {
        const element = (
            <>
                <section>
                    <header>
                        <h1>Add New Item</h1>
                        <p>Read the below Instruction Before Proceeding</p>
                        <p>Make sure you fill all the fields where * is provided</p>
                    </header>
                    <form onSubmit={this.submitForm}>
                        <article>
                            <p>Name</p>
                            <select name="Name" id="" required value={this.state.payeeName} onChange={this.setPayee}>
                                <option value="" defaultChecked>Choose</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Ramesh">Ramesh</option>
                            </select>
                        </article> 

                        <article>
                            <p>Product Purchased</p>
                            <input type="text" required value={this.state.product} onChange={this.setProduct}/>
                        </article> 

                        <article>
                            <p>Price</p>
                            <input type="number" required value={this.state.price} onChange={this.setPrice}/>
                        </article>

                        <article>
                            <p>Date</p>
                            <input type="date" required value={this.state.setDate} onChange={this.entryDate}/>
                        </article>

                        <button className="form-button">Submit</button>
                        <button className="form-button" onClick={this.props.onClose}>Cancel</button>
                        



                    </form>
                </section>
            </>
        )
        return element;
    }
}
 
export default ExpenseTracker;