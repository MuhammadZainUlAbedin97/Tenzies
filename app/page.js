import Dice from "@/components/Dice";

export default function Home() {
  
  const renderDices = () => {
    const diceArray = []
    for(let i = 1; i <= 10; i++){
      const randomNumber = Math.ceil(Math.random()*6)
      diceArray.push(<Dice key={i} count={randomNumber}/>)
    }
    return diceArray
  }
  return (
    <main className="main-container">
      <div className="game-container">
        <div className="dice-container">
          {
            renderDices()
          }
        </div>
      </div>
    </main>
  )
}
