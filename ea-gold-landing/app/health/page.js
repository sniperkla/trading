export default function HealthPage() {
  return (
    <main style={{ padding: 32, textAlign: 'center' }}>
      <h1>Health Check</h1>
      <p>Status: <span style={{ color: 'green' }}>healthy</span></p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </main>
  );
}
