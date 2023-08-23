import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Sylvio Santos JOGOS</h1>
        <p>Clique abaixo para jogar</p>
        <button onClick={startGame} >Começar jogo</button>

    </div>
  )
}

export default StartScreen