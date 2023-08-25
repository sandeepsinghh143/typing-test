import React from 'react'

const UpperMenu = ({obj}) => {

    function countDownTime(e){
        obj.setCountDown(e.target.innerText)
    }
  return (
    <div className='upper-flex'>
        <div>{obj.countDown}</div>
        <div>
        <span onClick={countDownTime} >15</span><span className='countDown'>s</span>
        <span onClick={countDownTime} >30</span><span className='countDown'>s</span>
        <span onClick={countDownTime} >60</span><span className='countDown'>s</span>
        </div>
    </div>
  )
}

export default UpperMenu;