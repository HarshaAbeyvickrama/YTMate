var clientId="462660440175-aqtd627pof9m837mb3a4mghbfrspmei4.apps.googleusercontent.com";
var apiKey="AIzaSyBpDKDJGJuC5Xo4-R3z-D_FJ1iNdhZ-HVQ";

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
      .then(function() { console.log("Sign-in successful with force ssl"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(apiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
  

function getSubscriptions() {
    var channelTitle = null;
    var channelID = null;
    var flag = 0;
    var itemArray = null;
    return gapi.client.youtube.subscriptions.list({
        "part": [
        "id",
        "snippet"
      ],
        "maxResults": 50,
        "mine": true
      })
      .then(function(response) {
          itemArray = response.result.items;
          for (let i = 0; i < itemArray.length; i++) {
            channelTitle = itemArray[i].snippet.title;
            channelID = itemArray[i].snippet.resourceId.channelId;
            console.log("Name", channelTitle);
            console.log("ID", channelID);
            //channelArray();
          }

          // Handle the results here (response.result has the parsed body).
        },
        function(err) { console.error("Execute error", err); });
}

//====================Get channel details by ID===============================================

function channelDetails(cId) {
  return gapi.client.youtube.channels.list({
    "part": [
      "snippet,contentDetails,statistics"
    ],
    "id": [
      cId
    ]
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              //console.log("Response", response);
              var t=response.result.items[0].id;
              var items=response.result.items[0];
              var url=items.snippet.customUrl;
              var id=items.id;
              var title=items.snippet.title;
              var description=items.snippet.description;
              var publishedAt=items.snippet.publishedAt;
              var thumbnail=items.snippet.thumbnails.high.url;
              var country=items.snippet.country;
              var uploadsID =items.contentDetails.relatedPlaylists.uploads;
              var viewCount=items.statistics.viewCount;
              var subscribers=items.statistics.subscriberCount;
              var hiddenSubscribers=items.statistics.hiddenSubscriberCount;
              var videoCount=items.statistics.videoCount;
              var data=new ChannelData(id,title,country,url,description,publishedAt,subscribers,thumbnail,uploadsID,videoCount,viewCount,hiddenSubscribers);
              addChannelDetails(data);
            },
            function(err) { console.error("Execute error", err); });
}


//===========================Get Comments for a video by Id============================================

function getCommentsForVideo(videoId) {
  var arr=[50];
  console.log("ID : "+videoId);
  return gapi.client.youtube.commentThreads.list({
    "part": [
      "snippet"
    ],
    "maxResults":10,
    "videoId": videoId
  })
      .then(function(response) {
             dat=response.result.items;
             
             for(var i=0;i<dat.length;i++){
        
              
              var comm=dat[i].snippet.topLevelComment.snippet.textDisplay;
              var authorName=dat[i].snippet.topLevelComment.snippet.authorDisplayName;
              // var authorImageUrl=CommentArray[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
              // var authorChannelUrl=CommentArray[i].snippet.topLevelComment.snippet.authorChannelUrl;
              // var authorChannelId=CommentArray[i].snippet.topLevelComment.snippet.authorChannelId.value;
              // var publishedDate=CommentArray[i].snippet.topLevelComment.snippet.publishedAt;

              arr[i]=new CommentObj(comm,authorName);
              console.log(comm);
              console.log(authorName)
             }




              // Handle the results here (response.result has the parsed body).
              console.log("Response", arr);
              console.log("Response", arr.length);
              renderComments(arr);
              
            },
            function(err) { console.error("Execute error", err); });
  
                    
}

//=========================================================================================

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: clientId});
  });
  function s(){
    channelDetails("UCNIPltykIATy0PhRp82uNMQ");
  }
console.log("YTV3 update 14"); 

function CommentObj(com,name){
  this.com=com;
  this.name=name;
}