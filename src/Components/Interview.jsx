import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function ResumeInterviewComponent() {
  const [position, setPosition] = useState('');
  const [resume, setResume] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showGuideline, setShowGuideline] = useState(false);

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleResumeUpload = (event) => {
    const uploadedResume = event.target.files[0];
    setResume(uploadedResume);
  };

  const handleAutoPlayChange = () => {
    setAutoPlay(!autoPlay);
  };

  const sendMessage = (message) => {
    // Send message to AI interviewer
    // Example using axios to make POST request to server
    axios.post('/send-message', { message })
      .then(response => {
        const aiResponse = response.data;
        setInterviewHistory([...interviewHistory, { origin: 'ai', message: aiResponse }]);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  const getInterviewFeedback = () => {
    // Get interview feedback
    // Example using axios to make GET request to server
    axios.get('/get-feedback')
      .then(response => {
        const feedback = response.data;
        setFeedback(feedback);
      })
      .catch(error => console.error('Error getting feedback:', error));
  };

  const toggleGuideline = () => {
    setShowGuideline(!showGuideline);
  };

  return (
    <div>
      <h1>Resume AI Interview</h1>
      {/* Position Selection */}
      <select value={position} onChange={handlePositionChange}>
        <option value="">Select Position</option>
        <option value="Data Analyst">Data Analyst</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Marketing">Marketing</option>
      </select>
      <br />
      
      {/* Resume Upload */}
      <input type="file" accept=".pdf" onChange={handleResumeUpload} />
      <br />

      {/* Auto-play Checkbox */}
      <label>
        <input type="checkbox" checked={autoPlay} onChange={handleAutoPlayChange} />
        Auto-play AI interviewer responses
      </label>
      <br />

      {/* Interview Chat */}
      <div style={{ border: '1px solid black', minHeight: '200px', margin: '10px 0', padding: '10px' }}>
        {/* Render interview history messages */}
        {interviewHistory.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {msg.origin === 'human' ? <strong>You:</strong> : <strong>AI Interviewer:</strong>} {msg.message}
          </div>
        ))}
      </div>

      {/* Send Message */}
      <input type="text" placeholder="Type your message..." />
      <button onClick={sendMessage}>Send</button>
      <br />

      {/* Interview Feedback */}
      <button onClick={getInterviewFeedback}>Get Interview Feedback</button>
      {feedback && <div>{feedback}</div>}

      {/* Guideline */}
      <button onClick={toggleGuideline}>{showGuideline ? 'Hide Guideline' : 'Show Guideline'}</button>
      {showGuideline && (
        <div>
          {/* Render interview guideline */}
          <p>Interview Guideline:</p>
          <p>...</p>
        </div>
      )}
    </div>
  );
}

export default ResumeInterviewComponent;
