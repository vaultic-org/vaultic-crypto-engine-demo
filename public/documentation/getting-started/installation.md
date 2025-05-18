# Installation

## Requirements

- Node.js >= 16.0.0
- npm, yarn, or pnpm

## Installing with npm

You can install Vaultic Crypto Engine using npm:

```bash
npm install vaultic-crypto-engine
```

## Installing with yarn

```bash
yarn add vaultic-crypto-engine
```

## Installing with pnpm

```bash
pnpm add vaultic-crypto-engine
```

## Browser Usage

You can also use Vaultic Crypto Engine directly in the browser via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vaultic-crypto-engine@latest/dist/bundle.js"></script>
<script>
  // The library is available as a global variable
  const { generateRsaKeypairPem } = vaulticCryptoEngine;
  
  async function init() {
    const keypair = await generateRsaKeypairPem();
    console.log(keypair);
  }
  
  init();
</script>
```

## Verifying Installation

To verify that the installation was successful, you can run the following code:

```javascript
import { version } from 'vaultic-crypto-engine';

console.log(`Vaultic Crypto Engine version: ${version}`);
```

## Next Steps

Once you've installed Vaultic Crypto Engine, you can proceed to the [Quick Start Guide](quick-start) to learn the basics of using the library. 