import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";

// Game constants
const GAME_TIME = 60; // Game lasts 60 seconds
const DIFFICULTY_LEVELS = [
  { name: "Easy", messageLength: 3, scoreMultiplier: 1 },
  { name: "Medium", messageLength: 5, scoreMultiplier: 2 },
  { name: "Hard", messageLength: 8, scoreMultiplier: 3 },
];

const CIPHER_METHODS = [
  {
    name: "Caesar Cipher",
    encrypt: (text: string, key: number) => {
      return text
        .split("")
        .map((char) => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(((code - base + key) % 26) + base);
          }
          return char;
        })
        .join("");
    },
    decrypt: (text: string, key: number) => {
      return text
        .split("")
        .map((char) => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(((code - base - key + 26) % 26) + base);
          }
          return char;
        })
        .join("");
    },
  },
  {
    name: "Reverse Text",
    encrypt: (text: string) => text.split("").reverse().join(""),
    decrypt: (text: string) => text.split("").reverse().join(""),
  },
  {
    name: "XOR Cipher",
    encrypt: (text: string, key: number) => {
      return text
        .split("")
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ key);
        })
        .join("");
    },
    decrypt: (text: string, key: number) => {
      return text
        .split("")
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ key);
        })
        .join("");
    },
  },
];

// Common English words for the game
const COMMON_WORDS = [
  "apple",
  "banana",
  "cherry",
  "dragon",
  "elephant",
  "forest",
  "garden",
  "harbor",
  "island",
  "jungle",
  "kitchen",
  "lemon",
  "mountain",
  "nectar",
  "ocean",
  "pepper",
  "quasar",
  "river",
  "sunset",
  "tiger",
  "umbrella",
  "valley",
  "wallet",
  "xylophone",
  "yellow",
  "zebra",
  "crypto",
  "secure",
  "cipher",
  "decode",
  "encrypt",
  "hash",
  "key",
  "lock",
  "message",
  "password",
  "private",
  "public",
  "safe",
  "token",
  "verify",
  "algorithm",
];

// Generate a random key for the encryption
const generateRandomKey = () => Math.floor(Math.random() * 10) + 1;

// Choose random words to create a message
const generateRandomMessage = (length: number) => {
  const message = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
    message.push(COMMON_WORDS[randomIndex]);
  }
  return message.join(" ");
};

// Component for the encryption game
const EncryptionGame: React.FC = () => {
  const { t } = useTranslation(["game"]);

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS[0]);

  // Current challenge
  const [currentMessage, setCurrentMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [currentCipher, setCurrentCipher] = useState(CIPHER_METHODS[0]);
  const [currentKey, setCurrentKey] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  // Initialize high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("encryptionGameHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Game timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameOver]);

  // Generate a new challenge
  const generateNewChallenge = () => {
    const message = generateRandomMessage(difficulty.messageLength);
    const cipherIndex = Math.floor(Math.random() * CIPHER_METHODS.length);
    const selectedCipher = CIPHER_METHODS[cipherIndex];
    const key = generateRandomKey();

    const encrypted = selectedCipher.encrypt(message, key);

    setCurrentMessage(message);
    setEncryptedMessage(encrypted);
    setCurrentCipher(selectedCipher);
    setCurrentKey(key);
    setUserInput("");
    setFeedback("");
    setIsCorrect(false);
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(GAME_TIME);
    setScore(0);
    generateNewChallenge();
  };

  // End the game
  const endGame = () => {
    setGameStarted(false);
    setGameOver(true);

    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("encryptionGameHighScore", score.toString());
    }
  };

  // Handle user submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userInput.trim().toLowerCase() === currentMessage.toLowerCase()) {
      // Correct answer
      setFeedback(
        `${t("correct")} +${10 * difficulty.scoreMultiplier} ${t("points")}`
      );
      setIsCorrect(true);
      setScore((prev) => prev + 10 * difficulty.scoreMultiplier);

      // Generate new challenge after a brief delay
      setTimeout(() => {
        generateNewChallenge();
      }, 1500);
    } else {
      // Wrong answer
      setFeedback(t("incorrect"));
      setIsCorrect(false);
    }
  };

  // Choose difficulty level
  const handleDifficultyChange = (level: (typeof DIFFICULTY_LEVELS)[0]) => {
    setDifficulty(level);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        {t("title")}
      </h1>

      {!gameStarted && !gameOver ? (
        // Game start screen
        <div className="text-center">
          <p className="text-gray-300 mb-6">{t("description")}</p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-200">
              {t("difficulty")}:
            </h3>
            <div className="flex justify-center gap-4">
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.name}
                  onClick={() => handleDifficultyChange(level)}
                  className={`px-4 py-2 rounded-lg ${
                    difficulty.name === level.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg text-white font-bold text-lg hover:from-green-600 hover:to-teal-500 transition-all shadow-lg"
          >
            {t("startGame")}
          </button>

          {highScore > 0 && (
            <p className="mt-4 text-yellow-400">High Score: {highScore}</p>
          )}
        </div>
      ) : gameOver ? (
        // Game over screen
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {t("gameOver")}
          </h2>
          <p className="text-xl mb-6 text-gray-300">
            {t("finalScore")}:{" "}
            <span className="text-yellow-400 font-bold">{score}</span>
          </p>

          {score === highScore && score > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 p-3 bg-yellow-500 bg-opacity-20 rounded-lg text-yellow-300"
            >
              🏆 {t("newHighScore")} 🏆
            </motion.div>
          )}

          <button
            onClick={startGame}
            className="px-6 py-2 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-700 transition-all"
          >
            {t("playAgain")}
          </button>
        </div>
      ) : (
        // Game play screen
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold text-gray-300">
              {t("score")}: <span className="text-yellow-400">{score}</span>
            </div>
            <div className="text-lg font-semibold text-gray-300">
              {t("time")}:{" "}
              <span
                className={timeLeft <= 10 ? "text-red-500" : "text-green-400"}
              >
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-900 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              {t("challenge")}:
            </h3>
            <p className="text-gray-400 mb-2">
              {t("decryptionMethod")}:{" "}
              <span className="text-blue-400">{currentCipher.name}</span>
            </p>
            {currentCipher.name !== "Reverse Text" && (
              <p className="text-gray-400 mb-4">
                {t("key")}: <span className="text-blue-400">{currentKey}</span>
              </p>
            )}
            <div className="p-3 bg-gray-800 rounded border border-gray-700 font-mono text-green-400 break-all">
              {encryptedMessage}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="decryption"
                className="block text-gray-300 mb-2 font-semibold"
              >
                {t("yourDecryption")}:
              </label>
              <input
                type="text"
                id="decryption"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder={t("placeholder")}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-bold hover:from-purple-700 hover:to-blue-600 transition-all"
            >
              {t("submitAnswer")}
            </button>
          </form>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-center ${
                isCorrect
                  ? "bg-green-500 bg-opacity-20 text-green-300"
                  : "bg-red-500 bg-opacity-20 text-red-300"
              }`}
            >
              {feedback}
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={endGame}
              className="text-gray-400 underline hover:text-gray-300"
            >
              {t("endGame")}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">
          {t("howToPlay")}
        </h3>
        <ol className="list-decimal list-inside text-gray-400 space-y-2">
          <li>{t("instructions.step1")}</li>
          <li>{t("instructions.step2")}</li>
          <li>{t("instructions.step3")}</li>
          <li>{t("instructions.step4")}</li>
          <li>{t("instructions.step5")}</li>
        </ol>
      </div>
    </div>
  );
};

export default EncryptionGame;
