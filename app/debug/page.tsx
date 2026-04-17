export default function DebugPage() {
  return (
    <div style={{ padding: 40, background: '#0A0A0B', color: 'white', minHeight: '100vh' }}>
      <h1>Debug Page</h1>
      <p>If you see this, the server is working!</p>
      <a href="/patient-demo/" style={{ color: '#00A651' }}>Go to Patient Demo</a>
      <br /><br />
      <a href="/admin-demo/" style={{ color: '#FFD60A' }}>Go to Admin Demo</a>
    </div>
  )
}
