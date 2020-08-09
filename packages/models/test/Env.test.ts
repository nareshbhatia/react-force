import { Env, WindowEnv } from '../src';

// Set username in window environment
const USERNAME = 'USERNAME';
const usernameValue = 'john';
(window as any)._env_ = {
    USERNAME: usernameValue,
};

const env: Env = new WindowEnv();

describe('Env', () => {
    describe('get()', () => {
        it('return value if environment variable exists', () => {
            expect(env.get(USERNAME)).toEqual(usernameValue);
        });

        it('return default value if environment variable does not exists', () => {
            expect(env.get('SHOW_LOGO', 'Y')).toEqual('Y');
        });

        it('throws if environment variable does not exists and default value is not provided', () => {
            expect(() => env.get('SHOW_LOGO')).toThrow(
                'Environment variable SHOW_LOGO not found'
            );
        });
    });
});
