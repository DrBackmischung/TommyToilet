import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/device-usage');
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError('Fehler beim Laden');
      }
    };
    load();
  }, []);

  const getStatusValue = (code: string): any => {
    return data?.status?.find((entry: any) => entry.code === code)?.value;
  };

  const excretionTimesToday = getStatusValue('excretion_times_day');
  const catWeight = getStatusValue('cat_weight');

  const wasOnToilet = typeof excretionTimesToday === 'number' && excretionTimesToday > 0;

  return (
    <div
      style={{
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',       
        textAlign: 'center',
        minHeight: '100vh',            
        width: '100vw',                
        boxSizing: 'border-box',
        padding: '2rem',
      }}
    >
      <h1>War Tommy heute schon auf Klo?</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <>
          <h2>{wasOnToilet ? 'Ja 🚽' : 'Nein 😿'}</h2>

          <h1>Wie schwer ist Tommy aktuell?</h1>
          <h2>{catWeight ? `${catWeight} g 🐈` : 'Unbekannt'}</h2>
        </>
      ) : (
        <p>Lade Gerätedaten…</p>
      )}
    </div>
  );
};

export default App;
