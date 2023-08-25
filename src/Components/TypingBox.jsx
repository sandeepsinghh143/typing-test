import React,{createRef, useEffect, useMemo, useRef, useState} from 'react'
import { generate } from 'random-words';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';
const TypingBox = () => {
    //reference of input element........
    const inputRef=useRef(null);
    const {testTime}=useTestMode();
    const [countDown,setCountDown] =useState(testTime);

    const [testStart,setTestStart]=useState(false);
    const [testEnd,setTestEnd]=useState(false);
    const [correctChars,setCorrectChars]=useState(0);
    const [incorrectChars,setIncorrectChars]=useState(0);
    const [missedChars,setMissedChars]=useState(0);
    const [extraChars,setExtraChars]=useState(0);
    const [correctWords,setCorrectWords]=useState(0);
    //storing words in an array using generate function from random-words
    const [wordsArray,setWordsArray] =useState(()=>{
        return generate(50);
    });

    //storing current word index
    const [currWordIndex,setCurrWordIndex] = useState(0);

    //storing current word index
    const [currCharIndex,setCurrCharIndex] = useState(0);
    const [graphData,setGraphData]=useState([]);

// storing References of each word....
    const wordsSpanRef=useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    },[wordsArray]);
    
    const startTimer=()=>{
        const intervalId=setInterval(timer,1000);
        function timer(){
            setCountDown((latesCountDown)=>{
                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData,[
                        testTime-latesCountDown+1,
                        (correctChars/5)/((testTime-latesCountDown+1)/60)]];
                    })
                    return correctChars;
                })
                if(latesCountDown===1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return latesCountDown-1;
            });
        }
    }
    //input handler function
    const handleUserInput=(e)=>{

        if(!testStart){
            startTimer();
            setTestStart(true);
        }
        const allCurrChars=wordsSpanRef[currWordIndex].current.childNodes;

        if(e.keyCode===32){
            let correctCharsInWord=wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
            if(correctCharsInWord.length===allCurrChars.length){
                setCorrectWords(correctWords+1);
            }
//logic for space button........
            if(allCurrChars.length<=currCharIndex){
                allCurrChars[currCharIndex-1].classList.remove("current-right");
            }else{
                setMissedChars(missedChars+(allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove("current");
            }

            wordsSpanRef[currWordIndex+1].current.childNodes[0].className="current"
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }

        if(e.keyCode===8){
//logic for backspace........
            if(currCharIndex!==0){

                if(allCurrChars.length===currCharIndex){
                    if(allCurrChars[currCharIndex-1].className.includes("extra")){
                        allCurrChars[currCharIndex-1].remove();
                        allCurrChars[currCharIndex-2].className+=" current-right";
                    }
                    else{
                        allCurrChars[currCharIndex-1].className="current";
                    }
                    
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }
                allCurrChars[currCharIndex].className="";
                allCurrChars[currCharIndex-1].className="current";
                setCurrCharIndex(currCharIndex-1);
            }
            return;
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan=document.createElement("span");
            newSpan.innerText=e.key;
            newSpan.className="incorrect extra current-right"
            allCurrChars[currCharIndex-1].classList.remove("current-right");
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            setExtraChars(extraChars+1);
            return;
        }

        if(e.key===allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className="correct";
            setCorrectChars(correctChars+1);
        }else{
            allCurrChars[currCharIndex].className="incorrect";
            setIncorrectChars(incorrectChars+1);
        }

        if(currCharIndex+1===allCurrChars.length){
            allCurrChars[currCharIndex].className+=" current-right";
        }else{
            allCurrChars[currCharIndex+1].className="current";
        }
        
        setCurrCharIndex(currCharIndex+1);
    }

    const calculateWPM=()=>{
        return Math.round((correctChars/5)/(testTime/60));
    }
    const calculateAccuracy=()=>{
        return Math.round((correctWords/currWordIndex)*100);
    }
    const focusInput=()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className="current";
    },[])

  return (
    <div>
        
        {/* defining typing box here */}
        {testEnd ? (<Stats wpm={calculateWPM()}
                        accuracy={calculateAccuracy()} 
                        correctChars={correctChars} 
                        incorrectChars={incorrectChars} 
                        missedChars={missedChars} 
                        extraChars={extraChars}
                        graphData={graphData}
        />
        ) : (<div className="typeBox" onClick={focusInput}>
        <UpperMenu obj={{countDown,setCountDown}}/>
            <div className="words">
                {/* putting single words in span */}
                {wordsArray.map((word,index)=>(
                    <span className="word" key={index} ref={wordsSpanRef[index]}>
                        {/* putting single characters in span */}
                        {word.split('').map((char,index)=>(
                            <span className="char" key={index}>{char}</span>
                        ))}
                    </span>
                ))}
            </div>
        </div>)
       }
        {/* input box declaration */}
        <input
        type='text'
        className='hidden-input'
        ref={inputRef}
        onKeyDown={handleUserInput}
        />
    </div>
  )
}

export default TypingBox;
