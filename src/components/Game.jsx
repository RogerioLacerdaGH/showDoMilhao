import { useState, useRef } from 'react'
import './Game.css'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score,}) => {
    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) =>{
        e.preventDefault();

        verifyLetter(letter);
        setLetter('');
        letterInputRef.current.focus();
    }

    return (
    <div className="game">
        <p className="points">
            <span>pontuação: {score}</span>
        </p>
        <h1>Qual a palavra?</h1>
        <h3 className="tip">
            dica: <span>DICA: {pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        <div className="wordContainer">
            {letters.map((letter,i) => (
                guessedLetters.includes(letter) ? (
                    <span key={i} className='letter'>{letter}</span>
                ) : (
                    <span key={i} className='blankSquare'></span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <p>Uma letra uma chance:</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="letter" maxLength='1' onChange={(e)=> setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras tentadas:</p>
            {wrongLetters.map((letter, i) =>(
                <span key={i}>{letter},</span>
            ))}
        </div>
    </div>
  )
}

export default Game