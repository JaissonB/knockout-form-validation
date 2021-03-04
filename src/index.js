document.querySelector("#validationCustom01").focus();

function AppViewModel() {
	var self = this;

	//poderia ter sido usada a validação em pt-BR de acordo com o site
	//https://github.com/Knockout-Contrib/Knockout-Validation/blob/master/localization/pt-BR.js

    this.nome = ko.observable().extend({
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

    this.sobrenome = ko.observable().extend({
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

    this.ddd = ko.observable().extend({
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

    this.telefone = ko.observable().extend({
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

    this.cep = ko.observable().extend({
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
	

    this.endereco = ko.observable().extend({ 
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

    this.numero = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z 0-9]+$",
    		message: "O campo Número da Residência não deve conter caracteres especiais!",
    	},
    	required: {
    		params: true,
    		message: "O campo Número é obrigatório!"
    	}
	})

    this.complemento = ko.observable()

    this.bairro = ko.observable("").extend({ 
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

    this.numero = ko.observable().extend({ 
    	pattern: {
    		params: "^[A-Z a-z 0-9]+$",
    		message: "O campo Número da Residência não deve conter caracteres especiais!",
    	},
    	required: {
    		params: true,
    		message: "O campo Número da Residência é obrigatório!"
    	}
	})


    this.cidade = ko.observable().extend({ 
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
    
    this.estado = ko.observable("").extend({ 
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

	this.btnValida = function(){

		getCep(self.cep()).then((result) => {
			if(result.erro==true){ 
				self.cep("");
				return;
			}

			var bairro = document.querySelector('#validationCustom07');
			var cidade = document.querySelector('#validationCustom04');
			var endereco = document.querySelector('#validationCustom09');
			var estado = document.querySelector('#validationCustom05');

			self.bairro(result.bairro);
			bairro.disabled = self.bairro.isValid();

			self.complemento(result.complemento)

			self.cidade(result.localidade);
			cidade.disabled = self.cidade.isValid();

			self.endereco(result.logradouro);
			endereco.disabled = self.endereco.isValid();

			self.estado(result.uf);
			estado.disabled = self.estado.isValid();

		})
		
	}
	
	//conferir cep novamente antes de enviar formulario
	self.formulario =  function(element) {
		var objeto = {
			firstName: self.nome(),
  			lastName: self.sobrenome(),
  			phone: self.ddd() + self.telefone(),
  			cep: parseInt(self.cep()),
  			address: self.endereco(),
  			number: parseInt(self.numero()),
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




