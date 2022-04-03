//for selecting video container element
const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCU2OPcv6OspkmL4zDJwIntlT7SKdezT5E";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((error) => console.log(error));

// creating getChannelIcon function to fetch channel icon separetly

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
   
    .then((data) => {
      //  console.log(data);
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      //    console.log(video_data);
      // added channel thumail data, now we just have to create card
      // console.log(video_data)
      makeVideoCard(video_data);
    });
};

//making videoCard function

const makeVideoCard = (data) => {
  // console.log(data)
  //using innerHTML method to attach HTML Element
//   videoCardContainer.innerHTML += `
//    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
//        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail"  alt="">
//       <div class="content">
//           <img src="${data.channelThumbnail}" class="channel-icon" alt="">
//           <div class="info">
//              <h4 class="title">${data.snippet.title}</h4>
//              <p class="channel-name" ${data.snippet.channelTitle}></p>
//             </div>
//       </div>
//  </div> 
//    `;

 let video_Div = document.createElement("div");
 video_Div.className="jojo";
 video_Div.addEventListener("click",function()
   {
     localStorage.setItem("localvideo_id", data.id); 
     window.location="video.html"
   })
 let thumbnail = document.createElement("img");
 thumbnail.className="thumbnail";
 thumbnail.src=data.snippet.thumbnails.high.url;
 let title = document.createElement("p");
 title.className="title";
 title.innerText=data.snippet.title;
 let snippet = document.createElement("img");
 snippet.className="channel-icon"
 snippet.src=data.channelThumbnail;
 let channel_name = document.createElement("p");
 channel_name = "channel-name"
 channel_name.innerText =data.snippet.channelTitle;



  video_Div.append(thumbnail,snippet,title,channel_name);
  videoCardContainer.append(video_Div)
  // console.log(videoCardContainer)
  //console.log(videoId)
};


//searchbar//............

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

