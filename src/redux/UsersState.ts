import { User } from "../interfaces/User"



// App State
export class UsersState {
    public users: User[] = [];
    public currentUser: User | null = null;
}

// Action Type
export enum UsersActionType {
    SetCurrentUser = "SetCurrentUser",
    CreateUser = "CreateUser",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser",
    SetAllUsers = "SetAllUsers",
    FilterUsers = "FilterUsers",
}

// Action
export interface UsersAction {
    type: UsersActionType;
    payload: any;
}



// Action Creators
export function setCurrentUserAction(user: User | undefined): UsersAction {
    return { type: UsersActionType.SetCurrentUser, payload: user };
}

export function addUserAction(user: User): UsersAction {
    return { type: UsersActionType.CreateUser, payload: user }
}

export function updateUserAction(User: User): UsersAction {
    return { type: UsersActionType.UpdateUser, payload: User }
}

export function deleteUserAction(_id: number): UsersAction {
    return { type: UsersActionType.DeleteUser, payload: _id }
}

export function setAllUsersAction(Users: User[]): UsersAction {
    return { type: UsersActionType.SetAllUsers, payload: Users }
}

export function filterUsersAction(filteredUsers: User[]): UsersAction {
    return { type: UsersActionType.FilterUsers, payload: filteredUsers };
}

// reducer
export function usersReducer(
    currentState: UsersState = new UsersState(),
    action: UsersAction
): UsersState {
    const newState = { ...currentState, users: [...currentState.users] };

    switch (action.type) {
        case UsersActionType.SetCurrentUser:
            newState.currentUser = action.payload;
            break;

        case UsersActionType.CreateUser:
            newState.users.push(action.payload);
            break;

        case UsersActionType.UpdateUser:
            const indexToUpdate = newState.users.findIndex(
                (user) => user._id === action.payload._id
            );
            if (indexToUpdate !== -1) {
                newState.users[indexToUpdate] = action.payload;
            }
            break;

        case UsersActionType.DeleteUser:
            newState.users = newState.users.filter(
                (user) => user._id !== action.payload
            );
            break;

        case UsersActionType.SetAllUsers:
            newState.users = action.payload;
            break;

        case UsersActionType.FilterUsers:
            newState.users = action.payload;
            break;

        default:
            break;
    }

    return newState;
}
