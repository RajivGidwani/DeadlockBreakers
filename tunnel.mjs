import { startTunnel } from 'untun';

async function main() {
  console.log('Starting Cloudflare tunnel on port 5173...');
  try {
    const tunnel = await startTunnel({ port: 5173 });
    const url = await tunnel.getURL();
    console.log('\n=========================================');
    console.log('PUBLIC_TUNNEL_URL: ' + url);
    console.log('=========================================\n');
  } catch (err) {
    console.error('Failed to create tunnel:', err);
  }
}

main();
