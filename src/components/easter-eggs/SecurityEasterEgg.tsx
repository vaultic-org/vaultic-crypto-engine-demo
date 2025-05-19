// Easter egg component for cybersecurity experts
function SecurityEasterEgg() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-4">
      <h1 className="text-3xl mb-6 glitch-text">🔐 CYBERSECURITY EASTER EGG DISCOVERED 🔐</h1>
      
      <div className="mb-8 p-4 border border-green-500 rounded-md bg-black bg-opacity-80 max-w-3xl">
        <div className="mb-4 typing-animation">
          <p className="mb-2"># Congratulations, hacker! You've found our easter egg.</p>
          <p className="mb-2"># You clearly understand common security vulnerabilities.</p>
          <p># This is a recognition of your cybersecurity knowledge.</p>
        </div>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
{`# This is not a real .env file
# In production, this would have been a critical security breach

API_KEY=youReallyFoundTheE@sterEgg!
JWT_SECRET=n3verPutS3nsitiveDataInClientSideCode
CRYPTO_SALT=saveSaltForTheF00d
DEBUG_MODE=false
ADMIN_EMAIL=security-team@vaultic-demo.example
ADMIN_PASSWORD=vaultic-demo-password
`}
        </pre>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xl mb-4">Share this discovery with:</p>
        <div className="flex space-x-4 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Twitter</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Discord</button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">LinkedIn</button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .glitch-text {
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 1s infinite;
        }
        
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75); }
          14% { text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75); }
          15% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75); }
          49% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75); }
          50% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75); }
          99% { text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75); }
          100% { text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75), -0.025em -0.05em 0 rgba(0, 0, 255, 0.75); }
        }
        
        .typing-animation p {
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
          animation-fill-mode: forwards;
          width: 0;
        }
        
        .typing-animation p:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-animation p:nth-child(2) {
          animation-delay: 1.2s;
        }
        
        .typing-animation p:nth-child(3) {
          animation-delay: 2.4s;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #4ade80 }
        }
      `}} />
    </div>
  );
}

export default SecurityEasterEgg; 