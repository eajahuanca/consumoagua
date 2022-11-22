<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col-md-4">
				<h4>Formulario del Personal</h4>
				<form ref="formpersonal" class="form-control" @submit.prevent="this.postputPersonal()">
					<div class="mb-3">
						<label class="form-label" >Nombre Completo del personal</label>
						<input type="text" class="form-control" placeholder="Nombre" v-model="this.form.nombre_completo" />
					</div>
					<div class="mb-3">
						<label class="form-label">Direccion Actual del personal</label>
						<input type="text" class="form-control" placeholder="Direccion" v-model="this.form.direccion" />
					</div>
					<div class="mb-3">
						<label class="form-label">Numero de Celular del personal</label>
						<input type="text" class="form-control" placeholder="Celular" v-model="this.form.celular"/>
					</div>
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-sm btn-success" style="margin-right:0.5em;">{{btnName}}</button>
							<button type="reset" class="btn btn-sm btn-primary" @click="this.resetForm()">Cancelar</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-md-8">
				<div class="row">
					<h4>Datos registrados</h4>
					<div class="row">
						<div class="col-md-8">
							<input type="search" v-model="buscar" placeholder="Buscar ..." class="block form-control"/>
						</div>
						<div class="col-md-4">
							<button class="btn btn-md btn-primary block" @click="buscarPersonal()">Buscar</button>
						</div>
					</div>
					<div class="col-md-12">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Nombre Completo</th>
									<th>Direccion</th>
									<th>Celular</th>
									<th>Opciones</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item of result" :key="item.id">
									<td>{{item.id}}</td>
									<td>{{item.nombre_completo}}</td>
									<td>{{item.direccion}}</td>
									<td>{{item.celular}}</td>
									<td><button class="btn btn-sm btn-danger" style="margin-right:0.5em;" @click="this.deletePersonal(item.id)">Eliminar</button>
										<button class="btn btn-sm btn-warning" @click="this.editPersonal(item.id)">Editar</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "PersonalComponent",
	data: () => ({
		btnName: "Guardar",
		buscar: null,
		resultAux: [],
		result: [],
		url: "http://localhost:3000",
		form: {
			id: null,
			nombre_completo: null,
			direccion: null,
			celular: null
		}
	}),
	created () {
		this.getPersonal();
	},
	methods: {
		async getPersonal(){
			try{
				let response = await axios.get(`${this.url}/personal`);
				this.result = response.data;
				this.resultAux = response.data;
			} catch (error) { console.log(error); }
		},
		async postputPersonal(){
			try{
				if (this.validateData()){
					let data = {
							nombre_completo: this.form.nombre_completo,
							direccion: this.form.direccion,
							celular: this.form.celular
						}
					if(this.form.id == null || this.form.id == undefined){
						await axios.post(`${this.url}/personal`, data);
					} else {
						await axios.put(`${this.url}/personal/${this.form.id}`, data);
					}
					this.resetForm();
					this.getPersonal();
				}
			} catch (error) { console.log(error); }
		},
		async editPersonal(pk){
			try{
				this.form.id = pk;
				this.btnName = "Actualizar";
				let response = await axios.get(`${this.url}/personal/${pk}`);
				this.form.id = response.data.id;	
				this.form.nombre_completo = response.data.nombre_completo;	
				this.form.direccion = response.data.direccion;	
				this.form.celular = response.data.celular;	
			} catch (error) { console.log(error); }
		},
		async deletePersonal(pk){
			try{
				if (pk > 0){
					await axios.delete(`${this.url}/personal/${pk}`);
					this.getPersonal();
				}
			} catch (error) { console.log(error); }
		},
		buscarPersonal () {
			if (this.buscar?.length > 0) {
				let dataBuscar = (this.buscar).toLowerCase();
				this.result = (this.resultAux).filter((item) => (item.nombre_completo).toLowerCase().indexOf(dataBuscar) >=0 || (item.direccion).toLowerCase().indexOf(dataBuscar) >=0 || (item.celular).toString().toLowerCase().indexOf(dataBuscar) >= 0);
			} else {
				this.getPersonal();
			}
		},
		resetForm(){
			this.form.id = null;
			this.form.nombre_completo = null;
			this.form.direccion = null;
			this.form.celular = null;
			this.btnName = "Guardar";
		},
		validateData(){
			if (this.form.nombre_completo.length>0 && this.form.direccion.length>0 && this.form.celular.length>0)
				return true;
			else
				return false;
		}
	}
};
</script>