import React, { useEffect, useState } from 'react';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/games/ranking');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRanking(data);
        } else {
          console.error('Resposta inesperada da API:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Ranking</h1>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Completion Time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((player, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{player.user.username}</td>
                <td>{player.completionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Ranking;