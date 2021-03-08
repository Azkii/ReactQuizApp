import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import FlashCardList from './Flashcards/FlashCardList';
import axios from 'axios';
function App() {
  const [flashcards, setFlashcards] = useState([]);

  const categoryElem = useRef();
  const amountElem = useRef();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((res) => {
      setCategories(res.data.trivia_categories);
    });
  },[]);

    const parseData = (data) => {
      return data.map((item,index) => {
        const optionsArr = [item.correct_answer,...item.incorrect_answers];
        const sortedOptions = randomizeArray(optionsArr);
        const decodedOptions = sortedOptions.map((option) => {
          return decodeString(option);
        });
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(item.question),
          answer: decodeString(item.correct_answer),
          options: decodedOptions,
        }
      });
    }

    const randomizeArray = (arr) => {
      return arr.sort(() => {
        return `0.${arr.length}` - Math.random();
      });
    };
    
    const decodeString = (str) => {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = str;
      return textArea.value;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.get(`https://opentdb.com/api.php?amount=${amountElem.current.value}&category=${categoryElem.current.value}`)
      .then((res) => {
        setFlashcards(
          parseData(res.data.results)
        );
      })
    };
  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryElem}>
          {categories.map((element) => {
            return <option key={element.id} value={element.id}>{element.name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount of questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountElem}></input>
      </div>
      <div className="form-group">
        <button className="submitBtn">Select</button>
      </div>
    </form>
    <div className="cardContainer">
        <FlashCardList flashcards={flashcards} />
    </div>
    </>
  );
}
export default App;
