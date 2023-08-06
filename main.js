img = "";
status = "";
objects = [];
song = "";

function preload(){
    song = loadSound("spectre.mp3");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}

function draw(){
    image(video, 0, 0, 640, 420);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById('status').innerHTML = "Status: Objects Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby found";
                song.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby not found";
                song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("baby_status").innerHTML = "Baby not found";
            console.log("No objects detected");
        }
    }
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}