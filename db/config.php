<?php
/* SELECT A LANGUAGE */
$language = 'english';
// $language = 'french';
// $language = 'german';

/* assign PHP variable to JS variable */
switch($language){
  case 'english':
    '<script type="text/javascript">language = "english";</script>';
    break;
  case 'french':  
    '<script type="text/javascript">language = "french";</script>';
    break;
  case 'german':  
    '<script type="text/javascript">language = "german";</script>';
    break;
}

// set php variable and js config variable 
$avatarSet = 6;

// check for configuration file on server; if it does not exist, set db_connection_status to false.
if (file_exists($_SERVER["DOCUMENT_ROOT"] . '/config.php')) {
  include_once ($_SERVER["DOCUMENT_ROOT"] . '/config.php');
  // echo$_SERVER["DOCUMENT_ROOT"];
  $studyId = $_GET["studyId"];
  $candidateId = $_GET["candidateId"];
  $workerId = $_GET["workerId"];

  if(isset($workerId)){
    // if running locally or on server...
    //echo '<script type="text/javascript">alert("workerId")</script>';
    // echo '<script type="text/javascript">let db_connection = false</script>';
    // echo '<script type="text/javascript">let turkprime_online = true</script>';
    $db_connection_status = false;
    $turkprime_online = true;

  } else if (isset($candidateId)) {
    // if connected to omnibus...
    $query = "SELECT GUID from phi where sub_id = $candidateId";
    $prepare = $db_connection->prepare($query);
    $prepare->execute();
    $result = $prepare->get_result();
    $row = $result->fetch_assoc();
    $guid = $row["GUID"];
    $prepare->close();

    $subjectKey = $_GET["subjectkey"];
    $consortId = $_GET["src_subject_id"];
    $sexAtBirth = $_GET["sex"];
    $institutionAlias = $_GET["site"];
    $ageInMonths = $_GET["interview_age"];
    $visit = $_GET["visit"];
    $week = $_GET["week"];
 
  } else {
    // if running locally or on server...
    //echo '<script type="text/javascript">alert("hi")</script>';
    // echo$db_connection_status;
    $db_connection_status = false;
    $turkprime_online = false;
    // echo '<script type="text/javascript">let db_connection = false</script>';
    echo '<script type="text/javascript">let turkprime_online = false</script>';


    $subjectKey = '';
    $consortId = '';
    $sexAtBirth = '';
    $institutionAlias = '';
    $ageInMonths = '';
    $guid = '';
    $candidateId = '';
    $studyId = '';
    $visit = '';
    $week = '';
  }

} else {
  $workerId = $_GET["workerId"];
  if(isset($workerId)){
    // if running locally with workerId...
    //echo '<script type="text/javascript">alert("workerIdisset")</script>';
    echo '<script type="text/javascript">let db_connection = false</script>';
    echo '<script type="text/javascript">let turkprime_online = true</script>';
    $db_connection_status = false;
    $turkprime_online = true;
  } else {
      // if running locally...
      //echo '<script type="text/javascript">alert("workerIdisnotset")</script>';
      $db_connection_status = false;
      $turkprime_online = false;
      echo '<script type="text/javascript">let db_connection = false</script>';
      echo '<script type="text/javascript">let turkprime_online = false</script>';

      $subjectKey = '';
      $consortId = '';
      $sexAtBirth = '';
      $institutionAlias = '';
      $ageInMonths = '';
      $guid = '';
      $candidateId = '';
      $studyId = '';
      $visit = '';
      $week = '';
  }
} 
