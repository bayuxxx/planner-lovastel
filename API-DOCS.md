# 🔧 API Documentation

Dokumentasi untuk developer yang ingin extend atau customize aplikasi.

## Data Structure

### Schedule Object
```javascript
{
  id: number,        // Unique identifier (auto-increment)
  m: string,         // Month: 'Mei'|'Juni'|'Juli'|'Agustus'|'September'|'Oktober'|'November'
  d: string,         // Day: '1'-'31'
  t: string,         // Time: 'Subuh'|'Pagi'|'Siang'|'Sore'
  l: string,         // Location: any string
  make: boolean,     // Makeup required
  dbl: boolean       // Double shift
}
```

## Core Functions

### LocalStorage Management

#### `getSchedules()`
Mengambil semua jadwal dari localStorage.

```javascript
const schedules = getSchedules();
// Returns: Array<Schedule>
```

#### `saveSchedules(schedules)`
Menyimpan jadwal ke localStorage dan update view.

```javascript
saveSchedules([
  { id: 1, m: 'Mei', d: '1', t: 'Pagi', l: 'Seteluk', make: true, dbl: false }
]);
```

#### `getDefaultData()`
Mengambil data default untuk first-time load.

```javascript
const defaultData = getDefaultData();
// Returns: Array<Schedule>
```

### View Management

#### `updateView(month)`
Update tampilan untuk bulan tertentu.

```javascript
updateView('Juni'); // Switch to Juni
```

#### `renderFilters()`
Render month filter buttons.

```javascript
renderFilters(); // Re-render month buttons
```

#### `renderCalendar(month)`
Render calendar grid untuk bulan tertentu.

```javascript
renderCalendar('Mei'); // Render Mei calendar
```

#### `renderSchedule(month)`
Render schedule list untuk bulan tertentu.

```javascript
renderSchedule('Juni'); // Render Juni schedules
```

#### `scrollToJob(id)`
Scroll ke jadwal tertentu dengan highlight effect.

```javascript
scrollToJob('Mei-15'); // Scroll to Mei 15
```

### CRUD Operations

#### `openAddModal()`
Buka modal untuk tambah jadwal baru.

```javascript
openAddModal(); // Opens add modal
```

#### `closeModal()`
Tutup modal add/edit.

```javascript
closeModal(); // Closes modal
```

#### `editSchedule(id)`
Buka modal edit untuk jadwal tertentu.

```javascript
editSchedule(5); // Edit schedule with id=5
```

#### `deleteSchedule(id)`
Hapus jadwal dengan konfirmasi.

```javascript
deleteSchedule(5); // Delete schedule with id=5
```

### Alarm System

#### `getTimeInMinutes(timeStr)`
Convert time string ke minutes.

```javascript
getTimeInMinutes('Pagi'); // Returns: 480 (8*60)
```

**Time Mapping:**
- Subuh: 4:30 (270 minutes)
- Pagi: 8:00 (480 minutes)
- Siang: 12:00 (720 minutes)
- Sore: 16:00 (960 minutes)

#### `checkAlarms()`
Check dan trigger alarm untuk jadwal yang akan datang.

```javascript
checkAlarms(); // Check and show notifications
```

#### `showNotification(schedule)`
Tampilkan browser notification untuk jadwal.

```javascript
showNotification({
  id: 1,
  m: 'Mei',
  d: '15',
  t: 'Pagi',
  l: 'Seteluk',
  make: true,
  dbl: false
});
```

#### `renderAlarmList(schedules)`
Render list alarm aktif di alarm panel.

```javascript
renderAlarmList([schedule1, schedule2]);
```

#### `toggleAlarmPanel()`
Toggle visibility alarm panel.

```javascript
toggleAlarmPanel(); // Show/hide alarm panel
```

## Global Variables

```javascript
const calendarSetup = {
  'Mei': { days: 31, startDay: 5 },
  'Juni': { days: 30, startDay: 1 },
  // ... etc
};

const months = ['Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November'];
let activeMonth = 'Mei';
let editingId = null;
```

## Events

