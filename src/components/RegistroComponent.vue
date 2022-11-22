<template>
    <div class="container">
		<div class="row mt-3">
			<div class="col-md-4">
				<h4>Formulario Registro Consumo</h4>
				<form ref="formpersonal" class="form-control" @submit.prevent="this.postputConsumo()">
					<div class="mb-3">
						<label class="form-label" >Seleccione Personal</label>
                        <select class="form-select form-select-md mb-3" aria-label=".form-select-md example" v-model="form.personal">
                            <option v-for="item of personalData" :key="item.id" :value="item">
                                {{item.nombre_completo}}
                            </option>
                        </select>
					</div>
					<div class="mb-3">
						<label class="form-label">Cantidad (m3)</label>
						<input type="text" class="form-control" placeholder="cantidad" v-model="this.form.cantidadm3" />
					</div>
					<div class="mb-3">
						<label class="form-label">Fecha de Lectura</label>
						<input type="date" class="form-control" placeholder="Fecha" v-model="this.form.fecha_lectura"/>
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
					<h4>Datos registrados de Consumo</h4>
					<div class="row">
						<div class="col-md-8">
							<input type="search" v-model="buscar" placeholder="Buscar ..." class="block form-control"/>
						</div>
						<div class="col-md-4">
							<button class="btn btn-md btn-primary block" @click="buscarConsumo()">Buscar</button>
						</div>
					</div>
					<div class="col-md-12">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Personal</th>
									<th>Cantidad (m3)</th>
									<th>Fecha Lectura</th>
									<th>Total Pagar</th>
									<th>Opciones</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item of result" :key="item.id">
									<td>{{item.id}}</td>
									<td>{{item.personal.nombre_completo}}</td>
									<td>{{item.cantidadm3}}</td>
									<td>{{item.fecha_lectura}}</td>
									<td>{{item.total_pagar}}</td>
									<td><button class="btn btn-sm btn-danger" style="margin-right:0.5em;" @click="this.deleteConsumo(item.id)">Eliminar</button>
										<button class="btn btn-sm btn-warning" @click="this.editConsumo(item.id)">Editar</button>
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
    name: "RegistroComponent",
    data: () => ({
		btnName: "Guardar",
		buscar: null,
		resultAux: [],
		result: [],
        personalData: [],
		url: "http://localhost:3000",
		form: {
			id: null,
			personal: null,
			cantidadm3: null,
			fecha_lectura: null,
			total_pagar: null
		}
	}),
    created () {
		this.getConsumo();
	},
    async mounted () {
        this.getPersonal();
    },
    methods: {
        async getPersonal(){
			try{
				let response = await axios.get(`${this.url}/personal`);
				this.personalData = response.data;
			} catch (error) { console.log(error); }
		},
		async getConsumo(){
			try{
				let response = await axios.get(`${this.url}/consumo`);
				this.result = response.data;
				this.resultAux = response.data;
			} catch (error) { console.log(error); }
		},
		async postputConsumo(){
			try{
				if (this.validateData()){
					let data = {
							personal: this.form.personal,
							cantidadm3: this.form.cantidadm3,
							fecha_lectura: this.form.fecha_lectura,
                            total_pagar: this.form.cantidadm3 * 10
						}
                        console.log(data);
					if(this.form.id == null || this.form.id == undefined){
						await axios.post(`${this.url}/consumo`, data);
					} else {
						await axios.put(`${this.url}/consumo/${this.form.id}`, data);
					}
					this.resetForm();
					this.getConsumo();
				}
			} catch (error) { console.log(error); }
		},
		async editConsumo(pk){
			try{
				this.form.id = pk;
				this.btnName = "Actualizar";
				let response = await axios.get(`${this.url}/consumo/${pk}`);
				this.form.id = response.data.id;	
				this.form.personal = response.data.personal;	
				this.form.cantidadm3 = response.data.cantidadm3;	
				this.form.fecha_lectura = response.data.fecha_lectura;	
				this.form.total_pagar = response.data.total_pagar;	
			} catch (error) { console.log(error); }
		},
		async deleteConsumo(pk){
			try{
				if (pk > 0){
					await axios.delete(`${this.url}/consumo/${pk}`);
					this.getConsumo();
				}
			} catch (error) { console.log(error); }
		},
		buscarConsumo () {
			if (this.buscar?.length > 0) {
				let dataBuscar = (this.buscar).toLowerCase();
				this.result = (this.resultAux).filter((item) => (item.personal.nombre_completo).toLowerCase().indexOf(dataBuscar) >=0 || (item.cantidadm3.toString()).toLowerCase().indexOf(dataBuscar) >=0 || (item.fecha_lectura).toString().toLowerCase().indexOf(dataBuscar) >= 0);
			} else {
				this.getConsumo();
			}
		},
		resetForm(){
			this.form.id = null;
			this.form.personal = null;
			this.form.fecha_lectura = null;
			this.form.cantidadm3 = null;
			this.form.total_pagar = null;
			this.btnName = "Guardar";
		},
		validateData(){
            console.log(this.form.fecha_lectura.length);
            console.log(this.form.cantidadm3.length);
			if (this.form.fecha_lectura.length>0 && (this.form.cantidadm3).toString().length>0 )
				return true;
			else
				return false;
		}
	}
}
</script>