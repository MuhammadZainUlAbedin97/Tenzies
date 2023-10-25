"use client"

import Dice from "@/components/Dice";
import { useState, useEffect } from "react";
import React from 'react'

import dynamic from 'next/dynamic'
 
const ConfettiComponent = dynamic(() => import('@/components/Confetti'), { ssr: false })


export default function Home() {
  const generateDiceValues = () => {
    const valueArray = []
    for(let i = 0; i < 10; i++){
      valueArray.push({id: i, value: Math.ceil(Math.random()*6), locked: false})
    }
    return valueArray
  }

  const [diceState, setDiceState] = useState(generateDiceValues())

  const rollDice = () => {
    setDiceState((prev)=>(prev.map((dieState)=>(
      dieState.locked ? dieState : {...dieState, value: Math.ceil(Math.random()*6)} 
    ))))
  }

  const renderDices = () => {
    const diceArray = []
    for(let i = 0; i < 10; i++){
      diceArray.push(<Dice key={i} count={diceState[i]} lockDice={lockDice}/>)
    }
    return diceArray
  }

  const lockDice = (id) => {
    setDiceState((prev)=>prev.map((dieState)=>{
      if(dieState.id === id){
        return {...dieState, locked: !dieState.locked}
      }else{
        return dieState
      }
    }))
  }
  return (
    <main className="main-container">
    <ConfettiComponent/>
      <div className="game-container">
        <div className="dice-container">
          <h1>Tenzies</h1>
          <div className="dice-container2">
          {
            renderDices()
          }
          </div>
          <button className="roll-btn" onClick={()=>rollDice()}>Roll</button>
        </div>
      </div>
    </main>
  )
}
