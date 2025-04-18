'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changeHistory = [];
  let copyState = { ...state };

  for (const action of actions) {
    let currentState;

    switch (action.type) {
      case 'addProperties':
        currentState = { ...copyState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        currentState = { ...copyState };
    }

    changeHistory.push(currentState);
    copyState = { ...currentState };
  }

  return changeHistory;
}

module.exports = transformStateWithClones;
