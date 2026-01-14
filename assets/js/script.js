// --- Helper: Safe Icon Initialization ---
function safeCreateIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- Helper: Get Today's Date in "Feb 19" format ---
function getTodayString() {
    const date = new Date();
    
    // --- TESTING SECTION ---
    // Uncomment the line below to simulate a date (e.g., "Feb 20")
    // return "Feb 20"; 
    
    const month = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb"
    const day = String(date.getDate()).padStart(2, '0'); // "01", "19"
    return `${month} ${day}`;
}

// --- Data: Full 30-Day Ramadan 2026 Timetable ---
const fullTimetableData = [
    { roza: 1, date: "Feb 19", day: "Thu", sehri: "05:51 AM", iftar: "06:40 PM" },
    { roza: 2, date: "Feb 20", day: "Fri", sehri: "05:51 AM", iftar: "06:40 PM" },
    { roza: 3, date: "Feb 21", day: "Sat", sehri: "05:50 AM", iftar: "06:41 PM" },
    { roza: 4, date: "Feb 22", day: "Sun", sehri: "05:49 AM", iftar: "06:41 PM" },
    { roza: 5, date: "Feb 23", day: "Mon", sehri: "05:49 AM", iftar: "06:42 PM" },
    { roza: 6, date: "Feb 24", day: "Tue", sehri: "05:48 AM", iftar: "06:42 PM" },
    { roza: 7, date: "Feb 25", day: "Wed", sehri: "05:47 AM", iftar: "06:43 PM" },
    { roza: 8, date: "Feb 26", day: "Thu", sehri: "05:46 AM", iftar: "06:43 PM" },
    { roza: 9, date: "Feb 27", day: "Fri", sehri: "05:46 AM", iftar: "06:43 PM" },
    { roza: 10, date: "Feb 28", day: "Sat", sehri: "05:45 AM", iftar: "06:44 PM" },
    { roza: 11, date: "Mar 01", day: "Sun", sehri: "05:44 AM", iftar: "06:44 PM" },
    { roza: 12, date: "Mar 02", day: "Mon", sehri: "05:43 AM", iftar: "06:45 PM" },
    { roza: 13, date: "Mar 03", day: "Tue", sehri: "05:42 AM", iftar: "06:45 PM" },
    { roza: 14, date: "Mar 04", day: "Wed", sehri: "05:41 AM", iftar: "06:45 PM" },
    { roza: 15, date: "Mar 05", day: "Thu", sehri: "05:40 AM", iftar: "06:46 PM" },
    { roza: 16, date: "Mar 06", day: "Fri", sehri: "05:40 AM", iftar: "06:46 PM" },
    { roza: 17, date: "Mar 07", day: "Sat", sehri: "05:39 AM", iftar: "06:46 PM" },
    { roza: 18, date: "Mar 08", day: "Sun", sehri: "05:38 AM", iftar: "06:47 PM" },
    { roza: 19, date: "Mar 09", day: "Mon", sehri: "05:37 AM", iftar: "06:47 PM" },
    { roza: 20, date: "Mar 10", day: "Tue", sehri: "05:36 AM", iftar: "06:47 PM" },
    { roza: 21, date: "Mar 11", day: "Wed", sehri: "05:35 AM", iftar: "06:48 PM" },
    { roza: 22, date: "Mar 12", day: "Thu", sehri: "05:34 AM", iftar: "06:48 PM" },
    { roza: 23, date: "Mar 13", day: "Fri", sehri: "05:33 AM", iftar: "06:48 PM" },
    { roza: 24, date: "Mar 14", day: "Sat", sehri: "05:32 AM", iftar: "06:49 PM" },
    { roza: 25, date: "Mar 15", day: "Sun", sehri: "05:31 AM", iftar: "06:49 PM" },
    { roza: 26, date: "Mar 16", day: "Mon", sehri: "05:30 AM", iftar: "06:49 PM" },
    { roza: 27, date: "Mar 17", day: "Tue", sehri: "05:29 AM", iftar: "06:50 PM" },
    { roza: 28, date: "Mar 18", day: "Wed", sehri: "05:28 AM", iftar: "06:50 PM" },
    { roza: 29, date: "Mar 19", day: "Thu", sehri: "05:27 AM", iftar: "06:50 PM" },
    { roza: 30, date: "Mar 20", day: "Fri", sehri: "05:26 AM", iftar: "06:51 PM" },
];

// State
let isFullView = false;
const INITIAL_COUNT = 5;

