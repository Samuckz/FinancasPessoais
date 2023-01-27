class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			console.log(i, this[i]) // Use essa notação semelhante a arrays para acessar os valores dos atributos
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}			
		}
		return true

	}

	getDespesa(){
		document.write(`Ano: ${ano} | Mês: ${mes} | Dia: ${dia} | Tipo de gasto: ${tipo} | Descrição: ${desconto} | Valor: ${valor}`)
	}
}

class Bd{

	constructor(){
		let id = localStorage.getItem('id') // null
		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id') 
		return parseInt(proximoId)+1
	}
	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){
		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		for(let i =1; i<=id; i++){
			let despesa = JSON.parse(localStorage.getItem(i))

			//verificar se existe a possibilidade de haver indices que foram removidos

			if(despesa == null){
				continue
			}
			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	


	pesquisar(despesa){
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		

		// ano
		if (despesa.ano != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		// mes
		if (despesa.mes != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		// dia
		if (despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//tipo
		if (despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if (despesa.descricao != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		// valor
		if (despesa.valor != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas


	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()



function cadastrarDespesa(){

	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value 
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value 
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


	if(despesa.validarDados()){
		bd.gravar(despesa)
		// dialog de sucesso
		alert('Dados inseridos com sucesso')
		document.getElementById('ano').value = ''
		document.getElementById('mes').value = ''
		document.getElementById('dia').value = ''
		document.getElementById('tipo').value = '' 
		document.getElementById('descricao').value = ''
		document.getElementById('valor').value = ''
	}

	else{
		// dialog de false
		alert('Alguns dados não foram inseridos, favor preenchê-los corretamente')
	}



	 

}

function carregaListaDespesas(despesas = Array(), filtro = false){

	if (despesas.length == 0 && filtro == false){
		despesas = bd.recuperarTodosRegistros()	
	}
	

	// selecionando o elemento tbody
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''


	// percorrer o array despesa listando cada despesa de forma dinamica

	despesas.forEach(function(d){
		
		// criando linha
		let linha = listaDespesas.insertRow()

		// criar colunas
		linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano

		// ajustar tipo
		switch(Number(d.tipo)){
		case 1: d.tipo = 'Alimentação'
			break

		case 2: d.tipo = 'Educação'
			break

		case 3: d.tipo = 'Lazer'
			break

		case 4: d.tipo = 'Saúde'
			break

		case 5: d.tipo = 'Transporte'
			break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		// criar botao de exclusao
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = "<i class='fas fa-times'></i>"
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_despesa_', '')
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(4).append(btn)

		console.log(d)
		


	})


}

function pesquisarDespesas(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value 
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value 
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	carregaListaDespesas(despesas, true)

	

}

