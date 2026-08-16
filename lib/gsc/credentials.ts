import fs from "fs";

export type ServiceAccountCredentials = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

const ENV_TO_CREDENTIAL_FIELD = {
  GSC_TYPE: "type",
  GSC_PROJECT_ID: "project_id",
  GSC_PRIVATE_KEY_ID: "private_key_id",
  GSC_PRIVATE_KEY: "private_key",
  GSC_CLIENT_EMAIL: "client_email",
  GSC_CLIENT_ID: "client_id",
  GSC_AUTH_URI: "auth_uri",
  GSC_TOKEN_URI: "token_uri",
  GSC_AUTH_PROVIDER_X509_CERT_URL: "auth_provider_x509_cert_url",
  GSC_CLIENT_X509_CERT_URL: "client_x509_cert_url",
} as const satisfies Record<string, keyof ServiceAccountCredentials>;

type EnvCredentialKey = keyof typeof ENV_TO_CREDENTIAL_FIELD;

function readEnvField(envKey: EnvCredentialKey): string {
  const value = process.env[envKey]?.trim();

  if (!value) {
    throw new Error(`Missing ${envKey} in .env`);
  }

  return value;
}

function parseCredentialsFromEnv(): ServiceAccountCredentials | null {
  if (!process.env.GSC_CLIENT_EMAIL?.trim()) {
    return null;
  }

  const privateKey = readEnvField("GSC_PRIVATE_KEY").replace(/\\n/g, "\n");

  return {
    type: process.env.GSC_TYPE?.trim() || "service_account",
    project_id: readEnvField("GSC_PROJECT_ID"),
    private_key_id: readEnvField("GSC_PRIVATE_KEY_ID"),
    private_key: privateKey,
    client_email: readEnvField("GSC_CLIENT_EMAIL"),
    client_id: readEnvField("GSC_CLIENT_ID"),
    auth_uri: readEnvField("GSC_AUTH_URI"),
    token_uri: readEnvField("GSC_TOKEN_URI"),
    auth_provider_x509_cert_url: readEnvField(
      "GSC_AUTH_PROVIDER_X509_CERT_URL"
    ),
    client_x509_cert_url: readEnvField("GSC_CLIENT_X509_CERT_URL"),
  };
}

export function parseServiceAccountCredentials(): ServiceAccountCredentials {
  const fromEnv = parseCredentialsFromEnv();

  if (fromEnv) {
    return fromEnv;
  }

  const credentialsPath = process.env.GSC_APPLICATION_CREDENTIALS?.trim();

  if (credentialsPath) {
    const content = fs.readFileSync(credentialsPath, "utf-8");
    return JSON.parse(content) as ServiceAccountCredentials;
  }

  const envKeys = Object.keys(ENV_TO_CREDENTIAL_FIELD).join(", ");

  throw new Error(
    `Missing Google credentials. Set service account fields in .env (${envKeys}) ` +
      "or GSC_APPLICATION_CREDENTIALS (file path)."
  );
}
