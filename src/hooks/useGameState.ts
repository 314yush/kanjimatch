import { useState, useCallback, useReducer } from 'react';
import type { DailyChallenge, VocabularyPair } from '../types/Vocabulary';

interface GameState {
  currentChallenge: DailyChallenge | null;
  userMatches: Record<string, string>; // { englishWordId: japaneseWordId }
  score: number;
  attemptsLeft: number;
  gameStatus: 'loading' | 'playing' | 'completed' | 'failed';
  startTime: Date | null;
  selectedCard: string | null; // ID of the currently selected card
}

type GameAction =
  | { type: 'START_GAME'; challenge: DailyChallenge }
  | { type: 'SELECT_CARD'; cardId: string }
  | { type: 'MAKE_MATCH'; englishId: string; japaneseId: string }
  | { type: 'RESET_SELECTION' }
  | { type: 'DECREASE_ATTEMPTS' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'FAIL_GAME' };

const initialState: GameState = {
  currentChallenge: null,
  userMatches: {},
  score: 0,
  attemptsLeft: 5,
  gameStatus: 'loading',
  startTime: null,
  selectedCard: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        currentChallenge: action.challenge,
        gameStatus: 'playing',
        startTime: new Date(),
      };
    
    case 'SELECT_CARD':
      return {
        ...state,
        selectedCard: action.cardId,
      };
    
    case 'MAKE_MATCH':
      return {
        ...state,
        userMatches: {
          ...state.userMatches,
          [action.englishId]: action.japaneseId,
        },
        selectedCard: null,
        score: state.score + 1,
      };
    
    case 'RESET_SELECTION':
      return {
        ...state,
        selectedCard: null,
      };
    
    case 'DECREASE_ATTEMPTS':
      return {
        ...state,
        attemptsLeft: state.attemptsLeft - 1,
      };
    
    case 'COMPLETE_GAME':
      return {
        ...state,
        gameStatus: 'completed',
      };
    
    case 'FAIL_GAME':
      return {
        ...state,
        gameStatus: 'failed',
      };
    
    default:
      return state;
  }
}

const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback((challenge: DailyChallenge) => {
    dispatch({ type: 'START_GAME', challenge });
  }, []);

  const selectCard = useCallback((cardId: string) => {
    dispatch({ type: 'SELECT_CARD', cardId });
  }, []);

  const makeMatch = useCallback((englishId: string, japaneseId: string) => {
    dispatch({ type: 'MAKE_MATCH', englishId, japaneseId });
    
    // Check if all pairs are matched
    if (state.currentChallenge && 
        Object.keys(state.userMatches).length + 1 === state.currentChallenge.vocabulary.length) {
      dispatch({ type: 'COMPLETE_GAME' });
    }
  }, [state.currentChallenge, state.userMatches]);

  const resetSelection = useCallback(() => {
    dispatch({ type: 'RESET_SELECTION' });
  }, []);

  const handleFailedAttempt = useCallback(() => {
    dispatch({ type: 'DECREASE_ATTEMPTS' });
    if (state.attemptsLeft <= 1) {
      dispatch({ type: 'FAIL_GAME' });
    }
  }, [state.attemptsLeft]);

  const isMatchValid = useCallback((englishId: string, japaneseId: string): boolean => {
    if (!state.currentChallenge) return false;
    const pair = state.currentChallenge.vocabulary.find(
      item => item.id === englishId
    );
    return pair?.id === englishId && pair.japanese === state.currentChallenge.vocabulary.find(
      item => item.id === japaneseId
    )?.japanese;
  }, [state.currentChallenge]);

  const getGameTime = useCallback((): number => {
    if (!state.startTime) return 0;
    return Math.floor((new Date().getTime() - state.startTime.getTime()) / 1000);
  }, [state.startTime]);

  return {
    gameState: state,
    startGame,
    selectCard,
    makeMatch,
    resetSelection,
    handleFailedAttempt,
    isMatchValid,
    getGameTime,
  };
};

export default useGameState; 