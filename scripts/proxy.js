const http = require('http');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  Allow: 'POST, GET, HEAD, OPTIONS, DELETE, PUT, UPDATE',
};

class ProxyServer {
  constructor({ destUrl, name, serverUrl }) {
    if (!destUrl) throw new Error('destUrl config is required');
    if (!serverUrl) throw new Error('serverUrl config is required');

    this._config = {
      destUrl: new URL(destUrl),
      name: name || 'ProxyServer',
      serverUrl: new URL(serverUrl),
    };

    this._server = http.createServer(this._handleRequest.bind(this));
  }

  async _handleRequest(inputReq, outRes) {
    try {
      const request = await this._normalizeRequest(inputReq);
      await this._proxyRequest(outRes, request);
    } catch (error) {
      console.error(error);
      this._sendResponse(outRes, {
        body: 'Proxy Unexpected Exception',
        headers: {},
        statusCode: 500,
      });
    }
  }

  async _proxyRequest(outRes, request) {
    if (request.method === 'OPTIONS') return this._sendCORSResponse(outRes);

    const proxiedRequest = this._rewriteRequest(request);
    console.log('Proxied Request:', this._serializeRequest(proxiedRequest));

    const proxiedResponse = this._rewriteResponse(await this._sendRequest(proxiedRequest));
    console.log('Proxied Response:', this._serializeResponse(proxiedResponse));
    this._sendResponse(outRes, proxiedResponse);
  }

  async _normalizeRequest(inputReq) {
    return await new Promise((resolve) => {
      const chunks = [];
      inputReq.on('data', (chunk) => {
        chunks.push(chunk);
      });
      inputReq.on('end', () => {
        const path = inputReq.url
          .split('/')
          .filter((part) => !!part)
          .join('/');
        resolve({
          body: Buffer.concat(chunks),
          headers: inputReq.headers,
          method: inputReq.method,
          url: new URL(`${this._config.serverUrl}${path}`),
        });
      });
    });
  }

  async _sendRequest(request) {
    return await new Promise((resolve, reject) => {
      const req = http
        .request(
          Object.assign(request, {
            url: undefined,
            hostname: request.url.hostname,
            path: `${request.url.pathname}${request.url.search}`,
            port: request.url.port,
            protocol: request.url.protocol,
          }),
          (res) => {
            const chunks = [];
            res.on('data', (chunk) => {
              chunks.push(chunk);
            });
            res.on('end', () => {
              const response = {
                body: Buffer.concat(chunks),
                headers: res.headers,
                method: request.method,
                statusCode: res.statusCode,
                url: request.url,
              };
              resolve(response);
            });
          },
        )
        .on('error', (error) => {
          reject(error);
        });
      req.write(request.body);
      req.end();
    });
  }

  _sendCORSResponse(outRes) {
    this._sendResponse(outRes, {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    });
  }

  _sendResponse(outRes, response) {
    outRes.writeHead(response.statusCode, response.headers);
    outRes.end(response.body);
  }

  _rewriteRequest(request) {
    ['origin', 'sec-fetch-dest', 'sec-fetch-mode', 'sec-fetch-site'].forEach((header) => {
      delete request.headers[header];
    });
    return Object.assign(request, {
      url: new URL(`${this._config.destUrl.origin}${request.url.pathname}${request.url.search}`),
      headers: Object.assign(request.headers, {}),
    });
  }

  _rewriteResponse(response) {
    return Object.assign(response, {
      headers: Object.assign(response.headers, CORS_HEADERS),
    });
  }

  _serializeResponse({ headers, method, statusCode, url }) {
    return {
      headers,
      method,
      statusCode,
      url,
    };
  }

  _serializeRequest({ headers, url, method }) {
    return {
      headers,
      method,
      url,
    };
  }

  start() {
    this._server.listen(this._config.serverUrl.port, this._config.serverUrl.hostname, () => {
      console.log(`${this._config.name} is running at ${this._config.serverUrl}`);
    });
  }
}

function main() {
  const DEST_URL = process.env.DEST_URL;
  const PROXY_URL = process.env.PROXY_URL || 'http://localhost:8080';

  const proxyServer = new ProxyServer({
    destUrl: DEST_URL,
    serverUrl: PROXY_URL,
  });
  proxyServer.start();

  process.on('exit', (code) => {
    console.log(`Server stopped with ${code} code`);
  });
}

main();
