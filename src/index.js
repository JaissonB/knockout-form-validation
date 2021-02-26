//import api from '../api/api.js'
//import css from "style.css"

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
document.querySelector("#validationCustom01").focus();
function AppViewModel() {
	var self = this;

	//var myViewModel = ko.validatedObservable({
    self.nome = ko.observable("").extend({
    	validation: {
    		message: "Preencha com um nome válido!",
    		validator: function(value) {
    			return value.length>1
    		}
    	}, required: true
    })

    self.sobrenome = ko.observable("").extend({
    	validation: {
    		message: "Preencha com um sobrenome válido!",
    		validator: function(value) {
    			return value.length>1
    		}
    	}, required: true
    })

    self.ddd = ko.observable("");

    self.telefone = ko.observable("").extend({
    	validation: {
    		message: "Preencha com um telefone válido!",
    		validator: function(value) {
    			return value.length==9
    		}
    	}, required: true
    })

    self.cep = ko.observable("").extend({
		validation:{
			message: "Preencha com um cep válido!",
			validator: function(value) {
				return value.length==8
			}
		}, required: true
	})

    self.endereco = ko.observable("").extend({ 
    	validation:{
    		message: "Preencha com um endereço válido!",
    		validator: function(value) {
    			return value.length>0
    		}
		}, required: true
	})

    self.numero = ko.observable("").extend({ 
    	validation:{
    		message: "Preencha com um número válido!",
    		validator: function(value) {
    			return value.length>0
    		}
		}, required: true
	})

    self.complemento = ko.observable(""),

    self.bairro = ko.observable("").extend({ 
    	validation:{
    		message: "Preencha com um bairro válido!",
    		validator: function(value) {
    			return value.length>0
    		}
		}, required: true
	})


    self.cidade = ko.observable("").extend({ 
    	validation:{
    		message: "Preencha com uma cidade válida!",
    		validator: function(value) {
    			return value.length>0
    		}
		}, required: true
	})
    
    self.estado = ko.observable("").extend({ 
    	validation:{
    		message: "Preencha com um estado válido!",
    		validator: function(value) {
    			return value.length>0
    		}
		}, required: true
	})
    //})



	self.btnValida = function(){

		self.errosBtnValida = ko.validation.group([self.nome, self.sobrenome, self.telefone, self.ddd, self.cep])
		console.log(self.errosBtnValida().length)
		
		if(self.errosBtnValida().length !== 0){
			self.errosBtnValida.showAllMessages()
			return;
		}

		getCep(self.cep()).then((result) => {
			if(result.erro == true){
				console.log("CEP NÂO EXISTE")
			}
			var bairro = document.querySelector('#validationCustom07');
			var ddd = document.querySelector('#validationCustom13');
			var cidade = document.querySelector('#validationCustom04');
			var endereco = document.querySelector('#validationCustom09');
			var estado = document.querySelector('#validationCustom05');
			
			if(result.bairro !== ""){
				self.bairro(result.bairro);
				bairro.disabled = true;
			}else{
				bairro.disabled = false;
				self.bairro("");
			}

			self.complemento(result.complemento)

			if(result.localidade !== ""){
				self.cidade(result.localidade);
				cidade.disabled = true;
			}else{
				cidade.disabled = false;
				self.cidade("");
			}

			if(result.logradouro !== ""){
				self.endereco(result.logradouro);
				endereco.disabled = true;
			}else{
				endereco.disabled = false;
				self.endereco("");
			}

			if(result.uf !== ""){
				self.estado(result.uf)
				estado.disabled = true;
			}else{
				estado.disabled = false;
				self.estado("");
			}

		}
		//console.log(myViewModel.isValid())

	)}

		//ESTUDARR CASO
	var btnSubmit = document.querySelector('#btnSubmit');
	if(self.nome==""){
		btnSubmit.disabled = false;
	}

}



const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel

// Activates knockout.js
ko.applyBindings(appViewModel)


