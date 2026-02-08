const cities = { 
    "Mumbai": { offset: 0 }, 
    "Pune": { offset: -2 }, 
    "Nagpur": { offset: -15 }, 
    "Ratnagiri": { offset: 1 } 
};
let currentCity = "Mumbai";

// --- SYSTEM DATE HELPER ---
function getSystemDateString() {
    const date = new Date();
    // To test "Today" logic, uncomment the next line and change the date:
    // return "Feb 20"; 
    
    const month = date.toLocaleString('default', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}`; // Returns "Feb 19", "Feb 20", etc.
}

const fullTimetableData = [
    { roza: 1, date: "Feb 19", day: "Thursday", sehri: "05:34 AM", iftar: "06:31 PM", fullDate: "Thursday, 19th February 2026" },
    { roza: 2, date: "Feb 20", day: "Friday", sehri: "05:33 AM", iftar: "06:31 PM", fullDate: "Friday, 20th February 2026" },
    { roza: 3, date: "Feb 21", day: "Saturday", sehri: "05:32 AM", iftar: "06:32 PM", fullDate: "Saturday, 21st February 2026" },
    { roza: 4, date: "Feb 22", day: "Sunday", sehri: "05:32 AM", iftar: "06:32 PM", fullDate: "Sunday, 22nd February 2026" },
    { roza: 5, date: "Feb 23", day: "Monday", sehri: "05:31 AM", iftar: "06:33 PM", fullDate: "Monday, 23rd February 2026" },
    { roza: 6, date: "Feb 24", day: "Tuesday", sehri: "05:30 AM", iftar: "06:33 PM", fullDate: "Tuesday, 24th February 2026" },
    { roza: 7, date: "Feb 25", day: "Wednesday", sehri: "05:30 AM", iftar: "06:34 PM", fullDate: "Wednesday, 25th February 2026" },
    { roza: 8, date: "Feb 26", day: "Thursday", sehri: "05:29 AM", iftar: "06:34 PM", fullDate: "Thursday, 26th February 2026" },
    { roza: 9, date: "Feb 27", day: "Friday", sehri: "05:28 AM", iftar: "06:34 PM", fullDate: "Friday, 27th February 2026" },
    { roza: 10, date: "Feb 28", day: "Saturday", sehri: "05:27 AM", iftar: "06:35 PM", fullDate: "Saturday, 28th February 2026" },
    { roza: 11, date: "Mar 01", day: "Sunday", sehri: "05:26 AM", iftar: "06:36 PM", fullDate: "Sunday, 1st March 2026" },
    { roza: 12, date: "Mar 02", day: "Monday", sehri: "05:25 AM", iftar: "06:36 PM", fullDate: "Monday, 2nd March 2026" },
    { roza: 13, date: "Mar 03", day: "Tuesday", sehri: "05:25 AM", iftar: "06:37 PM", fullDate: "Tuesday, 3rd March 2026" },
    { roza: 14, date: "Mar 04", day: "Wednesday", sehri: "05:24 AM", iftar: "06:37 PM", fullDate: "Wednesday, 4th March 2026" },
    { roza: 15, date: "Mar 05", day: "Thursday", sehri: "05:23 AM", iftar: "06:37 PM", fullDate: "Thursday, 5th March 2026" },
    { roza: 16, date: "Mar 06", day: "Friday", sehri: "05:22 AM", iftar: "06:38 PM", fullDate: "Friday, 6th March 2026" },
    { roza: 17, date: "Mar 07", day: "Saturday", sehri: "05:21 AM", iftar: "06:38 PM", fullDate: "Saturday, 7th March 2026" },
    { roza: 18, date: "Mar 08", day: "Sunday", sehri: "05:20 AM", iftar: "06:39 PM", fullDate: "Sunday, 8th March 2026" },
    { roza: 19, date: "Mar 09", day: "Monday", sehri: "05:19 AM", iftar: "06:39 PM", fullDate: "Monday, 9th March 2026" },
    { roza: 20, date: "Mar 10", day: "Tuesday", sehri: "05:19 AM", iftar: "06:40 PM", fullDate: "Tuesday, 10th March 2026" },
    { roza: 21, date: "Mar 11", day: "Wednesday", sehri: "05:18 AM", iftar: "06:40 PM", fullDate: "Wednesday, 11th March 2026" },
    { roza: 22, date: "Mar 12", day: "Thursday", sehri: "05:17 AM", iftar: "06:40 PM", fullDate: "Thursday, 12th March 2026" },
    { roza: 23, date: "Mar 13", day: "Friday", sehri: "05:16 AM", iftar: "06:41 PM", fullDate: "Friday, 13th March 2026" },
    { roza: 24, date: "Mar 14", day: "Saturday", sehri: "05:15 AM", iftar: "06:41 PM", fullDate: "Saturday, 14th March 2026" },
    { roza: 25, date: "Mar 15", day: "Sunday", sehri: "05:14 AM", iftar: "06:41 PM", fullDate: "Sunday, 15th March 2026" },
    { roza: 26, date: "Mar 16", day: "Monday", sehri: "05:13 AM", iftar: "06:42 PM", fullDate: "Monday, 16th March 2026" },
    { roza: 27, date: "Mar 17", day: "Tuesday", sehri: "05:12 AM", iftar: "06:42 PM", fullDate: "Tuesday, 17th March 2026" },
    { roza: 28, date: "Mar 18", day: "Wednesday", sehri: "05:11 AM", iftar: "06:43 PM", fullDate: "Wednesday, 18th March 2026" },
    { roza: 29, date: "Mar 19", day: "Thursday", sehri: "04:10 AM", iftar: "06:43 PM", fullDate: "Thursday, 19th March 2026" },
    { roza: 30, date: "Mar 20", day: "Friday", sehri: "04:09 AM", iftar: "06:43 PM", fullDate: "Friday, 20th March 2026" }
];

// --- BANNER SLIDER ---
function initBannerSlider() {
    let slideIndex = 0;
    const slider = document.getElementById('banner-slider');
    if (!slider) return;

    setInterval(() => {
        slideIndex = (slideIndex === 0) ? 1 : 0;
        slider.style.transform = `translateX(-${slideIndex * 50}%)`; 
    }, 4000);
}

// --- GENERATE GRID CARDS ---
function generateGridCard(item) {
    const isFri = item.day === "Friday";
    const todayStr = getSystemDateString();
    
    // Highlight grid card if it matches today
    const isToday = item.date === todayStr;
    const highlightClass = isToday ? 'ring-2 ring-[#CEA571] bg-[#FAF8EC]' : 'bg-[#F6F3E4]';
    const textColor = isFri ? 'text-white' : 'text-[#165F52]';
    const bgHeader = isFri ? 'bg-[#165F52]' : 'bg-[#DBD8BF]';

    return `<div class="${highlightClass} border border-[#B8B6A6] rounded-[10px] p-2 h-[130px] flex flex-col shadow-sm">
        <div class="${bgHeader} ${textColor} rounded-[4px] h-[46px] flex flex-col items-center justify-center">
            <span class="text-[14px] font-bold">Roza ${item.roza}</span>
            <span class="text-[11px]">${item.date}</span>
        </div>
        <div class="text-center text-[11px] py-1 border-b border-black/5 opacity-50 font-medium text-black">${item.day}</div>
        <div class="text-[11px] text-center mt-2 leading-tight text-black">S: ${item.sehri}<br>I: ${item.iftar}</div>
    </div>`;
}

// --- RENDER TIMETABLE (WITH TODAY LOGIC) ---
function renderTimetable() {
    const todayStr = getSystemDateString();
    
    // 1. Find if today is in the list
    const todayIndex = fullTimetableData.findIndex(d => d.date === todayStr);
    
    // 2. Determine Start Index: 
    // If today is found, use it. If not (e.g. Pre-Ramadan), show Roza 1.
    const startIndex = todayIndex >= 0 ? todayIndex : 0;
    const current = fullTimetableData[startIndex];

    // 3. TODAY TAB VISIBILITY LOGIC
    // ONLY show if the system date matches the current card's date
    const tabToday = document.getElementById('tab-today');
    if (todayIndex >= 0 && current.date === todayStr) {
        tabToday.style.display = 'flex'; // Show
    } else {
        tabToday.style.display = 'none'; // Hide
    }

    // 4. Update Main Card Data
    document.getElementById('tab-roza').innerText = `Roza ${current.roza}`;
    document.getElementById('main-card-date').innerText = current.fullDate;
    document.getElementById('main-sehri').innerText = current.sehri;
    document.getElementById('main-iftar').innerText = current.iftar;

    // 5. Render Next 3 Days
    const nextContainer = document.getElementById('next-days-container');
    nextContainer.innerHTML = '';
    // Use modulo or safe slice to handle end of list
    const nextItems = fullTimetableData.slice(startIndex + 1, startIndex + 4);
    nextItems.forEach(item => {
        nextContainer.innerHTML += generateGridCard(item);
    });

    // 6. Render Full List (Remaining days)
    const fullGrid = document.getElementById('full-grid');
    fullGrid.innerHTML = '';
    fullTimetableData.forEach(item => {
        // Optional: Don't show past days in full list? 
        // For now, showing all for completeness
        fullGrid.innerHTML += generateGridCard(item);
    });
}

function toggleFullTable() {
    const el = document.getElementById('full-timetable');
    const btn = document.getElementById('view-all-btn');
    if (el.style.maxHeight === "0px" || !el.style.maxHeight) {
        el.style.maxHeight = "6000px";
        btn.innerText = "Show Less";
    } else {
        el.style.maxHeight = "0px";
        btn.innerText = "View Complete Timetable";
        document.getElementById('main-card-date').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function shareApp() {
    const data = { title: 'Ramadan 2026', text: 'View Timetable!', url: window.location.href };
    if (navigator.share) navigator.share(data).catch(console.error);
    else { navigator.clipboard.writeText(window.location.href); alert("Link Copied!"); }
}

function toggleDua(id) {
    const el = document.getElementById(id);
    const isOpen = el.style.maxHeight !== "0px" && el.style.maxHeight !== "";
    document.querySelectorAll('[id^="dua"]').forEach(d => d.style.maxHeight = "0px");
    if (!isOpen) el.style.maxHeight = "400px";
}

function toggleCityMenu() {
    const el = document.getElementById('city-menu');
    el.style.maxHeight = (el.style.maxHeight === "0px" || !el.style.maxHeight) ? "300px" : "0px";
}

function updateCity(city) {
    currentCity = city;
    document.getElementById('current-city').innerText = `${city}, Maharashtra (India)`;
    toggleCityMenu();
    renderTimetable();
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initBannerSlider();
    renderTimetable();
    
    // Countdown
    setInterval(() => {
        const target = new Date("February 19, 2026 00:00:00").getTime();
        const dist = target - new Date().getTime();
        if (dist > 0) {
            document.getElementById("cd-days").innerText = Math.floor(dist / 864e5).toString().padStart(2,'0');
            document.getElementById("cd-hours").innerText = Math.floor((dist % 864e5) / 36e5).toString().padStart(2,'0');
            document.getElementById("cd-minutes").innerText = Math.floor((dist % 36e5) / 6e4).toString().padStart(2,'0');
            document.getElementById("cd-seconds").innerText = Math.floor((dist % 6e4) / 1e3).toString().padStart(2,'0');
        }
    }, 1000);
});