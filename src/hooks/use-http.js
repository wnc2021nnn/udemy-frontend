import { useReducer, useCallback } from "react";
import {ResponseConstant} from '../constants/response-constant'
import {ActionConstant, StatusConstant} from '../constants/reducer-constant'
const httpReducer = (state, action) => {
  if (action.type === ActionConstant.HTTP_ACTION_SEND)
    return {
      data: null,
      error: null,
      status: StatusConstant.HTTP_STATUS_PENDING,
    };
  if (action.type === ActionConstant.HTTP_ACTION_SUCCESS)
    return {
      data: action.responseData,
      error: null,
      status: StatusConstant.HTTP_STATUS_COMPLETED,
    };
  if (action.type === ActionConstant.HTTP_ACTION_ERROR)
    return {
      data: null,
      error: action.errorMessage,
      status: StatusConstant.HTTP_STATUS_COMPLETED,
    };

  return state;
};

const useHttp = (requestFunction, startWithPending = false) => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending? StatusConstant.HTTP_STATUS_PENDING : null,
        data: null,
        error: null
    })
    const sendRequest = useCallback(
        async (requestData) => {
            dispatch({type: ActionConstant.HTTP_ACTION_SEND});
            try {
                const responseData = await requestFunction(requestData);
                dispatch({type: ActionConstant.HTTP_ACTION_SUCCESS, responseData})
            } catch (error) {
                dispatch({type: ActionConstant.HTTP_ACTION_ERROR, errorMessage: error.message || ResponseConstant.UNEXPECTED_ERROR})
            }
        },
        [requestFunction]
    );
    return {
        sendRequest,
        ...httpState,
    }
}

export default useHttp;
