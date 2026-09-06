import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';
import { createRequire } from 'module';

async function getWebSocketConstructor() {
  if (typeof globalThis.WebSocket === 'function') {
    return globalThis.WebSocket;
  }
  try {
    const wsMod = await import('ws');
    const ws = wsMod.WebSocket || wsMod.default;
    if (typeof ws === 'function') return ws;
  } catch {}

  try {
    const require = createRequire(import.meta.url);
    const wsMod = require('ws');
    const ws = wsMod.WebSocket || wsMod;
    if (typeof ws === 'function') return ws;
  } catch {}

  try {
    const requireCwd = createRequire(process.cwd() + '/package.json');
    const wsMod = requireCwd('ws');
    const ws = wsMod.WebSocket || wsMod;
    if (typeof ws === 'function') return ws;
  } catch {}

  return null;
}

async function main() {
  let chrome = null;
  let ws = null;

  try {
    chrome = spawn('google-chrome', [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=1440,900',
      'https://lauphatloi.github.io/test/'
    ]);

    // Chờ Chrome khởi động và tải trang
    await new Promise(r => setTimeout(r, 4000));

    const targets = await new Promise((resolve, reject) => {
      const req = http.get('http://127.0.0.1:9222/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse targets: ${e.message}`));
          }
        });
      });
      req.on('error', reject);
    });

    const page = targets.find(t => t.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      throw new Error('Page target not found hoặc thiếu webSocketDebuggerUrl');
    }

    const WebSocket = await getWebSocketConstructor();
    if (typeof WebSocket !== 'function') {
      throw new TypeError(
        'WebSocket is not a constructor. Please install "ws" (npm i -D ws) or run Node with --experimental-websocket.'
      );
    }

    ws = new WebSocket(page.webSocketDebuggerUrl);

    // Chờ WebSocket mở kết nối
    await new Promise((resolve, reject) => {
      if (ws.readyState === 1) return resolve();
      const onOpen = () => { cleanup(); resolve(); };
      const onError = (err) => { cleanup(); reject(err); };
      const cleanup = () => {
        if (typeof ws.off === 'function') {
          ws.off('open', onOpen);
          ws.off('error', onError);
        } else if (typeof ws.removeEventListener === 'function') {
          ws.removeEventListener('open', onOpen);
          ws.removeEventListener('error', onError);
        }
      };

      if (typeof ws.on === 'function') {
        ws.once('open', onOpen);
        ws.once('error', onError);
      } else if (typeof ws.addEventListener === 'function') {
        ws.addEventListener('open', onOpen, { once: true });
        ws.addEventListener('error', onError, { once: true });
      }
    });

    let id = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const curId = id++;
      const handler = (msg) => {
        try {
          const raw = typeof msg === 'object' && msg !== null && 'data' in msg ? msg.data : msg;
          const data = JSON.parse(raw.toString());
          if (data.id === curId) {
            if (typeof ws.off === 'function') {
              ws.off('message', handler);
            } else if (typeof ws.removeEventListener === 'function') {
              ws.removeEventListener('message', handler);
            }
            if (data.error) {
              reject(new Error(data.error.message || JSON.stringify(data.error)));
            } else {
              resolve(data.result);
            }
          }
        } catch (e) {
          // Bỏ qua tin nhắn không parse được
        }
      };

      if (typeof ws.on === 'function') {
        ws.on('message', handler);
      } else if (typeof ws.addEventListener === 'function') {
        ws.addEventListener('message', handler);
      }

      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    // Đánh giá trang
    const info = await send('Runtime.evaluate', {
      expression: `
        JSON.stringify({
          theme: document.documentElement.getAttribute('data-theme'),
          classList: Array.from(document.documentElement.classList),
          hasFixedToggle: !!document.querySelector('.fixed.bottom-5.left-5'),
          toggleHTML: document.querySelector('.fixed.bottom-5.left-5')?.outerHTML,
          hasBikeInPortal: !!document.querySelector('#banner div[style*="circle"] img[src*="motorcycle"]'),
          portalHeading: document.querySelector('#banner h2')?.textContent,
          colorsMarginTop: document.querySelector('#colors')?.style.marginTop,
        })
      `
    });
    console.log('Live site evaluation:', info?.result?.value);

    // Capture initial screenshot
    const res = await send('Page.captureScreenshot', { format: 'png' });
    if (res?.data) {
      fs.writeFileSync('/home/ubuntu24_04/.gemini/antigravity-cli/brain/3fc39924-8cbf-4c14-9e4b-aff26b7234c6/screenshot-live-gh-pages.png', Buffer.from(res.data, 'base64'));
    }

    // Scroll to showroom portal
    console.log('Scrolling to live showroom portal...');
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 1400, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 800));

    const snapShowroom = await send('Page.captureScreenshot', { format: 'png' });
    if (snapShowroom?.data) {
      fs.writeFileSync('/home/ubuntu24_04/.gemini/antigravity-cli/brain/3fc39924-8cbf-4c14-9e4b-aff26b7234c6/screenshot-live-showroom.png', Buffer.from(snapShowroom.data, 'base64'));
      console.log('Saved screenshot-live-showroom.png');
    }

    // Scroll to layer overlap
    console.log('Scrolling to live layer overlap...');
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 2050, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 800));

    const snapOverlap = await send('Page.captureScreenshot', { format: 'png' });
    if (snapOverlap?.data) {
      fs.writeFileSync('/home/ubuntu24_04/.gemini/antigravity-cli/brain/3fc39924-8cbf-4c14-9e4b-aff26b7234c6/screenshot-live-overlap.png', Buffer.from(snapOverlap.data, 'base64'));
      console.log('Saved screenshot-live-overlap.png');
    }

    // Scroll to live Design Section
    console.log('Scrolling to live Design Section...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.querySelector('#design');
          if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1500));

    const snapDesign = await send('Page.captureScreenshot', { format: 'png' });
    if (snapDesign?.data) {
      fs.writeFileSync('/home/ubuntu24_04/.gemini/antigravity-cli/brain/3fc39924-8cbf-4c14-9e4b-aff26b7234c6/screenshot-live-design.png', Buffer.from(snapDesign.data, 'base64'));
      console.log('Saved screenshot-live-design.png');
    }
  } catch (err) {
    console.error('[test-live-site] Lỗi trong quá trình thực thi:', err.message || err);
    process.exitCode = 1;
    throw err;
  } finally {
    if (ws) {
      try {
        if (typeof ws.close === 'function') ws.close();
      } catch {}
    }
    if (chrome && !chrome.killed) {
      try {
        chrome.kill('SIGKILL');
      } catch {}
    }
  }
}

main()
  .then(() => {
    console.log('[test-live-site] Hoàn thành thành công.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[test-live-site] Script tự thoát với mã lỗi:', err.message || err);
    process.exit(1);
  });
