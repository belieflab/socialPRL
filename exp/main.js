// instantiate data saving
if (turkprime_online == false) {
  var subjectFileName       = dataDirectory + csvPrefix + subjectID + repeatedAssessment + repeatedAssessmentNumber + csvExtension;
  var excludedCSVName       = dataDirectory + csvPrefix + subjectID + repeatedAssessment + repeatedAssessmentNumber + "_excluded.csv";
} else if (turkprime_online == true) {
  var subjectFileName       = dataDirectory + csvPrefix + workerId + repeatedAssessment + repeatedAssessmentNumber + csvExtension;
  var excludedCSVName       = dataDirectory + csvPrefix + workerId + repeatedAssessment + repeatedAssessmentNumber + "_excluded.csv";
}
var attritionListFileName = dataDirectory + csvPrefix + "attrition_list.csv";

var task_instructions = [];
task_instructions.push(instr1);
task_instructions.push(instr2);
task_instructions.push(instr3);
task_instructions.push(instr4);
task_instructions.push(instr5);
task_instructions.push(instr6);
task_instructions.push(instr7);

var progressAllowed        = true;
var nextButtonClickCounter = 0;
var currInstructions       = 0;
var currPhase              = 0;
var RT                     = 0;
var trialStartTime         = 0;

//-------------------------------------------
// SHOW INSTRUCTIONS ON PRESSING CONSENT
//-------------------------------------------
// Set instructions
$("#instructions1").html(task_instructions[0]);

// Set attritionInstructions
$("#openEnded").html(openEnded);
$("#attritionInstructions").html(attrition_instructions);

document.getElementById('nextButton').onclick = function() {
  if (progressAllowed) {
    nextButtonClickCounter += 1;
  }

  // Consent phase end, attrition phase start
  if (nextButtonClickCounter == 1) {
  	// Hide consent stuff
    $(".consent").css({"display": "none"});
  if (turkprime_online == true){
        // Show attrition stuff
        $(".attrition").css({"display": "block"});

        // function translate(){
        //    var begin; 
        //   switch(language){
        //     case 'english': 
        //      begin='BEGIN';
        //      break
       
        //     case 'french':
        //      begin='XXX';
        //      break
       
        //     case 'german':
        //      begin='XXX';
        //      break
        //    }
        // }
        // translate();
        // reword next button
        //document.getElementById('nextButton').innerHTML='begin';
        switch(language){
          case 'english':
            // alert();
            $('#nextButton').text('BEGIN');
            break;
    
          case 'french':
            $('#nextButton').text('COMMENCER');
            break;
    
          case 'german':
            $('#nextButton').text('START');
            break;
        }
        //$('#nextButton').text(begin);
        document.getElementById("pass").innerHTML = ''; // hides validation success text
        // $('#nextButton').toggleClass("", "noCursor");

    // } else if (turkprime_online == false){
    //   // let leapfrog = true;
    }

    switch(language){
      case 'english':
        // alert();
        document.getElementById("pass").innerHTML = ''; // hides validation success text
        $('#nextButton').text('BEGIN');
        break;

      case 'french':
        document.getElementById("pass").innerHTML = ''; // hides validation success text
        $('#nextButton').text('COMMENCER');
        break;

      case 'german':
        document.getElementById("pass").innerHTML = ''; // hides validation success text
        $('#nextButton').text('START');
        break;
    }
  // Attrition phase end, instructions phase start
  } else if (nextButtonClickCounter == 2) {
		// validate attrition ans
		progressAllowed = validateAttritionAns();
    //alert('2');

		// hide attrition stuff, show main instructions
		if (progressAllowed) {
      
      // hides cursor after worker validation
      $(document).ready(function(){
      $("body").addClass("hideCursor");
      });

			$(".attrition").css({"display": "none"});
			$(".instructions").css({"display": "block"});
      $("#nextButton").css({"display": "none"});
      $("#hide").css({"display": "none"});
      $(".screening").css({"background-color": "lightgray"}); //changes background color
      interactiveInstructionsOn = true;
      keysAllowed = true;
      practiceOn = false;
      addToParticipantList(workerId, firstHalfProbabilities, secondHalfProbabilities,
      startDate, startDate, attritionListFileName); // add to attrition list since they saw the instructions
      
    }

  // Instructions phase end, practice phase start
  } else if (nextButtonClickCounter == 3) {
    // $(document).ready(function(){
    //   $("body").addClass("hideCursor");
    //   });
    
		keysAllowed = true;
    practiceOn = true;
    interactiveInstructionsOn = false;
    $(".instructions").css({"display": "none"});
    $("#instructions1").html(endPracticeInstructions);
      $(document).ready(function(){
        $("body").addClass("showCursor");
        });
      // $("#nextButton").click(function(){
      //   $("body").removeClass("showCursor");
      //   $("body").addClass("hideCursor");
      //   });
    //alert('33');
    $('#nextButton').css({display: "none"});
    $("#rightDeck").css({display: 'block'});
    // show fixation after feedback is done
    showFixationOnly();
    // reset display once ITI is done
    Timeout.set(reset, ITI_ms);
  
   // Practice phase end, task phase start
  } else if (nextButtonClickCounter == 4) {
  	keysAllowed = true;
    practiceOn = false;
    interactiveInstructionsOn = false;

    $(".instructions").css({"display": "none"});
    $('#nextButton').css({"display": "none"});
    //alert('4');
    // show fixation after feedback is done
    showFixationOnly();
    // reset display once ITI is done
    Timeout.set(reset, ITI_ms);
  }
};

