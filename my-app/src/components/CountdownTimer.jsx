import { useEffect, useState } from 'react';

export default function CountdownTimer({ initialSeconds = 60 }) {
  const [inputSeconds, setInputSeconds] = useState(initialSeconds);
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
    setSeconds(inputSeconds);
  }
  function handleInputChange(e) {
    const val = Math.max(0, Math.min(3600, Number(e.target.value))); // محدود به 1 ساعت
    setInputSeconds(val);
    setSeconds(val);
    setIsRunning(false);
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  const containerStyle = {
    border: '2px solid #4a90e2',
    borderRadius: '12px',
    padding: '30px',
    display: 'inline-block',
    marginTop: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f4ff',
    textAlign: 'center',
    minWidth: '220px',
  };
  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1.5px solid #4a90e2',
    marginBottom: '20px',
    boxSizing: 'border-box',
    textAlign: 'center',
  };
  const timeStyle = {
    fontSize: '48px',
    marginBottom: '20px',
    color: seconds === 0 ? '#e74c3c' : '#2c3e50',
    fontWeight: '600',
    fontVariantNumeric: 'tabular-nums',
  };
  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    transition: 'background-color 0.3s ease',
  };
  const startBtnStyle = {
    backgroundColor: isRunning || seconds === 0 ? '#95a5a6' : '#27ae60',
    color: 'white',
  };
  const pauseBtnStyle = {
    backgroundColor: !isRunning ? '#95a5a6' : '#f39c12',
    color: 'white',
  };
  const resetBtnStyle = {
    backgroundColor: '#34495e',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <input
        type="number"
        min={0}
        max={3600}
        value={inputSeconds}
        onChange={handleInputChange}
        style={inputStyle}
        placeholder="زمان را به ثانیه وارد کنید (تا 3600)"
        disabled={isRunning}
      />
      <div style={timeStyle}>{formatTime(seconds)}</div>
      <div>
        <button
          style={{ ...buttonStyle, ...startBtnStyle }}
          onClick={handleStart}
          disabled={isRunning || seconds === 0}
          aria-label="شروع تایمر"
        >
          شروع
        </button>
        <button
          style={{ ...buttonStyle, ...pauseBtnStyle }}
          onClick={handlePause}
          disabled={!isRunning}
          aria-label="توقف تایمر"
        >
          توقف
        </button>
        <button
          style={{ ...buttonStyle, ...resetBtnStyle }}
          onClick={handleReset}
          aria-label="بازنشانی تایمر"
        >
          ریست
        </button>
      </div>
    </div>
  );
}