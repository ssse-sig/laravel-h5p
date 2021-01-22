H5P.TrueFalse = (function ($, Question) {
  'use strict';

  // Maximum score for True False
  var MAX_SCORE = 1;

  /**
   * Enum containing the different states this content type can exist in
   *
   * @enum
   */
  var State = Object.freeze({
    ONGOING: 1,
    FINISHED_WRONG: 2,
    FINISHED_CORRECT: 3,
    INTERNAL_SOLUTION: 4,
    EXTERNAL_SOLUTION: 5
  });

  /**
   * Button IDs
   */
  var Button = Object.freeze({
    CHECK: 'check-answer',
    TRYAGAIN: 'try-again',
    SHOW_SOLUTION: 'show-solution'
  });

  /**
   * Initialize module.
   *
   * @class H5P.TrueFalse
   * @extends H5P.Question
   * @param {Object} options
   * @param {number} id Content identification
   * @param {Object} contentData Task specific content data
   */
  function TrueFalse(options, id, contentData) {
    var self = this;

    // Inheritance
    Question.call(self, 'true-false');

    var params = $.extend(true, {
      question: 'No question text provided',
      correct: 'true',
      l10n: {
        trueText: 'True',
        falseText: 'False',
        score: 'You got @score of @total points',
        checkAnswer: 'Check',
        showSolutionButton: 'Show solution',
        tryAgain: 'Retry',
        wrongAnswerMessage: 'Wrong answer',
        correctAnswerMessage: 'Correct answer',
        scoreBarLabel: 'You got :num out of :total points'
      },
      behaviour: {
        enableRetry: true,
        enableSolutionsButton: true,
        enableCheckButton: true,
        confirmCheckDialog: false,
        confirmRetryDialog: false,
        autoCheck: false
      }
    }, options);

    // Counter used to create unique id for this question
    TrueFalse.counter = (TrueFalse.counter === undefined ? 0 : TrueFalse.counter + 1);

    // A unique ID is needed for aria label
    var domId = 'h5p-tfq' + H5P.TrueFalse.counter;

    // saves the content id
    this.contentId = id;
    this.contentData = contentData;

    // The radio group
    var answerGroup = new H5P.TrueFalse.AnswerGroup(domId, params.correct, params.l10n);
    if (contentData.previousState !== undefined && contentData.previousState.answer !== undefined) {
      answerGroup.check(contentData.previousState.answer);
    }
    answerGroup.on('selected', function () {
      self.triggerXAPI('interacted');

      if (params.behaviour.autoCheck) {
        checkAnswer();
        triggerXAPIAnswered();
      }
    });


    /**
     * Create the answers
     *
     * @method createAnswers
     * @private
     * @return {H5P.jQuery}
     */
    var createAnswers = function () {
      return answerGroup.getDomElement();
    };

    /**
     * Register buttons
     *
     * @method registerButtons
     * @private
     */
    var registerButtons = function () {
      var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
      var $containerParents = $content.parents('.h5p-container');

      // select find container to attach dialogs to
      var $container;
      if($containerParents.length !== 0) {
        // use parent highest up if any
        $container = $containerParents.last();
      }
      else if($content.length !== 0){
        $container = $content;
      }
      else  {
        $container = $(document.body);
      }

      // Show solution button
      if (params.behaviour.enableSolutionsButton === true) {
        self.addButton(Button.SHOW_SOLUTION, params.l10n.showSolutionButton, function () {
          self.showSolutions(true);
        }, false);
      }

      // Check button
      if (!params.behaviour.autoCheck && params.behaviour.enableCheckButton) {
        self.addButton(Button.CHECK, params.l10n.checkAnswer, function () {
          checkAnswer();
          triggerXAPIAnswered();
        }, true, {}, {
          confirmationDialog: {
            enable: params.behaviour.confirmCheckDialog,
            l10n: params.confirmCheck,
            instance: self,
            $parentElement: $container
          }
        });
      }

      // Try again button
      if (params.behaviour.enableRetry === true) {
        self.addButton(Button.TRYAGAIN, params.l10n.tryAgain, function () {
          self.resetTask();
        }, true, {}, {
          confirmationDialog: {
            enable: params.behaviour.confirmRetryDialog,
            l10n: params.confirmRetry,
            instance: self,
            $parentElement: $container
          }
        });
      }

      toggleButtonState(State.ONGOING);
    };

    /**
     * Creates and triggers the xAPI answered event
     *
     * @method triggerXAPIAnswered
     * @private
     * @fires xAPIEvent
     */
    var triggerXAPIAnswered = function () {
      var xAPIEvent = self.createXAPIEventTemplate('answered');
      addQuestionToXAPI(xAPIEvent);
      addResponseToXAPI(xAPIEvent);
      self.trigger(xAPIEvent);
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     *
     * @method addQuestionToXAPI
     * @param {XAPIEvent} xAPIEvent
     * @private
     */
    var addQuestionToXAPI = function(xAPIEvent) {
      var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
      definition.description = {
        // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
        'en-US': $('<div>' + params.question + '</div>').text()
      };
      definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
      definition.interactionType = 'true-false';
      definition.correctResponsesPattern = [getCorrectAnswer()];
    };

    /**
     * Returns the correct answer
     *
     * @method getCorrectAnswer
     * @private
     * @return {String}
     */
    var getCorrectAnswer = function () {
      return (params.correct === 'true' ? 'true' : 'false');
    };

    /**
     * Returns the wrong answer
     *
     * @method getWrongAnswer
     * @private
     * @return {String}
     */
    var getWrongAnswer = function () {
      return (params.correct === 'false' ? 'true' : 'false');
    };

    /**
     * Add the response part to an xAPI event
     *
     * @method addResponseToXAPI
     * @private
     * @param {H5P.XAPIEvent} xAPIEvent
     *  The xAPI event we will add a response to
     */
    var addResponseToXAPI = function(xAPIEvent) {
      var isCorrect = answerGroup.isCorrect();
      xAPIEvent.setScoredResult(isCorrect ? MAX_SCORE : 0, MAX_SCORE, self, true, isCorrect);
      xAPIEvent.data.statement.result.response = (isCorrect ? getCorrectAnswer() : getWrongAnswer());
    };

    /**
     * Toggles btton visibility dependent of current state
     *
     * @method toggleButtonVisibility
     * @private
     * @param  {String}    buttonId
     * @param  {Boolean}   visible
     */
    var toggleButtonVisibility = function (buttonId, visible) {
      if (visible === true) {
        self.showButton(buttonId);
      }
      else {
        self.hideButton(buttonId);
      }
    };

    /**
     * Toggles buttons state
     *
     * @method toggleButtonState
     * @private
     * @param  {String}          state
     */
    var toggleButtonState = function (state) {
      toggleButtonVisibility(Button.SHOW_SOLUTION, state === State.FINISHED_WRONG);
      toggleButtonVisibility(Button.CHECK, state === State.ONGOING);
      toggleButtonVisibility(Button.TRYAGAIN, state === State.FINISHED_WRONG || state === State.INTERNAL_SOLUTION);
    };

    /**
     * Check if answer is correct or wrong, and update visuals accordingly
     *
     * @method checkAnswer
     * @private
     */
    var checkAnswer = function () {
      // Create feedback widget
      var score = self.getScore();
      var scoreText;

      toggleButtonState(score === MAX_SCORE ? State.FINISHED_CORRECT : State.FINISHED_WRONG);

      if (score === MAX_SCORE && params.behaviour.feedbackOnCorrect) {
        scoreText = params.behaviour.feedbackOnCorrect;
      }
      else if (score === 0 && params.behaviour.feedbackOnWrong) {
        scoreText = params.behaviour.feedbackOnWrong;
      }
      else {
        scoreText = params.l10n.score;
      }
      // Replace relevant variables:
      scoreText = scoreText.replace('@score', score).replace('@total', MAX_SCORE);
      self.setFeedback(scoreText, score, MAX_SCORE, params.l10n.scoreBarLabel);
      answerGroup.reveal();
    };

    /**
     * Registers this question type's DOM elements before they are attached.
     * Called from H5P.Question.
     *
     * @method registerDomElements
     * @private
     */
    self.registerDomElements = function () {
      var self = this;

      // Check for task media
      var media = params.media;
      if (media && media.type && media.type.library) {
        media = media.type;
        var type = media.library.split(' ')[0];
        if (type === 'H5P.Image') {
          if (media.params.file) {
            // Register task image
            self.setImage(media.params.file.path, {
              disableImageZooming: params.media.disableImageZooming || false,
              alt: media.params.alt
            });
          }
        }
        else if (type === 'H5P.Video') {
          if (media.params.sources) {
            // Register task video
            self.setVideo(media);
          }
        }
      }

      // Add task question text
      self.setIntroduction('<div id="' + domId + '">' + params.question + '</div>');

      // Register task content area
      self.$content = createAnswers();
      self.setContent(self.$content);

      // ... and buttons
      registerButtons();
    };

    /**
     * Implements resume (save content state)
     *
     * @method getCurrentState
     * @public
     * @returns {object} object containing answer
     */
    self.getCurrentState = function () {
      return {answer: answerGroup.getAnswer()};
    };

    /**
     * Used for contracts.
     * Checks if the parent program can proceed. Always true.
     *
     * @method getAnswerGiven
     * @public
     * @returns {Boolean} true
     */
    self.getAnswerGiven = function () {
      return answerGroup.hasAnswered();
    };

    /**
     * Used for contracts.
     * Checks the current score for this task.
     *
     * @method getScore
     * @public
     * @returns {Number} The current score.
     */
    self.getScore = function () {
      return answerGroup.isCorrect() ? MAX_SCORE : 0;
    };

    /**
     * Used for contracts.
     * Checks the maximum score for this task.
     *
     * @method getMaxScore
     * @public
     * @returns {Number} The maximum score.
     */
    self.getMaxScore = function () {
      return MAX_SCORE;
    };

    /**
     * Get title of task
     *
     * @method getTitle
     * @public
     * @returns {string} title
     */
    self.getTitle = function () {
      return H5P.createTitle((self.contentData && self.contentData.metadata && self.contentData.metadata.title) ? self.contentData.metadata.title : 'True-False');
    };

    /**
     * Used for contracts.
     * Show the solution.
     *
     * @method showSolutions
     * @public
     */
    self.showSolutions = function (internal) {
      checkAnswer();
      answerGroup.showSolution();
      toggleButtonState(internal ? State.INTERNAL_SOLUTION : State.EXTERNAL_SOLUTION);
    };

    /**
     * Used for contracts.
     * Resets the complete task back to its' initial state.
     *
     * @method resetTask
     * @public
     */
    self.resetTask = function () {
      answerGroup.reset();
      self.removeFeedback();
      toggleButtonState(State.ONGOING);
    };

    /**
     * Get xAPI data.
     * Contract used by report rendering engine.
     *
     * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
     */
    self.getXAPIData = function(){
      var xAPIEvent = this.createXAPIEventTemplate('answered');
      this.addQuestionToXAPI(xAPIEvent);
      this.addResponseToXAPI(xAPIEvent);
      return {
        statement: xAPIEvent.data.statement
      };
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     */
    self.addQuestionToXAPI = function(xAPIEvent) {
      var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
      $.extend(definition, this.getxAPIDefinition());
    };

    /**
     * Generate xAPI object definition used in xAPI statements.
     * @return {Object}
     */
    self.getxAPIDefinition = function () {
      var definition = {};
      definition.interactionType = 'true-false';
      definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
      definition.description = {
        'en-US': $('<div>' + params.question + '</div>').text()
      };
      definition.correctResponsesPattern = [getCorrectAnswer()];

      return definition;
    };

    /**
     * Add the response part to an xAPI event
     *
     * @param {H5P.XAPIEvent} xAPIEvent
     *  The xAPI event we will add a response to
     */
    self.addResponseToXAPI = function (xAPIEvent) {
      var isCorrect = answerGroup.isCorrect();
      var rawUserScore = isCorrect ? MAX_SCORE : 0;
      var currentResponse = '';

      xAPIEvent.setScoredResult(rawUserScore, MAX_SCORE, self, true, isCorrect);

      if(self.getCurrentState().answer !== undefined) {
        currentResponse += answerGroup.isCorrect() ? getCorrectAnswer() : getWrongAnswer();
      }
      xAPIEvent.data.statement.result.response = currentResponse;
    };
   }

  // Inheritance
  TrueFalse.prototype = Object.create(Question.prototype);
  TrueFalse.prototype.constructor = TrueFalse;

  return TrueFalse;
})(H5P.jQuery, H5P.Question);
;
H5P.TrueFalse.AnswerGroup = (function ($, EventDispatcher) {
  'use strict';

  /**
   * Initialize module.
   *
   * @class H5P.TrueFalse.AnswerGroup
   * @extends H5P.EventDispatcher
   * @param {String} domId Id for label
   * @param {String} correctOption Correct option ('true' or 'false')
   * @param {Object} l10n Object containing all interface translations
   */
  function AnswerGroup(domId, correctOption, l10n) {
    var self = this;

    EventDispatcher.call(self);

    var $answers = $('<div>', {
      'class': 'h5p-true-false-answers',
      role: 'radiogroup',
      'aria-labelledby': domId
    });

    var answer;
    var trueAnswer = new H5P.TrueFalse.Answer(l10n.trueText, l10n.correctAnswerMessage, l10n.wrongAnswerMessage);
    var falseAnswer = new H5P.TrueFalse.Answer(l10n.falseText, l10n.correctAnswerMessage, l10n.wrongAnswerMessage);
    var correctAnswer = (correctOption === 'true' ? trueAnswer : falseAnswer);
    var wrongAnswer = (correctOption === 'false' ? trueAnswer : falseAnswer);

    // Handle checked
    var handleChecked = function (newAnswer, other) {
      return function () {
        answer = newAnswer;
        other.uncheck();
        self.trigger('selected');
      };
    };
    trueAnswer.on('checked', handleChecked(true, falseAnswer));
    falseAnswer.on('checked', handleChecked(false, trueAnswer));

    // Handle switches (using arrow keys)
    var handleInvert = function (newAnswer, other) {
      return function () {
        answer = newAnswer;
        other.check();
        self.trigger('selected');
      };
    };
    trueAnswer.on('invert', handleInvert(false, falseAnswer));
    falseAnswer.on('invert', handleInvert(true, trueAnswer));

    // Handle tabbing
    var handleTabable = function(other, tabable) {
      return function () {
        // If one of them are checked, that one should get tabfocus
        if (!tabable || !self.hasAnswered() || other.isChecked()) {
          other.tabable(tabable);
        }
      };
    };
    // Need to remove tabIndex on the other alternative on focus
    trueAnswer.on('focus', handleTabable(falseAnswer, false));
    falseAnswer.on('focus', handleTabable(trueAnswer, false));
    // Need to make both alternatives tabable on blur:
    trueAnswer.on('blur', handleTabable(falseAnswer, true));
    falseAnswer.on('blur', handleTabable(trueAnswer, true));

    $answers.append(trueAnswer.getDomElement());
    $answers.append(falseAnswer.getDomElement());

    /**
     * Get hold of the DOM element representing this thingy
     * @method getDomElement
     * @return {jQuery}
     */
    self.getDomElement = function () {
      return $answers;
    };

    /**
     * Programatic check
     * @method check
     * @param  {[type]} answer [description]
     */
    self.check = function (answer) {
      if (answer) {
        trueAnswer.check();
      }
      else {
        falseAnswer.check();
      }
    };

    /**
     * Return current answer
     * @method getAnswer
     * @return {Boolean} undefined if no answer if given
     */
    self.getAnswer = function () {
      return answer;
    };

    /**
     * Check if user has answered question yet
     * @method hasAnswered
     * @return {Boolean}
     */
    self.hasAnswered = function () {
      return answer !== undefined;
    };

    /**
     * Is answer correct?
     * @method isCorrect
     * @return {Boolean}
     */
    self.isCorrect = function () {
      return correctAnswer.isChecked();
    };

    /**
     * Enable user input
     *
     * @method enable
     */
    self.enable = function () {
      trueAnswer.enable().tabable(true);
      falseAnswer.enable();
    };

    /**
     * Disable user input
     *
     * @method disable
     */
    self.disable = function () {
      trueAnswer.disable();
      falseAnswer.disable();
    };

    /**
     * Reveal correct/wrong answer
     *
     * @method reveal
     */
    self.reveal = function () {
      if (self.hasAnswered()) {
        if (self.isCorrect()) {
          correctAnswer.markCorrect();
        }
        else {
          wrongAnswer.markWrong();
        }
      }

      self.disable();
    };

    /**
     * Reset task
     * @method reset
     */
    self.reset = function () {
      trueAnswer.reset();
      falseAnswer.reset();
      self.enable();
      answer = undefined;
    };

    /**
     * Show the solution
     * @method showSolution
     * @return {[type]}
     */
    self.showSolution = function () {
      correctAnswer.markCorrect();
      wrongAnswer.unmark();
    };
  }

  // Inheritance
  AnswerGroup.prototype = Object.create(EventDispatcher.prototype);
  AnswerGroup.prototype.constructor = AnswerGroup;

  return AnswerGroup;
})(H5P.jQuery, H5P.EventDispatcher);
;
H5P.TrueFalse.Answer = (function ($, EventDispatcher) {
  'use strict';

  var Keys = {
    ENTER: 13,
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
  };

  /**
   * Initialize module.
   *
   * @class H5P.TrueFalse.Answer
   * @extends H5P.EventDispatcher
   * @param {String} text Label
   * @param {String} correctMessage Message read by readspeaker when correct alternative is chosen
   * @param {String} wrongMessage Message read by readspeaker when wrong alternative is chosen
   */
  function Answer (text, correctMessage, wrongMessage) {
    var self = this;

    EventDispatcher.call(self);

    var checked = false;
    var enabled = true;

    var $answer = $('<div>', {
      'class': 'h5p-true-false-answer',
      role: 'radio',
      'aria-checked': false,
      html: text + '<span class="aria-label"></span>',
      tabindex: 0, // Tabable by default
      click: function (event) {
        // Handle left mouse (or tap on touch devices)
        if (event.which === 1) {
          self.check();
        }
      },
      keydown: function (event) {
        if (!enabled) {
          return;
        }
        if ([Keys.SPACE, Keys.ENTER].indexOf(event.keyCode) !== -1) {
          self.check();
        }
        else if ([Keys.LEFT_ARROW, Keys.UP_ARROW, Keys.RIGHT_ARROW, Keys.DOWN_ARROW].indexOf(event.keyCode) !== -1) {
          self.uncheck();
          self.trigger('invert');
        }
      },
      focus: function () {
        self.trigger('focus');
      },
      blur: function () {
        self.trigger('blur');
      }
    });

    var $ariaLabel = $answer.find('.aria-label');

    // A bug in Chrome 54 makes the :after icons (V and X) not beeing rendered.
    // Doing this in a timeout solves this
    // Might be removed when Chrome 56 is out
    var chromeBugFixer = function (callback) {
      setTimeout(function () {
        callback();
      }, 0);
    };

    /**
     * Return the dom element representing the alternative
     *
     * @public
     * @method getDomElement
     * @return {H5P.jQuery}
     */
    self.getDomElement = function () {
      return $answer;
    };

    /**
     * Unchecks the alternative
     *
     * @public
     * @method uncheck
     * @return {H5P.TrueFalse.Answer}
     */
    self.uncheck = function () {
      if (enabled) {
        $answer.blur();
        checked = false;
        chromeBugFixer(function () {
          $answer.attr('aria-checked', checked);
        });
      }
      return self;
    };

    /**
     * Set tabable or not
     * @method tabable
     * @param  {Boolean} enabled
     * @return {H5P.TrueFalse.Answer}
     */
    self.tabable = function (enabled) {
      $answer.attr('tabIndex', enabled ? 0 : null);
      return self;
    };

    /**
     * Checks the alternative
     *
     * @method check
     * @return {H5P.TrueFalse.Answer}
     */
    self.check = function () {
      if (enabled) {
        checked = true;
        chromeBugFixer(function () {
          $answer.attr('aria-checked', checked);
        });
        self.trigger('checked');
        $answer.focus();
      }
      return self;
    };

    /**
     * Is this alternative checked?
     *
     * @method isChecked
     * @return {boolean}
     */
    self.isChecked = function () {
      return checked;
    };

    /**
     * Enable alternative
     *
     * @method enable
     * @return {H5P.TrueFalse.Answer}
     */
    self.enable = function () {
      $answer.attr({
        'aria-disabled': '',
        tabIndex: 0
      });
      enabled = true;

      return self;
    };

    /**
     * Disables alternative
     *
     * @method disable
     * @return {H5P.TrueFalse.Answer}
     */
    self.disable = function () {
      $answer.attr({
        'aria-disabled': true,
        tabIndex: null
      });
      enabled = false;

      return self;
    };

    /**
     * Reset alternative
     *
     * @method reset
     * @return {H5P.TrueFalse.Answer}
     */
    self.reset = function () {
      self.enable();
      self.uncheck();
      self.unmark();
      $ariaLabel.html('');

      return self;
    };

    /**
     * Marks this alternative as the wrong one
     *
     * @method markWrong
     * @return {H5P.TrueFalse.Answer}
     */
    self.markWrong = function () {
      chromeBugFixer(function () {
        $answer.addClass('wrong');
      });
      $ariaLabel.html('.' + wrongMessage);

      return self;
    };

    /**
     * Marks this alternative as the wrong one
     *
     * @method markCorrect
     * @return {H5P.TrueFalse.Answer}
     */
    self.markCorrect = function () {
      chromeBugFixer(function () {
        $answer.addClass('correct');
      });
      $ariaLabel.html('.' + correctMessage);

      return self;
    };

    self.unmark = function () {
      chromeBugFixer(function () {
        $answer.removeClass('wrong correct');
      });

      return self;
    };
  }

  // Inheritance
  Answer.prototype = Object.create(EventDispatcher.prototype);
  Answer.prototype.constructor = Answer;

  return Answer;

})(H5P.jQuery, H5P.EventDispatcher);
;
