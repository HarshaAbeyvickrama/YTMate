// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBnRT0yHNfu7u-2RoYGwBMKP4Se-T5Cgis",
    authDomain: "mate-15935.firebaseapp.com",
    databaseURL: "https://mate-15935.firebaseio.com",
    projectId: "mate-15935",
    storageBucket: "mate-15935.appspot.com",
    messagingSenderId: "16023078075",
    appId: "1:16023078075:web:d376c5600421e63886159e",
    measurementId: "G-P8GMGM9S0M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db=firebase.firestore();

//=============================Send data from excel to firebase=====================================

function send(){
    for(let i=0;i<rowObject.length;i++){
        let id=rowObject[i].ID;
        db.collection('ChannelBasics').doc(id).set({
            Name: rowObject[i].NAME,
            ID: rowObject[i].ID,
            
        });
    }
}

//=======================Retrieve all documents from channelBasics========================================

function getAll(){
    
    return new Promise((resolve,reject) => {
        var channelData=null;
        db.collection('ChannelDetails').get().then((snapshot) =>{
            channelData=snapshot.docs;
            if(channelData!=null){
                resolve(channelData);
            }else{
                reject(channelData);
            }
            
        })
    });
}



//=========object containing a single channel data======================
function ChannelData(id,name,country,customURL,description,publishedAt,subscribers,thumbnail,uploadsID,videoCount,viewCount,hiddenSubscribers){
    this.id=id;
    this.name=name;
    this.country=country;
    this.customURL=customURL;
    this.description=description;
    this.publishedAt=publishedAt;
    this.subscribers=subscribers;
    this.thumbnail=thumbnail;
    this.uploadsID=uploadsID;
    this.videoCount=videoCount;
    this.viewCount=viewCount;
    this.hiddenSubscribers=hiddenSubscribers;
}
//==================Insert data to ChannelDetails==============================================
var count=0;
function addChannelDetails(data){
    return new Promise((resolve,reject) => {
        db.collection('ChannelDetails').doc(data.id.toString()).set({
            Name:data.name, 
            ID:data.id,
            Country:data.country,
            CustomURL:data.customURL,
            Description:data.description,
            PublishedAt:data.publishedAt,
            Subscribers:data.subscribers,
            Thumbnail:data.thumbnail,
            UploadsID:data.uploadsID,
            VideoCount:data.videoCount,
            ViewCount:data.viewCount,
            HiddenSubscriberCount:data.hiddenSubscribers
        })
        resolve();
    })
        
}
srt(0);
function srt(x){
    var v=null;
    if (x==0){
        v="Subscribers";
        
    }
    if (x==1){
        v="ViewCount";
    }
    if (x==2){
        v="VideoCount";
    }
   getAll().then((result) =>{
       sorting(result,v);
       console.log("calling sort");
   })
}

