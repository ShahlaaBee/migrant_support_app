import React, { useState, useEffect } from 'react'

const hotlineNumber = '+123'

const SOS = () => {
  const [showHotline, setShowHotline] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('token')

  const logSOS = async (method) => {

    if (!token) {
      setMessage('SOS action not recorded (not logged in), but help is available!')
      return
    }
    try {
      const res = await fetch('https://misos.onrender.com/api/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ method })
      })
      if (!res.ok) {
        let errorMsg = 'Failed to record SOS usage'
        try {
          const errorData = await res.json()
          errorMsg = errorData.msg || JSON.stringify(errorData)
        } catch {
          errorMsg = await res.text()
        }
        throw new Error(errorMsg)
      }

      const data = await res.json()
      setMessage('SOS action recorded.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleChatbot = () => {
    setShowChatbot(true)
    setShowHotline(false)
    logSOS('chatbot')
  }

  const handleHotline = () => {
    setShowHotline(true)
    setShowChatbot(false)
    logSOS('hotline')
  }


  useEffect(() => {
    if (showChatbot) {

      const script1 = document.createElement('script')
      script1.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js'
      script1.async = false
      script1.onload = () => {

        const script2 = document.createElement('script');
        script2.src = 'https://files.bpcontent.cloud/2025/08/11/14/20250811143403-5T1Z1B52.js';
        script2.async = false;
        document.body.appendChild(script2);

        script2.cleanup = () => document.body.removeChild(script2);
      };
      document.body.appendChild(script1);
      return () => {
        document.body.removeChild(script1);

        const scripts = document.querySelectorAll('script[src*="20250811143403-5T1Z1B52.js"]');
        scripts.forEach(s => s.parentNode.removeChild(s));
      };
    }
  }, [showChatbot])

  return (
    <div>
      <h2>SOS Emergency Help</h2>
      <p>Select your preferred emergency support option:</p>
      <button onClick={handleChatbot}>Chatbot</button>
      <button onClick={handleHotline}>Show Hotline</button>
      {!token && (
        <p style={{ color: 'black' }}>
          You are not logged in. You can still access help, but your SOS actions will not be recorded.
        </p>
      )}
      {showHotline && (
        <div style={{ color: 'red', fontSize: '1.5em' }}>
          <p>Urgent? Call this number:</p>
          <strong>{hotlineNumber}</strong>
        </div>
      )}
      {showChatbot && (
        <div style={{ border: '1px solid #ccc', padding: '1em', marginTop: '1em' }}>
          <p>Connecting you to MiSOS Assistant...</p>

        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  )
}

export default SOS
