import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/device-detail');
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError('Fehler beim Laden');
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1>Smart Cat Toilet (Tuya)</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Lade Gerätedaten…</p>
      )}
    </div>
  );
}

export default App;
