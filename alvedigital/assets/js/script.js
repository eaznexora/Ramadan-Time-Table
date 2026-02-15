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
    { roza: 1, date: "Feb 19", day: "Thu", sehri: "05:34 AM", iftar: "06:31 PM" },
    { roza: 2, date: "Feb 20", day: "Fri", sehri: "05:33 AM", iftar: "06:31 PM" },
    { roza: 3, date: "Feb 21", day: "Sat", sehri: "05:32 AM", iftar: "06:32 PM" },
    { roza: 4, date: "Feb 22", day: "Sun", sehri: "05:32 AM", iftar: "06:32 PM" },
    { roza: 5, date: "Feb 23", day: "Mon", sehri: "05:31 AM", iftar: "06:33 PM" },
    { roza: 6, date: "Feb 24", day: "Tue", sehri: "05:30 AM", iftar: "06:33 PM" },
    { roza: 7, date: "Feb 25", day: "Wed", sehri: "05:30 AM", iftar: "06:34 PM" },
    { roza: 8, date: "Feb 26", day: "Thu", sehri: "05:29 AM", iftar: "06:34 PM" },
    { roza: 9, date: "Feb 27", day: "Fri", sehri: "05:28 AM", iftar: "06:34 PM" },
    { roza: 10, date: "Feb 28", day: "Sat", sehri: "05:27 AM", iftar: "06:35 PM" },
    { roza: 11, date: "Mar 01", day: "Sun", sehri: "05:26 AM", iftar: "06:36 PM" },
    { roza: 12, date: "Mar 02", day: "Mon", sehri: "05:25 AM", iftar: "06:36 PM" },
    { roza: 13, date: "Mar 03", day: "Tue", sehri: "05:25 AM", iftar: "06:37 PM" },
    { roza: 14, date: "Mar 04", day: "Wed", sehri: "05:24 AM", iftar: "06:37 PM" },
    { roza: 15, date: "Mar 05", day: "Thu", sehri: "05:23 AM", iftar: "06:37 PM" },
    { roza: 16, date: "Mar 06", day: "Fri", sehri: "05:22 AM", iftar: "06:38 PM" },
    { roza: 17, date: "Mar 07", day: "Sat", sehri: "05:21 AM", iftar: "06:38 PM" },
    { roza: 18, date: "Mar 08", day: "Sun", sehri: "05:20 AM", iftar: "06:39 PM" },
    { roza: 19, date: "Mar 09", day: "Mon", sehri: "05:19 AM", iftar: "06:39 PM" },
    { roza: 20, date: "Mar 10", day: "Tue", sehri: "05:19 AM", iftar: "06:40 PM" },
    { roza: 21, date: "Mar 11", day: "Wed", sehri: "05:18 AM", iftar: "06:40 PM" },
    { roza: 22, date: "Mar 12", day: "Thu", sehri: "05:17 AM", iftar: "06:40 PM" },
    { roza: 23, date: "Mar 13", day: "Fri", sehri: "05:16 AM", iftar: "06:41 PM" },
    { roza: 24, date: "Mar 14", day: "Sat", sehri: "05:15 AM", iftar: "06:41 PM" },
    { roza: 25, date: "Mar 15", day: "Sun", sehri: "05:14 AM", iftar: "06:41 PM" },
    { roza: 26, date: "Mar 16", day: "Mon", sehri: "05:13 AM", iftar: "06:42 PM" },
    { roza: 27, date: "Mar 17", day: "Tue", sehri: "05:12 AM", iftar: "06:42 PM" },
    { roza: 28, date: "Mar 18", day: "Wed", sehri: "05:11 AM", iftar: "06:43 PM" },
    { roza: 29, date: "Mar 19", day: "Thu", sehri: "04:10 AM", iftar: "06:43 PM" },
    { roza: 30, date: "Mar 20", day: "Fri", sehri: "04:09 AM", iftar: "06:43 PM" },
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