// --- Function: Generate HTML for a single row ---
function createRowHtml(item, animate = false) {
    const todayString = getTodayString();
    const isToday = (item.date === todayString); 

    let cardClass = "";
    let textClass = "";
    let badge = "";

    if (isToday) {
        // Active Style
        cardClass = 'bg-white border-l-[6px] border-l-brand-500 shadow-lg transform scale-[1.02] z-10';
        textClass = 'text-brand-700';
        badge = `<span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-sm">TODAY</span>`;
    } else {
        // Inactive Style
        cardClass = 'bg-gray-50 border border-gray-100 hover:bg-white border-l-0'; 
        textClass = 'text-gray-600';
        badge = '';
    }
    
    const animationClass = animate ? 'animate-fade-in' : '';

    return `
        <div class="${cardClass} ${animationClass} rounded-xl p-4 transition-all duration-200 flex items-center justify-between mb-3 relative overflow-hidden">
            <div class="flex flex-col w-1/3 border-r border-gray-100 pr-3">
                <div class="flex items-center">
                    <span class="text-xs font-bold text-gray-400 uppercase">Roza ${item.roza}</span>
                    ${badge}
                </div>
                <span class="text-lg font-bold ${textClass} leading-tight mt-1 whitespace-nowrap">${item.date}</span>
                <span class="text-xs text-gray-400 font-medium">${item.day}</span>
            </div>
            <div class="flex flex-1 justify-around items-center pl-2 gap-2">
                <div class="text-center flex flex-col items-center">
                    <div class="flex items-center justify-center text-gray-400 mb-1">
                        <span class="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">Sehri</span>
                    </div>
                    <span class="text-sm font-bold text-gray-800 bg-gray-100/80 px-2 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap min-w-[80px] flex justify-center shadow-sm">${item.sehri}</span>
                </div>
                <div class="text-center flex flex-col items-center">
                    <div class="flex items-center justify-center text-gray-400 mb-1">
                        <span class="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">Iftar</span>
                    </div>
                    <span class="text-sm font-bold text-gray-800 bg-gray-100/80 px-2 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap min-w-[80px] flex justify-center shadow-sm">${item.iftar}</span>
                </div>
            </div>
        </div>
    `;
}

// --- Function: Render Timetable (Dynamic Filtering) ---
function renderTimetable() {
    const container = document.getElementById('timetable-list');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    
    if (!container) return;
    
    const todayString = getTodayString();
    const todayIndex = fullTimetableData.findIndex(item => item.date === todayString);
    const startIndex = (todayIndex !== -1) ? todayIndex : 0;
    const effectiveData = fullTimetableData.slice(startIndex);

    container.innerHTML = ''; 

    if (!isFullView) {
        const viewData = effectiveData.slice(0, INITIAL_COUNT);
        viewData.forEach(item => {
            container.innerHTML += createRowHtml(item, false);
        });
        if (btnText) btnText.innerText = "View Complete Timetable";
        if (btnIcon) btnIcon.style.transform = "rotate(0deg)";
        const btn = document.getElementById('view-all-btn');
        if (btn) btn.style.display = effectiveData.length <= INITIAL_COUNT ? 'none' : 'flex';

    } else {
        effectiveData.forEach(item => {
            container.innerHTML += createRowHtml(item, true);
        });
        if (btnText) btnText.innerText = "Show Less";
        if (btnIcon) btnIcon.style.transform = "rotate(180deg)";
    }
    
    safeCreateIcons();
}

// --- Function: Toggle View ---
function toggleView() {
    const container = document.getElementById('timetable-list');
    if (isFullView) {
        isFullView = false;
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(renderTimetable, 300);
    } else {
        isFullView = true;
        renderTimetable();
    }
}

