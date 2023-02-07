import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../shared/models/user.model";
import { AppState } from "../store/app.state";
import { userActions } from "./state/user.action";
import { getUsers } from "./state/user.state";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users$ = this.store.select(getUsers);
    
    constructor(private readonly http: HttpClient, private readonly store: Store<AppState>) {

    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000');
    }

    addUserEnter(user: User) {
        this.store.dispatch(userActions.addUserEnter({user}));
    }

    createUser(user: User): Observable<{created: boolean}> {
        return this.http.post<{created: true}>('http://localhost:3000/createUser', {user});
    }

}