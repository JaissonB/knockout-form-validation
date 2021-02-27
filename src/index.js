document.querySelector("#validationCustom01").focus();

function AppViewModel() {
	var self = this;

    self.nome = ko.observable().extend({
    	pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "O campo Nome não deve conter caracteres especiais e/ou números!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Nome deve conter {0} ou mais letras!"
    	},
    	required: {
    		params: true,
    		message: "O campo Nome é obrigatório!"
    	}
    })

    self.sobrenome = ko.observable().extend({
    	pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "O campo Sobrenome não deve conter caracteres especiais e/ou números!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Sobrenome deve conter {0} ou mais letras!"
    	},
    	required: {
    		params: true,
    		message: "O campo Sobrenome é obrigatório!"
    	}
    })

    self.ddd = ko.observable().extend({
    	pattern: {
    		params: "^[0-9]+$",
    		message: "O campo DDD não deve conter caracteres especiais e/ou letras!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo DDD deve conter {0} dígitos!"
    	},
    	maxLength: {
    		params: 2,
    		message: "O campo DDD deve conter {0} dígitos!"
    	},
    	required: {
    		params: true,
    		message: "O campo DDD é obrigatório!"
    	}
    })

    self.telefone = ko.observable().extend({
    	pattern: {
    		params: "^[0-9]+$",
    		message: "O campo Telefone não deve conter caracteres especiais e/ou letras!",
    	},
    	minLength: {
    		params: 9,
    		message: "O campo Telefone deve conter {0} dígitos!"
    	},
    	maxLength: {
    		params: 9,
    		message: "O campo Telefone deve conter {0} dígitos!"
    	},
    	required: {
    		params: true,
    		message: "O campo Telefone é obrigatório!"
    	}
    })

    self.cep = ko.observable().extend({
		pattern: {
    		params: "^[0-9]+$",
    		message: "O campo Cep não deve conter caracteres especiais e/ou letras!",
    	},
    	minLength: {
    		params: 8,
    		message: "O campo Cep deve conter {0} dígitos!"
    	},
    	maxLength: {
    		params: 8,
    		message: "O campo Cep deve conter {0} dígitos!"
    	},
    	required: {
    		params: true,
    		message: "Cep inválido!"
    	}
    })
	

    self.endereco = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z À-ú 0-9]+$",
    		message: "O campo Endereço não deve conter caracteres especiais!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Endereço deve conter {0} ou mais letras!"
    	},
    	required: {
    		params: true,
    		message: "O campo Endereço é obrigatório!"
    	}
	})

    self.numero = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z 0-9]+$",
    		message: "O campo Número da Residência não deve conter caracteres especiais!",
    	},
    	required: {
    		params: true,
    		message: "O campo Número é obrigatório!"
    	}
	})

    self.complemento = ko.observable()

    self.bairro = ko.observable("").extend({ 
    	pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "O campo Bairro não deve conter caracteres especiais e/ou números!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Bairro deve conter {0} ou mais dígitos!"
    	},
    	required: {
    		params: true,
    		message: "O campo Bairro é obrigatório!"
    	}
	})

    self.numero = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z 0-9]+$",
    		message: "O campo Número da Residência não deve conter caracteres especiais!",
    	},
    	required: {
    		params: true,
    		message: "O campo Número da Residência é obrigatório!"
    	}
	})


    self.cidade = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z À-ú]+$",
    		message: "O campo Cidade não deve conter caracteres especiais e/ou números!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Cidade deve conter {0} ou mais dígitos!"
    	},
    	required: {
    		params: true,
    		message: "O campo Cidade é obrigatório!"
    	}
	})
    
    self.estado = ko.observable("").extend({ 
    	pattern: {
    		params: "^[A-Z a-z]+$",
    		message: "O campo Estado não deve conter caracteres especiais e/ou números!",
    	},
    	minLength: {
    		params: 2,
    		message: "O campo Estado deve conter {0} dígitos!"
    	},
    	maxLength: {
    		params: 2,
    		message: "O campo Estado deve conter {0} dígitos!"
    	},
    	required: {
    		params: true,
    		message: "O campo Estado é obrigatório!"
    	}
	})
    

	self.btnValida = function(){


		getCep(self.cep()).then((result) => {
			if(result.erro==true){ 
				self.cep("");
				return;
			}

			var bairro = document.querySelector('#validationCustom07');
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

		})
		
	}

	self.formulario =  function(element) {
		var objeto = {
			firstName: self.nome(),
  			lastName: self.sobrenome(),
  			phone: self.telefone(),
  			cep: self.cep(),
  			address: self.endereco(),
  			number: self.numero(),
  			complement: self.complemento(),
  			district: self.bairro(),
  			city: self.cidade(),
  			state: self.estado()
		}
		console.log(objeto)
	}


}

const appViewModel = new AppViewModel()

// can be used in the navigation console
window.appViewModel = appViewModel

var btnSubmit = document.querySelector('#btnSubmit');

appViewModel.erros = ko.validation.group(appViewModel)
appViewModel.erros.isEmpty = ko.computed(function() {
	return appViewModel.erros().length == 0
})

// Activates knockout.js
ko.applyBindings(appViewModel)




