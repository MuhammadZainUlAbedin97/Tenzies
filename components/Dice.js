"use client"

import { useState, useEffect } from 'react'

export default function Dice(props){
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
    return(
        isClient &&
        <div className={props.count.locked ? "green-dice":"dice"} onClick={()=>props.lockDice(props.count.id)}>
            {props.count.value}
        </div>
    )
}