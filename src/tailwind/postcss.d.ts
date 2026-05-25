declare const config: {
    plugins: {
        tailwindcss?: {};
        autoprefixer?: {};
        [key: string]: unknown;
    };
};

export = config;