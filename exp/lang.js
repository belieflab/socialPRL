//-------------------------------------------
// INSTRUCTIONS
//-------------------------------------------

switch(language){

    // Case 1: Run english instructions
    case 'english':
        translate();
        var modelResponse = "I will answer open-ended questions.";
        var almostModelResponse = "I will answer open-ended questions";
        var errorMessage = "Please enter the requested text exactly into the box before clicking next!";

        var mobileBrowserErrorMessage = "You cannot access this test from a mobile browser. Please use a desktop computer to complete the task.";
        var workerIDErrorMessage = "You are ineligible for this task, since your worker ID has been recorded as participating in this task already. Please return the HIT."
      
    
        //const consent = 'CONSENT';
        // Attrition instructions -- English

        var openEnded = "This is an anonymous survey consisting of multiple questions. A few questions are open-ended questions where you need to type a few sentences of a short paragraph or two. Many MTurk workers do not like answering open-ended questions and tend to quit a survey once they see such questions. <b>If a sizable number of people quit a survey halfway, the data quality of that survey would be compromised. However, our research depends on good quality data.</b> Thus, please make sure you do not mind open-ended questions before taking this survey.";

        var attrition_instructions =  "Please type the following sentence into the box below exactly as written " +
        "to proceed: " + "<br>" +
        "<i>I will answer open-ended questions.</i>" +
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
                  breakText = "You are now " + percentComplete + "% done. Please press the zero (0) key to continue.";
              } else {
                breakText = "You have completed the task. Your final score is " + score + ".\n" + '<br>' +
                  "You have successfully completed the experiment and your data has been saved.\n" + '<br>' +
                  "Please move on to the second part of the task at this link:\n" + '<br>' +
                  "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                      // "Please wait for the experimenter to continue.\n"+ '<br>' +
                  "You may now close the expriment window at anytime.\n";
          
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

        
        break


    // Run French instructions    
    case 'french':
        translate();
        var modelResponse = "Je répondrai aux questions ouvertes.";
        var almostModelResponse = "Je répondrai aux questions ouvertes";
        var errorMessage = "Veuillez saisir exactement le texte demandé dans la case avant de cliquer sur Suivant!";

        var mobileBrowserErrorMessage = "Vous ne pouvez pas accéder à ce test à partir d'un navigateur mobile. Veuillez utiliser un ordinateur pour participer.";
        var workerIDErrorMessage = "Vous n'êtes pas éligible pour cette tâche, car votre ID de travailleur a déjà été enregistré comme participant à cette tâche. Veuillez renvoyer le HIT."

    
        //const consent = 'CONSENT';
        // Attrition instructions -- French

        var openEnded = "Il s'agit d'une enquête anonyme composée de plusieurs questions. Quelques questions sont des questions ouvertes dans lesquelles vous devez taper quelques phrases d'un court paragraphe ou deux. De nombreux travailleurs de MTurk n'aiment pas répondre aux questions ouvertes et ont tendance à quitter une enquête une fois qu'ils voient de telles questions. <b>Si un nombre important de personnes quittaient une enquête à mi-chemin, la qualité des données de cette enquête serait compromise. Cependant, nos recherches dépendent de données de bonne qualité.</b> Par conséquent, assurez-vous que les questions ouvertes ne vous dérangent pas avant de répondre à cette enquête.";

        // Attrition instructions -- French
        var attrition_instructions =  "Veuillez taper la phrase suivante dans la case ci-dessous exactement telle qu'elle est écrite " +
        "si vous souhaitez toujours répondre à l'enquête: " + "<br>" +
        "<i>Je répondrai aux questions ouvertes.</i>" +
        "<br /><br />";

        var instr1 = "Bienvenue! Avant de commencer, veuillez agrandir votre fenêtre au maximum.  " +
        "Veuillez ne pas quitter la page des tâches, ne pas utiliser le bouton de retour et ne pas actualiser la page, car vous  " +
        "pourriez être empêché de terminer la tâche." +
        "<br /><br />" +
        "Veuillez appuyer sur la touche zéro (0) pour continuer.";

        var instr2 = "Dans cette étude, vous jouerez à un jeu sur le travail avec les gens, et votre objectif  " +
        "est de gagner autant de points que possible." +
        "<br /><br />" +
        "Si votre score vous place dans le top  " + percentile + "% des participants, vous " +
        "obtiendrez un bonus supplémentaire de" + bonus + " $, alors faites de votre mieux!" +
        "<br /><br />" +
        "Veuillez également garder à l'esprit que cette enquête se compose de deux parties: le jeu et " +
        "une enquête. Après avoir répondu à l'enquête, veuillez enregistrer le code de confirmation que vous recevez. " +
        "<b>Vous devez soumettre le code pour recevoir une compensation.</b>" +
        "<br /><br />" +
        "Veuillez appuyer sur la touche zéro (0) pour continuer.";


        var instr3 = "Imaginez que vous êtes étudiant dans une université.  Travailler avec des camarades de classe  " +
        "peut vous aider à apprendre et à réaliser des projets de groupe.  Cependant, les camarades de classe peuvent  " +
        "parfois ne pas être fiables.  Ils peuvent se présenter en retard, ne pas terminer leur travail ou être distraits pour  " +
        "des raisons personnelles. Certains camarades de classe peuvent même délibérément saboter votre travail." +
        "<br /><br />" +
        "Trois camarades de classe sont représentés ci-dessous.  À chaque tour, vous sélectionnerez un partenaire avec lequel travailler " +
        "sur un projet scolaire. Vous pouvez utiliser les touches  '1', '2', ou '3' de votre clavier  " +
        "pour choisir respectivement le camarade de classe gauche, central ou droit. " +
        "<br /><br />" +
        "Entraînons-nous à choisir des partenaires.  Veuillez choisir le partenaire de  <b>gauche</b> en appuyant sur la touche '1'. ";


        var instr4 = "Génial! Choisissez maintenant le partenaire  <b>intermédiaire</b> en appuyant sur la touche '2'.";

        var instr5 = "Excellent! Choisissez maintenant le partenaire de <b>droite</b> en appuyant sur la touche '3'.";

        var instr6 = "Bon travail! Vous avez pratiqué avec succès la sélection de partenaires." +
        "<br /><br />" +
        "Après avoir sélectionné un partenaire, vous verrez si votre projet réussit (+100 points) ou " +
        "échoue (-50 points). " +
        "<br /><br />"+
        "<b>Notez que chaque partenaire est différent.</b> Votre travail consiste à trouver le meilleur partenaire, et à obtenir " +
        "le plus de points possible. Cependant, aucun partenaire n'est parfait. Tout le monde peut passer une mauvaise journée. " +
        "<br /><br />"+
        "Veuillez appuyer sur la touche zéro (0) pour continuer.";


        var instr7 = "Il y a un problème supplémentaire: <b>parfois, les partenaires peuvent changer.</b> Le partenaire qui a précédemment  " +
        "le mieux fonctionné peut commencer à se débattre ou à vous saboter tandis que les autres partenaires peuvent s'améliorer." +
        "<br /><br />" +
        "Si vous pensez que le meilleur partenaire a changé par rapport à ce qu'il était auparavant, essayez de trouver le nouveau meilleur partenaire."+
        "<br /><br />" +
        "Ce qui suit est une ronde d'entraînement de seulement 3 tours. Les points que vous obtenez ici ne changeront pas votre score final,  " +
        "et le meilleur partenaire changera entre le tour d’entraînement et le début de la partie réelle." +
        "<br /><br />" +
        "Veuillez cliquer sur le bouton «Suivant» pour commencer la ronde d’entraînement.";


        var endPracticeInstructions = "Vous avez maintenant terminé le tour de pratique.  " +
        "La tâche principale prendra environ 10 minutes supplémentaires avec des tours individuels plus longs que la pratique. " +
        "<br /><br />" +
        "Veuillez cliquer sur 'Suivant' chaque fois que vous êtes prêt à démarrer la tâche principale.";

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
                  breakText = "Vous avez maintenant terminé à  " + percentComplete + "%. Veuillez appuyer sur la touche zéro (0) pour continuer";
              } else {
                breakText = "Vous avez terminé la tâche. Votre score final est de  " + score + ".\n" + '<br>' +
                  "Vous avez terminé le test avec succès et vos données ont été enregistrées.\n" + '<br>' +
                  "Veuillez passer à la deuxième partie de la tâche à ce lien:\n" + '<br>' +
                  "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                      // "Please wait for the experimenter to continue.\n"+ '<br>' +
                  "Vous pouvez maintenant fermer la fenêtre de l'expérience à tout moment.\n";
          
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


        break

    // Run German instructions    
    case 'german':
        translate();
        var modelResponse = "Ich werde offene Fragen beantworten.";
        var almostModelResponse = "Ich werde offene Fragen beantworten";
        var errorMessage = "Bitte geben Sie den gewünschten Text genau in das Feld ein, bevor Sie auf Weiter klicken!";

        var mobileBrowserErrorMessage = "Sie können nicht über einen mobilen Browser auf diesen Test zugreifen. Bitte verwenden Sie einen Desktop-Computer, um die Aufgabe abzuschließen.";
        var workerIDErrorMessage = "Sie sind für diese Aufgabe nicht berechtigt, da Ihre Mitarbeiter-ID bereits als an dieser Aufgabe teilnehmend registriert wurde. Bitte senden Sie den HIT zurück."

        //const consent = 'CONSENT';
        // Attrition instructions -- German

        var openEnded = "Dies ist eine anonyme Umfrage, die aus mehreren Fragen besteht. Einige Fragen sind offene Fragen, bei denen Sie einige Sätze in ein oder zwei kurzen Absätzen eingeben müssen. Viele MTurk-Mitarbeiter beantworten ungern offenen Fragen und beenden eine Umfrage, sobald sie solche Fragen sehen. <b>Wenn eine beträchtliche Anzahl von Personen eine Umfrage auf halbem Weg beendet, wird die Datenqualität dieser Umfrage beeinträchtigt. Unsere Forschung hängt jedoch von qualitativ hochwertigen Daten ab.</b> Überprüfen Sie daher bitte, ob Sie keine Einwände gegen offene Fragen haben, bevor Sie an dieser Umfrage teilnehmen.";

        // Attrition instructions -- German
        var attrition_instructions =  "Bitte geben Sie den folgenden Satz genau so in das Feld ein, wie er geschrieben wurde," +
        "wenn Sie noch an der Umfrage teilnehmen möchten: " + "<br>" +
        "<i>Ich werde offene Fragen beantworten.</i>" +
        "<br /><br />";

        var instr1 = "Herzlich willkommen! Bevor wir beginnen, machen Sie bitte Ihr Fenster so groß wie möglich. " +
        "Bitte verlassen Sie die Aufgabenseite nicht, verwenden Sie nicht die Schaltfläche Zurück und aktualisieren Sie die Seite nicht,  " +
        "da Sie möglicherweise von der Ausführung der Aufgabe ausgeschlossen sein könnten." +
        "<br /><br />" +
        "Bitte drücken Sie die Null-Taste (0), um fortzufahren.";

        var instr2 = "In dieser Studie spielen Sie ein Spiel über die Arbeit mit Menschen. " +
        "Ihr Ziel ist es, so viele Punkte wie möglich zu gewinnen. " +
        "<br /><br />" +
        "Wenn Sie mit Ihrer Punktzahl unter den besten  " + percentile + "% der Teilnehmer landen, " +
        "erhalten Sie einen zusätzlichen Bonus von " + bonus + " USD. Geben Sie also bitte Ihr Bestes!" +
        "<br /><br />" +
        "Bitte beachten Sie auch, dass diese Umfrage aus zwei Teilen besteht: dem Spiel und einer  " +
        "Umfrage. Notieren Sie nach Abschluss der Umfrage den Bestätigungscode, den Sie erhalten.  " +
        "<b>Sie müssen den Code einreichen, um eine Entschädigung zu erhalten.</b>" +
        "<br /><br />" +
        "Bitte drücken Sie die Null-Taste (0), um fortzufahren.";


        var instr3 = "Stellen Sie sich vor, Sie sind Student an einer Universität. Die Arbeit mit Kommilitonen " +
        "kann Ihnen helfen, Gruppenprojekte zu lernen und abzuschließen. Manchmal können Kommilitonen jedoch  " +
        "unzuverlässig sein. Sie können spät auftauchen, ihre Arbeit nicht abschließen, oder aus persönlichen  " +
        "Gründen abgelenkt werden. Einige Kommilitonen sabotieren möglicherweise sogar absichtlich Ihre Arbeit." +
        "<br /><br />" +
        "Drei Kommilitonen sind unten gezeigt. In jeder Runde wählen Sie einen Partner aus, mit dem Sie  " +
        "an einem Schulprojekt arbeiten möchten. Sie können die Tasten '1', '2', oder '3' auf Ihrer Tastatur  " +
        "verwenden, um den linken, mittleren oder rechten Kommilitonen auszuwählen. " +
        "<br /><br />" +
        "Lassen Sie uns die Partnerauswahl üben. Bitte wählen Sie den <b>linken</b> Partner durch Drücken der Taste '1'. ";


        var instr4 = "Großartig! Wählen Sie nun den <b>mittleren</b> Partner aus, indem Sie die Taste '2' drücken.";

        var instr5 = "Ausgezeichnet! Wählen Sie nun den <b>rechten</b> Partner aus, indem Sie die Taste '3' drücken.";

        var instr6 = "Gut gemacht! Sie haben die Auswahl von Partnern erfolgreich geübt." +
        "<br /><br />" +
        "Nachdem Sie einen Partner ausgewählt haben, sehen Sie, ob Ihr Projekt erfolgreich ist (+100 Punkte) oder " +
        "fehlschlägt (-50 Punkte). " +
        "<br /><br />"+
        "<b>Beachten Sie, dass jeder Partner anders ist.</b> Ihre Aufgabe ist es, den besten Partner zu finden und so  " +
        "viele Punkte wie möglich zu sammeln. Kein Partner ist jedoch perfekt. Jeder kann einen schlechten Tag haben. " +
        "<br /><br />"+
        "Bitte drücken Sie die Null-Taste (0), um fortzufahren.";


        var instr7 = "Es gibt noch einen weiteren Haken: <b>Manchmal können sich die Partner ändern.</b> Der Partner, der zuvor  " +
        "die beste Leistung erbracht hat, kann anfangen, Sie zu bekämpfen oder zu sabotieren, während sich " +
        "die anderen Partner möglicherweise verbessern." +
        "<br /><br />" +
        "Wenn Sie der Meinung sind, dass sich der beste Partner gegenüber dem vorherigen geändert hat, versuchen Sie, den "+
        "neuen besten Partner zu finden." +
        "<br /><br />" +
        "Das Folgende ist eine Übungsrunde von nur 3 Runden. Die Punkte, die Sie hier erhalten, ändern nichts " +
        "an Ihrem Endergebnis, und der beste Partner ändert sich zwischen der Übungsrunde und dem Beginn des eigentlichen Spiels." +
        "<br /><br />" +
        "Bitte klicken Sie auf die Schaltfläche 'Weiter', um die Übungsrunde zu starten.";


        var endPracticeInstructions = "Sie haben jetzt die Übungsrunde abgeschlossen. " +
        "Die Hauptaufgabe dauert ungefähr weitere 10 Minuten mit längeren Einzelrunden als die Übungsrunde. " +
        "<br /><br />" +
        "Klicken Sie auf 'Weiter', wenn Sie bereit sind, die Hauptaufgabe zu starten.";
        
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
                  breakText = "Sie sind jetzt zu  " + percentComplete + "% fertig. Bitte drücken Sie die Null-Taste (0), um fortzufahren.";
              } else {
                breakText = "Sie haben die Aufgabe abgeschlossen. Ihr Endergebnis ist " + score + ".\n" + '<br>' +
                  "Sie haben das Experiment erfolgreich abgeschlossen und Ihre Daten wurden gespeichert.\n" + '<br>' +
                  "Fahren Sie unter diesem Link mit dem zweiten Teil der Aufgabe fort:\n" + '<br>' +
                  "<a href="+qualtrics+">Qualtrics</a>\n" + '<br>' +
                      // "Please wait for the experimenter to continue.\n"+ '<br>' +
                  "Sie können das Experimentierfenster jetzt jederzeit schließen.\n";
          
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

        break        
}

// push instructions to timeline
var task_instructions = [];
task_instructions.push(instr1);
task_instructions.push(instr2);
task_instructions.push(instr3);
task_instructions.push(instr4);
task_instructions.push(instr5);
task_instructions.push(instr6);
task_instructions.push(instr7);





