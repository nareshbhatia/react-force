/**
 * An interface representing an environment with environment variables
 */
export interface Env {
    get: (varName: string) => string | undefined;
}

/**
 * Implementation that uses the global window object - window._env_
 */
export class WindowEnv implements Env {
    get(varName: string): string | undefined {
        return (window as any)._env_[varName];
    }
}
