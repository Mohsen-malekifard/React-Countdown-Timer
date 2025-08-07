import { useEffect, useState } from 'react';

export default function CountdownTimer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  function handleStart() {
    if (seconds > 0) setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }

  const containerStyle = {
    border: '2px solid gray',
    borderRadius: '10px',
    padding: '30px',
    display: 'inline-block',
    marginTop: '20px'
  };

  const timeStyle = {
    fontSize: '48px',
    marginBottom: '20px',
    color: seconds === 0 ? 'red' : 'black'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={timeStyle}>
        {seconds}s
      </div>
      <div>
        <button style={buttonStyle} onClick={handleStart} disabled={isRunning || seconds === 0}>
          شروع
        </button>
        <button style={buttonStyle} onClick={handlePause} disabled={!isRunning}>
          توقف
        </button>
        <button style={buttonStyle} onClick={handleReset}>
          ریست
        </button>
      </div>
    </div>
  );
}