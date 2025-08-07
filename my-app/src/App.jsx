import CountdownTimer from './components/CountdownTimer';

export default function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>تایمر معکوس</h1>
      <CountdownTimer initialSeconds={60} />
    </div>
  );
}