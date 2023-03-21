import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TimeLoadingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>{
        const response = context.switchToHttp().getResponse();
        response.locals.loadTime = `${Date.now() - now} ms (client)`;
        }),
      );
  }
}
