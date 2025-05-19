import { useState } from 'react';

function SecurityEasterEgg() {
  const [showKey, setShowKey] = useState(false);
  
  const storePrivateKeyInIndexedDB = () => {
    // Store private key in IndexedDB for later retrieval
    if (window.indexedDB) {
      const request = window.indexedDB.open("VaulticSecretDatabase", 1);
      
      request.onupgradeneeded = function() {
        const db = request.result;
        if (!db.objectStoreNames.contains('secrets')) {
          db.createObjectStore('secrets', { keyPath: 'id' });
        }
      };
      
      request.onsuccess = function() {
        const db = request.result;
        const transaction = db.transaction(['secrets'], 'readwrite');
        const objectStore = transaction.objectStore('secrets');
        
        const privateKeyData = {
          id: 'admin_private_key',
          key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD5HfhP9y+Jeuc3
VZGjpNO6JYhp7fyrT9nvlW0W4+KFLiOLjq3E9W//YlzhTtwvXnnzMPzig4FeJVDY
nErj2QC0l8id0nkQmWKG45f9veVoIJEPrbx7vcWNISJn6hsgrW+AEavUIhLCNRyT
A2xR8VDNk3mEOuN4ptsQpWVnoUSK+rya2Tudvi0UVmCkOnwK7kQ4KlEu7q/TEc0s
etIJbmY+XXtmpjDPMKmfS9LK+tECMeqpyzaO7qsJEz+Ec3ZG5cT11UCcXyUbGh/8
hzy6OG0AJEKSlm9cVcsrnKlSRLLcpE6nytoEAZaO+BwHCTYyMUtjTqWru0lPwUEq
JYKqi3w5AgMBAAECggEAZHrkJ0zqjadXD4iiH8Fh7Rkqdp+ZZHfmza4VvD/apCFC
EQ5RpLninL3N/MrUIP8YbTD7L1ofmhuvCk+wHUrv7+ew8YdtcXaMuR+ftKcdmuxX
1l0bQ0X+IriUqhlRK9MIwD1gc0XzDwZhKiMdU8fj8adkQiOGkKmsfoBX8H6pqOxB
3hfFudGOtH1LpBROK9P8fwxXKnvpmzzDOTByZD6EfVBL6JH7oO7EPF38FnT7Rou2
wAwNiNWcnZZEboYoKCpnzKfdesMC3IlPjGwOvbynU2GVSRoz5PHFo4Bay1JK2o8g
lHaYApNaBHJB6vENqarHVB73k21hL47rqKOzUb6QAQKBgQD5X+4mrPFkcRELn0Dh
uK1YeaSfpwFv/8qBfdcfY2nso1o+SAUJDAY2JSkaMulMlIlfXHZiiZhPQ43xcqfX
yu+rQLPL8koLIBzunpJfwVi7UaXScSUqni1p5mnkrAP/DGkyKmmHhyawt6YWxCGY
POY5JpIIIW9KzDgkCAm+XuC1OQKBgQD/vEmLz+Yh95WEuzfpEwgbxPHUGL0AEiCX
iBksw2kq1V0jReQ6bNqP4WO9BnYaYz9ljeFknwTqzMt/fdR20Dr6FknvhA5sPrON
FPBvjwcyT47CdiraQqUXXYGnvBIyHEEfv2rFC0MY5lQlyiYnVeHUcQLF1+E58rti
SOkn71//AQKBgAJJb+yo31nVc5uQrU6km+pYyzqvlGLLjLbdSZC/H6SM5vH1RR6N
Hq12b8cOunb6UbwvI+LJcj0f2HhjXcir0sDWSg/PvAAYHkvN5ne8VSz6lbO1V+rp
Im97LnNrZGn9WiWcn/UfNyqdtIc26zvzKwVRJjuu2s9rygQCktxNEHB5AoGBAKQT
6hwKB11DvGqss/KWg11NvtqWBK1G9CJE7+IIfjE9M8St0wCpVpF5ysQ8oQnNI5/E
qBgm7sC3JNlnoimY8D4EjutdjuNkV07tYFYzLirZYH7j0hq3J7UWCVnVENeVyTLV
XWuPDj2ridG1IUWblIj4+Q52s8q6Mf+dR/qXWsABAoGARzoXFz8lLOzKxOwNxg1S
zyEF967iojdoaNRbqScHkh6tfPR/9n7U9QWmWc0YJ/FtkjvwORWYyHTApGX4Cd8A
EA5sLCzxpBG3h1prP1Y9fln2CphD3ujJps6oJq+xhmEiz7KBDWd7FpuVgCnrv/2G
9bqfsGL9GQSx5EX/J6uECao=
-----END PRIVATE KEY-----`
        };
        
        objectStore.put(privateKeyData);
        
        transaction.oncomplete = function() {
          console.log("Private key stored in IndexedDB");
        };
      };
    }
  };
  
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
      
      {/* Hidden button that can be revealed by modifying CSS in dev tools */}
      <button 
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
        style={{ display: 'none' }} // Users need to change this to display: block
        onClick={() => {
          setShowKey(true);
          storePrivateKeyInIndexedDB();
        }}
      >
        REVEAL SECRET KEY
      </button>
      
      {/* Secret key panel that appears when the hidden button is clicked */}
      {showKey && (
        <div className="mt-4 p-4 border border-red-500 rounded-md bg-black bg-opacity-80 max-w-3xl animate-pulse">
          <h3 className="text-red-400 mb-2">🔑 SECRET PRIVATE KEY REVEALED 🔑</h3>
          <pre className="bg-gray-900 p-4 rounded text-xs overflow-auto text-red-300">
{`-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD5HfhP9y+Jeuc3
VZGjpNO6JYhp7fyrT9nvlW0W4+KFLiOLjq3E9W//YlzhTtwvXnnzMPzig4FeJVDY
nErj2QC0l8id0nkQmWKG45f9veVoIJEPrbx7vcWNISJn6hsgrW+AEavUIhLCNRyT
A2xR8VDNk3mEOuN4ptsQpWVnoUSK+rya2Tudvi0UVmCkOnwK7kQ4KlEu7q/TEc0s
etIJbmY+XXtmpjDPMKmfS9LK+tECMeqpyzaO7qsJEz+Ec3ZG5cT11UCcXyUbGh/8
hzy6OG0AJEKSlm9cVcsrnKlSRLLcpE6nytoEAZaO+BwHCTYyMUtjTqWru0lPwUEq
JYKqi3w5AgMBAAECggEAZHrkJ0zqjadXD4iiH8Fh7Rkqdp+ZZHfmza4VvD/apCFC
EQ5RpLninL3N/MrUIP8YbTD7L1ofmhuvCk+wHUrv7+ew8YdtcXaMuR+ftKcdmuxX
1l0bQ0X+IriUqhlRK9MIwD1gc0XzDwZhKiMdU8fj8adkQiOGkKmsfoBX8H6pqOxB
3hfFudGOtH1LpBROK9P8fwxXKnvpmzzDOTByZD6EfVBL6JH7oO7EPF38FnT7Rou2
wAwNiNWcnZZEboYoKCpnzKfdesMC3IlPjGwOvbynU2GVSRoz5PHFo4Bay1JK2o8g
lHaYApNaBHJB6vENqarHVB73k21hL47rqKOzUb6QAQKBgQD5X+4mrPFkcRELn0Dh
uK1YeaSfpwFv/8qBfdcfY2nso1o+SAUJDAY2JSkaMulMlIlfXHZiiZhPQ43xcqfX
yu+rQLPL8koLIBzunpJfwVi7UaXScSUqni1p5mnkrAP/DGkyKmmHhyawt6YWxCGY
POY5JpIIIW9KzDgkCAm+XuC1OQKBgQD/vEmLz+Yh95WEuzfpEwgbxPHUGL0AEiCX
iBksw2kq1V0jReQ6bNqP4WO9BnYaYz9ljeFknwTqzMt/fdR20Dr6FknvhA5sPrON
FPBvjwcyT47CdiraQqUXXYGnvBIyHEEfv2rFC0MY5lQlyiYnVeHUcQLF1+E58rti
SOkn71//AQKBgAJJb+yo31nVc5uQrU6km+pYyzqvlGLLjLbdSZC/H6SM5vH1RR6N
Hq12b8cOunb6UbwvI+LJcj0f2HhjXcir0sDWSg/PvAAYHkvN5ne8VSz6lbO1V+rp
Im97LnNrZGn9WiWcn/UfNyqdtIc26zvzKwVRJjuu2s9rygQCktxNEHB5AoGBAKQT
6hwKB11DvGqss/KWg11NvtqWBK1G9CJE7+IIfjE9M8St0wCpVpF5ysQ8oQnNI5/E
qBgm7sC3JNlnoimY8D4EjutdjuNkV07tYFYzLirZYH7j0hq3J7UWCVnVENeVyTLV
XWuPDj2ridG1IUWblIj4+Q52s8q6Mf+dR/qXWsABAoGARzoXFz8lLOzKxOwNxg1S
zyEF967iojdoaNRbqScHkh6tfPR/9n7U9QWmWc0YJ/FtkjvwORWYyHTApGX4Cd8A
EA5sLCzxpBG3h1prP1Y9fln2CphD3ujJps6oJq+xhmEiz7KBDWd7FpuVgCnrv/2G
9bqfsGL9GQSx5EX/J6uECao=
-----END PRIVATE KEY-----`}
          </pre>
          <p className="text-xs text-red-400 mt-2">This key has also been stored in your browser's IndexedDB.</p>
          <p className="text-xs text-yellow-400 mt-2">Hint: Try checking the source code of this page for more secrets...</p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-xl mb-4">Share this discovery with:</p>
        <div className="flex space-x-4 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Twitter</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Discord</button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">LinkedIn</button>
        </div>
      </div>

      {/* Hidden message in HTML comment that can be seen in view-source */}
      {/* <!-- 
        ENCRYPTED MESSAGE FOR ADMIN ACCESS:
        jArsOjqfFOxmnWDLEmKMqy+We6fYQChVpKAqROt9gEHUfJbex8Xg6bwxyvpRC2yKGYtuFjJF/v1jdakBNLTfONb+vRpSr/3rFvOXilcF2KcEkGyy/YOEWHdeNjNDmfCdhSxiqj6uAsoPY8r1Bw2Bzo4nNhJ4/nIUAYy1WnI+P0D5/KcVHDZu+gjpPXzDmlgB90xhFwsLZ2EzT8hrkF+qiXbvPFUe+BDw1Z2lxkIu6Tbd/ArfKk/RSfQ6eGN8sbLSxySL2/StUNIwWuZGo4j8zQqSYS1L7EH57o9QfAWh8l8xjRfOJiifZg5XPu0taXtoeZw369ynfE0mkRtEJZAEjQ==
        
        Hint: Try the private key with our crypto demo...
      --> */}

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