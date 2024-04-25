import React, { useState } from 'react';
import './App.css'; // Importe o arquivo CSS para estilização

function App() {
  const [hoursWorked, setHoursWorked] = useState(null);
  const [remainingHours, setRemainingHours] = useState(null);

  const calculateHours = () => {
    let totalHours = 0;
    let totalMinutes = 0;

    const inputs = document.querySelectorAll('tbody input[type="time"]');
    inputs.forEach(input => {
      const startTime = input.closest('tr').querySelector('input[name^="startTime"]').value;
      const endTime = input.closest('tr').querySelector('input[name^="endTime"]').value;

      if (startTime && endTime) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        let diffHour = endHour - startHour;
        let diffMinute = endMinute - startMinute;
        if (diffMinute < 0) {
          diffHour -= 1;
          diffMinute += 60;
        }

        totalHours += diffHour;
        totalMinutes += diffMinute;
      }
    });
    totalHours = totalHours/2
    totalMinutes = totalMinutes/2
    totalHours += Math.floor(totalMinutes / 60); // Adiciona horas completas dos minutos restantes
    totalMinutes %= 60; // Resto dos minutos após adicionar horas completas
    setHoursWorked(`${totalHours} horas e ${totalMinutes} minutos`);
    const remaining = 16 - (totalHours + totalMinutes / 60);
    const remainingHours = Math.floor(remaining); // Horas restantes (parte inteira)
    const remainingMinutes = Math.round((remaining - remainingHours) * 60); // Minutos restantes (parte fracionária)
    setRemainingHours(`${remainingHours} horas e ${remainingMinutes} minutos`);
  };

  return (
    <div className="App">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora Inicial</th>
              <th>Hora Final</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td>
                  <input type="date" name={`date-${index}`} />
                </td>
                <td>
                  <input type="time" name={`startTime-${index}`} />
                </td>
                <td>
                  <input type="time" name={`endTime-${index}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={calculateHours}>Calcular</button>
      </div>
      {hoursWorked !== null && remainingHours !== null && (
        <div className="result-container">
          <p>Horas trabalhadas: {hoursWorked}</p>
          <p>Horas restantes para completar 16 horas: {remainingHours}</p>
        </div>
      )}
    </div>
  );
}

export default App;
