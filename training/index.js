// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let video;
let poseNet;
let pose;
let skeleton;

let brain;

let state = 'waiting';
let targetLabel;

const $status = document.querySelector('.status');

const init = () => {
  document.querySelector(`.label`).addEventListener('click', handleClickLabel)
  document.querySelector(`.download1`).addEventListener('click', handleClickDownload1)
  document.querySelector(`.download2`).addEventListener('click', handleClickDownload2)
}

const delay = (time) => {
  return new Promise((resolve, reject) => {
   setTimeout(resolve, time)
  })

}

const handleClickDownload1 = () => {
    brain.saveData();
}


const handleClickDownload2 = () => {
    brain.normalizeData();
    brain.train({epochs: 75}, finished); 
}

const handleClickLabel = async () =>{
    targetLabel = document.querySelector('.label-input').value 
    console.log(targetLabel);

    await delay(2000)
    console.log('collecting');
    $status.textContent = 'collecting'
    state = 'collecting';

    await delay(5000)
    console.log('not collecting');
    $status.textContent = 'not collecting'
    state = 'waiting';
}
/*
async function keyPressed() {
  if (key == 't') {
    brain.normalizeData();
    brain.train({epochs: 75}, finished); 
  } else if (key == 's') {
    brain.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);

    await delay(2000)
    console.log('collecting');
    state = 'collecting';

    await delay(5000)
    console.log('not collecting');
    state = 'waiting';
  }
}
*/

function setup() {
  createCanvas(750, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 50,
    outputs: 8,
    // goede postuur, achterover geleund, water pakken, te dicht bij scherm, rechtstaan, gsm, slaap voor, slaap achter
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
}


function dataReady() {
  brain.normalizeData();
  brain.train({
    epochs: 50
  }, finished);
}

function finished() {
  console.log('model trained');
  $status.textContent = 'model trained'
  brain.save();
}



function gotPoses(poses) {
  // console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    if (state == 'collecting') {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      brain.addData(inputs, target);
    }
  }
}


function modelLoaded() {
  console.log('poseNet ready');
  $status.textContent = 'poseNet ready'
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
}

init()