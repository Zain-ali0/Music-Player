let allMusic = [
    {
        name:"وينك",
        artist:"عبير نعمة",
        img: "abeer",
        src:"Abeer Nehme - Waynak",
    },
    {
        name: "Rolling in the Deep",
        artist:"Adele",
        img: "adel",
        src:"Adele - Rolling in the Deep ",
    },
    {
        name: "Lovely",
        artist:"Billie Eilis & Khalid",
        img: "Billie-Eilish-and-Khalid",
        src:"Billie Eilish, Khalid - lovel",
    },
    {
        name: "No Time To Die",
        artist:"Billie Eilish",
        img: "billijpg",
        src:"Billie Eilish - No Time To Die",
    },
    {
        name: "Infinity",
        artist:"jamyes",
        img: "jamyes",
        src:"Jaymes Young - Infinity ",
    },
    {
        name: "انكسرت الشيشة",
        artist:"ساجدة عبيد",
        img: "sajada",
        src:"sajda inksrat al shisha",
    },
    {
        name: "Snowman",
        artist:"Sia",
        img: "sia",
        src:"Sia - Snowman ",
    },
    {
        name: "Fading Flower",
        artist:"Yuna",
        img: "yuna",
        src:"Fading Flower - Yuna ",
    },
];

let MusicIndex = 1;
const Container = document.querySelector(".container");
MusicImg = Container.querySelector(".img-area img");
MusicName = Container.querySelector(".song-details .name");
MusicArtist = Container.querySelector(".song-details .artist");
MusicAudio = Container.querySelector("#Audio");
playPuseBtn = Container.querySelector(".play-puse");
nextBtn = Container.querySelector("#next");
prevBtn = Container.querySelector("#prev");
progressBar = Container.querySelector(".progrees-bar");
progressBarArea = Container.querySelector(".progress-area");
repeatBtn = Container.querySelector("#repeat-plist");
musiclist = Container.querySelector(".music-list")
showBtn = Container.querySelector("#more_music");
hiddenBtn = Container.querySelector("#close");
ulTag = Container.querySelector("ul");




//load music event
window.addEventListener("load", ()=>{
    loadMusic(MusicIndex);
    playNow();
});

//load Music function
function loadMusic(indexNumb){
    MusicName.innerText = allMusic[indexNumb -1].name;
    MusicArtist.innerText = allMusic[indexNumb -1].artist;
    MusicImg.src = `Img/${allMusic[indexNumb-1].img}.jpg`;
    MusicAudio.src = `Song/${allMusic[indexNumb-1].src}.mp3`;
};

//play music function
function playMusic() {
    Container.classList.add("paused")
    playPuseBtn.querySelector("i").innerText = "pause"
    MusicAudio.play()

};

//pause music function
function  pauseMusic(){
    Container.classList.remove("paused")
    playPuseBtn.querySelector("i").innerText = "play_arrow"
    MusicAudio.pause()
};

//next music function
function NextMusic(){
    MusicIndex++;
    MusicIndex > allMusic.length ? MusicIndex = 1 : MusicIndex = MusicIndex;
    loadMusic(MusicIndex);
    playMusic();
};

//prev music function
function PrevMusic(){
    MusicIndex--;
    MusicIndex < 1 ? MusicIndex = allMusic.length : MusicIndex = MusicIndex;
    loadMusic(MusicIndex);
    playMusic();
};

//puse or play music eent
playPuseBtn.addEventListener("click", ()=>{
    const isMusicpaused = Container.classList.contains("paused");
    isMusicpaused ? pauseMusic() : playMusic();
});

//next music event
nextBtn.addEventListener("click",()=>{
    NextMusic();
});

//prev music event
prevBtn.addEventListener("click",()=>{
    PrevMusic();
});

//update progress bar 
MusicAudio.addEventListener("timeupdate",(e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let pWidth = (currentTime /duration ) * 100;
    progressBar.style.width = `${pWidth}%`;

    MusicCurrentTime = Container.querySelector(".current");
    MusicDuration = Container.querySelector(".duration");

    MusicAudio.addEventListener("loadeddata",()=>{
        //updata duration
        let audioDuration = MusicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        MusicDuration.innerText = `${totalMin}:${totalSec}`;
        
    });

        //updata duration
        let CurrentMin = Math.floor(currentTime / 60);
        let CurrentSec = Math.floor(currentTime % 60);
        if(CurrentSec < 10){
            CurrentSec = `0${CurrentSec}`
        }
        MusicCurrentTime.innerText = `${CurrentMin}:${CurrentSec}`
});

//updtae progress bar when clicked
progressBarArea.addEventListener("click",(e)=>{
    let progressWidthval = progressBarArea.clientWidth;
    let clickedoffsetx = e.offsetX;
    let songDuration = MusicAudio.duration;
    MusicAudio.currentTime = (clickedoffsetx / progressWidthval) * songDuration;
    playMusic();
})

//repeat song  
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title","playlist looped");
            break;
    }
});

MusicAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            NextMusic();
            break;
        case "repeat_one":
            MusicAudio.currentTime = 0;
            loadMusic(MusicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(MusicIndex == randIndex);
            MusicIndex = randIndex;
            loadMusic(MusicIndex);
            playMusic();
            break;
    }
})

//show  music list
showBtn.addEventListener("click",()=>{
    musiclist.classList.toggle("show");
});

//hidden music list
hiddenBtn.addEventListener("click",()=>{
    showBtn.click();
});

for(i = 0; i < allMusic.length; i++){
    let liTag =  `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="Song/"${allMusic[i].src}.mp3"></audio>
                </li>`
    ulTag.insertAdjacentHTML("beforeend",liTag);
};

const allLiTag = ulTag.querySelectorAll("li");
function playNow(){
    for (let j = 0; j < allLiTag.length; j++){

        if(allLiTag[j].getAttribute("li-index") == MusicIndex){
            allLiTag[j].classList.add("playing")
        }
        allLiTag[j].setAttribute("onclick","clicked(this)")
}};

function clicked(element){
    let getLiindex = element.getAttribute("li-index");
    MusicIndex = getLiindex;
    loadMusic(MusicIndex);
    playMusic();
    playNow();
}