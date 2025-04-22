type Theme = 'light' | 'dark';

type ToggleConfig = {
    icon: string;
    message: string;
}

const THEME_KEY = 'theme';

const TOGGLE_META: Record<Theme, ToggleConfig> = {
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

    return getSystemTheme();
}

function setTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

function setButtonProps(button: HTMLButtonElement, theme: Theme) {
    const message = TOGGLE_META[theme].message;
    const icon = TOGGLE_META[theme].icon;

    const iconImage = button.querySelector<HTMLImageElement>("img")!;

    button.title = message;
    button.ariaLabel = message;

    iconImage.src = icon;
    iconImage.alt = message;
}

function toggleTheme(button: HTMLButtonElement) {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (!button) return;

    setButtonProps(button, newTheme);
}

function handleThemeToggleButton(button: HTMLButtonElement) {
    button.addEventListener("click", () => toggleTheme(button));
    setButtonProps(button, getTheme());
}

setTheme(getTheme());

export {handleThemeToggleButton};