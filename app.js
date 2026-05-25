// Data Kalender 2026
const calendarSetup = {
    'Mei': { days: 31, startDay: 5 },
    'Juni': { days: 30, startDay: 1 },
    'Juli': { days: 31, startDay: 3 },
    'Agustus': { days: 31, startDay: 6 },
    'September': { days: 30, startDay: 2 },
    'Oktober': { days: 31, startDay: 4 },
    'November': { days: 30, startDay: 0 }
};

const months = Object.keys(calendarSetup);
let activeMonth = 'Mei';
let editingId = null;

// LocalStorage Management
function getSchedules() {
    const data = localStorage.getItem('schedules');
    return data ? JSON.parse(data) : getDefaultData();
}

function saveSchedules(schedules) {
    localStorage.setItem('schedules', JSON.stringify(schedules));
    updateView(activeMonth);
    checkAlarms();
}

function getDefaultData() {
    // Data default lengkap dari jadwal asli
    return [
        { id: 1, m: 'Mei', d: '1', t: 'Pagi', l: 'Seteluk', make: true, dbl: false },
        { id: 2, m: 'Mei', d: '2', t: 'Subuh', l: 'Seteluk', make: true, dbl: false },
        { id: 3, m: 'Mei', d: '2', t: 'Sore', l: 'Seteluk', make: true, dbl: true },
        { id: 4, m: 'Mei', d: '2', t: 'Sore', l: 'Benete', make: true, dbl: true },
        { id: 5, m: 'Mei', d: '3', t: 'Subuh', l: 'Benete', make: true, dbl: false },
        { id: 6, m: 'Mei', d: '3', t: 'Pagi', l: 'Seteluk', make: false, dbl: false },
        { id: 7, m: 'Mei', d: '8', t: 'Sore', l: 'Taliwang', make: false, dbl: true },
        { id: 8, m: 'Mei', d: '8', t: 'Sore', l: 'Taliwang', make: false, dbl: true },
        { id: 9, m: 'Mei', d: '9', t: 'Subuh', l: 'Taliwang', make: false, dbl: false },
        { id: 10, m: 'Mei', d: '10', t: 'Subuh', l: 'Seteluk', make: false, dbl: false },
        { id: 11, m: 'Mei', d: '10', t: 'Pagi', l: 'Taliwang', make: false, dbl: false },
        { id: 12, m: 'Mei', d: '11', t: 'Pagi', l: 'Tepas', make: false, dbl: false },
        { id: 13, m: 'Mei', d: '15', t: 'Sore', l: 'Taliwang', make: true, dbl: false },
        { id: 14, m: 'Mei', d: '16', t: 'Subuh', l: 'Taliwang', make: true, dbl: false },
        { id: 15, m: 'Mei', d: '16', t: 'Sore', l: 'Taliwang', make: false, dbl: false },
        { id: 16, m: 'Juni', d: '1', t: 'Subuh', l: 'Utan', make: true, dbl: false },
        { id: 17, m: 'Juni', d: '3', t: 'Sore', l: 'Mura', make: true, dbl: false },
        { id: 18, m: 'Juni', d: '5', t: 'Sore', l: 'Maluk', make: true, dbl: false },
        { id: 19, m: 'Juli', d: '17', t: 'Sore', l: 'Sekongkang', make: true, dbl: false },
        { id: 20, m: 'Juli', d: '18', t: 'Pagi', l: 'Taliwang', make: false, dbl: false }
    ];
}

