import { exec } from 'shelljs';

export const safeExec = (command: string, silent = true) => {
  const { code, stderr, stdout } = exec(command, { silent });
  if (code !== 0) {
    console.error(stderr);
    throw new Error(`Command ${command} failed with exit code ${code}`);
  }
  return [stdout, stderr];
};