### Form Submit
```javascript
document.getElementById('scheduleForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission
});
```

### Alarm Check Interval
```javascript
setInterval(checkAlarms, 60000); // Check every minute
```

## LocalStorage Keys

- `schedules` - Array of schedule objects
- `alarm-{id}-{day}` (sessionStorage) - Alarm shown flag

## Extending the App

### Add New Time Slot

1. Update `getTimeInMinutes()`:
```javascript
const times = {
  'Subuh': 4 * 60 + 30,
  'Pagi': 8 * 60,
  'Siang': 12 * 60,
  'Sore': 16 * 60,
  'Malam': 20 * 60  // NEW
};
```

2. Update form select in `index.html`:
```html
<select id="inputTime">
  <option>Subuh</option>
  <option>Pagi</option>
  <option>Siang</option>
  <option>Sore</option>
  <option>Malam</option> <!-- NEW -->
</select>
```

### Add New Month

1. Update `calendarSetup`:
```javascript
const calendarSetup = {
  // ... existing months
  'Desember': { days: 31, startDay: 1 }  // NEW
};
```

2. Update form select in `index.html`:
```html
<select id="inputMonth">
  <!-- ... existing months -->
  <option>Desember</option> <!-- NEW -->
</select>
```

### Custom Alarm Time

Modify `checkAlarms()`:
```javascript
// Change from 30 to custom minutes
const timeDiff = scheduleMinutes - currentMinutes;
return timeDiff > 0 && timeDiff <= 60; // 60 minutes instead of 30
```

### Export Data

Add export function:
```javascript
function exportData() {
  const schedules = getSchedules();
  const dataStr = JSON.stringify(schedules, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'schedules-backup.json';
  a.click();
}
```

### Import Data

Add import function:
```javascript
function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const schedules = JSON.parse(e.target.result);
      saveSchedules(schedules);
      alert('Data imported successfully!');
    } catch (err) {
      alert('Invalid file format!');
    }
  };
  reader.readAsText(file);
}
```

## Service Worker API

### Cache Management

```javascript
// In sw.js
const CACHE_NAME = 'lovastel-planner-v1';
const urlsToCache = [/* ... */];
```

### Update Cache Version

Change `CACHE_NAME` to force cache update:
```javascript
const CACHE_NAME = 'lovastel-planner-v2'; // Increment version
```

## PWA Manifest

Edit `manifest.json` untuk customize:
```json
{
  "name": "Your App Name",
  "short_name": "App",
  "theme_color": "#your-color",
  "background_color": "#your-color"
}
```

## Styling API

### CSS Variables (Add to styles.css)

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e3a8a;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
}
```

### Custom Animations

```css
@keyframes your-animation {
  from { /* ... */ }
  to { /* ... */ }
}

.your-class {
  animation: your-animation 0.3s ease-out;
}
```

## Testing

### Manual Testing Checklist

- [ ] Add schedule
- [ ] Edit schedule
- [ ] Delete schedule
- [ ] Month filter
- [ ] Calendar click
- [ ] Alarm notification
- [ ] PWA install
- [ ] Offline mode
- [ ] Data persistence

### Browser Console Testing

```javascript
// Get all schedules
console.log(getSchedules());

// Add test schedule
const schedules = getSchedules();
schedules.push({
  id: 999,
  m: 'Mei',
  d: '25',
  t: 'Pagi',
  l: 'Test Location',
  make: false,
  dbl: false
});
saveSchedules(schedules);

// Clear all data
localStorage.clear();
location.reload();
```

## Performance Tips

1. **Minimize DOM operations** - Batch updates
2. **Use event delegation** - Instead of multiple listeners
3. **Debounce frequent operations** - Like search/filter
4. **Lazy load images** - If adding image support
5. **Optimize animations** - Use transform/opacity only

## Security Considerations

1. **XSS Prevention** - Always sanitize user input
2. **LocalStorage limits** - Max ~5-10MB per domain
3. **No sensitive data** - LocalStorage is not encrypted
4. **HTTPS required** - For PWA and notifications

---

Happy coding! 🚀
