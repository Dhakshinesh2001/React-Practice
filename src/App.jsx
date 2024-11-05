import { useState, useEffect } from 'react'
import './App.css'
import { formatTime, calculateTime } from './timeFunctions';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Timer />
    </div>
  )
}


function Timer() {
  const [time, setTime] = useState(3700);
  const [editField,setEditField] = useState({ field: null, value: '' });
  //  const [editState, setEditState] = useState({ field: null, value: '' });
  const [isRunning, setIsrunning] = useState(false);

  function toggleStart() {
    setIsrunning(!isRunning)
    setEditField({ field: null, value: '' })
    
  }

  function resetTime() {
    setIsrunning(false)
    setEditField({ field: null, value: '' })
    setTime(0);
  }

  useEffect(() => {
    let Interval = null;
    if (isRunning && time > 0) {
      Interval = setInterval(() => {
        setTime(x => (x - 1))
      }, 1000)

      // interval = setInterval(() => {
      //   setTime((prevTime) => prevTime - 1); // Decrease time by 1 second
      // }, 1000);
    } else if (time === 0) { setIsrunning(false) }


    return () => { clearInterval(Interval) }
  }, [isRunning, time])



  function handleEdit(field) { 
    setEditField({field:field,value:formatTime(time)[field].replace(/^0+/, '')})
    setIsrunning(false);


    // console.log("handle  edit")
    // console.log(field)
  }
  
  function handleValueChange(field) {

    const value = editField.value.padStart(2, '0')
    const newTime = formatTime(time);
    newTime[field] = value;
    console.log(newTime)
    const cacluclatedTime = calculateTime(newTime.hours,newTime.minutes,newTime.seconds)
    setTime(cacluclatedTime)
    // setTime(calculateTime(newTime.hours,newTime.minutes,newTime.seconds))
    setEditField({ field: null, value: '' })
  }

  function handleEditValue(e) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setEditField({ field: editField.field, value: value })

    // console.log("handle  start edit")
    // console.log(editField.field)
  }

  // useEffect(()=>{},[time])


  const { hours, minutes, seconds } = formatTime(time)//*/{hours:1,minutes:2,seconds:3}

  return <div className='Timer-Component'>
            <div className='Timer-display'>
              <div className='Timer-text'>
                {
                (editField.field === 'hours')? <input type='text' className='input-box' value = {editField.value} onChange={handleEditValue} onBlur={()=>handleValueChange('hours')}></input>:<span onClick={() => handleEdit('hours')}>{hours}</span> 
                }
                :{
                (editField.field === 'minutes')? <input type='text' className='input-box' value = {editField.value} onChange={handleEditValue} onBlur={()=>handleValueChange('minutes')}></input>:<span onClick={() => handleEdit('minutes')}>{minutes}</span>
                }:
                {
                (editField.field === 'seconds')? <input type='text' className='input-box' value = {editField.value} onChange={handleEditValue} onBlur={()=>handleValueChange('seconds')}></input>:<span onClick={() => handleEdit('seconds')}>{seconds}</span> 
                }

        
       
    
       
    </div> 
    </div>
    <div className='Timer-buttons'>
      {!isRunning ? <button onClick={toggleStart}>Start</button> : <button onClick={toggleStart}>Stop</button>}


      <button onClick={resetTime}>Reset</button>
    </div>
  </div>
}

// function TimerTime({hours,minutes,seconds}){

//   return 
// }
// return <div>Hi</div>


export default App
