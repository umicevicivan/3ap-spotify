import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form: FormGroup;

    constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
        this.form = fb.group({
            username: fb.control('31c01fe756f941fcb8117c46079bd23e', [Validators.required]),
            password: fb.control('b00b94a3c9e84c53b96b2c70dd1b488a', [Validators.required]),
        });
    }

    login(): void {
        this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(login => {
            if (login) {
                this.redirect();
            }
        });
    }

    private redirect(): void {
        this.router.navigateByUrl('/home');
    }
}
