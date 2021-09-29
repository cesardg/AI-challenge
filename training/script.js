//Training code gebaseerd op: 

// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.2-pose-classification.html


let brain;

function setup() {
  createCanvas(640, 480);
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  brain.loadData('test.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 50}, finished); 
}

function finished() {
  console.log('model trained');
  brain.save();
}