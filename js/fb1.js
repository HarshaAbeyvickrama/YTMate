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

//============================================render data to Channel Table================================


//=========================render Comments======================================================

function renderComments(arr){
    var list= document.getElementById("table-data");
    var CommentArray=arr;
    for(var i=0;i<CommentArray.length;i++){
        
        var len = CommentArray.length;
        var comm=CommentArray[i].com;
        var authorName=CommentArray[i].name;
       
        console.log(comm);
        console.log("Name ",name);

        var listRow=`<tr>
        <td>${i+1}</td>
        <td>${comm}</td>
        
      </tr>`
        list.innerHTML+=listRow;
    }
    
}
console.log("Running get...");
console.log("Done & Dusted !!!!!!!!!");
console.log("Updated 16");

function youtube_parser(url){
    console.log("extracting id.....");
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

//console.log(youtube_parser("https://www.youtube.com/watch?v=RsEoXcrnSxg"));

