import { nodeConstants } from '../_constants';

export function nodes(state = {}, action) {
  switch (action.type) {
    case nodeConstants.GETALL_REQUEST:
        return {
        loading: true
        };
    case nodeConstants.GETALL_SUCCESS:
        return {
        items: action.nodes
        };
    case nodeConstants.GETALL_FAILURE:
        return {
        error: action.error
        };
    default:
        return state
  }
}
