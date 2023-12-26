import React from 'react';
import { useState, useEffect } from 'react';
import Style from './Timer.module.scss';
import Router from 'next/router';

interface IPropsTimer {
  initialMinute?: number;
  initialSeconds?: number;
}

const Timer = (prop: IPropsTimer): JSX.Element => {
  const { initialMinute = 0, initialSeconds = 0 } = prop;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  const intervalCheck = (): void => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        // Timeout: redirect to index
        Router.push('/');
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
  };

  useEffect(() => {
    const myInterval = setInterval(intervalCheck, 1000);
    return () => clearInterval(myInterval);
  });



  const handleCodeButtonClick = (): void => {
    console.log("REDIREC FUNCTION");
    Router.push('/code-package')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={Style['timer-box']}>
        {(minutes || seconds) && (
          <>
            <span className={Style['timer-header']}>Payment Time Left</span>
            <div>
              <span className={Style['timer']}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
          </>
        )}
      </div>
      <div><br/></div>
      <div><br/></div>
      <button className={Style['custom-btn']} onClick={() => handleCodeButtonClick()}>
        INPUT CODE
      </button>
    </div>
  );
  
  
  
};

export default Timer;
