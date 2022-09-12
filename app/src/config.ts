type Config = {
    ApiMaxRetries: number
}

const devConfig: Config = {
    ApiMaxRetries: 0,
}

const prodConfig: Config = {
    ApiMaxRetries: 3
}

const config: Config = devConfig;

export default config;