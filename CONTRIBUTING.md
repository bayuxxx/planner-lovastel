# 🤝 Contributing Guide

Terima kasih ingin berkontribusi ke Lovastel Planner 2026!

## 🎯 Cara Berkontribusi

### 1. Fork & Clone
```bash
# Fork repository di GitHub
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/lovastel-planner.git
cd lovastel-planner
```

### 2. Buat Branch Baru
```bash
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/nama-bug
```

### 3. Develop & Test
```bash
# Jalankan server
./start-server.sh  # Mac/Linux
# atau
start-server.bat   # Windows

# Test di browser
# Buka http://localhost:8000
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: deskripsi fitur baru"
# atau
git commit -m "fix: deskripsi bug fix"
```

### 5. Push & Pull Request
```bash
git push origin feature/nama-fitur
# Buat Pull Request di GitHub
```

## 📝 Commit Message Convention

Gunakan format:
```
<type>: <description>

[optional body]
[optional footer]
```

### Types:
- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples:
```bash
feat: add dark mode toggle
fix: alarm not triggering on iOS
docs: update installation guide
style: format code with prettier
refactor: simplify calendar rendering
test: add unit tests for CRUD operations
chore: update dependencies
```

## 🎨 Code Style

### JavaScript
```javascript
// Use const/let, not var
const schedules = getSchedules();
let activeMonth = 'Mei';

// Use arrow functions
const getSchedules = () => {
  return JSON.parse(localStorage.getItem('schedules'));
};

// Use template literals
const message = `Jadwal ${month} ${day}`;

// Use destructuring
const { id, m, d, t, l } = schedule;

// Use meaningful names
const scheduleList = []; // Good
const arr = []; // Bad
```

### HTML
```html
<!-- Use semantic HTML -->
<header>...</header>
<main>...</main>
<footer>...</footer>

<!-- Use kebab-case for IDs -->
<div id="schedule-list"></div>

<!-- Use descriptive names -->
<button onclick="openAddModal()">Add</button>
```

### CSS
```css
/* Use BEM-like naming */
.schedule-card { }
.schedule-card__title { }
.schedule-card--active { }

/* Group related properties */
.element {
  /* Positioning */
  position: relative;
  top: 0;
  
  /* Display & Box Model */
  display: flex;
  width: 100%;
  
  /* Typography */
  font-size: 16px;
  
  /* Visual */
  background: white;
  
  /* Animation */
  transition: all 0.3s;
}
```

## 🧪 Testing

### Manual Testing
1. Test di Chrome/Edge
2. Test di Firefox
3. Test di Safari (jika ada)
4. Test di mobile (responsive)
5. Test offline mode (PWA)
6. Test notifications

### Test Checklist
- [ ] Add schedule works
- [ ] Edit schedule works
- [ ] Delete schedule works
- [ ] Calendar navigation works
- [ ] Month filter works
- [ ] Alarm triggers correctly
- [ ] Data persists after refresh
- [ ] PWA installs correctly
- [ ] Offline mode works
- [ ] No console errors

## 📋 Pull Request Checklist

- [ ] Code follows style guide
- [ ] Tested manually
- [ ] No console errors/warnings
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main
- [ ] Screenshots added (for UI changes)

## 🐛 Bug Reports

Gunakan template:

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

Gunakan template:

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want.

**Describe alternatives you've considered**
Alternative solutions or features.

**Additional context**
Any other context or screenshots.
```

## 🎯 Priority Areas

Kontribusi yang sangat dibutuhkan:

### High Priority
- [ ] Export/Import data
- [ ] Dark mode
- [ ] Search/filter schedules
- [ ] Recurring events
- [ ] Unit tests

### Medium Priority
- [ ] Custom alarm time
- [ ] Multiple alarms
- [ ] Statistics dashboard
- [ ] Print schedule
- [ ] Share schedule

### Low Priority
- [ ] Themes/customization
- [ ] Keyboard shortcuts
- [ ] Drag & drop
- [ ] Calendar sync
- [ ] Multi-language

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JavaScript Guide](https://javascript.info/)

## 🤔 Questions?

- Open an issue
- Email: [your-email]
- Discord: [your-discord]

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
