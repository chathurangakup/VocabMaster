import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableHighlight } from 'react-native';

interface TimerProps {
  initialTime: number; // Time in seconds
  onEnd?: () => void; // Optional callback function when timer reaches 0
  onRestart?: () => void; 
}

const Timer: React.FC<TimerProps> = ({ initialTime, onEnd, onRestart }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const decreaseTime = () => {
    if (remainingTime > 0) {
      setRemainingTime(prevTime => prevTime - 1);
    } else {
      clearInterval(intervalRef.current);
      onEnd(); // Call the callback function when the timer reaches 0
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseTime, 1000); // Decrease every second
    return () => clearInterval(intervalRef.current); 
  }, [remainingTime]);

 const handleRestart = () => {
    clearInterval(intervalRef.current); // Stop the current interval
    setRemainingTime(initialTime); // Reset the remaining time
    intervalRef.current = setInterval(decreaseTime, 1000); // Start a new interval
    onRestart && onRestart(); // Optionally call a callback function for restart actions
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <TouchableHighlight onPress={handleRestart}>
  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{formatTime(remainingTime)}</Text>
    </TouchableHighlight>
  
  );
};

export default Timer;
