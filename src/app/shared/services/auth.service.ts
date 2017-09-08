import * as firebase from 'firebase';

export class AuthService {

    token: string;
    uid: string;

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    loginUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(token => {
                this.token = token;
            });
        return this.token;
    }
    setUID(uid: string) {
        this.uid = uid;
    }
    getUID() {
        return this.uid;
    }

}