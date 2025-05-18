import { create } from 'zustand';

type LogType = 'info' | 'success' | 'warning' | 'error';

interface Log {
  id: string;
  message: string;
  type: LogType;
  timestamp: number;
}

interface LogStore {
  logs: Log[];
  addLog: (message: string, type: LogType) => void;
  clearLogs: () => void;
}

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (message, type) => set((state) => ({
    logs: [
      ...state.logs,
      {
        id: Math.random().toString(36).substr(2, 9),
        message,
        type,
        timestamp: Date.now(),
      },
    ].slice(-50), // Garde seulement les 50 derniers logs
  })),
  clearLogs: () => set({ logs: [] }),
}));