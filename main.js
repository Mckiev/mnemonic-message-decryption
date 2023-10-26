const { ethers } = require('ethers');
const EthCrypto = require('eth-crypto');

function generateKeys(seedPhrase, derivationPath) {
  const wallet = ethers.Wallet.fromMnemonic(seedPhrase, derivationPath);
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;
  const address = wallet.address;

  return { privateKey, publicKey, address };
}

function generatePrivateKey() {
    const seedPhrase = document.getElementById('mnemonic').value;
    const derivationPath = document.getElementById('derivationPath').value;
    const keys = generateKeys(seedPhrase, derivationPath);
    document.getElementById('generatedPrivateKey').value = keys.privateKey;
    document.getElementById('walletAddress').innerText = keys.address;
}

async function decryptMessage() {
    const privateKey = document.getElementById('generatedPrivateKey').value;
    const encryptedMessage = document.getElementById('encryptedMessageInput').value;
    try {
        const decrypted = await EthCrypto.decryptWithPrivateKey(
            privateKey,
            EthCrypto.cipher.parse(encryptedMessage)
        );
        document.getElementById('decryptedMessage').value = decrypted;
    } catch (error) {
        let errorMessage = 'Decryption failed: ' + error.message;
        if (error.message.toLowerCase().includes('bad mac')) {
            errorMessage += '\nThis usually indicates a wrong private key.';
        }
        alert(errorMessage);
    }
}

window.generatePrivateKey = generatePrivateKey;  // Expose function globally for use in HTML
window.decryptMessage = decryptMessage;  // Expose function globally for use in HTML
