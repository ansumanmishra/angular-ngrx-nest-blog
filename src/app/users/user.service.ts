import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private readonly http: HttpClient) {

    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000');
    }
}