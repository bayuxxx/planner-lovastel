import { useState, useEffect, useRef } from 'react';
import { getSchedules, saveSchedules } from './store';
import { calendarSetup, months } from './config';
import { getTimeInMinutes, printInvoice } from './utils';

export default function App() {
  const [activeMonth, setActiveMonth] = useState('Mei');
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeRingingAlarm, setActiveRingingAlarm] = useState(null);
  const audioRef = useRef(new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz'));
  
  const [formData, setFormData] = useState({
    m: 'Mei', d: '', jam: '', l: '', locationLink: '', customer: '', wa: '', invoice: 'belum', make: false, dbl: false, acara: 'Akad', customAcara: '', sewaGaun: false, sewaAttire: false, totalPrice: ''
  });

  const jobRefs = useRef({});

  useEffect(() => {
    setSchedules(getSchedules());
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    const checkAlarms = () => {
        const now = new Date();
        const currentMonth = months[now.getMonth()];
        const currentDay = now.getDate();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const upcomingSchedules = schedules.filter(s => {
            if (s.m !== currentMonth) return false;
            if (parseInt(s.d) !== currentDay) return false;
            
            const scheduleMinutes = getTimeInMinutes(s.jam);
            const timeDiff = scheduleMinutes - currentMinutes;
            
            return timeDiff > 0 && timeDiff <= 30;
        });

        setAlarms(upcomingSchedules);
        
        upcomingSchedules.forEach(schedule => {
            const alarmKey = `alarm-${schedule.id}-${currentDay}`;
            if (!sessionStorage.getItem(alarmKey)) {
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('🔔 Jadwal Segera Dimulai!', {
                        body: `Jam ${schedule.jam} - ${schedule.l}`,
                        icon: '/favicon.svg'
                    });
                }
                setActiveRingingAlarm(schedule);
                audioRef.current.play().catch(() => {});
                sessionStorage.setItem(alarmKey, 'shown');
            }
        });
    };
    
    checkAlarms();
    const interval = setInterval(checkAlarms, 60000);
    return () => clearInterval(interval);
  }, [schedules]);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
        m: activeMonth, d: '', jam: '', l: '', locationLink: '', customer: '', wa: '', invoice: 'belum', make: false, dbl: false, acara: 'Akad', customAcara: '', sewaGaun: false, sewaAttire: false, totalPrice: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) return;
    setEditingId(id);
    setFormData({
        m: schedule.m, d: schedule.d, jam: schedule.jam || '', l: schedule.l, locationLink: schedule.locationLink || '', customer: schedule.customer || '', wa: schedule.wa || '', invoice: schedule.invoice || 'belum', make: schedule.make || false, dbl: schedule.dbl || false, acara: schedule.acara || 'Akad', customAcara: schedule.customAcara || '', sewaGaun: schedule.sewaGaun || false, sewaAttire: schedule.sewaAttire || false, totalPrice: schedule.totalPrice || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Hapus jadwal ini?')) return;
    const newSchedules = schedules.filter(s => s.id !== id);
    setSchedules(newSchedules);
    saveSchedules(newSchedules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newSchedules = [...schedules];
    if (editingId) {
        const index = newSchedules.findIndex(s => s.id === editingId);
        newSchedules[index] = { ...newSchedules[index], ...formData };
    } else {
        const newId = newSchedules.length > 0 ? Math.max(...newSchedules.map(s => s.id)) + 1 : 1;
        newSchedules.push({ id: newId, ...formData });
    }
    setSchedules(newSchedules);
    saveSchedules(newSchedules);
    setIsModalOpen(false);
  };

  const scrollToJob = (id) => {
    const el = jobRefs.current[id];
    if (el) {
        el.classList.add('ring-4', 'ring-blue-300', 'transition-all');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.classList.remove('ring-4', 'ring-blue-300'), 1500);
    }
  };

  const config = calendarSetup[activeMonth];
  const jobsThisMonth = schedules.filter(j => j.m === activeMonth);

  const testAlarm = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🔔 Test Notifikasi', { body: 'Notifikasi berhasil berjalan!' });
    } else {
        Notification.requestPermission();
    }
    setActiveRingingAlarm({ id: 'test', jam: '08:00', l: 'Test Alarm', m: activeMonth, d: '1' });
    audioRef.current.play().catch(() => alert('Browser memblokir suara otomatis, izinkan suara berjalan di situs ini.'));
  };

  const stopRinging = () => {
    setActiveRingingAlarm(null);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="text-slate-800 font-sans pb-24 antialiased min-h-screen smooth-scroll selection:bg-pink-200">
        <div className="max-w-md mx-auto w-full relative z-10">
            {/* Header */}
            <header className="pt-8 pb-4 px-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Jadwal<span className="text-blue-500">26</span></h1>
                    <p className="text-slate-500 font-medium mt-1 text-sm flex items-center gap-2">
                        Tetap semangat! ✨
                        <button onClick={() => {
                            if (isAdmin) setIsAdmin(false);
                            else {
                                const pwd = prompt('Masukkan Password Admin:');
                                if (pwd === 'admin123') setIsAdmin(true);
                                else if (pwd !== null) alert('Password salah!');
                            }
                        }} className={`text-xs px-3 py-1 rounded-full transition-all font-bold flex items-center gap-1.5 shadow-sm border ${isAdmin ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                            {isAdmin ? '🔓 Admin Aktif' : '🔒 Login Admin'}
                        </button>
                    </p>
                </div>
                <div className="flex gap-2">
                    {isAdmin && (
                        <button onClick={handleOpenAddModal} className="w-10 h-10 rounded-full glass-panel flex justify-center items-center text-lg shadow-sm hover:scale-110 transition-transform active:scale-95">➕</button>
                    )}
                    <button onClick={() => setIsAlarmOpen(true)} className={`w-10 h-10 rounded-full glass-panel flex justify-center items-center text-lg shadow-sm hover:scale-110 transition-transform active:scale-95 ${alarms.length > 0 ? 'alarm-active' : ''}`}>🔔</button>
                </div>
            </header>

            {/* Filters */}
            <div className="px-2 mb-4">
                <div className="no-scrollbar flex overflow-x-auto gap-2 px-4 py-2">
                    {months.map(m => (
                        <button key={m} onClick={() => setActiveMonth(m)} className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${m === activeMonth ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 shadow-sm hover:bg-slate-100'}`}>
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calendar */}
            <div className="px-6 mb-6">
                <div className="glass-panel rounded-3xl p-5 shadow-glass">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="font-bold text-lg text-slate-800">{activeMonth} 2026</h2>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
                            <div key={d} className={`text-[0.65rem] font-bold ${i === 0 ? 'text-red-400' : 'text-slate-400'}`}>{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                        {Array.from({ length: config.startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: config.days }).map((_, i) => {
                            const day = i + 1;
                            const dayJobs = jobsThisMonth.filter(j => parseInt(j.d) === day);
                            const hasJob = dayJobs.length > 0;
                            let dotColors = [];
                            if (hasJob) {
                                if (dayJobs.some(j => j.dbl)) dotColors.push('bg-orange-500');
                                if (dayJobs.some(j => j.make)) dotColors.push('bg-pink-500');
                                if (dotColors.length === 0) dotColors.push('bg-blue-500');
                            }
                            return (
                                <button key={day} onClick={() => hasJob && scrollToJob(`${activeMonth}-${day}`)} className={hasJob ? 'w-full aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition active:scale-95 bg-white shadow-sm border border-slate-100 hover:border-blue-300 text-slate-800 font-bold' : 'w-full aspect-square rounded-xl flex flex-col items-center justify-center text-slate-400 font-medium'}>
                                    <span className="text-sm">{day}</span>
                                    {hasJob ? (
                                        <div className="flex justify-center gap-0.5 mt-1">
                                            {dotColors.slice(0, 2).map((c, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${c}`} />)}
                                        </div>
                                    ) : <div className="h-2.5" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Schedule List */}
            <div className="px-6 flex flex-col gap-4">
                {jobsThisMonth.length === 0 ? (
                    <div className="text-center py-10 glass-panel rounded-3xl animate-slide-up">
                        <h3 className="text-lg font-bold text-slate-700">Bulan Kosong</h3>
                        <p className="text-sm text-slate-500">Waktunya istirahat di bulan {activeMonth}!</p>
                    </div>
                ) : (
                    jobsThisMonth.map((job, idx) => (
                        <div key={job.id} ref={el => jobRefs.current[`${activeMonth}-${job.d}`] = el} className="schedule-card animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                            <div className={`glass-panel rounded-2xl p-4 flex gap-4 items-start border ${job.dbl ? "border-orange-200 bg-orange-50/50" : job.make ? "border-pink-200 bg-pink-50/50" : "border-slate-100 bg-white/60"}`}>
                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-sm flex flex-col justify-center items-center">
                                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase">{job.m.slice(0, 3)}</span>
                                    <span className="text-xl font-black text-slate-800 leading-tight">{job.d}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 capitalize text-lg">{job.customer ? `${job.customer} - ` : ''}{job.l}</h3>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                                            🕒 Jam {job.jam || '-'}
                                        </p>
                                        {job.wa && isAdmin && (
                                            <p className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                                                📱 <a href={`https://wa.me/${job.wa.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline">{job.wa}</a>
                                            </p>
                                        )}
                                        {job.locationLink && isAdmin && (
                                            <a href={job.locationLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 mt-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 w-full border border-red-100">
                                                📍 Buka Lokasi (Google Maps)
                                            </a>
                                        )}
                                        {job.totalPrice && isAdmin && (
                                            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                                💰 Rp {parseInt(job.totalPrice).toLocaleString('id-ID')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {job.acara && <span className="bg-purple-100 text-purple-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">🎪 {job.acara === 'Custom' ? job.customAcara : job.acara}</span>}
                                        {job.make && <span className="bg-pink-100 text-pink-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">💄 Makeup</span>}
                                        {job.dbl && <span className="bg-orange-500 text-white text-[0.65rem] font-bold px-2 py-1 rounded-md shadow-sm">🔥 Double Job</span>}
                                        {job.sewaGaun && <span className="bg-blue-100 text-blue-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">👗 Sewa Gaun</span>}
                                        {job.sewaAttire && <span className="bg-indigo-100 text-indigo-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">👔 Sewa Attire</span>}
                                        {job.invoice === 'lunas' ? (
                                            <span className="bg-green-100 text-green-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">✓ Lunas</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 text-[0.65rem] font-bold px-2 py-1 rounded-md">✗ Belum Lunas</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 shrink-0">
                                    <button onClick={() => printInvoice(job)} className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition" title="Print Invoice">🖨️</button>
                                    {isAdmin && (
                                        <>
                                            <button onClick={() => handleEdit(job.id)} className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition" title="Edit">✏️</button>
                                            <button onClick={() => handleDelete(job.id)} className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition" title="Delete">🗑️</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in flex flex-col max-h-[90vh] overflow-hidden">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 shrink-0">{editingId ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                        <div className="overflow-y-auto space-y-4 pr-2 pb-2 flex-1">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Bulan</label>
                                <select value={formData.m} onChange={e => setFormData({...formData, m: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition">
                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                                <input type="number" min="1" max="31" value={formData.d} onChange={e => setFormData({...formData, d: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Jam (Format 24 Jam)</label>
                                <input 
                                    type="text" 
                                    placeholder="08:30" 
                                    pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                                    title="Gunakan format 24 jam, contoh: 14:30"
                                    value={formData.jam} 
                                    onChange={e => {
                                        let v = e.target.value.replace(/\D/g, '');
                                        if (v.length > 4) v = v.slice(0, 4);
                                        if (v.length > 2) v = v.slice(0, 2) + ':' + v.slice(2);
                                        setFormData({...formData, jam: v});
                                    }} 
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Acara</label>
                                <select value={formData.acara} onChange={e => setFormData({...formData, acara: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition mb-2">
                                    <option value="Nyorong">Nyorong</option>
                                    <option value="Barodak">Barodak</option>
                                    <option value="Akad">Akad</option>
                                    <option value="Akad + Retouch Resepsi">Akad + Retouch Resepsi</option>
                                    <option value="Resepsi">Resepsi</option>
                                    <option value="Custom">Lainnya (Custom)</option>
                                </select>
                                {formData.acara === 'Custom' && (
                                    <input type="text" placeholder="Masukkan nama acara..." value={formData.customAcara} onChange={e => setFormData({...formData, customAcara: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" required />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
                                <input type="text" value={formData.l} onChange={e => setFormData({...formData, l: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Link Lokasi (Google Maps dll)</label>
                                <input type="url" value={formData.locationLink} onChange={e => setFormData({...formData, locationLink: e.target.value})} placeholder="https://maps.google.com/..." className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Total Harga</label>
                                <input type="number" value={formData.totalPrice} onChange={e => setFormData({...formData, totalPrice: e.target.value})} placeholder="Contoh: 1500000" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pemesan</label>
                                <input type="text" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">No. WhatsApp</label>
                                <input type="tel" value={formData.wa} onChange={e => setFormData({...formData, wa: e.target.value})} placeholder="081234567890" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Status Invoice</label>
                                <select value={formData.invoice} onChange={e => setFormData({...formData, invoice: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none transition">
                                    <option value="belum">Belum Lunas</option>
                                    <option value="lunas">Lunas</option>
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.make} onChange={e => setFormData({...formData, make: e.target.checked})} className="w-5 h-5 rounded accent-pink-500" />
                                    <span className="text-sm font-bold text-slate-700">💄 Makeup</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.dbl} onChange={e => setFormData({...formData, dbl: e.target.checked})} className="w-5 h-5 rounded accent-orange-500" />
                                    <span className="text-sm font-bold text-slate-700">🔥 Double Job</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.sewaGaun} onChange={e => setFormData({...formData, sewaGaun: e.target.checked})} className="w-5 h-5 rounded accent-blue-500" />
                                    <span className="text-sm font-bold text-slate-700">👗 Sewa Gaun</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.sewaAttire} onChange={e => setFormData({...formData, sewaAttire: e.target.checked})} className="w-5 h-5 rounded accent-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">👔 Sewa Attire</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-slate-200 mt-2 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition">Batal</button>
                            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition shadow-lg">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Alarm Panel */}
        {isAlarmOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 max-w-md w-full shadow-2xl animate-scale-in flex flex-col max-h-[80vh] overflow-hidden">
                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <h2 className="text-2xl font-bold text-slate-900">🔔 Alarm Aktif</h2>
                        <button onClick={() => setIsAlarmOpen(false)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold">✕</button>
                    </div>
                    <div className="overflow-y-auto space-y-3 flex-1">
                        {alarms.length === 0 ? (
                            <p className="text-center text-slate-500 py-4">Tidak ada alarm aktif</p>
                        ) : (
                            alarms.map(s => (
                                <div key={s.id} className="glass-panel rounded-xl p-3 border border-blue-200 bg-blue-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">{s.d}</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800">{s.l}</h4>
                                            <p className="text-xs text-slate-600">🕒 Jam {s.jam || '-'}</p>
                                        </div>
                                        <span className="text-2xl">🔔</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <button onClick={testAlarm} className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex justify-center items-center gap-2">
                            <span>🧪</span> Uji Coba Alarm & Notifikasi
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center shrink-0">Alarm akan berbunyi 30 menit sebelum jadwal</p>
                </div>
            </div>
        )}

        {/* Ringing Alarm Overlay */}
        {activeRingingAlarm && (
            <div className="fixed inset-0 bg-red-500/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 animate-scale-in">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-2xl animate-bounce mb-8">
                    🔔
                </div>
                <h1 className="text-4xl font-black text-white text-center mb-2 drop-shadow-md">
                    WAKTUNYA JADWAL!
                </h1>
                <p className="text-xl text-white/90 text-center font-bold mb-12 drop-shadow-sm">
                    Jam {activeRingingAlarm.jam} di {activeRingingAlarm.l}
                </p>
                <button onClick={stopRinging} className="px-10 py-5 rounded-full bg-white text-red-600 text-2xl font-black shadow-2xl hover:scale-110 active:scale-95 transition-transform uppercase tracking-widest">
                    Matikan Alarm
                </button>
            </div>
        )}
    </div>
  );
}