// --- Function: Countdown Timer ---
function startCountdown() {
    const ramadanDate = new Date("February 19, 2026 00:00:00").getTime();
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = ramadanDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const dEl = document.getElementById("cd-days");
        const hEl = document.getElementById("cd-hours");
        const mEl = document.getElementById("cd-minutes");

        if (dEl) dEl.innerText = days > 0 ? String(days).padStart(2, '0') : "00";
        if (hEl) hEl.innerText = String(hours).padStart(2, '0');
        if (mEl) mEl.innerText = String(minutes).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

// --- Function: Share App ---
function shareApp() {
    const shareData = {
        title: 'Ramadan Timetable 2026',
        text: 'Check out the Digital Ramadan Timetable for Mumbai 2026!',
        url: window.location.href
    };
    if (navigator.share) {
        navigator.share(shareData).catch((err) => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

// ================= DUA OF THE DAY SLIDESHOW LOGIC =================

const duaData = [
    {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
        translation: "O Allah, You are Forgiving and love forgiveness, so forgive me.",
        reference: "(Tirmidhi)"
    },
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'adhaban-nar",
        translation: "Our Lord! Give us in this world that which is good and in the Hereafter that which is good, and save us from the torment of the Fire!",
        reference: "(Qur'an 2:201)"
    },
    {
        arabic: "یَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِی عَلٰی دِینِكَ",
        transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinika",
        translation: "O Controller of the hearts, make my heart steadfast in Your religion.",
        reference: "(Tirmidhi)"
    }
];

let currentDuaIndex = 0;
const duaIntervalTime = 5000; // 5 seconds
let duaSlideInterval;

function initDuaSlideshow() {
    const slidesContainer = document.getElementById('dua-slides-container');
    const indicatorsContainer = document.getElementById('dua-indicators');
    
    if (!slidesContainer || !indicatorsContainer) return;

    // 1. Generate Slides and Indicators HTML
    duaData.forEach((dua, index) => {
        // Slide HTML
        const slideHtml = `
            <div class="w-full flex-shrink-0 px-4">
                <div class="text-center flex flex-col justify-center h-full">
                    <p class="arabic-text text-2xl mb-3 font-arabic leading-loose">
                        ${dua.arabic}
                    </p>
                    <p class="text-gray-600 text-sm italic mb-2">
                        (${dua.transliteration})
                    </p>
                    <p class="text-gray-800 text-sm font-medium">
                        "${dua.translation}"
                    </p>
                    <p class="text-xs text-gray-400 mt-3">${dua.reference}</p>
                </div>
            </div>
        `;
        slidesContainer.innerHTML += slideHtml;

        // Indicator HTML
        const indicator = document.createElement('button');
        indicator.classList.add('w-2', 'h-2', 'rounded-full', 'transition-colors', 'duration-300', 'bg-gray-300');
        if (index === 0) indicator.classList.add('bg-brand-600');
        
        indicator.addEventListener('click', () => {
            goToDuaSlide(index);
            resetDuaInterval(); 
        });
        indicatorsContainer.appendChild(indicator);
    });

    // 2. Add Event Listeners for Prev/Next buttons
    document.getElementById('prev-dua').addEventListener('click', () => {
        prevDuaSlide();
        resetDuaInterval();
    });
    document.getElementById('next-dua').addEventListener('click', () => {
        nextDuaSlide();
        resetDuaInterval();
    });

    // 3. Start Auto-play
    startDuaSlideshow();
}

function updateDuaCarousel() {
    const slidesContainer = document.getElementById('dua-slides-container');
    const indicators = document.querySelectorAll('#dua-indicators button');
    
    // Move the container
    slidesContainer.style.transform = `translateX(-${currentDuaIndex * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentDuaIndex) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-brand-600');
        } else {
            indicator.classList.remove('bg-brand-600');
            indicator.classList.add('bg-gray-300');
        }
    });
}

function nextDuaSlide() {
    currentDuaIndex = (currentDuaIndex + 1) % duaData.length;
    updateDuaCarousel();
}

function prevDuaSlide() {
    currentDuaIndex = (currentDuaIndex - 1 + duaData.length) % duaData.length;
    updateDuaCarousel();
}

function goToDuaSlide(index) {
    currentDuaIndex = index;
    updateDuaCarousel();
}

function startDuaSlideshow() {
    duaSlideInterval = setInterval(nextDuaSlide, duaIntervalTime);
}

function resetDuaInterval() {
    clearInterval(duaSlideInterval);
    startDuaSlideshow();
}

// ================= END DUA SLIDESHOW LOGIC =================

// --- NAVIGATION & MODAL LOGIC ---
function navAction(action) {
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => {
        btn.classList.remove('text-brand-600');
        btn.classList.add('text-gray-400');
    });

    if (action === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        highlightNav(0);
    } else if (action === 'timetable') {
        const section = document.getElementById('timetable-list');
        const offset = 100; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = section.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        highlightNav(1);
    } else if (action === 'about') {
        openModal('modal-about');
        highlightNav(2);
    } else if (action === 'contact') {
        openModal('modal-contact');
        highlightNav(3);
    }
}

function highlightNav(index) {
    const btns = document.querySelectorAll('.nav-btn');
    if(btns[index]) {
        btns[index].classList.remove('text-gray-400');
        btns[index].classList.add('text-brand-600');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModals() {
    const modals = document.querySelectorAll('[id^="modal-"]');
    modals.forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = ''; 
    highlightNav(0); 
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    safeCreateIcons();
    startCountdown();
    renderTimetable();
    
    const btn = document.getElementById('view-all-btn');
    if (btn) {
        btn.addEventListener('click', toggleView);
    }

    // Initialize the new Dua Slideshow
    initDuaSlideshow();
});
