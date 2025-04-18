type Theme = 'light' | 'dark';

type ToggleConfig = {
    icon: string;
    message: string;
}

const THEME_KEY = 'theme';

const THEME_META: Record<Theme, ToggleConfig> = {
    light: {
        icon: '/moon.svg',
        message: 'Switch to dark mode'
    },
    dark: {
        icon: '/sun.svg',
        message: 'Switch to light mode'
    },
}

function getSystemTheme(): Theme {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function getTheme(): Theme {
    let theme = localStorage.getItem(THEME_KEY) as Theme | null;

    if (theme) return theme;

    theme = getSystemTheme();

    return theme;
}

function setTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme(button: HTMLButtonElement) {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (!button) return;

    button.title = THEME_META[newTheme].message;
    button.innerHTML = `<img src="${THEME_META[newTheme].icon}" alt="${THEME_META[newTheme].message}" />`;
}

setTheme(getTheme());

export {getTheme, toggleTheme, THEME_META};