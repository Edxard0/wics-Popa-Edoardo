import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [movimenti, setMovimenti] = useState([]);
  const [etichetta, setEtichetta] = useState('');
  const [importo, setImporto] = useState('');
  const [data, setData] = useState('');

  const aggiungiMovimento = () => {
    const nuovoMovimento = { etichetta, importo: parseFloat(importo), data };
    setMovimenti([...movimenti, nuovoMovimento]);
    setEtichetta('');
    setImporto('');
    setData('');
  };

  const totaleEntrate = movimenti.reduce((totale, movimento) => movimento.importo > 0 ? totale + movimento.importo : totale, 0);
  const totaleUscite = movimenti.reduce((totale, movimento) => movimento.importo < 0 ? totale + movimento.importo : totale, 0);
  const imponibile = totaleEntrate + totaleUscite;

  return (
    <div className="App">
      <div className="modal">
        <label>Etichetta</label>
        <input type="text" value={etichetta} onChange={e => setEtichetta(e.target.value)} />
        <label>Importo</label>
        <input type="number" value={importo} onChange={e => setImporto(e.target.value)} />
        <label>Data</label>
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <button onClick={aggiungiMovimento}>Aggiungi</button>
      </div>
      <div className="riepilogo">
        <h2>Movimenti</h2>
        {movimenti.sort((a, b) => new Date(b.data) - new Date(a.data)).map((movimento, index) => (
          <div key={index} className="movimento">
            <span>{movimento.etichetta}</span>
            <span><strong> {movimento.importo}€</strong></span>
            <span className="data">{new Date(movimento.data).toLocaleDateString('it-IT')}</span>
          </div>
        ))}
      </div>
      <div className="totali">
        <h2>Imponibile: <strong>{imponibile}€</strong></h2>
        <h2>Entrate: <strong>{totaleEntrate}€</strong></h2>
        <h2>Uscite: <strong>{totaleUscite}€</strong></h2>
      </div>
    </div>
  );
};

export default App;
