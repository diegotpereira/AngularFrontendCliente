import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { MessageService } from '../message.service';
import { ClienteService } from '../cliente.service';
import { Message } from '../message';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: Array<Cliente> = [];
  mostrarCliente: Cliente;
  foiSelecionado: boolean = false;
  excluirCliente: Cliente;
  retornarMensagem: string;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  definirDetalhesCliente(cliente: Cliente) {
    this.foiSelecionado =! this.foiSelecionado;

    if (this.foiSelecionado) {
      this.mostrarCliente = cliente;
    } else {
      this.mostrarCliente = undefined;
    }
  }

  // Definir o cliente excluído e redefinir a mensagem retornada = undefined
  prepararDeletarcliente(deletarCliente: Cliente) {
    // atribuir excluir-cliente
    this.excluirCliente = deletarCliente;
    // redefinir mensagem devolvida
    this.retornarMensagem = undefined;
  }

  // Excluir um cliente por ID
  deletarCliente() {
    console.log("---Acesse deletarCliente() function");
    this.clienteService.deletarCliente(this.excluirCliente.id)
    .subscribe((message: Message) => {
      console.log(message);
      
    // remover um cliente excluído da lista de clientes em exibição
    this.clientes = this.clientes.filter(cliente => {
      return cliente.id != this.excluirCliente.id;
    })

    // definir uma mensagem de exibição no modal de exclusão
    this.retornarMensagem = message.message;

    // apenas redefina mostrarCliente por não aparecer na tela
    this.mostrarCliente = undefined;

    // adicione a mensagem de exclusão ao aplicativo de mensagem para mostrar
    this.messageService.add(message.message);
    }, (error) => {
      console.log(error);
      let errMsg: string = "Erro! Detalhes: " + error;
      this.messageService.add(errMsg);
    });
  }
  // Função atualizar cliente
  atualizarCliente() {
    this.clienteService.atualizarCliente(this.mostrarCliente)
    .subscribe((message: Message) => {
      console.log(message);
      // atualizar lista de clientes
      this.clientes.map(x => {
        if (x.id == this.mostrarCliente.id) {
          x = this.mostrarCliente;
        }
      });

      let msg: string = "Atualizado com sucesso! -> Propriedades do novo cliente: <br>"
      + "<ul>"
      +"<li>" + "id: " + this.mostrarCliente.id + "</li>"
      +"<li>" + "nome: " + this.mostrarCliente.nome + "</li>"
      +"<li>" + "sobrenome: " + this.mostrarCliente.sobrenome + "</li>"
      +"<li>" + "idade: " + this.mostrarCliente.idade + "</li>"
      +"<li>" + "endereco: " + this.mostrarCliente.endereco + "</li>"
      +"</ul>";
      this.messageService.add(msg);
    }, (error) => {
      console.log(error);
      let errMsg = "Atualização Falhou ! Error = " + error;
      this.messageService.add(errMsg);
    });
  }

  // Recuperar todos os clientes do back-end
  buscarTodosClientes() {
    this.clienteService.buscarTodosClientes()
    .subscribe((message: Message) => {
      console.log(message);
      this.clientes = message.clientes;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.buscarTodosClientes();
  }

}