// --- DUA SLIDESHOW (COMPLETE & FINAL) ---
const duaData = [

    // --- Forgiveness & Laylatul Qadr ---
    {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        transliteration: "Allahumma innaka ‘afuwwun tuḥibbul-‘afwa fa‘fu ‘annī",
        translation: "अल्लाहुम्मा इन्नका अफुव्वुन तुहिब्बुल अफ़्वा फ़अफ़ु अन्नी",
        reference: "(Tirmidhi)"
    },

    // --- Dunya & Akhirah ---
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan waqinā ‘adhāban-nār",
        translation: "रब्बना आतिना फ़िद्दुन्या हसनतन व फ़िल आख़िरति हसनतन व क़िना अज़ाबन्नार",
        reference: "(Qur'an 2:201)"
    },

    // --- Imaan & Steadfastness ---
    {
        arabic: "اللَّهُمَّ يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
        transliteration: "Allāhumma yā muqallibal-qulūb thabbit qalbī ‘alā dīnik",
        translation: "अल्लाहुम्मा या मुक़ल्लिबल क़ुलूब साबित क़ल्बी अला दीनिक",
        reference: "(Tirmidhi)"
    },

    // --- Iftar Dua ---
    {
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
        transliteration: "Dhahabaẓ-ẓama’u wabtallatil-‘urūq wa thabatal-ajru in shā’Allāh",
        translation: "ज़हबज़-ज़मअु वब्तल्लतिल उरूक़ व साबितल अज्रु इं शा अल्लाह",
        reference: "(Abu Dawood)"
    },

    // --- Before Iftar ---
    {
        arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
        transliteration: "Allahumma innī laka ṣumtu wa bika āmantu wa ‘alayka tawakkaltu wa ‘alā rizqika aftartu",
        translation: "अल्लाहुम्मा इन्नी लका सुम्तु व बिका आमन्तु व अलैका तवक्कल्तु व अला रिज़्क़िका अफ़्तर्तु",
        reference: "(Abu Dawood)"
    },

    // --- Acceptance of Worship ---
    {
        arabic: "اللَّهُمَّ تَقَبَّلْ مِنَّا الصِّيَامَ وَالْقِيَامَ",
        transliteration: "Allahumma taqabbal minnā aṣ-ṣiyāma wal-qiyām",
        translation: "अल्लाहुम्मा तक़ब्बल मिन्नस्सियाम वल क़ियाम",
        reference: "(Common Dua)"
    },

    // --- Protection from Hellfire ---
    {
        arabic: "اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ",
        transliteration: "Allahumma ajirnā minan-nār",
        translation: "अल्लाहुम्मा अजिरना मिनन नार",
        reference: "(Common Dua)"
    },

    // --- Parents Forgiveness ---
    {
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        transliteration: "Rabbighfir lī wa liwālidayya",
        translation: "रब्बिघ्फ़िर ली वलि वालिदय्य",
        reference: "(Qur'an)"
    },

    // --- Parents Mercy ---
    {
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbi-rḥamhumā kamā rabbayānī ṣaghīrā",
        translation: "रब्बिरहम्हुमा कमा रब्बयानी सगीरा",
        reference: "(Qur'an 17:24)"
    },

    // --- Zikr, Shukr & Ibadah ---
    {
        arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma a‘innī ‘alā dhikrika wa shukrika wa ḥusni ‘ibādatik",
        translation: "अल्लाहुम्मा अइन्नी अला ज़िक्रिका व शुक्रिका व हुस्नि इबादतिक",
        reference: "(Abu Dawood)"
    },

    // --- I‘tikaf Intention ---
    {
        arabic: "نَوَيْتُ سُنَّةَ الْاِعْتِكَافِ مَا دُمْتُ فِي هٰذِهِ الْمَسْجِدِ",
        transliteration: "Nawaytu sunnatal-i‘tikāfi mā dumtu fī hādhihil-masjid",
        translation: "नवैतु सुन्नतल इअतिकाफि मा दुम्तु फी हाज़िहिल मस्जिद",
        reference: "(I‘tikaf Niyyah)"
    },

    // --- Taraweeh Dua (Slide 1) ---
    {
        arabic: `سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ
سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ`,
        transliteration: `Subḥāna dhil-mulki wal-malakūt Subḥāna dhil-‘izzati wal-‘aẓamati wal-haybati wal-qudrati wal-kibriyā’i wal-jabarūt`,
        translation: "सुब्हान ज़िल मुल्कि वल मलाकूत सुब्हान ज़िल इज़्ज़ति वल अज़मत वल हैबत वल क़ुदरत वल किब्रियाइ वल जबरूत",
        reference: "(Taraweeh Tasbeeh)"
    },

    // --- Taraweeh Dua (Slide 2) ---
    {
        arabic: `سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ
سُبُّوحٌ قُدُّوسٌ رَبُّنَا وَرَبُّ الْمَلَائِكَةِ وَالرُّوحِ`,
        transliteration: `Subḥānal-malikil-ḥayyilladhī lā yanāmu wa lā yamūt Subbūḥun quddūs, rabbunā wa rabbul-malā’ikati war-rūḥ`,
        translation: "सुब्हानल मलिकिल हय्यिल्लज़ी ला यनामु वला यमूत सुब्बूहुन क़ुद्दूसुन रब्बुना व रब्बुल मलाइकति वर-रूह",
        reference: "(Taraweeh Tasbeeh)"
    },

    // --- Taraweeh Dua (Slide 3) ---
    {
        arabic: `اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ
يَا مُجِيرُ يَا مُجِيرُ يَا مُجِيرُ

بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ`,
        transliteration: `Allāhumma ajirnā minan-nār Yā mujīr, yā mujīr, yā mujīr Bi-raḥmatika yā arḥamar-rāḥimīn`,
        translation: "अल्लाहुम्मा अजिरना मिनन नार या मुजीरु या मुजीरु या मुजीरु बिरहमतिका या अरहमर-राहिमीन",
        reference: "(Taraweeh Tasbeeh)"
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

// --- DATA: MORE DUAS STORE ---
const duaDataStore = {
    "Taraweeh": {
        arabic: "سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ، سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ، سُبُّوحٌ قُدُّوسٌ رَبُّنَا وَرَبُّ الْمَلَائِكَةِ وَالرُّوحِ، اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ يَا مُجِيرُ يَا مُجِيرُ يَا مُجِيرُ",
        trans: "सुब्हान ज़िल् मुल्कि वल् मल्कूत सुब्हान ज़िल् इज़्ज़ति वल् अज़मत वल् हैबति वल् क़ुदरत वल् किब्रियाइ वल् जबरूत सुब्हानल् मलिकिल् हय्यिल् लज़ी ला यनामु वला यमूत सुब्बूहुन क़ुद्दूसुन रब्बुल् मलाइकति वर्-रूह अल्लाहुम्मा अजिरना मिनन् नार या मुजीरु या मुजीरु या मुजीर",
        eng: "Glory be to the Owner of the Kingdom and the Dominion. Glory be to the Possessor of Honor, Greatness, Awe, Power, Pride, and Might. Glory be to the Sovereign who is Alive, who neither sleeps nor dies. He is the Utterly Pure, the Holy, our Lord and the Lord of the Angels and the Soul. O Allah, protect us from the Fire, O Protector, O Protector, O Protector."
    },
    "Lailatul Qadr": {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        trans: "अल्लाहुम्मा इन्नका अफुव्वुन तुहिब्बुल अफ़्वा फ़अफ़ु अन्नी",
        eng: "O Allah, You are Forgiving and love forgiveness, so forgive me."
    },
    "Istighfar": {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        trans: "अस्तग़फ़िरुल्लाह अल-अज़ीम अल्लज़ी ला इलाहा इल्ला हु अल-हय्युल-क़य्यूम वा अतूबु इलैह",
        eng: "I seek forgiveness from Allah, the Almighty, besides whom there is no God, the Living, the Sustainer, and I turn to Him in repentance."
    },
    "Rahmah": {
        arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
        trans: "रब्बना आतिना मिल्लदुनका रहमतन व हय्यि लना मिन अम्रिना रशदा",
        eng: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."
    },
    "Hidayah": {
        arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ",
        trans: "अल्लाहुम्मा अह्दिनी फ़ीमन हदैत, वा आफ़िनी फ़ीमन आफैत, वा तवल्लनी फ़ीमन तवल्लैत",
        eng: "O Allah, guide me among those whom You have guided, grant me health among those whom You have granted health, and take me into Your care among those whom You have taken into Your care."
    },
    "Shukr": {
        arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
        trans: "रब्बि औज़िअ्नी अन अश्कुरा निअमतकल्लती अनअमता अलय्या वा अला वालिदय्या वा अन आमला सालिहन तरज़ाहु",
        eng: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve."
    },
    "Daily 30 Duas": {
    arabic: "30 دعائیں",
    trans: `1. ऐ अल्लाह! इस रोज़े में मुझे अपनी रज़ा का रास्ता दिखा दे।
2. ऐ अल्लाह! मुझे नेकियों के करीब और गुनाहों से दूर कर दे।
3. ऐ अल्लाह! मुझे समझ, सब्र और इल्म अता फरमा।
4. ऐ अल्लाह! मेरी रोज़ी में बरकत और दिल में सुकून दे।
5. ऐ अल्लाह! मेरी इबादत क़ुबूल फरमा और मेरी कमियाँ माफ़ कर।
6. ऐ अल्लाह! मुझे अपनी रहमत के साए में रख।
7. ऐ अल्लाह! मुझे जहन्नम की आग से बचा और जन्नत नसीब कर।
8. ऐ अल्लाह! मेरे दिल को साफ़ और नियत को नेक बना।
9. ऐ अल्लाह! मुझे नेक लोगों की संगत अता कर।
10. ऐ अल्लाह! मेरे पिछले सारे गुनाह माफ़ फरमा।
11. ऐ अल्लाह! मुझे हलाल रोज़ी और पाक ज़िंदगी अता कर।
12. ऐ अल्लाह! मुझे ज़ालिम न बना और मज़लूमों का सहारा बना।
13. ऐ अल्लाह! मेरी ज़बान को सच और दिल को अमन दे।
14. ऐ अल्लाह! मेरे माँ-बाप पर अपनी रहमत नाज़िल फरमा।
15. ऐ अल्लाह! मुझे अपने नेक बंदों में शामिल फरमा।
16. ऐ अल्लाह! मेरी दुआओं को क़ुबूल फरमा।
17. ऐ अल्लाह! मुझे कुरआन समझने और उस पर अमल करने की तौफ़ीक़ दे।
18. ऐ अल्लाह! मेरे दिल से डर, ग़ुस्सा और हसद निकाल दे।
19. ऐ अल्लाह! मेरी आख़िरत आसान फरमा।
20. ऐ अल्लाह! मुझे अपनी क़रीबी अता कर।
21. ऐ अल्लाह! मुझे लैलतुल क़द्र की बरकत नसीब फरमा।
22. ऐ अल्लाह! मेरे घर में सुकून और मोहब्बत भर दे।
23. ऐ अल्लाह! मुझे अपनी रहमत से कभी महरूम न कर।
24. ऐ अल्लाह! मेरी हर परेशानी आसान फरमा।
25. ऐ अल्लाह! मुझे नेक आख़िरत और जन्नतुल फ़िरदौस अता कर।
26. ऐ अल्लाह! मेरे मरहूमीन की मग़फिरत फरमा।
27. ऐ अल्लाह! इस मुक़द्दस रात में मेरी सारी दुआएँ क़ुबूल कर।
28. ऐ अल्लाह! मेरी ज़िंदगी को अपनी इताअत में गुज़ारने की तौफ़ीक़ दे।
29. ऐ अल्लाह! रमज़ान की बरकतें हमारे साथ हमेशा रख।
30. ऐ अल्लाह! हमारा रोज़ा, क़ियाम और इबादत क़ुबूल फरमा। आमीन।`,
    eng: "Prayer for 30 Days of Ramadan"
    }
};

// --- ASHRAH RESPONSIVE SLIDESHOW WITH CLICKABLE DOTS ---
const ashrahData = [
    {
        title: "Dua of Rahmah",
        label: "First Ashrah",
        arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        trans: "Rabbi-ghfir war-ham wa Anta Khairur-Rahimeen",
        eng: "रब्बिघ्फ़िर वरहम व अंता ख़ैरुर-राहिमीन",
        ref: "Qur'an (23:118)"
    },
    {
        title: "Dua of Maghfirah",
        label: "Second Ashrah",
        arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
        trans: "Astaghfirullaha Rabbi min kulli dhambin wa atoobu ilayh",
        eng: "अस्तग़फ़िरुल्लाह रब्बी मिन कुल्लि ज़म्बिन वा अतूबु इलैह",
        ref: "Sunan Al-Nasa'i"
    },
    {
        title: "Dua for Protection",
        label: "Third Ashrah",
        arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        trans: "Allahumma ajirni minan-naar",
        eng: "अल्लाहुम्मा अजिरनी मिनन नार",
        ref: "Abu Dawood"
    }
];

let ashrahIndex = 0;
let ashrahTimer;

function initAshrahSlideshow() {
    const container = document.getElementById('ashrah-slides-container');
    if (!container) return;

    container.innerHTML = ashrahData.map((data, index) => `
        <div class="ashrah-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-bold text-gold-400 uppercase tracking-widest">${data.title}</h3>
                <span class="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white/90">${data.label}</span>
            </div>
            <div class="text-center mb-3">
                <p class="arabic-text text-2xl mb-2 font-arabic">${data.arabic}</p>
                <p class="text-brand-100 text-xs italic mb-1">(${data.trans})</p>
                <p class="text-white text-sm font-medium leading-snug">"${data.eng}"</p>
            </div>
            <div class="text-center border-t border-white/10 pt-2">
                <p class="text-[10px] text-brand-300">${data.ref}</p>
            </div>
        </div>
    `).join('');

    renderAshrahDots();
    startAshrahAuto();
}

function renderAshrahDots() {
    const dotsContainer = document.getElementById('ashrah-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = ashrahData.map((_, index) => `
        <button onclick="goToAshrah(${index})" 
                class="h-2 rounded-full transition-all duration-500 cursor-pointer ${index === ashrahIndex ? 'w-8 bg-gold-400' : 'w-2 bg-white/30'}"
                aria-label="Go to Ashrah ${index + 1}">
        </button>
    `).join('');
}

function goToAshrah(index) {
    const slides = document.querySelectorAll('.ashrah-slide');
    if (!slides[index]) return;

    // Switch classes
    slides[ashrahIndex].classList.remove('active');
    ashrahIndex = index;
    slides[ashrahIndex].classList.add('active');
    
    renderAshrahDots();
    startAshrahAuto(); // Reset the timer
}

function nextAshrahSlide() {
    let nextIndex = (ashrahIndex + 1) % ashrahData.length;
    goToAshrah(nextIndex);
}

function startAshrahAuto() {
    clearInterval(ashrahTimer);
    ashrahTimer = setInterval(nextAshrahSlide, 5000);
}

document.addEventListener('DOMContentLoaded', initAshrahSlideshow);

// --- FUNCTION: OPEN DUA MODAL ---
function openDuaModal(key) {
    const data = duaDataStore[key];
    if (!data) return;

    document.getElementById('m-title').innerText = key;
    document.getElementById('m-arabic').innerText = data.arabic;
    document.getElementById('m-trans').innerText = data.trans;
    document.getElementById('m-eng').innerText = data.eng;

    // Use your existing openModal function
    openModal('modal-dua');
}