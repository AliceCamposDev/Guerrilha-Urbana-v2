import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const outputPath = path.join(rootDir, 'src', 'environments', 'env.generated.ts');

function parseEnvFile(content) {
  const parsed = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const cleaned = line.startsWith('export ') ? line.slice(7).trim() : line;
    const eqIndex = cleaned.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }

    const key = cleaned.slice(0, eqIndex).trim();
    let value = cleaned.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }
  return parsed;
}

let fileEnv = {};
if (fs.existsSync(envPath)) {
  fileEnv = parseEnvFile(fs.readFileSync(envPath, 'utf8'));
} else {
  console.warn(
    '[env] Arquivo .env nao encontrado. Usando variaveis de ambiente do sistema (ou strings vazias).'
  );
}

const getVar = (name) => process.env[name] ?? fileEnv[name] ?? '';

const firebaseConfig = {
  apiKey: getVar('FIREBASE_API_KEY'),
  authDomain: getVar('FIREBASE_AUTH_DOMAIN'),
  projectId: getVar('FIREBASE_PROJECT_ID'),
  storageBucket: getVar('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getVar('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getVar('FIREBASE_APP_ID'),
  measurementId: getVar('FIREBASE_MEASUREMENT_ID'),
};

const output = `// Arquivo gerado automaticamente por scripts/generate-env.mjs a partir do .env.
// Nao edite manualmente nem faça commit deste arquivo.
export const firebaseConfig = {
  apiKey: ${JSON.stringify(firebaseConfig.apiKey)},
  authDomain: ${JSON.stringify(firebaseConfig.authDomain)},
  projectId: ${JSON.stringify(firebaseConfig.projectId)},
  storageBucket: ${JSON.stringify(firebaseConfig.storageBucket)},
  messagingSenderId: ${JSON.stringify(firebaseConfig.messagingSenderId)},
  appId: ${JSON.stringify(firebaseConfig.appId)},
  measurementId: ${JSON.stringify(firebaseConfig.measurementId)},
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');