var allowedKey, thisProbability, thisKey;
var lastPressedTime = 0;
var thisPressedTime = 0;
var minPressInterval = 300; // time mandated between button presses for instructions, in ms
var thisPressInterval = 0;
$(document).keypress(function(key) {
	thisPressedTime = Date.now();
  RT = thisPressedTime - trialStartTime;
  thisPressInterval = thisPressedTime - lastPressedTime;
  thisKey = key.which;

  if (keysAllowed) {
    if (interactiveInstructionsOn) {
      // the parts where you need to make a specific button press
      if (currInstructions >= 2 && currInstructions <= 4 ) {
        currPhase = currInstructions - 2;
        allowedKey = responseKeyList[currPhase];
      } else {
        allowedKey = continueKeyList[0];
      }

      if ( (thisKey == allowedKey) && (thisPressInterval > minPressInterval) ) {
        currInstructions += 1;
      }

      $("#instructions1").html(task_instructions[currInstructions]);

      if (currInstructions == 2){
        showDecks();
      }

      if (currInstructions == 5){
        showFeedback("left", 100, true);
        showFeedback("middle", -50, false);
        $("#rightDeck").css({display: 'none'});
      }

      if (currInstructions >= task_instructions.length - 1) {
        keysAllowed = false;
        hideDecks();
        hideFeedback();
        $("#nextButton").css({"display": "block"});
        // show cursor at the begin practice trials
        $(document).ready(function(){
          $("body").addClass("showCursor");
          });
        // hide cursor when beginning practice trials
        $("#nextButton").click(function(){
          $("body").removeClass("showCursor");
          $("body").addClass("hideCursor");
          });
      }
      
      //   });
    } else if (practiceOn) {
      // if (currInstructions == task_instructions.length) {
      //   alert();
      //   $(document).ready(function(){
      //     $("body").removeClass("showCursor");
      //     });
      //   // $("#nextButton").click(function(){
      //   //   // $("body").removeClass("showCursor");
      //   //   $("body").addClass("hideCursor");
      //   //   });
      //   // $("#nextButton").click(function(){
      //   //   $("body").removeClass("showCursor");
      //   //   $("body").addClass("hideCursor");
      //   //   });
      // } 
// 
      if (practiceTrial < totalPracticeTrials) {
        
        if (!breakOn && responseKeyList.includes(thisKey) && (thisPressInterval > minPressInterval)) { // keysAllowed
          keysAllowed = false;
          practiceTrial += 1;

          trialProbabilityArray = firstHalfProbabilities;
          theseProbabilities = _.zipObject(probabilityNames, trialProbabilityArray);
          thisProbability = keyToProbability[thisKey];

          response    = probabilityToPosition[thisProbability];
          win         = Math.random() <= theseProbabilities[thisProbability];
          points      = win ? winPoints : losePoints;

          showFeedback(response, points, win);

          // show fixation after feedback is done
          Timeout.set(showFixationOnly, feedbackDuration_ms);
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms + feedbackDuration_ms);
        }        
      }
    } else {
      if (trial < totalTrials) {
        if (!breakOn && responseKeyList.includes(thisKey) && (thisPressInterval > minPressInterval)) { //keysAllowed
          keysAllowed = false;

          trial += 1;

          // Check if we're using the first or second half's probabilites
          trialProbabilityArray = trial <= (totalTrials/2) ? firstHalfProbabilities : secondHalfProbabilities;

          theseProbabilities = _.zipObject(probabilityNames, trialProbabilityArray);

          thisProbability = keyToProbability[thisKey];

          if (thisProbability == "high") {
            streak += 1;
          } else {
          	if (streak > 0) {
			  strikes += 1;
          	}


            if (strikes >= maxStrikes) {
              streak = 0;
              strikes = 0;
            }
          }

          if (streak >= maxStreak) {
            randomizeDecksOn = true;
          }

          response    = probabilityToPosition[thisProbability];
          win         = Math.random() <= theseProbabilities[thisProbability];
          points      = win ? winPoints : losePoints;
          score += points;

          // Add trial info
          trialInfo.deckColors.push(deckColorOrder);
          trialInfo.deckPositions.push(deckPositions);
          trialInfo.deckProbabilities.push(trialProbabilityArray);
          trialInfo.deckProbabilityOrder.push(probabilityOrder);
          trialInfo.colors.push(probabilityToColor[thisProbability]);
          trialInfo.keys.push(thisKey);
          trialInfo.positions.push(keyToPosition[thisKey]);
          trialInfo.probabilities.push(thisProbability);
          trialInfo.results.push(win);
          trialInfo.reversals.push(randomizeDecksOn);
          trialInfo.trialNums.push(trial);
          trialInfo.RT.push(RT);
          trialInfo.score.push(score);

          showFeedback(response, points, win);

          // show fixation after feedback is done
          Timeout.set(showFixationOnly, feedbackDuration_ms);
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms + feedbackDuration_ms);
        } else if (breakOn && continueKeyList.includes(thisKey) && (thisPressInterval > minPressInterval) ) {
          breakOn = false;
          var index = breakTrials.indexOf(trial);
          breakTrials.splice(index, 1);
          // show fixation
          showFixationOnly();
          // reset display once ITI is done
          Timeout.set(reset, ITI_ms);
        }
      }
    }
    // lastPressedTime = thisPressedTime;
  }
  lastPressedTime = thisPressedTime;
});

