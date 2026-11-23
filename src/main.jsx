import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function Icon({ type }) {
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{type === 'photo' ? <><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="9" r="1.5"/><path d="m4 18 5-5 4 3 4-5 4 5"/></> : <><path d="M4 6h7m4 0h5M4 12h2m4 0h10M4 18h10m4 0h2"/><circle cx="13" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></>}</svg>;
}

function Sheet({ title, children, onClose }) {
  const ref = useRef(null);
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close(); }, []);
  return <dialog ref={ref} onCancel={onClose} aria-label={title}>
    <header><h2>{title}</h2><button onClick={onClose}>Back to shooting</button></header>
    {children}
  </dialog>;
}

function App() {
  const [sheet, setSheet] = useState(null);
  const [background, setBackground] = useState(true);
  const [protection, setProtection] = useState(true);
  const [photo, setPhoto] = useState('/mock-portrait.png');
  const [imported, setImported] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => () => { if (photo.startsWith('blob:')) URL.revokeObjectURL(photo); }, [photo]);
  const loadPhoto = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPEG, PNG, or WebP image for this preview.'); return;
    }
    setPhoto(URL.createObjectURL(file)); setImported(true); setError('');
  };
  return <>
    <div className="context"><span>PhotoGENic · React prototype</span><span>Sample guidance · No camera connected</span></div>
    <main className={`phone ${background ? 'with-photo' : ''} ${protection ? 'protected' : ''}`}>
      {background && <img className="scene-photo" src={photo} alt="" onError={() => { setError('This image could not be displayed. Try another JPEG or PNG.'); setPhoto('/mock-portrait.png'); setImported(false); }} />}
      <div className="contrast-scrim" aria-hidden="true" />
      <header className="top"><span className="brand">PhotoGENic</span><span className="connection">Preview · {imported ? 'Local photo' : 'Mock photo'}</span><button onClick={() => setSheet('setup')} aria-label="Preview settings"><Icon type="setup" /></button></header>
      <section className="stage" aria-label="Next-shot guidance">
        <img className="map" src="/shooting-map.svg" alt="Suggested top view: subject ahead, last camera position to the right, suggested position to the left. Schematic only, not live tracking." />
        <span className="map-note">Top view · suggested positions</span>
        <div className="copy"><p className="eyebrow">FOR YOUR NEXT SHOT</p><h1>Move a little left.</h1><p className="reason">Give your subject a cleaner background.</p></div>
      </section>
      <footer className="bottom"><button onClick={() => setSheet('review')}><Icon type="photo" />Last shot</button><p>Sample advice · Use your camera’s shutter</p></footer>
    </main>
    <div className="comparison" aria-label="Readability controls"><button aria-pressed={background} onClick={() => setBackground(!background)}>Photo background: {background ? 'On' : 'Off'}</button><button aria-pressed={protection} onClick={() => setProtection(!protection)} disabled={!background}>Contrast protection: {protection ? 'On' : 'Off'}</button></div>
    <p className="note">Readability study with an AI-generated photo. Guidance and map positions are examples.</p>
    {sheet && <Sheet title={sheet === 'review' ? 'Last shot' : 'Preview settings'} onClose={() => setSheet(null)}>
      {sheet === 'review' ? <>
        <img className="review-photo" src={photo} alt={imported ? 'Your locally selected photograph' : 'AI-generated sample portrait in a sunny park'} />
        <p>{imported ? 'Local photo. The coaching text remains sample advice.' : 'AI-generated sample photo for the readability test.'}</p>
        <label className="file-label">Try your own photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={loadPhoto}/></label>
        <p>Photos stay in this browser. No upload or AI analysis runs in this prototype.</p>
      </> : <>
        <label className="setting"><span>Photo behind guidance</span><input type="checkbox" checked={background} onChange={event => setBackground(event.target.checked)} /></label>
        <label className="setting"><span>Protect text and icon contrast</span><input type="checkbox" checked={protection} onChange={event => setProtection(event.target.checked)} disabled={!background}/></label>
        <p>The image is a static last-shot preview, not a live camera feed. Camera connection and AI analysis are not wired into this React prototype.</p>
      </>}
      {error && <p role="alert">{error}</p>}
    </Sheet>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
