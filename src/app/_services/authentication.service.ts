import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                    // login berhasil jika ada tanda jwt dalam respon
                if (user && user.token) {
                    // menyimpan user detail dan jwt token penyimpanan lokal untuk menjaga 
                    // pengguna login saat refresh halaman
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user dari penyimpanan lokal 
        localStorage.removeItem('currentUser');
    }
}