import produce from 'immer';
// import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';

export const initialState = {
    loading: 'false',
    otpData: []
};

export const { Types: loginTypes, Creators: loginCreators } = createActions({
  requestSendPassword: ['data'],
  successOtpSent: ['data'],
  sendingPasswordFailure: ['error'],
});

/* eslint-disable default-case, no-param-reassign */
export const loginReducer = (state = initialState, action) => {
  return produce(state, (/* draft */) => {
    switch (action.type) {
      case loginTypes.REQUEST_SEND_PASSWORD:
        console.log('INSIDE REDUCER')
        return state
          .set('otpData', action.data)
          .set('loading', true)
      case loginTypes.SUCCESS_OTP_SENT:
        return state
          .set('loading', false)
      case loginTypes.SENDING_PASSWORD_FAILURE:
        return state
          .set('loading', false)
    //   case loginTypes.CLEAR:
    //     return state
    //       .set('loading', false)
    //       .set('otpResponse', null)
    //       .set('otpError', null);
      default:
        return state;
    }
  });
};
export default loginReducer;