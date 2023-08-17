import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler) {


    return next.handle(req);
  }
}
