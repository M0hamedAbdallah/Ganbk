import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { firebase } from "../../firebase/config/firebase-config";

class CustomRecaptchaVerifier {
constructor(recaptchaContainerId) {
    this.recaptchaContainerId = recaptchaContainerId;
    this.applicationVerifier = new firebase.auth.RecaptchaVerifier(this.recaptchaContainerId, {
        size: 'normal',
        callback: this.setResponse.bind(this),
        'expired-callback': this.handleRecaptchaExpiration,
    });
}

setResponse(response) {
    this.response = response;
}

handleRecaptchaExpiration() {
    console.log('reCAPTCHA expired');
}

    async verify(phone) {
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(
                // Replace with your phone number
                "+20" + phone ,
                this.applicationVerifier
            );
            return confirmationResult;
        } catch (error) {
            console.error('Error sending verification code:', error);
            throw error;
        }
    }
}

export default CustomRecaptchaVerifier;