//-------------------------------------------
// Worker ID & Browser validation
//-------------------------------------------
var user_agent_string          = navigator.userAgent;
var mobile_browser_error_id    = "#mobileBrowserErrorMessage";
var workerId_error_id         = "#workerIDErrorMessage";
var pastParticipantListCSVName = 'data/past_participant_list.csv';
var pastParticipantList        = [];
var csvData, pastParticipantList;

getCSV(pastParticipantListCSVName);
pastParticipantList = csvData;
pastParticipantList = flatten(pastParticipantList);

//get worker ID if embedded in URL
// var workerId_valid = validate_workerId( workerId );
var workerId_used_before = check_workerId_used_before( workerId, pastParticipantList );

//check that user is not on a mobile device, and if they're not, begin instructions
if (!validate_browser(user_agent_string))
{
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'block'});
  $(workerId_error_id).css({'display': 'none'});
  $('.buttonHolder').css({'display': 'none'});
  $('.consent').css({'display': 'none'});
  $('.instructions').css({'display': 'none'});
  $('.task').css({'display': 'none'});

}

if (workerId_used_before) {
  $('.error').css({'display': 'block'});
  $(mobile_browser_error_id).css({'display': 'none'});
  $(workerId_error_id).css({'display': 'block'});
  $('.buttonHolder').css({'display': 'none'});
  $('.consent').css({'display': 'none'});
  $('.instructions').css({'display': 'none'});
  $('.task').css({'display': 'none'});

}


function showDecks() {
	$(".deckContainer").css({display: 'block'});
}

function hideDecks() {
	$(".deckContainer").css({display: 'none'});
}

function showFixation() {
	$('.fixation').css({display: 'block'});
}

function hideFixation() {
	$('.fixation').css({display: 'none'});
}

function showFeedback(deck_position, deck_points, deck_win) {
  var this_feedback_id = "#" + deck_position + "Feedback";
  var feedback_color   = deck_win ? green : red;
  $(this_feedback_id).text(deck_points);
  $(this_feedback_id).css({color: feedback_color, display: 'block'});
}

function hideFeedback() {
	$(".feedback").css({display: 'none'});
}

function showFixationOnly() {
	showFixation();
  hideDecks();
  hideFeedback();
  hideBreakText();
}

function setBreakText(text) {
	$(".break").html(text); // xxx .text
}
function showBreakText() {
  $(".break").css({display: 'block'});
}

function hideBreakText() {
  $(".break").css({display: 'none'});
}




