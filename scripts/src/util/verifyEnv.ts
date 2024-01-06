export function verifyEnv(name: string) {
  console.log("key", process.env[name], name);
  if (!process.env[name]) {
    throw new Error(`env of ${name} was not set`);
  }
}
