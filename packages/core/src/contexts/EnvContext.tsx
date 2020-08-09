import { Env, WindowEnv } from '@react-force/models';
import React, { useContext } from 'react';

const EnvContext = React.createContext<Env | undefined>(undefined);

function useEnv(): Env {
    const env = useContext(EnvContext);
    if (env === undefined) {
        /* istanbul ignore next */
        throw new Error('useEnv must be used within a EnvProvider');
    }
    return env;
}

/**
 * Provides an instance of WindowEnv
 */
const EnvProvider: React.FC = ({ children }) => {
    return (
        <EnvContext.Provider value={new WindowEnv()}>
            {children}
        </EnvContext.Provider>
    );
};

export { EnvProvider, useEnv };
