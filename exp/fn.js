// Generates random integer between min and max
function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }


// Shuffles an array.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex  = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue      = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex]  = temporaryValue;
    }
  
    return array;
  }
  
// Makes a deep copy of an object or array
function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}
  
  function validateAttritionAns() {
    var valid = false;
    field = "#attritionAns";
    var response = $(field).val().trim(); // remove white space
  
//    var modelResponse = "I am ready to begin this task.";
//    var almostModelResponse = "I am ready to begin this task";
    if ( (response == modelResponse) || (response==almostModelResponse)) {
      valid = true;
    } else if (turkprime_online == false) {
      valid = true;
    } else {
      valid = false;
      return alertAndFocus(field, errorMessage);
    }
    return valid;
  }
  
  function alertAndFocus(field, message) {
    alert(message);
    $(field).focus();
    return false;
  }
  
  function generateCompletionCode(infix, suffix){
    var thisNum, thisChar;
    var thisCode = "";
    for (var i = 0; i < 9; i++) {
      thisNum = randomIntFromInterval(0,9);
      thisChar = String(thisNum);
      thisCode = thisCode + thisChar;
    }
  
    thisCode = thisCode + infix;
  
    for (var i = 0; i < 7; i++) {
      thisNum = randomIntFromInterval(0,9);
      thisChar = String(thisNum);
      thisCode = thisCode + thisChar;
    }
  
    thisCode = thisCode + suffix;
  
    return thisCode;
  }
  
  // Check that the worker ID has been used before
  function check_workerId_used_before( id_str, list )
  {
    var inArray = $.inArray(id_str, list);
    if (inArray == -1) {
    return false;
    } else {
    return true;
    }
  
  }
  
  // validates the worker ID
  // function validate_workerId( id_str )
  // {
  //   var min_length = 8;
  //   var max_length = 25;
  //   var bad_reg_ex = /\W/;
  
  //   if (id_str.length < min_length)
  //   return false;
  
  //   if (id_str.length > max_length)
  //   return false;
  
  //   if (id_str.charAt(0) != 'A' && id_str.charAt(0) != 'a')
  //   return false;
  
  //   if (bad_reg_ex.test(id_str))
  //   return false;
  
  //   return true;
  // }
  
  
  // make sure browser isn't mobile
  function validate_browser( uas )
  {
    var regex1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
    var regex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    var r2_substr_length = 4;
    var uas_sub = uas.substr(0, r2_substr_length);
  
    if (regex1.test(uas))
    return false;
  
    if (regex2.test(uas_sub))
    return false;
  
    return true;
  }
  
  // Preloads the images
  function preloadImages(prefix, colorList, extension){
    var images = [];
    for (i = 0; i < colorList.length; i++) {
      images[i] = new Image();
      thisImageName = prefix + colorList[i] + extension;
      images[i].src = thisImageName;
    }
  
    return images;
  }
  
  // XXX implement python
  function addToParticipantList(workerId, firstHalfProbabilities, secondHalfProbabilities, startDate, endDate, fileName){
    $.ajax({
      type:'post',
      async: false,
      cache: false,
      url: 'code/addToParticipantList.py', // this is the path to the PHP script that will handle saving data
      data: {
        workerId: workerId,
        fileName: fileName,
        firstHalfProbabilities: JSON.stringify(firstHalfProbabilities),
        secondHalfProbabilities: JSON.stringify(secondHalfProbabilities),
        startDate: startDate,
        endDate: endDate
      }
    });
  }
  
  // XXX implement this and the other python scripts
  function saveData(){
    $.ajax({
      type:'post',
      async: false,
      cache: false,
      url: 'code/saveData.py', // this is the path to the PHP script that will handle saving data
      data: {
        fileName: subjectFileName,
        excludedFileName: excludedCSVName,
        excludedReason: excludedReason,
        startDate: startDate,
        endDate: endDate,
        subjectkey: GUID,
        site: siteNumber,
        visit: visit,
        week: week,
        autoWorkerID: workerId,
        interview_date: today,
        interview_age: ageAtAssessment,
        sex: sexAtBirth,
        handedness: handedness,
        task_version: reward,
        userAgentString: user_agent_string,
        firstHalfProbabilities: JSON.stringify(firstHalfProbabilities),
        secondHalfProbabilities: JSON.stringify(secondHalfProbabilities),
        deckColors: JSON.stringify(trialInfo.deckColors),
        deckPositions: JSON.stringify(trialInfo.deckPositions),
        deckProbabilities: JSON.stringify(trialInfo.deckProbabilities),
        deckProbabilityOrder: JSON.stringify(trialInfo.deckProbabilityOrder),
        colors: JSON.stringify(trialInfo.colors),
        keys: JSON.stringify(trialInfo.keys),
        positions: JSON.stringify(trialInfo.positions),
        probabilities: JSON.stringify(trialInfo.probabilities),
        results: JSON.stringify(trialInfo.results),
        reversals: JSON.stringify(trialInfo.reversals),
        trialNums: JSON.stringify(trialInfo.trialNums),
        RT: JSON.stringify(trialInfo.RT),
        score: JSON.stringify(trialInfo.score)
      }
    });
  }
  
  function getCSV(csvName){
    $.ajax({
      async: false,
      url: csvName,
      success: function(file_content){
        csvData = $.csv.toArrays(file_content);
      }
    });
  }
  

  function reset() {
    trialStartTime = Date.now();
      if (breakTrials.includes(trial)) {
        breakOn = true;
      keysAllowed = true;
  
      // re-randomize deck contingencies
      randomizeDecksOn = true;
  
      var percentComplete = trial/totalTrials * 100;
      var breakText;
      if (percentComplete < 100) {
          switch(language) {
            case "english":
              breakText = "You are now " + percentComplete + "% done. Please press the zero (0) key to continue.";
              break;
            case "french":
              breakText = "Vous avez maintenant terminé  " + percentComplete + "% du jeu. Veuillez appuyer sur la touche zéro (0) pour continuer";
              break;
            case "german":
              breakText = "Sie sind jetzt zu  " + percentComplete + "% fertig. Bitte drücken Sie die Null-Taste (0), um fortzufahren.";
              break;
          }
      } else {
        document.getElementById("unload").onbeforeunload='';
        $(document).ready(function(){
            $("body").addClass("showCursor");
            });
        switch(language) {
          case "english":
            if (turkprime_online == true){
              breakText = "You have completed the task. Your final score is " + score + ".\n" + '<br>' +
              "You have successfully completed the experiment and your data has been saved.\n" + '<br>' +
              "Please move on to the second part of the task at this link:\n" + '<br>' +
              "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                  // "Please wait for the experimenter to continue.\n"+ '<br>' +
              "You may now close the expriment window at anytime.\n";
              break;
            } else if (turkprime_online == false){
              breakText = "You have completed the task. Your final score is " + score + ".\n" + '<br>' +
              "You have successfully completed the experiment and your data has been saved.\n" + '<br>' +
              "You may now close the expriment window at anytime.\n";
              break;
            }
            case "french":
              breakText = "Vous avez terminé la tâche. Votre score final est de  " + score + ".\n" + '<br>' +
                "Vous avez terminé le test avec succès et vos données ont été enregistrées.\n" + '<br>' +
                "Veuillez accèder à la deuxième partie de la tâche à l'aide de ce lien:\n" + '<br>' +
                "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                    // "Please wait for the experimenter to continue.\n"+ '<br>' +
                "Vous pouvez maintenant fermer la fenêtre de votre navigateur.\n";
                break;
            case "german":
              breakText = "Sie haben die Aufgabe abgeschlossen. Ihr Endergebnis ist " + score + ".\n" + '<br>' +
                "Sie haben das Experiment erfolgreich abgeschlossen und Ihre Daten wurden gespeichert.\n" + '<br>' +
                "Fahren Sie unter diesem Link mit dem zweiten Teil der Aufgabe fort:\n" + '<br>' +
                "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                    // "Please wait for the experimenter to continue.\n"+ '<br>' +
                "Sie können das Experimentierfenster jetzt jederzeit schließen.\n";
                break;
        };
        // save data
        endDate = new Date();
  
        // check if we're excluding data
        var this_workerId_used_before = check_workerId_used_before( workerId, pastParticipantList );
  
        if ( (this_workerId_used_before) || (refreshCount > 0) ) {
          excludeThisSubject = true;
          if (this_workerId_used_before) {
            excludedReason = 'duplicate_worker';
          } else if (refreshCount > 0) {
            excludedReason = 'refreshed_experiment_page';
          }
        }
  
        saveData();
        addToParticipantList(workerId, firstHalfProbabilities, secondHalfProbabilities,  startDate, endDate, pastParticipantListCSVName); // XXX
      }
  
      setBreakText(breakText);
      showBreakText();
      hideDecks();
      hideFixation();
      hideFeedback();
    } else {
        showDecks();
      hideFixation();
      hideFeedback();
      hideBreakText();
      breakOn = false;
      keysAllowed = true;
    }
  
    if (practiceOn && (practiceTrial == totalPracticeTrials)) {
      breakOn = true;
      keysAllowed = false;
  
      // re-randomize deck contingencies
      randomizeDecksOn = true;
  
      hideDecks();
      hideFixation();
      hideFeedback();
  
      currInstructions += 1;
      $('#instructions1').html(task_instructions[currInstructions]);
      $('#instructionsHolder').css({display: 'block'});
      $('#instructions1').css({display: 'block'});
      $('#nextButton').css({display: 'block'});
    }
  
    // randomize deck contingencies
    if (randomizeDecksOn) {
        var tempProbabilityOrder = shuffle(deepCopy(probabilityNames));
      while (tempProbabilityOrder.indexOf("high") == probabilityOrder.indexOf("high")) {
          tempProbabilityOrder = shuffle(tempProbabilityOrder);
      }
  
      probabilityOrder = tempProbabilityOrder;
  
      probabilityToColor    = _.zipObject(probabilityOrder, deckColorOrder);
      positionToProbability = _.zipObject(deckPositions, probabilityOrder);
      probabilityToPosition = _.zipObject(probabilityOrder, deckPositions);
      positionToColor       = _.zipObject(deckPositions, deckColorOrder);
      keyToPosition         = _.zipObject(responseKeyList, deckPositions);
      keyToProbability      = _.zipObject(responseKeyList, probabilityOrder);
      trialProbabilityArray = trial <= (totalTrials/2) ? firstHalfProbabilities : secondHalfProbabilities;
      // theseProbabilities    = _.zipObject(probabilityNames, firstHalfProbabilities);
      theseProbabilities    = _.zipObject(probabilityNames, trialProbabilityArray);
  
      // make sure we don't do this twice in a row, and reset the streak
      randomizeDecksOn = false;
      streak = 0;
      strikes = 0;
    }
  
  }

  // BELOW COURTESY OF GARY LUPYAN -- COPIED FROM
  //  http://sapir.psych.wisc.edu/wiki/index.php/MTurk
  function getParamFromURL( name ) {
    name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    var regexS = "[\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
    return "";
    else
    return results[1];
  }
  
  
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
  
  // flattens an n-dimensional array into a 1-dimensional one
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }
  
  // Checks if string is empty, null, or undefined
  function isEmpty(str) {
    return (!str || !str.length);
  }
  
  //onbeforeunload in body
  function areYouSure() {
    return "Write something clever here...";
  }
  areYouSure();

  // Translate consent button
  function translate(){
    let consent;
    let load;
    switch(language){
      case 'english': 
       consent='CONSENT';
       load='LOAD';
       break
 
      case 'french': 
       consent='CONSENTEMENT';
       load='CHARGE';
       break
 
      case 'german': 
       consent='ZUSTIMMUNG';
       load='BELASTUNG';
       break
     }
   document.getElementById('submitButton').innerHTML=consent;
   document.getElementById('nextButton').innerHTML=load;
 }