<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col-md-6">
				<h4>Formulario del Personal</h4>

				<form action="" class="form-control">
					<div class="mb-3">
						<label class="form-label">Nombre Completo del personal</label>
						<input type="text" class="form-control" placeholder="Nombre" />
					</div>
					<div class="mb-3">
						<label class="form-label">Direccion Actual del personal</label>
						<input type="text" class="form-control" placeholder="Direccion" />
					</div>
					<div class="mb-3">
						<label class="form-label">Numero de Celular del personal</label>
						<input type="text" class="form-control" placeholder="Celular" />
					</div>
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-md btn-success" style="margin-right:0.5em;">Guardar</button>
							<button type="reset" class="btn btn-md btn-primary">Cancelar</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-md-6">
				<div class="row">
					<h4>Datos registrados</h4>
					<div class="col-md-12">
						<table class="table table-striped table-hover">
							<tr>
								<th>#</th>
								<th>Nombre Completo</th>
								<th>Direccion</th>
								<th>Celular</th>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PersonalComponent",
};
</script>