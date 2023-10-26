"use client"

import Dice from "@/components/Dice";
import { useState, useEffect } from "react";
import React from 'react'

import dynamic from 'next/dynamic'
 
const ConfettiComponent = dynamic(() => import('@/components/Confetti'), { ssr: false })


export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const generateDiceValues = () => {
    const valueArray = []
    for(let i = 0; i < 10; i++){
      valueArray.push({id: i, value: Math.ceil(Math.random()*6), locked: false})
    }
    return valueArray
  }

  const [diceState, setDiceState] = useState(generateDiceValues())

  useEffect(()=>{
    const firstLocked = diceState.find((dieState)=> dieState.locked === true)
    const areAllValuesSame = diceState.every((dieState)=> dieState.value === firstLocked?.value)
    if(areAllValuesSame){
      setShowConfetti(true)
      setNewGame(true)
    }
  },[diceState])


  const rollDice = () => {
    setShowConfetti(false)
    setNewGame(false)
    if(newGame){
      setDiceState(generateDiceValues)
    }else{
      setDiceState((prev)=>(prev.map((dieState)=>(
        dieState.locked ? dieState : {...dieState, value: Math.ceil(Math.random()*6)} 
    ))))
    }
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
    {showConfetti && <ConfettiComponent/>}
      <div className="game-container">
        <div className="dice-container">
          <h1>Tenzies</h1>
          <div className="dice-container2">
          {
            renderDices()
          }
          </div>
          <button className="roll-btn" onClick={()=>rollDice()}>{newGame ? "Start":"Roll"}</button>
        </div>
      </div>
    </main>
  )
}