function sorting(collectionArray,val){
    console.log(val);
    var arr=collectionArray;
    if(val=="Subscribers"){
        arr.sort((a,b) =>{
            
            return b.data().Subscribers-a.data().Subscribers;
        })
        console.log("Sorted by subs");
        //renderTable(collectionArray);
        //pt(collectionArray);
    }
    if(val=="ViewCount"){
        arr.sort((a,b) =>{
            
         
            return b.data().ViewCount-a.data().ViewCount;
        })
        console.log("Sorted by vids");
        //renderTable(collectionArray);
        //pt(collectionArray);
    }
    if(val=="VideoCount"){
        arr.sort((a,b) =>{
            
            return b.data().VideoCount-a.data().VideoCount;
        })
        console.log("Sorted by views");
        //renderTable(collectionArray);
        //pt(collectionArray);
    }else{

        console.log("Error! Input a valid Scope")
           
    }
    renderTable(arr);
    
    //addChannelByViews(collectionArray);
    
    
}
function pt(collectionArray){
    for(var i=0;i<collectionArray.length;i++){
        console.log(collectionArray[i].data());
    }
}
//sorting(array,"Subscribers");
 //=====================================channels by Subscribers===================================

 //==============Fetch to fireStore=============================

 function addChannelBySubscribers(data){
    return new Promise((resolve,reject) => {
        for(var i=0;i<data.length;i++){
            db.collection('SubscriberCount').doc(data[i].data().ID.toString()).set({
                Name:data[i].data().Name,
                Subscribers:data[i].data().Subscribers,
                Rank:i+1
                
            })
           
        }
        
    })
}
//==============
//=====================================channels by Subscribers===================================

 //==============Fetch to fireStore=============================

 function addChannelByViews(data){
    return new Promise((resolve,reject) => {
        for(var i=0;i<data.length;i++){
            db.collection('ViewCount').doc(data[i].data().ID.toString()).set({
                Name:data[i].data().Name,
                Views:data[i].data().ViewCount,
                Rank:i+1
                
            })
           
        }
        
    })
}
//============================================render data to Channel Table================================
var allChannels=null;
function renderTable(data){
    allChannels=data;
    var table= document.getElementById("channelTable-data");
    table.innerHTML='';
    console.log(data[1].data())
    for(var i=0;i<data.length;i++){
        // var subVal;
        // var sub=parseFloat(data[i].data().Subscribers);
        // if(sub<1000){
        //     subVal=sub;
        // }else if(sub<1000000){
        //     subVal=sub/1000;
        // }else if(sub>1000000){
        //     subVal=sub/1000;
        // }
        var row=`<tr>
        <td>${i+1}</td>
        <td>${data[i].data().Name}</td>
        <td>${data[i].data().Subscribers}</td>
        <td>${data[i].data().ViewCount}</td>
        <td>${data[i].data().VideoCount}</td>
        <td ><button type="button" class="btn btn-link float-right badge-pill" onclick="singleChannel(${i+1})" >View</button></td>
      </tr>`
      //<th><button onclick="document.getElementById('id02').style.display='block'" style="width:auto;">MORE</button></th>
        table.innerHTML+=row;
    }

}

//=========================render Comments======================================================
// document.getElementById("channelTable-data").
function renderComments(commentsData){
    var list= document.getElementById("table-data");
    list.innerHTML='';
    for(var i=0;i<commentsData.length;i++){
        var commentsData=commentsData;
        var len = commentsData.length;
        var comm=commentsData.items[i].snippet.topLevelComment.snippet.textDisplay;
        var authorName=commentsData.items[i].snippet.topLevelComment.snippet.authorDisplayName;
        var authorImageUrl=commentsData.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        var authorChannelUrl=commentsData.items[i].snippet.topLevelComment.snippet.authorChannelUrl;
        var authorChannelId=commentsData.items[i].snippet.topLevelComment.snippet.authorChannelId.value;
        var publishedDate=commentsData.items[i].snippet.topLevelComment.snippet.publishedAt;

        console.log(comm);
        console.log("Name ",authorName);
        
        var listRow=`<tr>
        <td>${i+1}</td>
        <td>${comm}</td>
        
      </tr>`
        list.innerHTML+=listRow;
    }
    
}
//============================================================================================
function get(){
    getAll().then((result)=>{
        sorting(result,"Subscribers");
    })
}
// console.log("Running get...");
// console.log("Done & Dusted!!!!!!!!");



//=======================================================render single channel================================================================
function renderSingleChannel(val){
    var channelCard=document.getElementById('sin-cnl');
    channelCard.innerHTML='';
    var rw=`
    <tr>
		<th colspan ="2" style="text-align:center; color:red"><b><h5> ${allChannels[val].data().Name} </h5></b></th>
	</tr>
	<tr>
		<td> Subscription : ${allChannels[val].data().Subscribers}</td>
		<td rowspan="4" ><img src="${allChannels[val].data().Thumbnail}" alt="${allChannels[val].data().Name}" style="width:200px;height:200px; display: block;margin-left: auto;margin-right: auto;"></td>
	</tr>
	
	<tr>
		<td> View Count : ${allChannels[val].data().ViewCount}</td>
	</tr>
	<tr>
		<td> Video Count : ${allChannels[val].data().VideoCount}</td>
	</tr>
	<tr>
		<td> Date Started : ${allChannels[val].data().PublishedAt}</td>
    </tr>
	<tr>
		<td colspan ="2"> Description : ${allChannels[val].data().Description}</td>
	</tr>`
    channelCard.innerHTML=rw;
    
}
// ===============================================================================================================
function singleChannel(val){
    document.getElementById('id02').style.display='block';
    renderSingleChannel(val-1);
    //console.log(allChannels[val-1].data())
}