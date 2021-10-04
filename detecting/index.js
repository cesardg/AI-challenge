let video;
let poseNet;
let pose;
let skeleton;
let neuralNetwork;
let postureStatus = "loading"
let drinkTimeStamp = "not yet drunk"
let standTimeStamp = "not yet stood up"

let goodTimer = [0, 1, 1, 1, 0]
let goodTimerSart;

let drinkTimer = 0
let standTimer = 0

let $status = document.querySelector(`.status`)
let $subStatus = document.querySelector(`.sub-status`)
let $drinkTime = document.querySelector(`.drink`)
let $standTime = document.querySelector(`.stand`)
       

const alarm1 = new Audio('../assets/alarm1.mp3');
const alarm2 = new Audio('../assets/alarm2.mp3');
const $submitButton = document.querySelector(`.canv-form`);

const init = () => {
  $status.textContent = postureStatus;
  $drinkTime.textContent = drinkTimeStamp;
  $standTime.textContent = standTimeStamp;
  $submitButton.addEventListener(`submit`, handleSubmitForm);

  startTimers()
}

function setup() {
  createCanvas(1000, 700);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 50,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  neuralNetwork = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  neuralNetwork.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  postureStatus = "ready"
  $status.textContent = postureStatus;
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    neuralNetwork.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {

  checkTimers();

   if (results[0].confidence > 0.75 ) {
    let result  = results[0].label
    document.querySelector(`.confidence`).textContent = Math.round(results[0].confidence*100)
    handleResults(result)
  }

  classifyPose();
}

const handleResults = (result) => {

   const today = new Date();

  if (result.split(" ")[0] == "good"){
      $status.textContent = "good"
      start()
      document.querySelector(`.container`).style.background = `radial-gradient(circle, rgba(174,180,238,1) 0%, rgba(173,233,148,1) 100%)`
  } else {
   
      $status.textContent = "bad"
      stop()
      document.querySelector(`.container`).style.background = `radial-gradient(circle, rgba(238,215,174,1) 0%, rgba(255,104,104,1) 100%)`
  }

  if (result == "good get up"){
    const time = today.getHours() + ":" + today.getMinutes();
    standTimer = 0;
    $standTime.textContent = time
    $standTime.style.color = 'black'
      $subStatus.textContent = " - it's good to get up"
  }  else if (result == "bad mental breakdown" || result == "bad mental breakdown 2" || pose.nose.y > 400 ) {
       alarm2.play()
       $subStatus.textContent = "- mental breakdown alert"
      $status.textContent = "Bad"
  } else if (result == "good water"){
    drinkTimer = 0;
     $drinkTime.style.color = 'black'
    const time = today.getHours() + ":" + today.getMinutes();
     $subStatus.textContent = " - drinking water is good for your health"
    $drinkTime.textContent = time
  } else if (result == "good posture 1" || result == "good posture 2" || result == "good posture 3" || result == "good posture "){
    $subStatus.textContent = " posture"
  } else if (result == "bad posture to close") {
     $subStatus.textContent = " - to close to your screen"
  } else if (result == "bad posture sleep" || result == "bad posture sleep 2") {
     $subStatus.textContent = " - don't be sleepy 💤"
     alarm1.play()
  } else if (result == "bad posture phone" ) {
     $subStatus.textContent = " - stay off your phone 📵"
  } else if (result == "bad posture back" ) {
     $subStatus.textContent = " posture - you lean back too much"
  } else if (result == "bad posture" || result == "bad posture 2"  ) {
     $subStatus.textContent = " posture"
  } 
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
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
}

const startTimers = () => {
  setInterval(function(){ drinkTimer++, standTimer++ }, 1000);
}

const checkTimers = () => {
    if (drinkTimer > 30){
      $drinkTime.style.color = 'red'
  
    }

    if (standTimer > 60){
    $standTime.style.color = 'red'
    }

    if (standTimer > 90){
      $standTime.textContent = `You sit too long, time to play a game`
      setTimeout(function () {
      window.location.href = '../playing/play.html'
      }, 3000);
    }
}
 

const setMSec = () => {
  if (goodTimer[0] < 10) {
    document.querySelector(".good-msec").innerHTML = "0" + goodTimer[0];
  } else {
    document.querySelector(".good-msec").innerHTML = goodTimer[0];
  }
  goodTimer[0] = goodTimer[0] + 1;
  goodTimerSart = setTimeout(setMSec, 100);
  if (goodTimer[0] >= 10) {
    setSec();
    goodTimer[0] = 0;
  }
}

const  setSec = () => {
  if (goodTimer[1] >= 60) {
    setMin();
    goodTimer[1] = 0;
  }
  if (goodTimer[1] < 10) {
    document.querySelector(".good-sec").innerHTML = "0" + goodTimer[1];
  } else {
    document.querySelector(".good-sec").innerHTML = goodTimer[1];
  }
  goodTimer[1] = goodTimer[1] + 1;
}

const setMin = () => {
  if (goodTimer[2] >= 60) {
    setHour();
    goodTimer[2] = 0;
  }
  if (min < 10) {
    document.querySelector(".good-min").innerHTML = "0" + goodTimer[2];
  } else {
    document.querySelector(".good-min").innerHTML = goodTimer[2];
  }
  min = min + 1;
}

const setHour = () => {
  if (goodTimer[3] < 10) {
    document.querySelector(".good-hour").innerHTML = "0" + goodTimer[2];
  } else {
    document.querySelector(".good-hour").innerHTML = goodTimer[2];
  }
  goodTimer[2] = goodTimer[2] + 1;
}

const start = () => {
  if (!goodTimer[4]) {
    goodTimer[4] = 1;
    setMSec();
  }
}

const stop = () => {
  clearTimeout(goodTimerSart);
  goodTimer[4] = 0;
}

const handleSubmitForm = (e) => {
  e.preventDefault();
  const $form = e.currentTarget;
  resizeCanvas($form.querySelector(`.canv-width`).value, $form.querySelector(`.canv-height`).value, false)
}

init()