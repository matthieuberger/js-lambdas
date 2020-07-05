import { UIStateType } from './ui/UIReducer';
import { JobsStateType } from './jobs/JobsReducer';
import { PoolStateType } from './pool/PoolReducer';
import { SocketStateType } from './socket/SocketReducer';

export default interface AppStateType {
    ui: UIStateType;
    jobs: JobsStateType;
    pool: PoolStateType;
    socket: SocketStateType;
}