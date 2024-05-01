import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';

interface TimerProps {
  initialTime: number; // Time in seconds
  onEnd?: () => void; // Optional callback function when timer reaches 0
}

const Timer: React.FC<TimerProps> = ({ initialTime, onEnd }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
   
    intervalRef.current = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(intervalRef.current!);
        onEnd?.(); // Call the optional callback if provided
      }
    }, 1000);
    return () => clearInterval(intervalRef.current!); // Cleanup function to clear interval on unmount
  }, [initialTime, onEnd,remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{formatTime(remainingTime)}</Text>
  );
};

export default Timer;
