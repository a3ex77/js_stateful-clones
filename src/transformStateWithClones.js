'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyChange = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const nextState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        currentState = nextState;
        break;

      case 'clear':
        currentState = {};
        break;
    }

    historyChange.push({ ...currentState });
  }

  return historyChange;
}

module.exports = transformStateWithClones;
