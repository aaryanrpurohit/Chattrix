"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

// List of games
const gamesList = [
  {
    id: 1,
    name: "Ludo",
    description: "Play Ludo with friends",
    avatar: "/game-avatars/ludo.png",
  },
  {
    id: 2,
    name: "Snake & Ladder",
    description: "Classic board game",
    avatar: "/game-avatars/snake.png",
  },
  {
    id: 3,
    name: "Chess",
    description: "Challenge your friends",
    avatar: "/game-avatars/chess.png",
  },
  {
    id: 4,
    name: "Tic Tac Toe",
    description: "Quick and fun",
    avatar: "/game-avatars/tictactoe.png",
  },
  {
    id: 5,
    name: "Memory Match",
    description: "Test your memory",
    avatar: "/game-avatars/memory.png",
  },
  {
    id: 6,
    name: "Checkers",
    description: "Classic strategy game",
    avatar: "/game-avatars/checkers.png",
  },
  {
    id: 7,
    name: "Cards",
    description: "Play card games online",
    avatar: "/game-avatars/cards.png",
  },
];

const GamesSection = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // For now, use static list; later can fetch from backend
    setGames(gamesList);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-text)] overflow-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-[var(--color-accent)]">
            Games
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex flex-col items-center bg-[var(--color-surface)] rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition"
              >
                <img
                  src={game.avatar || "/game-avatars/default.png"}
                  alt={game.name}
                  className="w-24 h-24 mb-3 rounded-lg object-cover"
                />
                <h3 className="font-semibold text-lg">{game.name}</h3>
                <p className="text-gray-400 text-sm text-center">{game.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GamesSection;
