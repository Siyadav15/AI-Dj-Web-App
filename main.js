song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#f55d5d");
    stroke("#f55d5d");
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(inNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume= "+volume;
        song.setVolume(volume);
        
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("Posenet is intialized.");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("Score left wrist= "+scoreleftWrist);
        leftWristX=results[0].pose.leftWrist.X;
        leftWristY=results[0].pose.leftWrist.Y;
        console.log("Left Wrist X- "+leftWristX+" Left Wrist Y- "+leftWristY);
        rightWristX=results[0].pose.rightWrist.X;
        rightWristY=results[0].pose.rightWrist.Y;
        console.log("Right Wrist X- "+rightWristX+" Right Wrist Y- "+rightWristY);
    }
}