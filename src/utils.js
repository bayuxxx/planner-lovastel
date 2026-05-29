import { months } from './config';

export function getTimeInMinutes(timeStr) {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

export function printInvoice(job) {
    const w = window.open('', '_blank');
    
    const monthIndex = months.indexOf(job.m) + 5; // Mei = 5, Juni = 6, dst (for 2026 starting in May)
    const monthFormatted = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const dateStr = `${job.d.toString().padStart(2, '0')}/${monthFormatted}/2026`;
    const billingNo = `${job.id}/LVST/2026`;
    
    let services = [];
    if (job.acara) services.push(job.acara === 'Custom' ? (job.customAcara || 'Custom') : job.acara);
    if (job.make) services.push('Makeup');
    if (job.dbl) services.push('Double Job');
    if (job.sewaGaun) services.push('Sewa Gaun');
    if (job.sewaAttire) services.push('Sewa Attire');
    
    // Add additional info like location or time if needed, but the design mostly lists services.
    let descriptionHtml = services.join('<br/>');
    if (job.l) descriptionHtml += `<br/><span style="font-size: 11px; color: #777;">Lokasi: ${job.l}</span>`;
    if (job.jam) descriptionHtml += `<br/><span style="font-size: 11px; color: #777;">Jam: ${job.jam}</span>`;

    const formattedPrice = job.totalPrice ? 'Rp ' + parseInt(job.totalPrice).toLocaleString('id-ID') : '-';

    w.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Invoice - ${job.customer || 'Customer'}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Great+Vibes&family=Montserrat:wght@400;600;700&display=swap');
                    
                    @media print {
                        @page {
                            size: A4;
                            margin: 0;
                        }
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .print-btn { display: none !important; }
                    }
                    
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #ffdce3; /* Fallback for viewer */
                        font-family: 'Montserrat', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    
                    .invoice-wrapper {
                        width: 210mm;
                        height: 297mm;
                        background-color: #ffdce3;
                        background-image: 
                            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 40%),
                            radial-gradient(circle at 90% 80%, #c4b5c7 0%, transparent 50%),
                            radial-gradient(circle at 80% 10%, #f7c5cc 0%, transparent 40%),
                            radial-gradient(circle at 20% 90%, #b29eb5 0%, transparent 50%);
                        padding: 40px;
                        box-sizing: border-box;
                        position: relative;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    
                    /* Decorative background elements */
                    .invoice-wrapper::before {
                        content: '';
                        position: absolute;
                        top: -50px; left: -50px;
                        width: 400px; height: 400px;
                        background: radial-gradient(circle, #f3d4db 0%, transparent 70%);
                        border-radius: 50%;
                        z-index: 0;
                    }
                    .invoice-wrapper::after {
                        content: '';
                        position: absolute;
                        bottom: -100px; right: -50px;
                        width: 500px; height: 500px;
                        background: radial-gradient(circle, #e6d5eb 0%, transparent 70%);
                        border-radius: 50%;
                        z-index: 0;
                    }
                    
                    .invoice-box {
                        background: #ffffff;
                        height: 100%;
                        border: 1px solid #4a3b52;
                        padding: 50px;
                        box-sizing: border-box;
                        position: relative;
                        z-index: 10;
                    }

                    /* Grid lines mimicking the image */
                    .invoice-box::before {
                        content: '';
                        position: absolute;
                        left: 50px; right: 50px; top: 120px;
                        height: 1px;
                        background: #e2d8e5;
                        z-index: -1;
                    }
                    .invoice-box::after {
                        content: '';
                        position: absolute;
                        top: 50px; bottom: 50px; left: 130px;
                        width: 1px;
                        background: #e2d8e5;
                        z-index: -1;
                    }
                    
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 40px;
                    }
                    
                    .title {
                        font-family: 'Playfair Display', serif;
                        font-size: 52px;
                        color: #4a3b52;
                        margin: 0 0 30px 0;
                        letter-spacing: 1px;
                        font-weight: 700;
                    }
                    
                    .billing-table {
                        font-size: 11px;
                        color: #666;
                        letter-spacing: 1px;
                        line-height: 1.8;
                    }
                    .billing-table td:first-child {
                        text-transform: uppercase;
                        padding-right: 20px;
                        font-weight: 600;
                    }
                    
                    .logo-container {
                        text-align: right;
                        margin-top: 10px;
                    }
                    .logo {
                        font-family: 'Great Vibes', cursive;
                        color: #f38da0;
                        font-size: 48px;
                        margin: 0;
                        line-height: 1;
                        font-weight: normal;
                        transform: rotate(-3deg);
                    }
                    .logo-sub {
                        font-size: 7px;
                        color: #99a;
                        letter-spacing: 3px;
                        margin-top: 5px;
                        text-transform: uppercase;
                        margin-right: 15px;
                    }
                    
                    .invoice-to {
                        margin-bottom: 40px;
                        margin-top: 50px;
                    }
                    .invoice-to-title {
                        font-size: 11px;
                        color: #666;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 5px;
                    }
                    .invoice-to-name {
                        font-size: 16px;
                        font-weight: 700;
                        color: #4a3b52;
                        font-family: 'Playfair Display', serif;
                        letter-spacing: 0.5px;
                    }
                    .invoice-to-wa {
                        font-size: 12px;
                        color: #666;
                        margin-top: 5px;
                    }
                    
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 60px;
                    }
                    .table th {
                        font-size: 11px;
                        color: #666;
                        text-transform: uppercase;
                        font-weight: 600;
                        letter-spacing: 1.5px;
                        padding-bottom: 20px;
                        text-align: center;
                    }
                    .table th:nth-child(2) {
                        text-align: center;
                    }
                    .table td {
                        padding: 10px 5px;
                        text-align: center;
                        font-size: 13px;
                        color: #444;
                        vertical-align: top;
                    }
                    .table td.desc {
                        font-weight: 700;
                        color: #5a5a5a;
                        line-height: 1.6;
                    }
                    
                    .divider {
                        border-top: 1px solid #e2d8e5;
                        margin: 40px 0 20px 0;
                    }
                    
                    .footer-details {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .account-info {
                        font-size: 10px;
                        color: #666;
                        line-height: 1.8;
                        font-weight: 600;
                    }
                    .account-info td { padding-right: 15px; }
                    
                    .total-box {
                        display: flex;
                        align-items: center;
                        gap: 30px;
                    }
                    .total-label {
                        font-size: 18px;
                        color: #4a3b52;
                        font-weight: 600;
                        letter-spacing: 2px;
                    }
                    .total-amount {
                        font-size: 18px;
                        color: #4a3b52;
                        font-weight: 600;
                        letter-spacing: 1px;
                    }
                    
                    .social-footer {
                        position: absolute;
                        bottom: 12px;
                        left: 0; right: 0;
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        color: #f38da0;
                        font-size: 12px;
                        font-weight: 700;
                        z-index: 20;
                    }
                    .social-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .social-icon {
                        background: #f38da0;
                        color: white;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 10px;
                    }
                    
                    .print-btn {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: #4a3b52;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 50px;
                        font-family: inherit;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                        z-index: 100;
                    }
                    
                    .status-stamp {
                        position: absolute;
                        top: 40%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-15deg);
                        font-size: 60px;
                        font-weight: bold;
                        color: ${job.invoice === 'lunas' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'};
                        border: 5px solid ${job.invoice === 'lunas' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'};
                        padding: 10px 30px;
                        border-radius: 10px;
                        pointer-events: none;
                        z-index: 5;
                        text-transform: uppercase;
                        letter-spacing: 5px;
                        font-family: 'Playfair Display', serif;
                    }
                </style>
            </head>
            <body>
                <button class="print-btn" onclick="window.print()">Cetak Invoice</button>
                <div class="invoice-wrapper">
                    <div class="social-footer">
                        <div class="social-item">
                            <div class="social-icon">📱</div>
                            08-111-84-2400
                        </div>
                        <div class="social-item">
                            <div class="social-icon">📷</div>
                            @tinalovastel
                        </div>
                        <div class="social-item">
                            <div class="social-icon">🎵</div>
                            @lovastelmakeup
                        </div>
                    </div>
                    
                    <div class="invoice-box">
                        <div class="status-stamp">${job.invoice === 'lunas' ? 'LUNAS' : 'BELUM LUNAS'}</div>
                        
                        <div class="header">
                            <div>
                                <h1 class="title">INVOICE</h1>
                                <table class="billing-table">
                                    <tr>
                                        <td>BILLING NUMBER</td>
                                        <td>: &nbsp; ${billingNo}</td>
                                    </tr>
                                    <tr>
                                        <td>BILLING DATE</td>
                                        <td>: &nbsp; ${dateStr}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="logo-container">
                                <h2 class="logo">lovastel</h2>
                                <div class="logo-sub">Makeup By Tina</div>
                            </div>
                        </div>
                        
                        <div class="invoice-to">
                            <table class="billing-table" style="width: auto;">
                                <tr>
                                    <td>INVOICE TO</td>
                                    <td>:</td>
                                </tr>
                            </table>
                            <div class="invoice-to-name">${job.customer || 'Customer'}</div>
                            ${job.wa ? `<div class="invoice-to-wa">\\ ${job.wa}</div>` : ''}
                        </div>
                        
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 10%;">NO.</th>
                                    <th style="width: 40%;">DESCRIPTION</th>
                                    <th style="width: 20%;">PRICE</th>
                                    <th style="width: 15%;">QTY.</th>
                                    <th style="width: 15%;">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td class="desc">
                                        ${descriptionHtml}
                                    </td>
                                    <td>${formattedPrice}</td>
                                    <td>1 Package</td>
                                    <td>${formattedPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="divider"></div>
                        
                        <div class="footer-details">
                            <table class="account-info">
                                <tr>
                                    <td>Account ID</td>
                                    <td>: tiktok @lovastelmakeup</td>
                                </tr>
                                <tr>
                                    <td>Campaign</td>
                                    <td>: instagram @tinalovastel</td>
                                </tr>
                            </table>
                            <div class="total-box">
                                <div class="total-label">TOTAL</div>
                                <div class="total-amount">${formattedPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(() => window.print(), 500);
                    }
                </script>
            </body>
        </html>
    `);
    w.document.close();
}
