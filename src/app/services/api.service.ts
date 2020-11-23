import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { RegionModel } from "../models";

@Injectable({
  providedIn: "root",
})
export class APIService {
  constructor(private httpClient: HttpClient) {}

  public ping(region: RegionModel): Observable<any> {
    const { regionName, storageAccountName } = region;
    let url = "";
    if (storageAccountName.indexOf("astus-east-1") > -1) {
      url = `https://${storageAccountName}.s3.amazonaws.com/latency-test.json`;
    } else if (storageAccountName.indexOf("eu-south-1") || storageAccountName.indexOf("af-south-1 ") > -1) {
      url = `https://${storageAccountName}.s3.${regionName}.amazonaws.com/latency-test.json`;
    } else {
      url = `https://${storageAccountName}.s3-${regionName}.amazonaws.com/latency-test.json`;
    }
    const headers = new HttpHeaders({
      "Cache-Control": "no-cache",
      Accept: "*/*",
    });
    return this.httpClient.get(url, { headers, responseType: "text" }).pipe(catchError(this.handleError));
  }

  // Use arrow function so this context is not lost
  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side or network error occurred: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = "AJAX request was cancelled. ";
      }
      // The backend returned an unsuccessful response code.
      else if (error.status === 404) {
        console.error("Resource not found.");
      }

      // The response body may contain clues as to what went wrong.
      if (error.error && error.error.message) {
        errorMessage += `Server response: ${error.error.message}`;
      }
    }

    // Return an observable with a user-facing error message.
    console.error(errorMessage);
    return throwError(errorMessage);
  };
}
