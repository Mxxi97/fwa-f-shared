export function getEnvVars(envVarNames: string[]): Record<string, string> {
    const missingEnvVars: string[] = [];

    const envVars = envVarNames.reduce((acc, envVarName) => {
        const envVarValue = process.env[envVarName];

        if (!envVarValue) {
            missingEnvVars.push(envVarName);
            return acc;
        }

        return { ...acc, [envVarName]: envVarValue };
    }, {});

    if (missingEnvVars.length > 0) {
        const errorMessage = `Missing required environment variables: ${missingEnvVars.join(', ')}`;
        throw new Error(errorMessage);
    }

    return envVars;
}
