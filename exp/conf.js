//EJF edited on 8 March 2018 to set to constant 90-50-10 (task version1):
// Altered "Choose condition" to set probabilities to [0,0] for both halves
//original settings below:
//var probabilities           = [ [0.9, 0.5, 0.1], [0.8, 0.4, 0.2] ];
//var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 1)];
//var secondHalfProbabilities = probabilities[randomIntFromInterval(0, 1)];
// TO DO:
//  - exclusion based on refresh et al - CHECK

// NICE TO HAVE:
//	- card flipping

// TO DO (survey):
//	- CRT with wording modified (check for citation), but question about if they've seen these Qs before

// repeated assessment
//const repeatedAssessment = '';
// repeatedAssessment; v = vist, w = week (use abbreviations 'v' or 'w')
// repeatedAssessment must be _ followed by week or visit (e.g., _w)
const repeatedAssessment = '_v';
//const repeatedAssessment = '_w';

// repeated assessment number
//const repeatedAssessmentNumber = '';
const repeatedAssessmentNumber = 2;

// if using qualtrics, add code to your qualtrics here
const qualtricsCode = "SV_5jt7BivBUleMhWl";

// First choose version of PRL
//const version = 'deck';
const version = 'avatar';

switch (version) { 
  case 'deck':
  // Choose deck placement
  // Select 0-4 to choose deck set stimulus
  var stimuliSet = 7; // change deck set here
  var stimuliColor = [
    ['black','blue','red'], // stimulus set = 0
    ['black','blue','red'], // stimulus set = 1
    ['black','blue','red'], // stimulus set = 2
    ['black','blue','red'], // stimulus set = 3
    ['black','blue','red'], // stimulus set = 4
    ['black','blue','red'], // stimulus set = 5
    ['black','blue','red'], // stimulus set = 6
    ['black','blue','red'], // stimulus set = 7
  ];  
  var deckImageExtension = ".jpg";
  var csvPrefix             = "prl_";
  break;

  case 'avatar':
  // Choose avatar placement
  // Select 0-6 to choose avatar set stimulus
  var stimuliSet = 0; // change avatar set here
  var stimuliColor = [
    ['black','blue','red'], // stimulus set = 0
    ['green','orange','purple'], // stimulus set = 1
    ['darkred','darkteal','orange'], // stimulus set = 2
    ['brown','lavender','lightblue'], // stimulus set = 3
    ['lightyellow','mudbrown','turquoise'], // stimulus set = 4
    ['darkblue','lightturquoise','rose'], // stimulus set = 5
    ['lavender','red','turquoise'], // stimulus set = 6
    ['gray','maroon','pinkorange'] // stimulus set = 7
  ];  
  var deckImageExtension = ".png";
  var csvPrefix             = "social_prl_";
  break;
}

// CONSTANTS
var keyMap = {
	left: 49,     // 1
  middle: 50,   // 2
  right: 51,    // 3
  continue: 48  // 48 = zero, 32 = space, but problematic on firefox for triggering button presses!
};


//subject ID popup
//var workerId = getParamFromURL( "workerId" );

// var workerId = prompt("enter subjectID:");
// var confirm_id = alert("You have entered:\n\n" + workerId + "\n\nIf incorrect, please refresh the browser and enter the correct ID.");

let workerId = getParamFromURL( 'workerId' );


if (!isEmpty(workerId)) {
  Math.seedrandom(workerId);
} else {
  var this_seed = new Date().getTime();
  Math.seedrandom(this_seed);
  workerId = "AUNDEFINED_" + this_seed;
}

//choose seed based on mturk info. XXX Implement seeding based on manually input worker ID
if (!isEmpty(workerId)) {
    Math.seedrandom(workerId);
} else {
    var this_seed = new Date().getTime();
    Math.seedrandom(this_seed);
    workerId = "AUNDEFINED_" + this_seed;
}
const qualtrics = "https://yalesurvey.ca1.qualtrics.com/SE/?SID=" + qualtricsCode + "&Q_JFE=0&workerId=" + workerId;

let GUID;
let subjectID;
let sexAtBirth;
let siteNumber;
let ageAtAssessment;
let feedbackLink;
let visit;
let week;




var refreshCount          = parseInt("<?php echo $_SESSION['refreshCount']; ?>");
var dataDirectory         = '../data/';
var stimulusDirectory     = '../stimuli/';
var csvExtension          = '.csv';



