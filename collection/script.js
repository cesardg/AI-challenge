//Training code gebaseerd op: 

// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.1-posenet.html

let video;
let poseNet;
let pose;
let skeleton;

let neuralNetwork;

let state = "waiting"
let targetLabel;

const init = () => {
  window.addEventListener('keydown', handleKeyPress)
}

const  handleKeyPress = (e) => {
    if (e.key == "s"){
        neuralNetwork.saveData()
    }
    targetLabel = e.key;
    console.log(targetLabel);
    setTimeout(function(){
        console.log('collecting');
        state = 'collecting';
            setTimeout(function(){
            console.log('not collecting');
            state = 'waiting';
        }, 3000)
    }, 5000)
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded());
    poseNet.on('pose', gotPoses);

    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true

    }
    neuralNetwork = ml5.neuralNetwork(options);
}


function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;

    let inputs = []
    if (state == 'collecting'){
      for (let i=0; i < pose.keypoints.length; i++){
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x)
          inputs.push(y)
      }
    let target = [targetLabel];
    neuralNetwork.addData(inputs, target)
    }


  }
}

const modelLoaded = () => {
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
  textSize(512);
  textAlign(CENTER, CENTER);
}

init()