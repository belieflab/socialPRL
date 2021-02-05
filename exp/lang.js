//-------------------------------------------
// INSTRUCTIONS
//-------------------------------------------

// Attrition instructions
var attrition_instructions =  "Please type the following sentence into the box below exactly as written " +
"to proceed: " + "<br>" +
"<i>I am ready to begin this task.</i>" +
"<br /><br />";

var instr1 = "Welcome! Before we begin, please make your window as large as possible. " +
"Please do not leave the task page, do not use the back button, and do not refresh the page, as you " +
"may be locked out from completing the task." +
"<br /><br />" +
"Please press the zero (0) key to continue.";

var instr2 = "In this study, you will play a game about working with people, and your goal " +
"is to win as many points as you can." +
"<br /><br />" +
"If your score lands you in the top " + percentile + "% of participants, you will " +
"get an extra $" + bonus + " bonus, so please do your best!" +
"<br /><br />" +
"Please also keep in mind that this survey consists of two parts: the game and " +
"a survey. After completing the survey, please record the confirmation code you receive. " +
"<b>You must submit the code in order to receive compensation.</b>" +
"<br /><br />" +
"Please press the zero (0) key to continue.";


var instr3 = "Imagine you are a student at a university. Working with classmates " +
"can help you learn and complete group projects. However, sometimes classmates can be " +
"unreliable. They can show up late, fail to complete their work, or be distracted for " +
"personal reasons. Some classmates may even deliberately sabotage your work." +
"<br /><br />" +
"Three classmates are shown below. On each turn, you will select one partner to work with " +
"on a school project. You may use the '1', '2', or '3' keys on your keyboard to choose the " +
"left, middle, or right classmate, respectively. " +
"<br /><br />" +
"Let's practice choosing partners. Please select the <b>left</b> partner by pressing the '1' key. ";


var instr4 = "Great! Now choose the <b>middle</b> partner by pressing the '2' key.";

var instr5 = "Excellent! Now choose the <b>right</b> partner by pressing the '3' key.";

var instr6 = "Good job! You have successfully practiced selecting partners." +
"<br /><br />" +
"After you select a partner, you will see if your project succeeds (+100 points) or " +
"fails (-50 points). " +
"<br /><br />"+
"<b>Note that each partner is different.</b> Your job is to find the best partner, and to get as " +
"many points as possible. However, no partner is perfect. Anyone can have a bad day. " +
"<br /><br />"+
"Please press the zero (0) key to continue.";


var instr7 = "There is one additional catch: <b>sometimes, the partners may change.</b> The partner that previously " +
"performed the best may start to struggle or sabotage you while the other partners may improve." +
"<br /><br />" +
"If you think the best partner has changed, you should try to find the new best partner."+
"<br /><br />" +
"The following is a practice round of just 3 turns. The points you get here won’t change your final score, " +
"and the best partner will change between the practice round and when the real game starts." +
"<br /><br />" +
"Please click the 'Next' button to start the practice round.";


var endPracticeInstructions = "You have now completed the practice round. " +
"The main task will take approximately another 10 minutes, with longer individual rounds than the practice. " +
"<br /><br />" +
"Please click 'Next' whenever you are ready to start the main task.";



var task_instructions = [];
task_instructions.push(instr1);
task_instructions.push(instr2);
task_instructions.push(instr3);
task_instructions.push(instr4);
task_instructions.push(instr5);
task_instructions.push(instr6);
task_instructions.push(instr7);