var startDate           = new Date(); //.toISOString() makes it a UTC string...
var percentile          = 25; // cut-off performance percentile for bonus
var bonus               = 2; // in dollars
var possiblePoints      = [100, -50];
var feedbackDuration    = 1;
var feedbackDuration_ms = feedbackDuration * 1000;
var ITI                 = 0.5;
var ITI_ms              = ITI * 1000;
var responseKeyList     = [keyMap.left, keyMap.middle, keyMap.right];
var continueKeyList     = [keyMap.continue]; // 32
var red                 = "#C23818";
var green               = "#22C228";
var win                 = randomIntFromInterval(0, 1) > 0.5; // convert to boolean
var feedbackColor       = win ? green : red; // green if win, red if loss
var winPoints           = 100;
var losePoints          = -50;
var points              = win ? winPoints : losePoints;
var score               = 0;

var keysAllowed         = false;
var breakOn             = false;
var response;

// Choose condition
var probabilities           = [ [0.9, 0.5, 0.1], [0.8, 0.4, 0.2] ];
// 0 = [0.9, 0.5, 0.1]; 1=[0.8, 0.4, 0.2]
// var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 1)];
var firstHalfProbabilities  = probabilities[randomIntFromInterval(0, 0)];
// var secondHalfProbabilities = probabilities[randomIntFromInterval(0, 1)];
var secondHalfProbabilities = probabilities[randomIntFromInterval(1, 1)];
var numBlocks               = 4;
var trialsPerBlock          = 40;
var totalTrials             = numBlocks * trialsPerBlock;
var breakTrials             = [];
var trial                   = 0;
var practiceTrial 					= 0;
var totalPracticeTrials     = 3;
var streak                  = 0;
var maxStreak               = 9;
var strikes                 = 0;
var maxStrikes              = 2;
var randomizeDecksOn        = false;
var practiceOn 							= false;
var interactiveInstructionsOn = false;

// Data output structure
var trialInfo = {
  deckColors: [],
  deckPositions: [],
  deckProbabilities:[],
  deckProbabilityOrder: [],
  colors: [],
  keys: [],
  positions: [],
  probabilities: [],
  results: [],
  reversals: [],
  trialNums: [],
  RT: [],
  score: []
};

var excludeThisSubject = false;
var excludedReason = "NA";

// Set up evenly spaced breaks at start of each new block
for (var i = trialsPerBlock; i <= totalTrials; i += trialsPerBlock) {
	breakTrials.push(i);
}

// grab stimulus
var stimuliPrefix = "stimuli/" + version + "/" + stimuliSet + "/";

var probabilityNames   = ['high', 'medium', 'low'];
var probabilityOrder   = shuffle(deepCopy(probabilityNames));
var deckPositions      = ['left', 'middle', 'right'];
var deckColorOrder     = shuffle(stimuliColor[[stimuliSet]]);

var probabilityToColor    = _.zipObject(probabilityOrder, deckColorOrder);
var positionToProbability = _.zipObject(deckPositions, probabilityOrder);
var probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
var positionToColor       = _.zipObject(deckPositions, deckColorOrder);
var keyToPosition         = _.zipObject(responseKeyList, deckPositions);
var keyToProbability      = _.zipObject(responseKeyList, probabilityOrder);
var theseProbabilities    = _.zipObject(probabilityNames, firstHalfProbabilities);

var trialProbabilityArray = [];

// Randomize deck position
for (var position in positionToColor) {
  var thisID = "#" + position + "DeckImage";
  var color  = positionToColor[position];
  $(thisID).attr('src', stimuliPrefix + color + deckImageExtension);
}

var infix          = "-pr1-";
var suffix         = "-a";
var completionCode = generateCompletionCode(infix, suffix);

// preload images
var images = [];
images = preloadImages(stimuliPrefix, deckColorOrder, deckImageExtension);


// instantiate data saving
var subjectFileName       = dataDirectory + csvPrefix + workerId + repeatedAssessment + repeatedAssessmentNumber + csvExtension;
var excludedCSVName       = dataDirectory + csvPrefix + workerId + repeatedAssessment + repeatedAssessmentNumber + "_excluded.csv";
var attritionListFileName = dataDirectory + csvPrefix + "attrition_list.csv";

