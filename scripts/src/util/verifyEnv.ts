export function verifyEnv(name: string) {
  if (!process.env[name]) {
    throw new Error(`env of ${name} was not set`);
  }
}
