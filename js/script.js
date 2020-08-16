function getAndFetch(){
    getAll().then((channelData) =>{
        var id=null;
        for(var i=0;i<channelData.length;i++){
            id=channelData[i].data().ID;
            channelDetails(id);
            id=null;
        }
    }).catch((result)=>{
        console.log(result);
    })
}


function sortingSubscribers(collectionArray){
    collectionArray.sort((a,b) =>{
        return b.data().Subscribers-a.data().Subscribers;
    })
    for(let i=0;i<collectionArray.length;i++){
        console.log(collectionArray[i].data().Subscribers);
}
function sortingViewCount(collectionArray){
    collectionArray.sort((a,b) =>{
        return b.data().ViewCount-a.data().ViewCount;
        })
}
    for(let i=0;i<collectionArray.length;i++){
        console.log(collectionArray[i].data().Subscribers);
    }
}

function getCmnts(link){
    authenticate().then(()=>{
        loadClient().then(()=>{
            console.log("getting comments")
            getCommentsForVideo(link).then((dat)=>{
                renderComments(dat);
            })
        })
    })
}
console.log("script update");
function tst(){
    var link=document.getElementById("videoLink").value;
    document.getElementById("videoLink").value="";
    var vidId=youtube_parser(link);
    console.log("Link : "+vidId);
    getCmnts(vidId);

    
}

console.log("Script update 1");
window.onload=function(){
    var searchBar=document.getElementById("searchBtn");
    
    searchBar.addEventListener('click',function(e) {
        e.preventDefault();
        tst();
    });
}


