let video;
let poseNet;
let pose;
let skeleton;

const audio1 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav")
const audio2 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav")
const audio3 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav")
const audio4 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav")
const audio5 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav")
const audio6 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav")
const audio7 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav")
const audio8 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav")
const audio9 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav")
const audio10 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav")
const audio11 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav")
const audio12 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav")
const audio13 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav")
const audio14 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav")
const audio15 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav")
const audio16 = new Audio("http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav")

const traingle = new Audio("../assets/traingle.mp3")

function setup() {
  createCanvas(640, 480);
  //createCanvas(1000, 700);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
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
    console.log(pose.rightWrist)
    let left = pose.leftAnkle;
    let right = pose.rightAnkle;
    if (left.confidence> 0.7 || right.confidence > 0.7 ){
      ellipse(right.x, right.y, 10, 10);
      ellipse(left.x, left.y, 10, 10);
      console.log(pose)
   
      playMusic(left.x, right.x, left.y, right.y)
    }

    if (pose.rightWrist.confidence> 0.7){
        ellipse(pose.rightWrist.x, (pose.rightWrist.y - 80), 10, 10);
        line(pose.rightWrist.x, pose.rightWrist.y, pose.rightWrist.x, (pose.rightWrist.y - 80));
        if (pose.rightWrist.x < 95 && pose.rightWrist.y < 350  && pose.rightWrist.y > 250){
          traingle.play();
        }
    }
  }
}

const playMusic = (left, right, leftHeight, rightHeight) =>{
    
      document.querySelectorAll(`.tile`).forEach(element => element.style.backgroundColor = "white");

      // jep dit kon korter


      if (leftHeight > 360){
        if (left < 55){
            audio16.play()
            document.querySelector(`.piano16`).style.backgroundColor = "grey"
        } else if (left < 95 && left > 55 ){
          audio15.play()
          document.querySelector(`.piano15`).style.backgroundColor = "grey"
        } else if (left < 135  && left >95){
          audio14.play()
          document.querySelector(`.piano14`).style.backgroundColor = "grey"
        } else if (left < 180  && left >135){
          audio13.play()
          document.querySelector(`.piano13`).style.backgroundColor = "grey"
        } else if (left < 212  && left >180){
          audio12.play()
          document.querySelector(`.piano12`).style.backgroundColor = "grey"
        } else if (left < 245  && left >212){
          audio11.play()
          document.querySelector(`.piano11`).style.backgroundColor = "grey"
        } else if (left < 285  && left >245){
          audio10.play()
          document.querySelector(`.piano10`).style.backgroundColor = "grey"
        } else if (left < 314  && left >285){
          audio9.play()
          document.querySelector(`.piano9`).style.backgroundColor = "grey"
        } else if (left < 360  && left >314){
          audio8.play()
          document.querySelector(`.piano8`).style.backgroundColor = "grey"
        } else if (left < 392  && left >360){
          audio7.play()
          document.querySelector(`.piano7`).style.backgroundColor = "grey"
        } else if (left < 430  && left >392){
          audio6.play()
          document.querySelector(`.piano6`).style.backgroundColor = "grey"
        } else if (left < 450  && left >430){
          audio5.play()
          document.querySelector(`.piano5`).style.backgroundColor = "grey"
        } else if (left < 490  && left >450){
          audio4.play()
          document.querySelector(`.piano4`).style.backgroundColor = "grey"
        } else if (left < 530  && left >490){
          audio3.play()
          document.querySelector(`.piano3`).style.backgroundColor = "grey"
        } else if (left < 560  && left >530){
          audio2.play()
          document.querySelector(`.piano2`).style.backgroundColor = "grey"
        } else if (left < 590  && left >560){
          audio1.play()
          document.querySelector(`.piano1`).style.backgroundColor = "grey"
        } 
    }

    if (rightHeight > 360){

      if (right < 55){
        audio16.play()
        document.querySelector(`.piano16`).style.backgroundColor = "grey"
    } else if (right < 95 && right > 55 ){
      audio15.play()
      document.querySelector(`.piano15`).style.backgroundColor = "grey"
    } else if (right < 135  && right >95){
      audio14.play()
      document.querySelector(`.piano14`).style.backgroundColor = "grey"
    } else if (right < 180  && right >135){
      audio13.play()
      document.querySelector(`.piano13`).style.backgroundColor = "grey"
    } else if (right < 212  && right >180){
      audio12.play()
      document.querySelector(`.piano12`).style.backgroundColor = "grey"
    } else if (right < 245  && right >212){
      audio11.play()
      document.querySelector(`.piano11`).style.backgroundColor = "grey"
    } else if (right < 285  && right >245){
      audio10.play()
      document.querySelector(`.piano10`).style.backgroundColor = "grey"
    } else if (right < 314  && right >285){
      audio9.play()
      document.querySelector(`.piano9`).style.backgroundColor = "grey"
    } else if (right < 360  && right >314){
      audio8.play()
      document.querySelector(`.piano8`).style.backgroundColor = "grey"
    } else if (right < 392  && right >360){
      audio7.play()
      document.querySelector(`.piano7`).style.backgroundColor = "grey"
    } else if (right < 430  && right >392){
      audio6.play()
      document.querySelector(`.piano6`).style.backgroundColor = "grey"
    } else if (right < 450  && right >430){
      audio5.play()
      document.querySelector(`.piano5`).style.backgroundColor = "grey"
    } else if (right < 490  && right >450){
      audio4.play()
      document.querySelector(`.piano4`).style.backgroundColor = "grey"
    } else if (right < 530  && right >490){
      audio3.play()
      document.querySelector(`.piano3`).style.backgroundColor = "grey"
    } else if (right < 560  && right >530){
      audio2.play()
      document.querySelector(`.piano2`).style.backgroundColor = "grey"
    } else if (right < 590  && right >560){
      audio1.play()
      document.querySelector(`.piano1`).style.backgroundColor = "grey"
    } 
  }


  
  


}
