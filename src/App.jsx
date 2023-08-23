//CSS
import './App.css'

//REACT
import { useCallback, useEffect, useState } from 'react'

//DATA
import {wordsList} from './data/words'

//COMPONENTES
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id:1,name:'start'},
  {id:2,name:'game'},
  {id:3,name:'end'},
]

function App() {
  const [gameState,setGameState] = useState (stages[0].name);
  const [words] = useState(wordsList);
  const guessesQty = 3

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory,setPickedCategory] = useState('');
  const [letters,setLetters] = useState([]);

  const [guessedLetters,setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)


  //PICK WORD AND CATEGORY FUNCTION
  const pickWordAndCategory= useCallback(()=>{
    //category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    //word
    const word = words[category][Math.floor(Math.random()*words[category].length)];
    return{word,category}
  },[words])

  //START GAME BUTTON
  const startGame= useCallback(()=>{
    clearLetterStates();
    //pick word and category
    const {word,category} = pickWordAndCategory();
    console.log(word,category);

    //create an array of letters
    let wordLetters = word.split('');

    wordLetters = wordLetters.map((i)=> i.toLowerCase())
    console.log(wordLetters);

    //fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameState(stages[1].name);
  }, [pickWordAndCategory]);

  //PROCESS LETTER ON GAME
  const verifyLetter =(letter)=>{
    const normalizedLetter = letter.toLowerCase();
    //check if letter has already been utilized
    if(
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)){
      return;
    }    

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses)=> actualGuesses -1);
    }
  }

  const clearLetterStates =()=>{
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLetterStates();

      setGameState(stages[2].name);
    }
  }, [guesses])

  //CHECK WIN CONDITION
  useEffect(()=>{
    //ovo
    const uniqueLetters = [... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore += 100);
      startGame();
    }


  }, [guessedLetters, letters, startGame])

  //RESTART GAME
  const retry =()=>{
    setScore(0);
    setGuesses(guessesQty);

    setGameState(stages[0].name);
  }

  return (
    <div className='App'>
      {gameState === 'start' && <StartScreen startGame={startGame}/>}
      {gameState === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameState === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
