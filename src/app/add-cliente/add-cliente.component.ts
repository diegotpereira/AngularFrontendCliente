import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  cliente: Cliente;

  // Construindo Atendimento ao Cliente Http
  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  
// Armazene um cliente no servidor de backend
salvar() {
  this.clienteService.novoCliente(this.cliente)
  .subscribe((message: Message) => {
    console.log(message);
    let cliente = message.clientes[0];
    let msg = "Succeso -> Salvar um Cliente: "
    + "<ul>"
    +"<li>id: " + cliente.id + "</li>"
    +"<li>nome: " + cliente.nome + "</li>"
    +"<li>sobrenome: " + cliente.sobrenome + "</li>"
    +"<li>idade: " + cliente.idade + "</li>"
    +"<li>endereco: " + cliente.endereco + "</li>"
    + "</ul>";

    this.messageService.add(msg);
  }, error => {
    console.log(error);
    let msg = "Erro! -> Ação para salvar um cliente:"
    +"<ul>"
    +"<li>id = " + this.cliente.id + "</li>"
    +"<li>nome = " + this.cliente.nome + "</li>"
    +"<li>sobrenome = " + this.cliente.sobrenome + "</li>"
    +"<li>idade = " + this.cliente.idade + "</li>"
    +"<li>endereco = " + this.cliente.endereco + "</li>"
    +"</ul>";

    this.messageService.add(msg);
  });
}

resetar() {
  this.cliente = new Cliente();
}

// A função lida com o envio de formulários
onSubmit() {
  this.salvar();
  this.resetar();
}

}
