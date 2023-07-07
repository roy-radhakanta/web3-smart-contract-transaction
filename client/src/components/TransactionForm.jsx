import React, { useContext } from "react";
import "./comp.css";
import { TransactionContext } from "../context/TransactionContext";

export default function TransactionForm() {
    const {connectToAccount, connectedAccount, formData, setFormData, handleFormChange, sendTransaction } = useContext(TransactionContext);
    function handleChange(e){
        const name  =e.target.name;
        handleFormChange(e, name);
    }
    function handleSubmit(e){
       const {addressTo, amount, keyword, message} = formData;
    //    console.log(formData)
       e.preventDefault();
       if(!addressTo || !amount || !keyword || !message)  return;
       sendTransaction();
    }
  return (
    <div className="bg-white dark:bg-slate-800 m-3 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl p-5 sm:w-96 w-full flex flex-col blue-glassmorphism  border-[1px] rounded-xl bg-white rounded-xl shadow-lg border-[#2952e3]">
      <input placeholder="Enter address" className="my-1.5 rounded-2xl p-2" type="text" name="addressTo"  onChange={handleChange} />
      <input placeholder="Enter amount " className="my-1.5 rounded-2xl p-2" type="text" name="amount"  onChange={handleChange} />
      <input placeholder="Enter keyword " className="my-1.5 rounded-2xl p-2" type="text" name="keyword"  onChange={handleChange} />
      <input placeholder="Enter message " className="my-1.5 rounded-2xl p-2" type="text" name="message"  onChange={handleChange} />
      <button onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 bg-[#2952e3]
hover:bg-[#2546db] border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>
    </div>
  );
}
