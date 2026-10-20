export const GATEWAY_LOGOS = {
    ANTOM: 'https://cdn.marmot-cloud.com/storage/intl_website/2026/03/23/EgIXCDK/logo_antom.svg',
    CENTIWISE: 'https://centiwise.com/favicon.ico',
};

export const getGatewayInfo = (name = '', label) => {
    const key = String(name).toUpperCase();
    return {
        name: label || key.charAt(0) + key.slice(1).toLowerCase(),
        logo: GATEWAY_LOGOS[key] || '',
    };
};
