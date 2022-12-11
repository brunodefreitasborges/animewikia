import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(private snackBar: MatSnackBar) {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  handleError(error: unknown): void {
    this.openSnackBar('Error!', 'Dismiss');
    console.warn('Caught by custom error Handler: ' + error);
  }
}
