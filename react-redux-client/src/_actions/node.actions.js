import { nodeConstants } from  '../_constants';
import { nodeService } from '../_services';

export const nodeActions = {
  getAll
}

function getAll() {
  return dispatch => {
    dispatch(request());

    nodeService.getAll()
        .then(
          nodes => {dispatch(success(nodes))},
          error => {dispatch(failure(error))}
        );
  };

  function request() {
    return { type: nodeConstants.GETALL_REQUEST}
  }
  function success(nodes) {
    return { type: nodeConstants.GETALL_SUCCESS, nodes }
  }
  function failure(error) {
    return { type: nodeConstants.GETALL_FAILURE, error }
  }
}
