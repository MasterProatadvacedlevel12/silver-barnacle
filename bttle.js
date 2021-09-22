img = "";
objects = [];
status = "";



function preload(){
    img = loadImage("bottle.jpg");
}


function setup(){
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}



function gotResult(error, results){
if(error){
    console.log(error);
}
else if(results){
    console.log(results);
    objects = results;
}
}


function draw(){
    image(img, 0, 0, 640,420);
    if(status !=""){
        for(i=0; i<objects.length; i++)
        {
            fill("#ff0400");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+percent+"%", objects[i].x+10,objects[i].y+10);
            noFill();
            stroke("#ff0400");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
        }
    }
    document.getElementById("status").innerHTML = "Status : Object Detected";
    }