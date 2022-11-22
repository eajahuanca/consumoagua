<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h5>Reporte por Mes</h5>
                <div class="row">
                    <div class="col-md-6 block">
                        <select class="form-select form-select-md mb-3" aria-label=".form-select-md example"
                            v-model="mes">
                            <option v-for="item of mesData" :key="item.id" :value="item.id">
                                {{ item.mes }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-md" @click="generarReporte()"
                            style="margin-right: 0.5em;">Generar</button>
                        <button class="btn btn-success btn-md" @click="todo()">Mostrar Todo</button>
                    </div>
                </div>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Consumo M3</th>
                            <th>Total Pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of result" :key="item.id">
                            <td>{{ item.personal.nombre_completo }}</td>
                            <td>{{ item.cantidadm3 }}</td>
                            <td>{{ item.total_pagar }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <h5>Reporte por Nombre de Usuario</h5>
                <code>5 ultimas lecturas</code>
                <hr>
                <div class="row">
                    <div class="col-md-6 block">
                        <input type="text" class="form-control" placeholder="Nombre de usuario" v-model="this.usuario" />
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-md" @click="generarReporteUsuario()"
                            style="margin-right: 0.5em;">Generar</button>
                        <button class="btn btn-success btn-md" @click="cancelar()">Cancelar</button>
                    </div>
                </div>
                <div style="margin-top: 1.0em;" class="card" v-if="this.resultUsuario.length > 0">
                    <div class="card-body">
                        <b>Usuario :</b> {{resultUsuario[0].personal.nombre_completo}}
                        <div class="row">
                            <div class="col-md-6"><b>Direccion : </b>{{resultUsuario[0].personal.direccion}}</div>
                            <div class="col-md-6"><b>Telefono : </b>{{resultUsuario[0].personal.celular}}</div>
                        </div>
                        <table class="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha Lectura</th>
                                    <th>Consumo M3</th>
                                    <th>Total Pagar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item of resultUsuario.slice(0, 5)" :key="item.id">
                                    <td>{{ item.fecha_lectura }}</td>
                                    <td>{{ item.cantidadm3 }}</td>
                                    <td>{{ item.total_pagar }}</td>
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
    name: "ReporteComponent",
    data: () => ({
        mesData: [],
        result: [],
        resultAux: [],
        resultUsuario: [],
        mes: null,
        usuario: null,
        url: "http://localhost:3000",
    }),
    created() {
        this.getConsumo();
    },
    async mounted() {
        this.getMeses();
    },
    methods: {
        todo() {
            this.getConsumo();
        },
        cancelar() {
            this.resultUsuario = [];
        },
        getMeses() {
            this.mesData = [
                { "id": 1, "mes": "Enero" },
                { "id": 2, "mes": "Febrero" },
                { "id": 3, "mes": "Marzo" },
                { "id": 4, "mes": "Abril" },
                { "id": 5, "mes": "Mayo" },
                { "id": 6, "mes": "Junio" },
                { "id": 7, "mes": "Julio" },
                { "id": 8, "mes": "Agosto" },
                { "id": 9, "mes": "Septiembre" },
                { "id": 10, "mes": "Octubre" },
                { "id": 11, "mes": "Noviembre" },
                { "id": 12, "mes": "Diciembre" }
            ]
        },
        async getConsumo() {
            try {
                let response = await axios.get(`${this.url}/consumo`);
                this.result = response.data;
                this.resultAux = response.data;
            } catch (error) { console.log(error); }
        },
        generarReporte() {
            if (!(this.mes == null)) {
                let data = [];
                try {
                    this.resultAux.filter((item) => {
                        let fecha = item.fecha_lectura.split('-');
                        if (parseInt(fecha[1].toString()) == this.mes) {
                            data.push(item);
                        }
                    });
                    this.result = data;
                } catch (error) { console.log(error); }
            }
        },
        async generarReporteUsuario(){
            if (this.usuario.length > 0){
                try {
                    let busca = (this.usuario).toLowerCase();
                    let response = await axios.get(`${this.url}/consumo`);
                    let data = response.data;
                    this.resultUsuario = data.filter((item) => item.personal.nombre_completo.toLowerCase().indexOf(busca) >= 0);
                } catch (error) {
                    console.log(error);
                    this.resultUsuario = [];
                }
            } else {
                this.resultUsuario = [];
            }
        }
    }
}
</script>