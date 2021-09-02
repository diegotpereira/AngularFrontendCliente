import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { Message } from './message';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) { }

  novoCliente(cliente: Cliente): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}` + `/novo`, cliente)
    .pipe(retry(3), catchError(this.handleError));
  }

  buscarTodosClientes(): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}` + `/buscarTodosClientes`)
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
   }

   atualizarCliente(cliente: Cliente): Observable<Message> {
     return this.http.put<Message> (`${this.baseUrl}` + `/atualizarPorId/` + cliente.id, cliente)
     .pipe(retry(3), catchError(this.handleError));
   }

   deletarCliente(id: number): Observable<Message> {
     return this.http.delete<Message>(`${this.baseUrl}` + `/deletarPorID/` + id)
     .pipe(retry(3), catchError(this.handleError));
   }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      // Ocorreu um erro no lado do cliente ou na rede. Manuseie-o de acordo.
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      // O back-end retornou um código de resposta mal sucedido,
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      console.error(
        `Back-end retornou código ${error.status}, ` +
        `corpo era: ${error.error}`
      );

      // retornar um observável com uma mensagem de erro voltada para o usuário
      return throwError('Algo errado aconteceu; por favor, tente novamente mais tarde.');
    };
  }
}
