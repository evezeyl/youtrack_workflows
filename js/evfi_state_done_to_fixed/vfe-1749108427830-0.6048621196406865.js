/* eslint-disable */
var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var workflow = require('advanced-state-machine/state-machine');


exports.rule = entities.Issue.onChange({
  title: "On-change 1",
  guard: function(ctx) {
    const logger = new Logger(ctx.traceEnabled);


    // --- #1 Issue.isReported ---
    logger.log("Running scripts for the \"Issue exists or is created\" block");
    const issue_0 = ctx.issue;

    const IssueisReportedFn_0 = () => {
      if (issue_0 === null || issue_0 === undefined) throw new Error('Block #1 (Issue exists or is created): "Issue" has no value');

      return issue_0.isReported
    };

    // --- #2 andOperator ---

    // --- #3 checkField ---
    const issue_1 = ctx.issue;

    function checkFieldStateState_0() {
      const issueField = issue_1.fields["State"];

      return issue_1.is(ctx.StateState, ctx.StateState.Done);
    }

    const checkFieldFn_0 = () => {


      return checkFieldStateState_0()
    };


    const andOperatorFn_0 = () => {


      return checkFieldFn_0()
    };


    try {
      return (
        IssueisReportedFn_0() &&
      andOperatorFn_0()
      );
    } catch (err) {
      if (err?.message?.includes('has no value')) {
        logger.error('Failed to execute guard', err);
        return false;
      }
      throw err;
    }

  },
  action: function(ctx) {
    const logger = new Logger(ctx.traceEnabled);


    // --- #1 changeIssueFieldValue ---
    const issue_2 = ctx.issue;
    logger.log("Mode: set");
    logger.log("Current value:", issue_2.fields['State']);

    const changeIssueFieldValueFn_0 = () => {


      issue_2.fields['State'] = ctx.StateState.Fixed;
    };

    changeIssueFieldValueFn_0();

  },
  requirements: {
    StateState: {
      name: "State",
      type: entities.State.fieldType,
      Done: {name: "Done"},
      Fixed: {name: "Fixed"}
    }
  }
});

function Logger(useDebug = true) {
  return {
    log: (...args) => useDebug && console.log(...args),
    warn: (...args) => useDebug && console.warn(...args),
    error: (...args) => useDebug && console.error(...args)
  }
}