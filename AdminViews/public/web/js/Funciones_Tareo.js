/////////////////////---------FUNCIONES PÁGINA BUSCAR TAREO-----------///////////////////
$("#nvTrabajador1").autocomplete({
        source: function (request, response) {
            filtro = $("#nvTrabajador1").val();
            var data = { filtro: filtro };
            $.ajax({
                type: "GET",
                datatype: "json",
                data: { filtro: filtro },
                url: 'http://admin_erp.natclar.com.pe:12000/rWSTrabajador/TrabajadorByFiltro/Get',
                async: true,
                //data: JSON.stringify({usuario: dataobj}),
                //data: JSON.stringify(dataobj),
                //data: jQuery.parseJSON({user:us, pass:passw}),
                //datos: { filtro: filtro },
                contentType: "application/json",
                success: function (data) {
                    //console.log(data)
                    response($.map(data, function (item) {
                        return { value: item.persona.vcApellidoPaterno + " " + item.persona.vcApellidoMaterno + " " + item.persona.vcNombres, text1: item.persona.vcNumeroDocumento };
                    }))
                },
                error: function () { console.log("ERROR..."); }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            $("#nvTrabajador1").val(ui.item.text);
            $("#idTrabajador1").val(ui.item.text1);
            $("#nvTrabajador1").prop('readonly', true);
            $("#nvTrabajador1").css("background-color", "lightgoldenrodyellow");
        },
        error: function (ex) {
            alert('Error al traer datos.' + ex);
        }
    })

    function procesos(fini, ffin, resp, per, mes, anio, unor, emp, sed) {
        var obj;
        $.ajax({
            type: "GET",
            url: "http://localhost:20205/Proceso/GET",
            data: { dtFechaIni: fini, dtFechaFin: ffin, vcIdTipoExamen: texa, vcRucCliente: rcli, vcNumeroDocumento: ndoc, vcnombre: nomb, vcRucEmpresaTitular: rtit, vcIdUnidad: idun, vcRucEmpresaContrata: rcon },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                obj = response;
            },
            error: function (result) {
                alert('ERROR: ' + result.status + ' ' + result.responseText);
            }
        });
        return obj;
    }

    function listarProcesos(obj) {
        $("#tblAtenciones").DataTable({
            destroy: true,
            processing: true,
            data: obj,
            columns: [
                { 'data': 'vcIdSede', 'autoWidth': true, visible: false },
                {
                    'data': 'vcIdProceso', render: function (data, type, row) {
                        return '<input type="checkbox" id="' + data + '" class="" /><label for="' + data + '" class=""> ' + data + '</label>';
                    }, 'autoWidth': true
                },
                { 'data': 'vcNumeroDocumento', 'autoWidth': true },
                { 'data': 'vcNombres', 'autoWidth': true },
                {
                    'data': 'dtFecha', render: function (data, type, row) {
                        return formatoFecha("yy-mm-dd", new Date(data));
                    }, 'autoWidth': true
                },
                { 'data': 'vcRucCliente', 'autoWidth': true },
                { 'data': 'nvRazonSocialCliente', 'autoWidth': true },
                {
                    'data': 'nuImporteTotalNeto', render: function (data, type, row) {
                        return Number(data, 2).toFixed(2);
                    }, 'autoWidth': true
                }
            ],
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    }
    
/////////////////////---------FUNCIONES GENERAR TAREO-----------///////////////////

    function GenerarTareo() {
    jsonObj = [];
   
    item = {}
    item["idResponsable"] = $("#idResponsable1").val();
    item["cboPeriodo"] = $("#cboPeriodo1").val();
    item["cboMes"] = $("#cboMes1").val();
    item["cboAnio"] = $("#cboAnio1").val();
    item["iIdUnidadOrganizativa"] = $("#cboUnidadOrganizativa1").val();
    item["vcRucEmpresa"] = $("#cboEmpresa1").val();
    item["vcIdSede"] = $("#cboSede1").val();
    item["dFechaIni"] = $("#dFechaIni1").val();
    item["dFechaFin"] = $("#dFechaFin1").val();
    //item["iIdEstadoAprobacion"] = $("#iIdEstadoAprobacion").val();
    //item["vcUsuarioCreacionApp"] = $("#idResponsable1").val();
        //item["vcUsuarioCreacionOT"] = $("#idResponsable1").val();

    jsonObj.push(item);
    Djsonobj = JSON.stringify(jsonObj);
    console.log(Djsonobj)
    var xhr = new XMLHttpRequest();
    var dataobj = Djsonobj;
    
    //xhr.open('POST', 'http://admin_erp.natclar.com.pe:12000/rWSRequerimientoRRHH/rWSRequerimiento/Post');
    //xhr.open('POST', 'http://localhost:4376/rWSRequerimiento/Post');
    //xhr.responseType = "json";
    //xhr.setRequestHeader("Content-Type", "application/json");

    //xhr.onload = function () {
    //    var status = xhr.status;
    //    if (status == 200) {
    //        swal("Se generó el Tareo Correctamente...!")
    //        //setTimeout(" window.location = '../../../Views/RRHH/RegistrarRequerimientoRRHH'", 2000)
    //        //console.log(xhr.response);
    //    } else {
    //        swal("Error al grabar..!")
    //        //console.log(status);
    //    }
    //};
    //xhr.send(JSON.stringify(jsonObj));
}