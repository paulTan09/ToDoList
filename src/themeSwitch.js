// Theme creation
const themes = { /* MODAL IS 1e1e1e ON DARK MODE SO it should be f0f0f0 on light mode (identical scheme)*/
    light: {
        background: '#ffffff',
        sidebar: '#f0f0f0',
        text: '#000000',
        modalBg: '#f0f0f0',
        cardBg: '#f5f5f5'
    },
    dark: {
        background: '#121212',
        sidebar: '#1e1e1e',
        text: '#e5e5e2',
        modalBg: '#1e1e1e',
        cardBg: '#2e2e2e'
    }
};

// Function to apply theme
function applyTheme(themeName) {
    let theme;
    
    if (themeName === 'auto') {
        // Check system theme preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = themes[prefersDark ? 'dark' : 'light'];
    } else {
        theme = themes[themeName];
    }

    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--sidebar-color', theme.sidebar);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--modal-color', theme.modalBg);
    document.documentElement.style.setProperty('--card-color', theme.cardBg);
    
    // Save theme preference
    localStorage.setItem('preferredTheme', themeName);
}

// Function to handle system theme changes
function handleSystemThemeChange(e) {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme === 'auto') {
        applyTheme('auto');
    }
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', handleSystemThemeChange);

// Add click event listeners to theme options
document.querySelectorAll('.dropdown-menu a[data-theme]').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedTheme = e.target.dataset.theme;

        // Remove active class from all options
        document.querySelectorAll('.dropdown-menu a').forEach(el => el.classList.remove('active'));

        applyTheme(selectedTheme);
        e.target.classList.add('active');
        localStorage.setItem('preferredTheme', selectedTheme);
    });
});

// Load saved theme preference OR default to auto
const savedTheme = localStorage.getItem('preferredTheme') || 'auto';
applyTheme(savedTheme);

// Set active class on the correct dropdown item
document.querySelectorAll('.dropdown-menu a').forEach(el => el.classList.remove('active'));
const activeOption = document.querySelector(`.dropdown-menu a[data-theme="${savedTheme}"]`);
if (activeOption) {
    activeOption.classList.add('active');
}