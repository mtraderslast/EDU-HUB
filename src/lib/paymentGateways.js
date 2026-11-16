export const GATEWAY_LOGOS = {
    ANTOM: 'https://cdn.marmot-cloud.com/storage/intl_website/2026/03/23/EgIXCDK/logo_antom.svg',
    CENTIWISE: 'https://centiwise.com/favicon.ico',
    DODO: 'https://www.dodopayments.com/favicon.ico',
};

const GATEWAY_DISPLAY_NAMES = {
    DODO: 'Dodo Payments',
};

export const getGatewayInfo = (name = '', label) => {
    const key = String(name).toUpperCase();
    return {
        name: label || GATEWAY_DISPLAY_NAMES[key] || key.charAt(0) + key.slice(1).toLowerCase(),
        logo: GATEWAY_LOGOS[key] || '',
    };
};
