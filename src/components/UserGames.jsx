import React, { useEffect, useState } from 'react';

const UserGames = ({ token }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/games/user-games', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          console.error('Resposta inesperada da API:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar jogos do usuário:', error);
      }
    };

    fetchUserGames();
  }, [token]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Game History</h1>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Completion Time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game.id}>
                <th>{index + 1}</th>
                <td>{new Date(game.createdAt).toLocaleString()}</td>
                <td>{game.completionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserGames;