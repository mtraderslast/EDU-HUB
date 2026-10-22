const YOUTUBE_HOSTS = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
    'www.youtu.be',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com'
]);

export const isYouTubeUrl = (value) => {
    try {
        const parsed = new URL(value);
        const host = parsed.hostname.toLowerCase();

        if (!YOUTUBE_HOSTS.has(host)) {
            return false;
        }

        const normalizedHost = host.replace(/^www\./, '');
        const path = parsed.pathname;

        if (normalizedHost === 'youtu.be') {
            return path.replace(/^\//, '').length > 0;
        }

        return (
            parsed.searchParams.has('v') ||
            path.startsWith('/embed/') ||
            path.startsWith('/live/') ||
            path.startsWith('/shorts/') ||
            path.startsWith('/watch')
        );
    } catch {
        return false;
    }
};

export const getYouTubeVideoId = (value) => {
    if (!value) {
        return null;
    }

    try {
        const parsed = new URL(value.trim());
        const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
        const segments = parsed.pathname.split('/').filter(Boolean);

        if (host === 'youtu.be') {
            return segments[0] || null;
        }

        const fromQuery = parsed.searchParams.get('v');
        if (fromQuery) {
            return fromQuery;
        }

        if (['embed', 'live', 'shorts'].includes(segments[0])) {
            return segments[1] || null;
        }

        return null;
    } catch {
        return null;
    }
};

export const toYouTubeEmbedUrl = (value) => {
    const videoId = getYouTubeVideoId(value);
    if (!videoId) {
        return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
};
