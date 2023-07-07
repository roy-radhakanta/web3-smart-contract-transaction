import React, {useContext} from 'react'
import "./comp.css";
import { TransactionContext } from '../context/TransactionContext'

export default function Header() {
    const {connectToAccount, connectedAccount} = useContext(TransactionContext);

  return (
    <div className='maindiv'>
       {!connectedAccount ?  <button onClick={connectToAccount} className='bg-[#2952e3] py-2 px-7 rounded-full text-white hover:bg-[#2546db]'>Connect to wallet</button> : "Your account is --> "+connectedAccount}
    </div>
  )
}

