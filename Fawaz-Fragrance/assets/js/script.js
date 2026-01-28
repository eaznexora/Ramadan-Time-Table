// --- CONFIGURATION ---
const DEMO_MODE = false; 

// --- Helper: Safe Icon Initialization ---
function safeCreateIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- Helper: Get Date Object ---
function getCurrentDate() {
    if (DEMO_MODE) {
        return new Date("2026-02-19T17:00:00"); 
    }
    return new Date();
}

function getTodayString() {
    const date = getCurrentDate();
    const month = date.toLocaleString('default', { month: 'short' }); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}`;
}

// --- Data: Full 30-Day Timetable ---
const fullTimetableData = [
    { roza: 1, date: "Feb 19", day: "Thu", sehri: "05:52 AM", iftar: "06:40 PM" },
    { roza: 2, date: "Feb 20", day: "Fri", sehri: "05:51 AM", iftar: "06:40 PM" },
    { roza: 3, date: "Feb 21", day: "Sat", sehri: "05:51 AM", iftar: "06:41 PM" },
    { roza: 4, date: "Feb 22", day: "Sun", sehri: "05:50 AM", iftar: "06:41 PM" },
    { roza: 5, date: "Feb 23", day: "Mon", sehri: "05:49 AM", iftar: "06:41 PM" },
    { roza: 6, date: "Feb 24", day: "Tue", sehri: "05:49 AM", iftar: "06:42 PM" },
    { roza: 7, date: "Feb 25", day: "Wed", sehri: "05:48 AM", iftar: "06:42 PM" },
    { roza: 8, date: "Feb 26", day: "Thu", sehri: "05:48 AM", iftar: "06:42 PM" },
    { roza: 9, date: "Feb 27", day: "Fri", sehri: "05:47 AM", iftar: "06:43 PM" },
    { roza: 10, date: "Feb 28", day: "Sat", sehri: "05:46 AM", iftar: "06:43 PM" },
    { roza: 11, date: "Mar 01", day: "Sun", sehri: "05:46 AM", iftar: "06:44 PM" },
    { roza: 12, date: "Mar 02", day: "Mon", sehri: "05:45 AM", iftar: "06:44 PM" },
    { roza: 13, date: "Mar 03", day: "Tue", sehri: "05:44 AM", iftar: "06:44 PM" },
    { roza: 14, date: "Mar 04", day: "Wed", sehri: "05:44 AM", iftar: "06:45 PM" },
    { roza: 15, date: "Mar 05", day: "Thu", sehri: "05:43 AM", iftar: "06:45 PM" },
    { roza: 16, date: "Mar 06", day: "Fri", sehri: "05:42 AM", iftar: "06:45 PM" },
    { roza: 17, date: "Mar 07", day: "Sat", sehri: "05:41 AM", iftar: "06:46 PM" },
    { roza: 18, date: "Mar 08", day: "Sun", sehri: "05:41 AM", iftar: "06:46 PM" },
    { roza: 19, date: "Mar 09", day: "Mon", sehri: "05:40 AM", iftar: "06:46 PM" },
    { roza: 20, date: "Mar 10", day: "Tue", sehri: "05:39 AM", iftar: "06:46 PM" },
    { roza: 21, date: "Mar 11", day: "Wed", sehri: "05:38 AM", iftar: "06:47 PM" },
    { roza: 22, date: "Mar 12", day: "Thu", sehri: "05:38 AM", iftar: "06:47 PM" },
    { roza: 23, date: "Mar 13", day: "Fri", sehri: "05:37 AM", iftar: "06:47 PM" },
    { roza: 24, date: "Mar 14", day: "Sat", sehri: "05:36 AM", iftar: "06:48 PM" },
    { roza: 25, date: "Mar 15", day: "Sun", sehri: "05:35 AM", iftar: "06:48 PM" },
    { roza: 26, date: "Mar 16", day: "Mon", sehri: "05:34 AM", iftar: "06:48 PM" },
    { roza: 27, date: "Mar 17", day: "Tue", sehri: "05:33 AM", iftar: "06:48 PM" },
    { roza: 28, date: "Mar 18", day: "Wed", sehri: "05:33 AM", iftar: "06:49 PM" },
    { roza: 29, date: "Mar 19", day: "Thu", sehri: "05:32 AM", iftar: "06:49 PM" },
    { roza: 30, date: "Mar 20", day: "Fri", sehri: "05:31 AM", iftar: "06:49 PM" },
];

let isFullView = false;
const INITIAL_COUNT = 5;

// --- Render Row ---
function createRowHtml(item, animate = false) {
    const todayString = getTodayString();
    const isToday = (item.date.toLowerCase() === todayString.toLowerCase()); 

    let cardClass = isToday 
        ? 'bg-white border-l-[6px] border-l-brand-500 shadow-lg transform scale-[1.02] z-10' 
        : 'bg-gray-50 border border-gray-100 hover:bg-white border-l-0';
    
    let textClass = isToday ? 'text-brand-700' : 'text-gray-600';
    let badge = isToday ? `<span class="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-sm">TODAY</span>` : '';
    const animationClass = animate ? 'animate-fade-in' : 'reveal';

    return `
        <div class="${cardClass} ${animationClass} rounded-xl p-4 transition-all duration-200 flex items-center justify-between mb-3 relative overflow-hidden group">
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
                    <span class="text-sm font-bold text-gray-800 bg-gray-100/80 px-2 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap min-w-[80px] flex justify-center shadow-sm group-hover:bg-white transition-colors">${item.sehri}</span>
                </div>
                <div class="text-center flex flex-col items-center">
                    <div class="flex items-center justify-center text-gray-400 mb-1">
                        <span class="text-[10px] uppercase font-semibold text-gray-400 tracking-wide">Iftar</span>
                    </div>
                    <span class="text-sm font-bold text-gray-800 bg-gray-100/80 px-2 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap min-w-[80px] flex justify-center shadow-sm group-hover:bg-white transition-colors">${item.iftar}</span>
                </div>
            </div>
        </div>
    `;
}

// --- Render Timetable ---
function renderTimetable() {
    const container = document.getElementById('timetable-list');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const btn = document.getElementById('view-all-btn');
    if (!container) return;
    
    const todayString = getTodayString();
    const todayIndex = fullTimetableData.findIndex(item => item.date.toLowerCase() === todayString.toLowerCase());
    const startIndex = (todayIndex !== -1) ? todayIndex : 0;
    const effectiveData = fullTimetableData.slice(startIndex);

    container.innerHTML = ''; 

    if (!isFullView) {
        const viewData = effectiveData.slice(0, INITIAL_COUNT);
        viewData.forEach(item => { container.innerHTML += createRowHtml(item, false); });
        if (btnText) btnText.innerText = "View Complete Timetable";
        if (btnIcon) btnIcon.style.transform = "rotate(0deg)";
        if (btn) btn.style.display = effectiveData.length <= INITIAL_COUNT ? 'none' : 'flex';
    } else {
        effectiveData.forEach(item => { container.innerHTML += createRowHtml(item, true); });
        if (btnText) btnText.innerText = "Show Less";
        if (btnIcon) btnIcon.style.transform = "rotate(180deg)";
    }
    safeCreateIcons();
    initScrollAnimations();
}

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

// --- SMART COUNTDOWN LOGIC ---

function parseTime(timeStr, baseDate) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') { hours = '00'; }
    if (modifier === 'PM') { hours = parseInt(hours, 10) + 12; }
    const date = new Date(baseDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

let lastLabelState = "";
let lastDuaState = "";

function startCountdown() {
    let systemDate = new Date(); 
    if (DEMO_MODE) systemDate = new Date("2026-02-19T17:30:00"); 

    const ramadanStartDate = new Date("February 19, 2026 00:00:00");
    const titleElement = document.getElementById('countdown-title'); 
    const duaContainer = document.getElementById('dua-container');
    const blockDays = document.getElementById('block-days');
    const sepDays = document.getElementById('sep-days');
    
    const timer = setInterval(function() {
        let now;
        if (DEMO_MODE) {
            systemDate.setSeconds(systemDate.getSeconds() + 1);
            now = new Date(systemDate);
        } else {
            now = new Date();
        }

        let targetDate;
        let labelText = "";
        let duaText = "";
        let showDays = true; 

        if (now < ramadanStartDate) {
            targetDate = ramadanStartDate;
            labelText = "Ramadan Begins In";
            duaText = `<p class="text-sm text-brand-600 font-medium">Prepare your heart and time for Ramadan</p>`;
            showDays = true;
        } else {
            showDays = false; 
            const month = now.toLocaleString('default', { month: 'short' }); 
            const day = String(now.getDate()).padStart(2, '0');
            const todayStr = `${month} ${day}`;
            const todayData = fullTimetableData.find(d => d.date.toLowerCase() === todayStr.toLowerCase());

            if (todayData) {
                const sehriTime = parseTime(todayData.sehri, now);
                const iftarTime = parseTime(todayData.iftar, now);

                if (now < sehriTime) {
                    targetDate = sehriTime;
                    labelText = `SEHRI ENDS IN <span class="text-brand-500">(ROZA ${todayData.roza})</span>`;
                    
                    // ADJUSTED SIZE TO text-2xl AND ADDED EXTRA MARGINS
                    duaText = `
                        <div class="animate-fade-in mt-4">
                            <span class="text-[10px] text-brand-600 font-bold uppercase tracking-widest block mb-5">SEHRI DUA (INTENTION)</span>
                            <p class="arabic-text text-2xl text-brand-600 font-bold mb-3">وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ</p>
                            <p class="text-xs italic text-gray-500">Wa bisawmi ghadinn nawaiytu min shahri ramadan</p>
                        </div>
                    `;
                } else if (now >= sehriTime && now < iftarTime) {
                    targetDate = iftarTime;
                    labelText = `IFTAR BEGINS IN <span class="text-brand-500">(ROZA ${todayData.roza})</span>`;
                    
                    duaText = `
                        <div class="animate-fade-in mt-4">
                            <span class="text-[10px] text-brand-600 font-bold uppercase tracking-widest block mb-5">IFTAR DUA (OPENING)</span>
                            <p class="arabic-text text-2xl text-brand-600 font-bold mb-3">اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ</p>
                            <p class="text-xs italic text-gray-500">Allahumma inni laka sumtu wa 'alayka tawakkaltu wa 'ala rizqika aftartu</p>
                        </div>
                    `;
                } else {
                    const tomorrowIndex = fullTimetableData.indexOf(todayData) + 1;
                    if (tomorrowIndex < fullTimetableData.length) {
                        const tomorrowData = fullTimetableData[tomorrowIndex];
                        const tomorrowBase = new Date(now);
                        tomorrowBase.setDate(tomorrowBase.getDate() + 1);
                        targetDate = parseTime(tomorrowData.sehri, tomorrowBase);
                        labelText = `SEHRI ENDS IN <span class="text-brand-500">(ROZA ${tomorrowData.roza})</span>`;
                        duaText = `
                            <div class="animate-fade-in mt-4">
                                <span class="text-[10px] text-brand-600 font-bold uppercase tracking-widest block mb-5">SEHRI DUA (INTENTION)</span>
                                <p class="arabic-text text-2xl text-brand-600 font-bold mb-3">وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ</p>
                                <p class="text-xs italic text-gray-500">Wa bisawmi ghadinn nawaiytu min shahri ramadan</p>
                            </div>
                        `;
                    } else {
                        labelText = "EID MUBARAK!";
                        targetDate = null;
                        duaText = `<p class="text-sm text-brand-600 font-medium">May Allah accept our fasting and prayers.</p>`;
                    }
                }
            } else {
                labelText = "EID MUBARAK!";
                targetDate = null;
                duaText = `<p class="text-sm text-brand-600 font-medium">Ramadan has ended.</p>`;
            }
        }

        if (titleElement && labelText !== lastLabelState) {
            titleElement.innerHTML = labelText;
            lastLabelState = labelText;
        }
        
        if (duaContainer && duaText !== lastDuaState) {
            duaContainer.innerHTML = duaText;
            lastDuaState = duaText;
        }

        if (blockDays && sepDays) {
            const displayStyle = showDays ? 'flex' : 'none';
            blockDays.style.display = displayStyle;
            sepDays.style.display = displayStyle;
        }

        if (targetDate) {
            const distance = targetDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const dEl = document.getElementById("cd-days");
            const hEl = document.getElementById("cd-hours");
            const mEl = document.getElementById("cd-minutes");
            const sEl = document.getElementById("cd-seconds");

            if (dEl) dEl.innerText = days >= 0 ? String(days).padStart(2, '0') : "00";
            if (hEl) hEl.innerText = hours >= 0 ? String(hours).padStart(2, '0') : "00";
            if (mEl) mEl.innerText = minutes >= 0 ? String(minutes).padStart(2, '0') : "00";
            if (sEl) sEl.innerText = seconds >= 0 ? String(seconds).padStart(2, '0') : "00";
        }
    }, 1000);
}

// --- Share Logic ---
function shareApp() {
    const shareData = {
        title: 'Ramadan Timetable 2026',
        text: '🌙 *Ramadan Timetable 2026 - Mumbai*\n\nView the complete digital timetable with daily Sehri & Iftar timings, Duas, and more.\n\nClick here to view:',
        url: window.location.href
    };
    if (navigator.share) {
        navigator.share(shareData).catch((err) => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => alert('Could not copy link.'));
    }
}

// --- Nav & Modals ---
function navAction(action) {
    if (action === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'timetable') {
        const section = document.getElementById('timetable-list');
        const offset = 100; 
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    } else if (action === 'about') {
        openModal('modal-about');
    } else if (action === 'contact') {
        openModal('modal-contact');
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
}

// --- DUA SLIDESHOW ---
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
const duaIntervalTime = 5000; 
let duaSlideInterval;

function initDuaSlideshow() {
    const slidesContainer = document.getElementById('dua-slides-container');
    const indicatorsContainer = document.getElementById('dua-indicators');
    if (!slidesContainer || !indicatorsContainer) return;

    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    duaData.forEach((dua, index) => {
        const slideHtml = `
            <div class="w-full flex-shrink-0 px-4">
                <div class="text-center flex flex-col justify-center h-full">
                    <p class="arabic-text text-2xl mb-3 font-arabic leading-loose text-brand-600">${dua.arabic}</p>
                    <p class="text-gray-600 text-sm italic mb-2">(${dua.transliteration})</p>
                    <p class="text-gray-800 text-sm font-medium">"${dua.translation}"</p>
                    <p class="text-xs text-gray-400 mt-3">${dua.reference}</p>
                </div>
            </div>
        `;
        slidesContainer.innerHTML += slideHtml;

        const indicator = document.createElement('button');
        indicator.classList.add('w-2', 'h-2', 'rounded-full', 'transition-colors', 'duration-300', 'bg-gray-300');
        if (index === 0) indicator.classList.add('bg-brand-600');
        
        indicator.addEventListener('click', () => { goToDuaSlide(index); resetDuaInterval(); });
        indicatorsContainer.appendChild(indicator);
    });

    document.getElementById('prev-dua').addEventListener('click', () => { prevDuaSlide(); resetDuaInterval(); });
    document.getElementById('next-dua').addEventListener('click', () => { nextDuaSlide(); resetDuaInterval(); });

    updateDuaCarousel();
    startDuaSlideshow();
}

function updateDuaCarousel() {
    const slidesContainer = document.getElementById('dua-slides-container');
    const indicators = document.querySelectorAll('#dua-indicators button');
    slidesContainer.style.transform = `translateX(-${currentDuaIndex * 100}%)`;
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

function nextDuaSlide() { currentDuaIndex = (currentDuaIndex + 1) % duaData.length; updateDuaCarousel(); }
function prevDuaSlide() { currentDuaIndex = (currentDuaIndex - 1 + duaData.length) % duaData.length; updateDuaCarousel(); }
function goToDuaSlide(index) { currentDuaIndex = index; updateDuaCarousel(); }
function startDuaSlideshow() { duaSlideInterval = setInterval(nextDuaSlide, duaIntervalTime); }
function resetDuaInterval() { clearInterval(duaSlideInterval); startDuaSlideshow(); }

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    safeCreateIcons();
    startCountdown();
    renderTimetable();
    const btn = document.getElementById('view-all-btn');
    if (btn) { btn.addEventListener('click', toggleView); }
    initDuaSlideshow();
    initScrollAnimations(); 
});