// Initialize
function init() {
    if (!localStorage.getItem('schedules')) {
        saveSchedules(getDefaultData());
    }
    renderFilters();
    updateView(activeMonth);
    setupFormHandler();
    checkAlarms();
    requestNotificationPermission();
    setInterval(checkAlarms, 60000); // Check every minute
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// View Management
function updateView(month) {
    activeMonth = month;
    document.getElementById('calendarTitle').innerText = `${month} 2026`;
    renderFilters();
    renderCalendar(month);
    renderSchedule(month);
}

function renderFilters() {
    const container = document.getElementById('monthFilter');
    container.innerHTML = '';
    months.forEach(month => {
        const btn = document.createElement('button');
        const isActive = month === activeMonth;
        btn.className = `px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${isActive ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 shadow-sm hover:bg-slate-100'}`;
        btn.innerText = month;
        btn.onclick = () => updateView(month);
        container.appendChild(btn);
    });
}

function renderCalendar(month) {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    const config = calendarSetup[month];
    const schedules = getSchedules();
    const jobsThisMonth = schedules.filter(j => j.m === month);

    for (let i = 0; i < config.startDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= config.days; day++) {
        const dayJobs = jobsThisMonth.filter(j => parseInt(j.d) === day);
        const hasJob = dayJobs.length > 0;
        
        let dotColors = [];
        if (hasJob) {
            if (dayJobs.some(j => j.dbl)) dotColors.push('bg-orange-500');
            if (dayJobs.some(j => j.make)) dotColors.push('bg-pink-500');
            if (dotColors.length === 0) dotColors.push('bg-blue-500');
        }

        const dotsHtml = hasJob ? `<div class="flex justify-center gap-0.5 mt-1">` + 
            dotColors.slice(0, 2).map(c => `<div class="w-1.5 h-1.5 rounded-full ${c}"></div>`).join('') + 
            `</div>` : `<div class="h-2.5"></div>`;

        const btnClass = hasJob ? 
            'w-full aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition active:scale-95 bg-white shadow-sm border border-slate-100 hover:border-blue-300 text-slate-800 font-bold' : 
            'w-full aspect-square rounded-xl flex flex-col items-center justify-center text-slate-400 font-medium';

        grid.innerHTML += `
            <button class="${btnClass}" ${hasJob ? `onclick="scrollToJob('${month}-${day}')"` : ''}>
                <span class="text-sm">${day}</span>
                ${dotsHtml}
            </button>
        `;
    }
}

function renderSchedule(month) {
    const listContainer = document.getElementById('scheduleList');
    listContainer.innerHTML = '';
    const schedules = getSchedules();
    const filteredData = schedules.filter(item => item.m === month);

    if (filteredData.length === 0) {
        listContainer.innerHTML = `<div class="text-center py-10 glass-panel rounded-3xl animate-slide-up"><h3 class="text-lg font-bold text-slate-700">Bulan Kosong</h3><p class="text-sm text-slate-500">Waktunya istirahat di bulan ${month}!</p></div>`;
        return;
    }

    filteredData.forEach((job, index) => {
        const card = document.createElement('div');
        card.id = `job-${month}-${job.d}`;
        card.className = 'schedule-card animate-slide-up';
        card.style.animationDelay = `${index * 0.05}s`;
        
        const cardColor = job.dbl ? "border-orange-200 bg-orange-50/50" : job.make ? "border-pink-200 bg-pink-50/50" : "border-slate-100 bg-white/60";
        
        let badges = '';
        if (job.make) badges += `<span class="bg-pink-100 text-pink-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">💄 Makeup</span>`;
        if (job.dbl) badges += `<span class="bg-orange-500 text-white text-[0.65rem] font-bold px-2 py-1 rounded-md shadow-sm">🔥 Double</span>`;

        card.innerHTML = `
            <div class="glass-panel rounded-2xl p-4 flex gap-4 items-center border ${cardColor}">
                <div class="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-sm flex flex-col justify-center items-center">
                    <span class="text-[0.65rem] font-bold text-slate-400 uppercase">${job.m.slice(0, 3)}</span>
                    <span class="text-xl font-black text-slate-800 leading-tight">${job.d}</span>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-slate-800 capitalize text-lg">${job.l}</h3>
                    <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1 mt-0.5">
                        🕒 ${job.t}
                    </p>
                </div>
                <div class="flex flex-col gap-1 items-end shrink-0">
                    ${badges}
                    <div class="flex gap-1 mt-2">
                        <button onclick="editSchedule(${job.id})" class="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition">✏️</button>
                        <button onclick="deleteSchedule(${job.id})" class="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function scrollToJob(id) {
    const el = document.getElementById(`job-${id}`);
    if (el) {
        el.classList.add('ring-4', 'ring-blue-300', 'transition-all');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.classList.remove('ring-4', 'ring-blue-300'), 1500);
    }
}

// CRUD Operations
function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').innerText = 'Tambah Jadwal';
    document.getElementById('scheduleForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('inputMonth').value = activeMonth;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function editSchedule(id) {
    const schedules = getSchedules();
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) return;

    editingId = id;
    document.getElementById('modalTitle').innerText = 'Edit Jadwal';
    document.getElementById('editId').value = id;
    document.getElementById('inputMonth').value = schedule.m;
    document.getElementById('inputDay').value = schedule.d;
    document.getElementById('inputTime').value = schedule.t;
    document.getElementById('inputLocation').value = schedule.l;
    document.getElementById('inputMake').checked = schedule.make;
    document.getElementById('inputDouble').checked = schedule.dbl;
    document.getElementById('modal').classList.add('active');
}

function deleteSchedule(id) {
    if (!confirm('Hapus jadwal ini?')) return;
    
    let schedules = getSchedules();
    schedules = schedules.filter(s => s.id !== id);
    saveSchedules(schedules);
}

function setupFormHandler() {
    document.getElementById('scheduleForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const schedules = getSchedules();
        const formData = {
            m: document.getElementById('inputMonth').value,
            d: document.getElementById('inputDay').value,
            t: document.getElementById('inputTime').value,
            l: document.getElementById('inputLocation').value,
            make: document.getElementById('inputMake').checked,
            dbl: document.getElementById('inputDouble').checked
        };

        if (editingId) {
            const index = schedules.findIndex(s => s.id === editingId);
            schedules[index] = { ...schedules[index], ...formData };
        } else {
            const newId = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
            schedules.push({ id: newId, ...formData });
        }

        saveSchedules(schedules);
        closeModal();
    });
}

// Alarm System
function getTimeInMinutes(timeStr) {
    const times = {
        'Subuh': 4 * 60 + 30,
        'Pagi': 8 * 60,
        'Siang': 12 * 60,
        'Sore': 16 * 60
    };
    return times[timeStr] || 0;
}

function checkAlarms() {
    const schedules = getSchedules();
    const now = new Date();
    const currentMonth = months[now.getMonth()];
    const currentDay = now.getDate();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const upcomingSchedules = schedules.filter(s => {
        if (s.m !== currentMonth) return false;
        const scheduleDay = parseInt(s.d);
        if (scheduleDay !== currentDay) return false;
        
        const scheduleMinutes = getTimeInMinutes(s.t);
        const timeDiff = scheduleMinutes - currentMinutes;
        
        return timeDiff > 0 && timeDiff <= 30;
    });

    renderAlarmList(upcomingSchedules);
    
    if (upcomingSchedules.length > 0) {
        document.getElementById('alarmBtn').classList.add('alarm-active');
        
        upcomingSchedules.forEach(schedule => {
            const alarmKey = `alarm-${schedule.id}-${currentDay}`;
            if (!sessionStorage.getItem(alarmKey)) {
                showNotification(schedule);
                sessionStorage.setItem(alarmKey, 'shown');
            }
        });
    } else {
        document.getElementById('alarmBtn').classList.remove('alarm-active');
    }
}

function showNotification(schedule) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🔔 Jadwal Segera Dimulai!', {
            body: `${schedule.t} - ${schedule.l}`,
            icon: 'icon-192.png',
            badge: 'icon-192.png'
        });
    }
    
    // Play sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz');
    audio.play().catch(() => {});
}

function renderAlarmList(schedules) {
    const container = document.getElementById('alarmList');
    
    if (schedules.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-500 py-4">Tidak ada alarm aktif</p>';
        return;
    }

    container.innerHTML = schedules.map(s => `
        <div class="glass-panel rounded-xl p-3 border border-blue-200 bg-blue-50/50">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">${s.d}</div>
                <div class="flex-1">
                    <h4 class="font-bold text-slate-800">${s.l}</h4>
                    <p class="text-xs text-slate-600">🕒 ${s.t}</p>
                </div>
                <span class="text-2xl">🔔</span>
            </div>
        </div>
    `).join('');
}

function toggleAlarmPanel() {
    document.getElementById('alarmPanel').classList.toggle('active');
}

// Initialize app
init();
