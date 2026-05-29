export function getSchedules() {
    const data = localStorage.getItem('schedules');
    return data ? JSON.parse(data) : getDefaultData();
}

export function saveSchedules(schedules) {
    localStorage.setItem('schedules', JSON.stringify(schedules));
}

export function getDefaultData() {
    return [
        { id: 1, m: 'Mei', d: '1', t: 'Pagi', jam: '08:00', l: 'Seteluk', locationLink: 'https://maps.app.goo.gl/wcDieACP3cgvq1A56', totalPrice: '1500000', customer: 'Budi', wa: '081234567890', invoice: 'lunas', make: true, dbl: false },
        { id: 2, m: 'Mei', d: '2', t: 'Subuh', jam: '04:30', l: 'Seteluk', customer: 'Andi', wa: '081234567891', invoice: 'belum', make: true, dbl: false },
        { id: 3, m: 'Mei', d: '2', t: 'Sore', jam: '16:00', l: 'Seteluk', customer: 'Caca', wa: '081234567892', invoice: 'lunas', make: true, dbl: true },
        { id: 4, m: 'Mei', d: '2', t: 'Sore', jam: '16:30', l: 'Benete', customer: 'Dedi', wa: '081234567893', invoice: 'lunas', make: true, dbl: true },
        { id: 5, m: 'Mei', d: '3', t: 'Subuh', jam: '04:30', l: 'Benete', customer: 'Eka', wa: '081234567894', invoice: 'belum', make: true, dbl: false }
    ];
}
