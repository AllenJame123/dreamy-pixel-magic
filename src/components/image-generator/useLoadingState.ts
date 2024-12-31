import { useState, useRef, useEffect } from 'react';
import { AI_QUOTES } from './AIQuotes';

export const useLoadingState = () => {
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(AI_QUOTES[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
      messageIntervalRef.current = null;
    }
  };

  const startLoadingMessages = () => {
    let index = 0;
    setLoadingMessage(AI_QUOTES[0]);
    
    messageIntervalRef.current = setInterval(() => {
      index = Math.floor(Math.random() * AI_QUOTES.length);
      setLoadingMessage(AI_QUOTES[index]);
    }, 5000);
  };

  const initializeProgress = () => {
    cleanupInterval();
    setTimer(0);
    setProgress(0);
    startLoadingMessages();
    
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimer(elapsed);
      setProgress(Math.min(elapsed * 3.33, 100));
    }, 100);
  };

  useEffect(() => {
    return cleanupInterval;
  }, []);

  return {
    timer,
    progress,
    loadingMessage,
    initializeProgress,
    cleanupInterval,
    setProgress
  };
};