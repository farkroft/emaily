// curly bracer on import to catch specific export from many exported function on that file
import { FETCH_SURVEYS } from '../actions/types';


export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}