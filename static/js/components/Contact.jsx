import { useState, useEffect, useRef } from 'react';

const CONTACT_ENDPOINT = '/.netlify/functions/contact';
const RATE_LIMIT_MS = 10_000;
const RL_KEY = 'rl_contact';

const getLastSent = () => { const r = localStorage.getItem(RL_KEY); return r ? parseInt(r, 10) : 0; };
const setLastSent = () => localStorage.setItem(RL_KEY, Date.now().toString());
const secondsLeft = () => Math.max(0, Math.ceil((RATE_LIMIT_MS - (Date.now() - getLastSent())) / 1000));

export default function Contact({ onClose }) {
  const [form, setForm]           = useState({ name: '', email: '', message: '' });
  const [status, setStatus]       = useState('idle');
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (status === 'ratelimit') {
      timerRef.current = setInterval(() => {
        const left = secondsLeft();
        setCountdown(left);
        if (left <= 0) { clearInterval(timerRef.current); setStatus('idle'); }
      }, 250);
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const left = secondsLeft();
    if (left > 0) { setCountdown(left); setStatus('ratelimit'); return; }
    setStatus('loading');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setLastSent();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
  };

  const disabled = status === 'loading' || status === 'ratelimit';

  return (
    <div className="cn-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cn-modal-card" role="dialog" aria-modal="true">
        <button className="cn-modal-close" onClick={onClose} aria-label="close">✕</button>

        <p className="cn-tag-small" style={{ margin: 0 }}>04  .  Transmit</p>
        <h2 className="cn-modal-title">
          <span>say</span>
          <span className="cn-italic">something.</span>
        </h2>

        {status === 'ratelimit' && (
          <div className="cn-modal-notice">
            Slow down. Next message in <strong>{countdown}s</strong>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="cn-modal-form">
          <div className="cn-modal-row">
            <Field label="Name"  name="name"  type="text"  value={form.name}
              onChange={handleChange} disabled={disabled} placeholder="Your name" />
            <Field label="Email" name="email" type="email" value={form.email}
              onChange={handleChange} disabled={disabled} placeholder="you@domain.com" />
          </div>

          <div>
            <label className="cn-modal-label">Message</label>
            <textarea
              name="message" rows={4} required
              value={form.message} onChange={handleChange}
              placeholder="What are we building?"
              disabled={disabled}
              className="cn-modal-input cn-modal-textarea"
            />
          </div>

          <button type="submit" disabled={disabled} className="cn-modal-submit">
            <span>
              {status === 'loading' ? 'sending'
                : status === 'sent' ? 'sent'
                : 'send message'}
            </span>
            <span className="cn-arrow">↗</span>
          </button>

          {status === 'error' && (
            <p className="cn-modal-error">
              Something broke. Email noahtxrp@gmail.com directly.
            </p>
          )}
        </form>

        <div className="cn-modal-foot">
          <a href="https://discord.gg/kFdKSBBHxd" target="_blank" rel="noreferrer">Discord</a>
          <span>.</span>
          <a href="mailto:noahtxrp@gmail.com">Email</a>
          <span>.</span>
          <a href="https://github.com/Qxis" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label className="cn-modal-label">{label}</label>
      <input
        type={type} name={name} required
        value={value} onChange={onChange} disabled={disabled}
        placeholder={placeholder}
        className="cn-modal-input"
      />
    </div>
  );
}
