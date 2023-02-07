const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  DATABASE_URL: getEnvironmentVariable('DATABASE_URL'),
  NODE_ENV: getEnvironmentVariable('NODE_ENV'),
  NEXTAUTH_SECRET: getEnvironmentVariable('NEXTAUTH_SECRET'),
  NEXTAUTH_URL: getEnvironmentVariable('NEXTAUTH_URL'),
  DISCORD_CLIENT_ID: getEnvironmentVariable('DISCORD_CLIENT_ID'),
  DISCORD_CLIENT_SECRET: getEnvironmentVariable('DISCORD_CLIENT_SECRET'),
  GITHUB_CLIENT_ID: getEnvironmentVariable('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: getEnvironmentVariable('GITHUB_CLIENT_SECRET'),
};
