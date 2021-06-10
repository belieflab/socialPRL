<?php 
session_start();
if (!isset($_SESSION['refreshCount']))    {
    $_SESSION['refreshCount'] = 0;
}
elseif ($_SESSION['refreshCount'] >= 0)    {
    $_SESSION['refreshCount']++;
}
header('Access-Control-Allow-Origin: *'); #necessary to make CSV downloading work
?>

<?php
require_once ("db/config.php");
?>


<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <meta name="googlebot" content="noindex, nofollow">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <!-- <title>Probabalistic Reversal Task</title> -->
  <title>Social PRL</title>
  <script>
    //onbeforeunload in body
    function areYouSure() {
    return "Write something clever here...";
  }
  areYouSure();
  </script>
  <!-- set js language variable from php variable in config.php -->
  <script>const language = "<?php echo$language?>";</script>
</head>

<body id='unload' onbeforeunload="return areYouSure()">
    <?php
      if ($turkprime_online == true) {
        switch($language){
          case 'english':
          include_once "include/consent/english.php";
          break;

          case 'french':
            include_once "include/consent/french.php";
            break;

          case 'german':
            include_once "include/consent/german.php";
            break;
        } 
        // echo'<br>';
        // echo'connected';
      } else if ($db_connection_status == true) {
          include_once "include/nda.php";
          // echo'<br>';
          // echo'connected';
      } else if ($db_connection_status == false) {
        include_once "include/intake.php";
        // echo'<br>';
        // echo'not connected';
      }
    ?>
  <div id="openEndedHolder" class="attrition centeredDiv"> 
  <p id="openEnded" class="attrition"></p>
</div>
<div id="attritionHolder" class="attrition centeredDiv"> 
  <p id="attritionInstructions" class="attrition"></p>
  <input required type="text" id="attritionAns" class="attrition" size="60" style="width:inherit; height:17px; font-size:15px; margin: 0 auto;" />
</div>
<div id="errorMessageHolder" class="error centeredDiv">
  <p id="mobileBrowserErrorMessage"><script>mobileBrowserErrorMessage</script></p>
  <p id="workerIDErrorMessage"><script>workerIDErrorMessage</script></p>
</div>

<div id="instructionsHolder" class="instructions centeredDiv">
  <p id="instructions1" class="instructions">Test instructions!</p>
  <!-- <p id="errorInstructions" class="error instructions">Error instructions</p> -->
</div>

<div class="filler"> </div>
<div class="deckContainer task">

<div class="imgContainer" id="leftDeck">
    <img id="leftDeckImage" src="" height="270px" width="200px"/>
    <div class="feedback" id="leftFeedback">100</div>
</div>

<div class="imgContainer" id="middleDeck">
    <img id="middleDeckImage" src="" height="270px" width="200px"/>
    <div class="feedback" id="middleFeedback">-50</div>
</div>

<div class="imgContainer" id="rightDeck">
     <img id="rightDeckImage" src="" height="270px" width="200px"/>
     <div class="feedback" id="rightFeedback">-50</div>
</div>

    
</div>
<div class="fixation task"> + </div>
<div class="break task"> Take a break </div>
<!-- <div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton">WELCOME</button>
</div> -->

<!-- </body> -->
<script src="db/validate.js"></script>
<script src="js/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="libraries/Timeout.js"></script>
<script type="text/javascript" src="libraries/lodash.js"></script>
<script type="text/javascript" src="libraries/seedrandom.js"></script>
<script type="text/javascript" src="libraries/jquery.csv.js"></script>
<script type="text/javascript" src="exp/fn.js"></script>
<script type="text/javascript" src="exp/conf.js"></script>
<script type="text/javascript" src="exp/lang.js"></script>



<script>
  // show page when loaded 
  window.onload = function() {
    $(".loading").css({display: "none"});
    $(".consent").css({display: "block"});
    $(".buttonHolder").css({display: "block"});
  };
  
</script>
<script type="text/javascript">
      // declare NDA required variables
      let GUID;
      let subjectID;
      let sexAtBirth;
      let siteNumber;
      let ageAtAssessment;
      let feedbackLink;
      let visit;
      let week;
      if (workerId != ""){
          GUID = "";
          subjectID = "";
          sexAtBirth = "";
          siteNumber = "";
          ageAtAssessment = "";
          feedbackLink = "";
          visit = "";
          week = "";
      } else{
        if (db_connection == false){
          GUID = "";
          subjectID = "";
          sexAtBirth = "";
          siteNumber = "";
          ageAtAssessment = "";
          feedbackLink = "";
          visit = "";
          week = "";
        } else if (db_connection == true){
          GUID = "<?php echo $subjectKey?>";
          subjectID = "<?php echo $consortId?>";
          sexAtBirth = "<?php echo $sexAtBirth?>";
          siteNumber = "<?php echo $institutionAlias?>";
          ageAtAssessment = "<?php echo $ageInMonths?>";
          feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/prl.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
          visit = "<?php echo $visit?>";
          week = "<?php echo $week?>";
        }
      }

    </script>


</body>

</html>

