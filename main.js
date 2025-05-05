// MusicHub - Very Simple Music Player & Download

document.addEventListener('DOMContentLoaded', function() {
    // Create audio element
    const audio = new Audio();
    initSearch();
    const links = document.querySelectorAll('header .nav-links a');
    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || (link.getAttribute('href') === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
    
    // Simple track list (just titles and file names)
    const tracks = [
        {
            title: 'Boosted',
            artist: 'DJ Boost',
            cover: 'images/music/Boosted.jpg',
            file: 'audio/Boosted.mp3',
            duration: '4:03'
        },
        {
            title: 'Bowsy',
            artist: 'DJ Bows',
            cover: 'images/music/Bowsy.jpg',
            file: 'audio/bowsy.mp3',
            duration: '2:13'
        },
        {
            title: 'Cyyxx66',
            artist: 'DJ Cyyxx',
            cover: 'images/music/cyyxx66.jpg',
            file: 'audio/cyyxx66.mp3',
            duration: '1:54'
        },
        {
            title: 'Death666',
            artist: 'DJ Death',
            cover: 'images/music/Death666.jpg',
            file: 'audio/death666.mp3',
            duration: '1:24'
        },
        {
            title: 'Deezer',
            artist: 'DJ Deezer',
            cover: 'images/music/Deezer.jpg',
            file: 'audio/deezer.mp3',
            duration: '2:57'
        },
        {
            title: 'Gaana',
            artist: 'DJ Gaana',
            cover: 'images/music/Gaana.jpg',
            file: 'audio/gaana.mp3',
            duration: '1:45'
        },
        {
            title: 'Mef',
            artist: 'DJ Mef',
            cover: 'images/music/Mef.jpg',
            file: 'audio/mef.mp3',
            duration: '4:25'
        },
        {
            title: 'Montagem',
            artist: 'DJ Montagem',
            cover: 'images/music/Montagem.jpg',
            file: 'audio/montagem.mp3',
            duration: '2:21'
        },
        {
            title: 'Berserk',
            artist: 'DJ Berserk',
            cover: 'images/music/Berserk.jpg',
            file: 'audio/berserk.mp3',
            duration: '3:35'
        },
        {
            title: 'Drift',
            artist: 'DJ Drift',
            cover: 'images/music/Drift.jpg',
            file: 'audio/drift.mp3',
            duration: '1:24'
        },
        {
            title: 'Podzemniiy',
            artist: 'DJ Podzemniiy',
            cover: 'images/music/Podzemniiy.jpg',
            file: 'audio/podzemniiy.mp3',
            duration: '1:34'
        }
    ];
    
    // Current track index
    let currentTrackIndex = 0;
    
    // Set up play buttons
    setupPlayButtons();
    
    // Set up download buttons
    setupDownloadButtons();
    
    // Set up player controls
    setupPlayerControls();
    
    // Simple function to set up all play buttons
    function setupPlayButtons() {
        // Card play buttons
        const playButtons = document.querySelectorAll('.play-button');
        playButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Set current track index
                currentTrackIndex = index;
                
                // Play the track
                playCurrentTrack();
            });
        });
        
        // Featured play button
        const featuredPlayBtn = document.querySelector('.play-now-btn');
        if (featuredPlayBtn) {
            featuredPlayBtn.addEventListener('click', function() {
                // Featured track is usually the first one
                currentTrackIndex = 0;
                
                // Play the track
                playCurrentTrack();
            });
        }
        
        // Main player play/pause button
        const playPauseBtn = document.querySelector('.play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                if (audio.paused) {
                    playAudio();
                } else {
                    pauseAudio();
                }
            });
        }
    }
    
    // Simple function to play current track
    function playCurrentTrack() {
        const track = tracks[currentTrackIndex];
        
        // Update player display
        document.querySelector('.now-playing-img').src = track.cover;
        document.querySelector('.now-playing-title').textContent = track.title;
        document.querySelector('.now-playing-artist').textContent = track.artist;
        
        // Set audio source
        audio.src = track.file;
        
        // Play audio
        playAudio();
    }
    
    // Simple function to play audio
    function playAudio() {
        audio.play().catch(error => {
            console.error('Playback failed:', error);
            alert('Could not play audio. File may not exist.');
        });
        
        // Update play button
        document.querySelector('.play-pause').textContent = '❚❚';
    }
    
    // Simple function to pause audio
    function pauseAudio() {
        audio.pause();
        
        // Update play button
        document.querySelector('.play-pause').textContent = '▶';
    }
    
    // Simple function to set up player controls
    function setupPlayerControls() {
        // Next button
        const nextBtn = document.querySelector('.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                // Go to next track
                currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
                playCurrentTrack();
            });
        }
        
        // Previous button
        const prevBtn = document.querySelector('.previous');
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                // Go to previous track
                currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
                playCurrentTrack();
            });
        }
        
        // Progress bar update
        audio.addEventListener('timeupdate', function() {
            const progress = document.querySelector('.progress');
            if (progress) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progress.style.width = percent + '%';
                
                // Update current time display
                const currentTime = document.querySelector('.current-time');
                if (currentTime) {
                    const minutes = Math.floor(audio.currentTime / 60);
                    const seconds = Math.floor(audio.currentTime % 60);
                    currentTime.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
                }
                const totalTime = document.querySelector('.total-time');
                if (totalTime) {
                    const totalMinutes = Math.floor(audio.duration / 60);
                    const totalSeconds = Math.floor(audio.duration % 60);
                    totalTime.textContent = totalMinutes + ':' + (totalSeconds < 10 ? '0' : '') + totalSeconds;
                }
            }
        });
        
        // Progress bar click
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', function(e) {
                const percent = e.offsetX / this.offsetWidth;
                audio.currentTime = percent * audio.duration;
            });
        }
        
        // Volume control
        const volumeBtn = document.querySelector('.volume');
        if (volumeBtn) {
            volumeBtn.addEventListener('click', function() {
                if (audio.volume > 0) {
                    audio.volume = 0;
                    this.textContent = '🔇';
                } else {
                    audio.volume = 1;
                    this.textContent = '🔊';
                }
            });
        }
        // Volume slider click - adjust volume
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeProgress = document.querySelector('.volume-progress');
        volumeSlider.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        
        volume = clickX / width;
        audio.volume = volume;
        volumeProgress.style.width = `${volume * 100}%`;
        
        // Save volume preference
        localStorage.setItem('musicHubVolume', volume);
        
        // Update volume icon
        updateVolumeIcon();
    });
        
        // When track ends, play next track
        audio.addEventListener('ended', function() {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            playCurrentTrack();
        });
    }
    
    // Simple function to set up download buttons
    function setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.download');
        
        downloadButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const track = tracks[index];
                
                // Simple download simulation
                const link = document.createElement('a');
                link.href = track.file;
                link.download = track.title + '.mp3';
                link.click();

            });
        });
    }
});

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const cards = document.querySelectorAll('.card');
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show all cards
            cards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        // Filter cards based on search term
        let resultsFound = false;
        
        cards.forEach(card => {
            const musicName = card.querySelector('.music-name').textContent.toLowerCase();
            const musicAuthor = card.querySelector('.music-author').textContent.toLowerCase();
            
            if (musicName.includes(searchTerm) || musicAuthor.includes(searchTerm)) {
                card.style.display = 'block';
                resultsFound = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results found
        if (!resultsFound) {
            showNotification('No music found matching your search');
        }
    }
    
    // Search button click event
    searchButton.addEventListener('click', performSearch);
    
    // Enter key press event
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Live search as user types (optional)
    searchInput.addEventListener('input', function() {
        // Only perform live search if input has at least 3 characters
        if (this.value.length >= 3 || this.value.length === 0) {
            performSearch();
        }
    });
}