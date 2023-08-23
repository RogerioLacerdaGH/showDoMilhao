import './GameOver.css'

const GameOver = ({retry,score}) => {
  return (
    <div>
        <h1>Perdeu MAOOOEH!! HA! HA! HA!</h1>
        <h2>VOCÊ GANHOU <span>{score}</span> REAIS</h2>
        <button onClick={retry}>recomeçar</button>
    </div>
  )
}

export default GameOver