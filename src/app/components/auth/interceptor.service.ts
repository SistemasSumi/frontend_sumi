import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    private count = 0;

    constructor(private loaderService: SeguridadService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading.next(true);
        this.count++;

        return next.handle(request).pipe(
            finalize(() => {
                this.count--;
                if (this.count === 0) {
                    this.loaderService.isLoading.next(false);
                }
            })
        );
    }
}