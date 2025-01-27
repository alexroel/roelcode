document.addEventListener('astro:page-load', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  setupThemeToggle();
});

function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('theme-toggle-moon-icon');
  const sunIcon = document.getElementById('theme-toggle-sun-icon');

  function updateTheme() {
    if (document.documentElement.classList.contains('dark')) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  updateTheme();

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateTheme();
  });
}