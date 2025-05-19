// List of sensitive paths that will trigger our easter egg
export const SECURITY_SENSITIVE_PATHS = [
    '/.env',
    '/.git',
    '/.htaccess',
    '/wp-admin',
    '/phpmyadmin',
    '/admin',
    '/wp-login.php',
    '/administrator',
    '/config.php',
    '/robots.txt',
    '/sitemap.xml',
    '/server-status',
    '/xmlrpc.php',
    '/dot-env',
];

// List of specific hidden files (starting with a dot) that are relevant for security
export const SENSITIVE_DOT_FILES = [
    '.env',
    '.git',
    '.htaccess',
    '.ssh',
    '.bash_history',
    '.npmrc',
    '.DS_Store',
    '.svn',
    '.config',
    '.aws',
    '.gitignore'
];

// Secrets for the localStorage easter egg
export const LOCAL_STORAGE_SECRETS = {
    key: "ADMIN_PASSWORD",
    value: "vaultic-demo-password"
};