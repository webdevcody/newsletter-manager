export function verifyEnv(name: string) {
  console.log(process.env[name]);
  if (!process.env[name]) {
    throw new Error(`env of ${name} was not set`);
  }
}
