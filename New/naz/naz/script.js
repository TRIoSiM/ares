// --- 🛑 ÖNEMLİ: BURAYI DÜZENLEYİN 🛑 ---

// 1. Arkadaşınızın adını buraya yazın
const friendName = "Naz";

// 2. Doğum günü tarihi ve saati
// Format: Yıl, Ay (0'dan başlar, Ocak=0, Şubat=1...), Gün, Saat, Dakika, Saniye
// Örnek: 2025 Yılı, 10. Ay (Ekim), 29. Gün, Saat 09:00:00
const birthdayTime = new Date(2025, 9, 30, 17, 0, 0).getTime(); 

// 3. Fotoğraflarınızın internet linklerini buraya yapıştırın
const userPhotos = [
    "https://i.imgur.com/egzEUYQ.jpeg", 
    "https://i.imgur.com/pwbIq81.jpeg", 
    "https://i.imgur.com/isMBama.jpeg",
    "https://i.imgur.com/QtHMlXF.jpeg",
    "https://scontent.cdninstagram.com/v/t51.82787-15/550208759_17933721687066449_7773688886416020388_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzcyMzY4MDI4NzE2Mzk5MTA2MA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=7hlPiGkbOloQ7kNvwE-NSLA&_nc_oc=AdkOaoWdGcJ9JHT2M-bT08PDR0UoO6xns7E2RfvpBNNUikxVLemQsDyM7iC7EfrevCU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ieyN0wCJtifMXYZwECFgwA&oh=00_AfdGeFf4-4GxDFXKeGHu3ds7jYr49pMCrw-NgDqSs81VAQ&oe=690808FA",
    "https://scontent.cdninstagram.com/v/t51.82787-15/539868547_17931534648066449_4069861408464779642_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzcwODUwOTcyODc1OTkyOTUyMg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=o34BC6vZy4kQ7kNvwHRU_Uu&_nc_oc=AdnXY4oqSrOHiFiN3Brhs5fA3_rAA9nvK2YODaKgajlWM_lp-VbfxwSgeOF9U0vwNgI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=ieyN0wCJtifMXYZwECFgwA&oh=00_AffuKOXvoO0D9WsiJ3IiSBjwewUVLIvO4MXOsDmuOFm2-A&oe=6907F004",
    "https://i.imgur.com/BW3BtlL.jpeg",
    "https://i.imgur.com/u77BJHZ.jpeg",


]

// ------------------------------------------
// HTML Elementleri ve Değişkenler
const startButtonScreen = document.getElementById('startButtonScreen');
const countdownContainer = document.getElementById('countdown-container');
const startButton = document.getElementById('startButton');
const birthdayScreen = document.getElementById('birthdayContent');
const birthdayTitle = document.getElementById('birthdayTitle');
const photoTrack = document.getElementById('photo-track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pauseMusicBtn = document.getElementById('pauseMusicBtn');
const playMusicBtn = document.getElementById('playMusicBtn');

let player; 
let currentSlide = 0;
let photos = [];
let isPlayerReady = false;
let userClickedStart = false;

// YouTube API Hazır Fonksiyonu
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'AYnojfDGgwI', // Can Bonomo - İyi ki Doğdun
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Oynatıcı Hazır Fonksiyonu
function onPlayerReady(event) {
    isPlayerReady = true; 
    // Geri sayım bittiyse ve oynatıcı yeni hazırlandıysa, sesi kapalı (mute) şekilde başlat.
    if (countdownContainer.classList.contains('hidden')) {
        player.mute();
        player.seekTo(22, true);
        player.playVideo();
    }
}

// Müziği Çal
function playMusic() {
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        pauseMusicBtn.classList.remove('hidden');
        playMusicBtn.classList.add('hidden');
    }
}

// Müziği Durdur
function pauseMusic() {
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
        pauseMusicBtn.classList.add('hidden');
        playMusicBtn.classList.remove('hidden');
    }
}

// Sürprizi Başlatan Ana Fonksiyon (Butona Tıklanınca)
function startSurprise() {
    userClickedStart = true;

    // 1. Buton ekranını gizle
    startButtonScreen.classList.add('hidden');
    
    // 2. Doğum günü içeriğini göster
    birthdayScreen.classList.remove('hidden');

    // 3. Müzik Kontrol butonlarını görünür yap
    document.querySelector('.music-controls').classList.add('visible');

    // 4. Fotoğraf galerisini ayarla
    setupSlider();
    
    // 5. Müziği başlat (Sesi aç ve 22. saniyeye git)
    if (isPlayerReady) {
        player.unMute(); 
        player.seekTo(22, true); 
        playMusic();
    }
}


// Geri Sayım Mantığı
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayTime - now;

    // Süre hesaplamaları
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Değerleri ekrana yaz
    document.getElementById('days').innerText = days < 0 ? 0 : days;
    document.getElementById('hours').innerText = hours < 0 ? 0 : hours;
    document.getElementById('minutes').innerText = minutes < 0 ? 0 : minutes;
    document.getElementById('seconds').innerText = seconds < 0 ? 0 : seconds;


    // Geri sayım bittiğinde
    if (distance < 0) {
        clearInterval(countdownInterval);
        
        // Geri sayımı gizle
        countdownContainer.classList.add('hidden');
        
        // Başlatma butonunu göster
        startButtonScreen.classList.remove('hidden');
        
        // Oynatıcı hazırsa, sesi kapalı şekilde çalmaya başla
        if (isPlayerReady) {
             player.mute();
             player.seekTo(22, true);
             player.playVideo();
        }
    }
}, 1000);


// Fotoğraf Galerisi Kurulumu
function setupSlider() {
    birthdayTitle.textContent = `İyi ki Doğdun ${friendName}!`;

    userPhotos.forEach(photoUrl => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = "Doğum Günü Anısı";
        slide.appendChild(img);
        photoTrack.appendChild(slide);
    });

    photos = document.querySelectorAll('.slide');
    if (photos.length > 0) {
        showSlide(0);
    }
}

// Slayt Gösterme Fonksiyonu
function showSlide(index) {
    const totalPhotos = photos.length;
    if (index >= totalPhotos) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalPhotos - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    photoTrack.style.transform = `translateX(${offset}%)`;
}

// Olay dinleyicileri
startButton.addEventListener('click', startSurprise);
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
pauseMusicBtn.addEventListener('click', pauseMusic);
playMusicBtn.addEventListener('click', playMusic);