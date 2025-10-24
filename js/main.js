// Run code when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {


// Define events data (5 events )
    const events = [
    {
        id: 1,
        title_ar: 'دار الأوبرا', title_en: 'The Opera House',
        date: '2025-10-25',
        location_ar: 'دمشق بالقرب من ساحة الأمويين', location_en: 'Damascus near Umayyad Square',
        category_ar: 'موسيقى', category_en: 'Music',
        description_ar: 'حفل موسيقي متناغم ترأسه المطربة ليندا بيطار تقدم من خلاله مزيج من اهم الاغاني والالحان التراثية في دار الأوبرا في دمشق.', description_en: 'A harmonious concert led by the singer Linda Bitar, presenting a mix of the most important traditional songs and melodies at the Opera House in Damascus.',
        image: 'img/event opera.jpg',
        map: 'img/location opera.png'
    },
    {
        id: 2,
        title_ar: 'معرض دمشق الدولي', title_en: 'Damascus International Fair',
        date: '2025-10-30',
        location_ar: 'دمشق بالقرب من طريق المطار الدولي', location_en: 'Damascus near the International Airport Road',
        category_ar: 'ثقافة', category_en: 'Culture',
        description_ar: 'معرض سنوي في دمشق يقام به أهم الفعاليات المحلية التي تقدم صورة جميلة عن التراث السوري تشارك فيه معظم دول العالم.', description_en: 'An annual exhibition in Damascus hosts the most important local events that showcase a beautiful image of Syrian heritage, with participation from most countries around the world.',
        image: 'img/event damascus festival.jpg',
        map: 'img/location damascus festival.png'
    },
    {
        id: 3,
        title_ar: 'بطولة شطرنج', title_en: 'Chess Championship',
        date: '2025-11-01',
        location_ar: 'دمشق بجانب مدينة تشرين الرياضية', location_en: 'Damascus, next to Tishreen Sports City',
        category_ar: 'رياضة', category_en: 'Sports',
        description_ar: 'بطولة محلية على نظام البليتز بين اكثر من 100 منافس من سوريا وستعرض على شاشات قريبة على مكان المنافسين .', description_en: 'A local blitz tournament with more than 100 competitors from Syria, and it will be broadcast on screens near the competitor locations.',
        image: 'img/event chess.jpg',
        map: 'img/location chess.png'
    },
    {
        id: 4,
        title_ar: 'الأرض السعيدة', title_en: 'happy land',
        date: '2025-11-05',
        location_ar: 'دمشق مدينة المعارض الجديدة، طريق دمشق – مطار دمشق الدولي', location_en: 'Damascus, the New Exhibition City, Damascus – Damascus International Airport Road',
        category_ar: 'عائلي', category_en: 'Family',
        description_ar: 'هل تبحث عن تجربة ترفيهية متكاملة في قلب العاصمة السورية؟ لا داعي للبحث بعيدًا! “مدينة الأرض السعيدة” (Happy Land) هي الوجهة الأمثل للمرح والإثارة والاسترخاء في دمشق، حيث يجد الصغار والكبار كل ما يحلمون به من مغامرات وألعاب وتجهيزات عالمية', description_en: 'Are you looking for a complete entertainment experience in the heart of the Syrian capital? Look no further! "Happy Land" is the perfect destination for fun, excitement, and relaxation in Damascus, where both children and adults can find everything they dream of in terms of adventures, games, and world-class facilities.',
        image: 'img/event happy land.jpg',
        map: 'img/location happy land 2.png'
    },
    {
        id: 5,
        title_ar: 'المتحف الوطني', title_en: 'The National Museum',
        date: '2025-11-10',
        location_ar: 'دمشق بالقرب من شارع شكري القوتلي', location_en: 'Damascus near Shukri al-Quwatli Street',
        category_ar: 'ثقافة', category_en: 'Culture',
        description_ar: 'المتحف الوطني بدمشق عميد المتاحف السورية واحد من أهم المتاحف العربية، فهو أكبرها وأقدمها وأشهرها ويشكل بأقسامه وحدائقه الواسعة متاحف عديدة ضمن متحف واحد، كما ويضم أبرز الآثار السورية المكتشفة في القرن العشرين', description_en: 'The National Museum in Damascus is the dean of Syrian museums and one of the most important Arab museums. It is the largest, oldest, and most famous, and with its sections and large gardens, it encompasses many museums within a single museum. It also houses the most prominent Syrian antiquities discovered in the twentieth century.',
        image: 'img/event musuem.jpg',
        map: 'img/location musuem.png'
    }
];


    // Initialize language toggle variables
    const langToggle = document.getElementById('lang-toggle');
    const langFlag = document.getElementById('lang-flag');
    let currentLang = 'ar';

    // Add click event for language toggle
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.body.classList.toggle('lang-en', currentLang === 'en');
        document.body.classList.toggle('lang-ar', currentLang === 'ar');
        langFlag.src = currentLang === 'ar' ? 'img/syrian flag.png' : 'img/uk flag.jpg';
        langFlag.alt = currentLang === 'ar' ? 'عربي' : 'English';

        // Update all text elements with data attributes
        document.querySelectorAll('[data-ar]').forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });

        // Reload events if on relevant pages
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') loadLatestEvents('');
        if (window.location.pathname.includes('events.html')) loadEvents();
        if (window.location.pathname.includes('event.html')) loadEventDetails();
    });

    // Handle index.html dynamic latest events and category filtering
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Function to load and filter latest events
        function loadLatestEvents(category) {
            const latestEvents = document.getElementById('latest-events');
            latestEvents.innerHTML = '';
            let filtered = events;

            if (category && category !== (currentLang === 'ar' ? 'كل التصنيفات' : 'All Categories')) {
                filtered = filtered.filter(e => e[`category_${currentLang}`] === category);
            }

            filtered.forEach(event => {
                const card = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${event.image}" class="card-img-top" alt="${event[`title_${currentLang}`]}">
                            <div class="card-body">
                                <h5 class="card-title">${event[`title_${currentLang}`]}</h5>
                                <p class="card-text">${currentLang === 'ar' ? 'تاريخ:' : 'Date:'} ${event.date}</p>
                                <a href="event.html?id=${event.id}" class="btn btn-primary">${currentLang === 'ar' ? 'التفاصيل' : 'Details'}</a>
                            </div>
                        </div>
                    </div>
                `;
                latestEvents.innerHTML += card;
            });
        }

        // Initial load of latest events (all)
        loadLatestEvents('');

        // Add click events to category badges
        document.querySelectorAll('.category-badge').forEach(badge => {
            badge.addEventListener('click', () => {
                const selectedCategory = badge.textContent;
                loadLatestEvents(selectedCategory);
            });
        });
    }

    // Handle events filtering on events.html
    if (window.location.pathname.includes('events.html')) {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const dateFilter = document.getElementById('dateFilter');
        const eventsList = document.getElementById('eventsList');

        // Function to load and filter events
        function loadEvents() {
            eventsList.innerHTML = '';
            let filtered = events;

            const search = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const date = dateFilter.value;

            if (search) filtered = filtered.filter(e => e[`title_${currentLang}`].toLowerCase().includes(search));
            if (category) filtered = filtered.filter(e => e[`category_${currentLang}`] === category);
            if (date) filtered = filtered.filter(e => e.date === date);

            filtered.forEach(event => {
                const card = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${event.image}" class="card-img-top" alt="${event[`title_${currentLang}`]}">
                            <div class="card-body">
                                <h5 class="card-title">${event[`title_${currentLang}`]}</h5>
                                <p class="card-text">${currentLang === 'ar' ? 'تاريخ:' : 'Date:'} ${event.date}</p>
                                <p class="card-text">${currentLang === 'ar' ? 'مكان:' : 'Location:'} ${event[`location_${currentLang}`]}</p>
                                <p class="card-text">${currentLang === 'ar' ? 'تصنيف:' : 'Category:'} ${event[`category_${currentLang}`]}</p>
                                <p class="card-text">${event[`description_${currentLang}`].substring(0, 50)}...</p>
                                <a href="event.html?id=${event.id}" class="btn btn-primary">${currentLang === 'ar' ? 'التفاصيل' : 'Details'}</a>
                            </div>
                        </div>
                    </div>
                `;
                eventsList.innerHTML += card;
            });
        }

        // Initial load of events
        loadEvents();

        // Add event listeners for filters
        searchInput.addEventListener('input', loadEvents);
        categoryFilter.addEventListener('change', loadEvents);
        dateFilter.addEventListener('change', loadEvents);
    }

    // Handle event details on event.html
    if (window.location.pathname.includes('event.html')) {
        // Function to load event details
        function loadEventDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = parseInt(urlParams.get('id'));
            const event = events.find(e => e.id === id);

            if (event) {
                document.getElementById('event-title').textContent = event[`title_${currentLang}`];
                document.getElementById('event-date').textContent = `${currentLang === 'ar' ? 'تاريخ:' : 'Date:'} ${event.date}`;
                document.getElementById('event-location').textContent = `${currentLang === 'ar' ? 'مكان:' : 'Location:'} ${event[`location_${currentLang}`]}`;
                document.getElementById('event-description').textContent = event[`description_${currentLang}`];
                document.getElementById('event-map').src = event.map;

                // Load related events
                const relatedList = document.getElementById('related-events');
                relatedList.innerHTML = '';
                const related = events.filter(e => e.id !== id && e[`category_${currentLang}`] === event[`category_${currentLang}`]).slice(0, 3);
                related.forEach(rel => {
                    const card = `
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${rel.image}" class="card-img-top" alt="${rel[`title_${currentLang}`]}">
                                <div class="card-body">
                                    <h5 class="card-title">${rel[`title_${currentLang}`]}</h5>
                                    <a href="event.html?id=${rel.id}" class="btn btn-primary">${currentLang === 'ar' ? 'التفاصيل' : 'Details'}</a>
                                </div>
                            </div>
                        </div>
                    `;
                    relatedList.innerHTML += card;
                });

                // Add click event for share button
                document.getElementById('share-event').addEventListener('click', () => {
                    if (navigator.share) {
                        navigator.share({
                            title: event[`title_${currentLang}`],
                            text: event[`description_${currentLang}`],
                            url: window.location.href
                        }).catch(console.error);
                    } else {
                        alert(currentLang === 'ar' ? 'المشاركة غير مدعومة في هذا المتصفح' : 'Sharing not supported in this browser');
                    }
                });

                // Add click event for add to calendar button
                document.getElementById('add-to-calendar').addEventListener('click', () => {
                    alert(currentLang === 'ar' ? 'تمت الإضافة إلى التقويم!' : 'Added to Calendar!');
                });
            } else {
                document.getElementById('event-title').textContent = currentLang === 'ar' ? 'لا توجد فعالية' : 'No Event Found';
            }
        }

        // Initial load of event details
        loadEventDetails();
    }

    // Handle contact form validation on contact.html
    if (window.location.pathname.includes('contact.html')) {
        const form = document.getElementById('contactForm');
        const alertMessage = document.getElementById('alertMessage');

        // Add submit event for form validation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alertMessage.innerHTML = `<div class="alert alert-danger">${currentLang === 'ar' ? 'جميع الحقول مطلوبة!' : 'All fields are required!'}</div>`;
                return;
            }
            if (!email.match(/^\S+@\S+\.\S+$/)) {
                alertMessage.innerHTML = `<div class="alert alert-danger">${currentLang === 'ar' ? 'صيغة البريد غير صحيحة!' : 'Invalid email format!'}</div>`;
                return;
            }

            alertMessage.innerHTML = `<div class="alert alert-success">${currentLang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent successfully!'}</div>`;
            form.reset(); 
        });
    }
});