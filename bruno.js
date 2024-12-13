const music = new Audio('Bmusic/15.mp3');

// create Array 

const songs = [
    {
        id:'1',
        songName:` Just the Way You Are <br>
        <div class="subtitle">Bruno Mars</div>`,
        poster: "1.jpg"
    },
    {
        id:'2',
        songName:` Uptown Funk <br>
        <div class="subtitle">Bruno Mars</div>`,
        poster: "2.jpg"
    },
    // all object type 
    {
        id:"3",
        songName: `When I Was Your Man<div class="subtitle">Bruno Mars</div>`,
        poster: "3.jpg",
    },
    {
        id:"4",
        songName: `It Will Rain <br><div class="subtitle">Bruno Mars</div>`,
        poster: "4.jpg",
    },
    {
        id:"5",
        songName: `Versace on the Floor <br><div class="subtitle">Bruno Mars</div>`,
        poster: "5.jpg",
    },
    {
        id:"6",
        songName: `Locked Out of Heaven<div class="subtitle">Bruno Mars</div>`,
        poster: "6.jpg",
    },
    {
        id:"7",
        songName: `Billionaire <br><div class="subtitle">Bruno Mars</div>`,
        poster: "7.jpg",
    },
    {
        id:"8",
        songName: `Finesse <br><div class="subtitle">Bruno Mars</div>`,
        poster: "8.jpg",
    },
    {
        id:"9",
        songName: ` Die with a Smile<div class="subtitle">Bruno Mars</div>`,
        poster: "9.jpg",
    },
    {
        id:"10",
        songName: `24K Magic <br><div class="subtitle">Bruno Mars</div>`,
        poster: "10.jpg",
    },
    {
        id:"11",
        songName: `That's What I Like  <br><div class="subtitle">Bruno Mars</div>`,
        poster: "11.jpg",
    },
    {
        id:"12",
        songName: `Grenade<br><div class="subtitle">Bruno Mars</div>`,
        poster: "12.jpg",
    },
    {
        id:"13",
        songName: `Marry You<br><div class="subtitle">Bruno Mars</div>`,
        poster: "13.jpg",
    },
    {
        id:"14",
        songName: `Lighters<div class="subtitle">Bruno Mars</div>`,
        poster: "14.jpg",
    },
    {
        id:"15",
        songName: `Leave the Door Open<div class="subtitle">Bruno Mars</div>`,
        poster: "15.jpg",
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})
// search data start 
let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(element => {
    const {id, songName, poster} = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
    <div class="content">
    ${songName}
    </div>
    `;
    search_results.appendChild(card);

    // Add click event to each search result card
    card.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default anchor behavior
        
        // Get the ID of the song
        let songId = id;

        // Find the song object from the songs array
        let song = songs.find(song => song.id === songId);

        // Update the song to play
        music.src = `Bmusic/${songId}.mp3`;
        poster_master_play.src = `${songId}.jpg`;
        music.play();
        
        // Update the song title
        title.innerHTML = song.songName;
        
        // Change the play button icon
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        
        // Change the background color of the currently playing song
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[songId - 1].style.background = "rgb(105, 105, 170, .1)";
        
        // Mark the clicked song as playing
        makeAllPlays();
        document.getElementById(songId).classList.remove('bi-play-circle-fill');
        document.getElementById(songId).classList.add('bi-pause-circle-fill');
        // Hide search results after selecting a song
    search_results.style.display = "none";

    // Optionally, clear the search input field
    input.value = '';  // Clears the search input
        
        // Event listener for when the song ends
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        });
    });
});



// search data end 
let playButton = document.getElementById('playButton');

// Hardcode the ID of the song you want to play (in this case, "Leave the Door Open")
let songIdToPlay = 15; // ID of "Leave the Door Open"

// Add event listener to the play button
playButton.addEventListener('click', () => {
    // Find the song object based on the song ID
    let song = songs.find(song => song.id == songIdToPlay);

    // Update the music source and poster image based on the selected song
    music.src = `Bmusic/${songIdToPlay}.mp3`; // Load the specific song
    poster_master_play.src = `${songIdToPlay}.jpg`; // Load the poster image for the song

    // Play the song
    music.play();

    // Update the title in the UI
    title.innerHTML = song.songName;

    // Change the play button icon to pause
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');

    // Update background color of the playing song
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[songIdToPlay - 1].style.background = "rgb(105, 105, 170, .1)";

    // Mark the clicked song as playing
    makeAllPlays();
    document.getElementById(songIdToPlay).classList.remove('bi-play-circle-fill');
    document.getElementById(songIdToPlay).classList.add('bi-pause-circle-fill');
});
// Now, updating the search functionality to match case-insensitive text


let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();  // Get search input value, convert to uppercase for case-insensitive comparison
    let items = search_results.getElementsByTagName('a');  // Get all search result cards

    let resultsVisible = false; // Variable to check if there are any visible results

    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];  // Get the song name from the search card
        let text_value = as.textContent || as.innerHTML;  // Get text content of the song name
        
        // Check if the search query matches part of the song name
        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = "flex";  // Show this search result
            resultsVisible = true;  // There is at least one result visible
        } else {
            items[index].style.display = "none";  // Hide this search result
        }
    }

    // Hide search results if no items match
    if (!resultsVisible) {
        search_results.style.display = "none";
    } else {
        search_results.style.display = "";  // Show search results if there are matching items
    }
});


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `Bmusic/${index}.mp3`;
        poster_master_play.src =`${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        // music.addEventListener('ended',()=>{
        //     masterPlay.classList.add('bi-play-fill');
        //     masterPlay.classList.remove('bi-pause-fill');
        //     wave.classList.remove('active2');
        // })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.remove('active2');
    index ++;
    music.src = `Bmusic/${index}.mp3`;
    poster_master_play.src =`${index}.jpg`;    
    music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"; 
        makeAllPlays();
        document.getElementsByClassName('playListPlay')[index-1].classList.remove('bi-play-circle-fill');
        document.getElementsByClassName('playListPlay')[index-1].classList.add('bi-pause-circle-fill');
    })


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0 && vol.value <= 50) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `Bmusic/${index}.mp3`;
    poster_master_play.src =`${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
    music.src = `Bmusic/${index}.mp3`;
    poster_master_play.src =`${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})