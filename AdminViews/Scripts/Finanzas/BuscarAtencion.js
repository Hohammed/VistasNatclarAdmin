
$(document).on("ready", function () {
    //Variables
    var host = '';
    var puerto = '';

    //Metodos
    function configuracion() {
        $("#tblAtenciones").DataTable();
        $("#tblAtenciones tbody tr").remove();
        $("#txtImporteSeleccionado").attr("readonly", "readonly");
    }

    function tipoExamen(url, cbo, funcion) {
        $("#cboTipoExamen option").remove();
        $("#cboTipoExamen").append("<option value=''>----SELECCIONAR----</option>");
        $.getJSON("http://localhost:5320/TipoExamen/GET?vcIdTipoExamen=", function (data) {
            $.each(data, function (index, item) {
                $("#cboTipoExamen").append("<option value='" + item.vcIdTipoExamen + "'>" + item.vcDescripcion + "</option>");
            });
        });
    }

    function titular() {
        $("#cboTitular").append("<option value=''>----SELECCIONAR----</option>");
        $.getJSON("http://localhost:20497/Titular/Get?vcRucEmpresa=", function (data) {
            $.each(data, function (index, item) {
                $("#cboTitular").append("<option value='" + item.vcRucEmpresa + "'>" + item.nvRazonSocial + "</option>");
            });
        });
    }

    function contrata(vcIdUnidad) {
        $("#cboContrata option").remove();
        $("#cboContrata").append("<option value=''>----SELECCIONAR----</option>");
        $.getJSON("http://localhost:3726/Contrata/Get?vcIdUnidad=" + vcIdUnidad, function (data) {
            $.each(data, function (index, item) {
                $("#cboContrata").append("<option value='" + item.vcRucEmpresa + "'>" + item.nvRazonSocial + "</option>");
            });
        });
    }

    function procesos(fini, ffin, texa, rcli, ndoc, nomb, rtit, idun, rcon) {
        $.ajax({
            type: "GET",
            url: "http://localhost:20205/Proceso/GET",
            data: { dtFechaIni: fini, dtFechaFin: ffin, vcIdTipoExamen: texa, vcRucCliente: rcli, vcNumeroDocumento: ndoc, vcnombre: nomb, vcRucEmpresaTitular: rtit, vcIdUnidad: idun, vcRucEmpresaContrata: rcon },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (response) {
                listarProcesos(response);
            },
            error: function (result) {
                alert('ERROR: ' + result.status + ' ' + result.responseText);
            }
        });
    }


    function listarProcesos(obj) {
        $("#tblAtenciones tbody tr").remove();
        $("#tblAtenciones").DataTable({
            destroy: true,
            processing: true,
            data: obj,
            columns: [
                { 'data': 'vcIdSede', 'autoWidth': true, visible: false},
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
                { 'data': 'vcIdTipoExamen', 'autoWidth': true, visible: false },
                { 'data': 'vcDescripcionExamen', 'autoWidth': true },
                { 'data': 'vcRucCliente', 'autoWidth': true },
                { 'data': 'nvRazonSocialCliente', 'autoWidth': true },
                { 'data': 'vcRucTitular', 'autoWidth': true, visible: false },
                { 'data': 'nvRazonSocialTitular', 'autoWidth': true },
                { 'data': 'vcIdUnidad', 'autoWidth': true, visible: false },
                { 'data': 'nvDescripcionUnidad', 'autoWidth': true },
                { 'data': 'vcRucContrata', 'autoWidth': true, visible: false },
                { 'data': 'nvRazonSocialContrata', 'autoWidth': true },
                { 'data': 'iIdProtocolo', 'autoWidth': true, visible: false },
                { 'data': 'vcDescripcionProtocolo', 'autoWidth': true },
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

    function facturar() {
        if ($("#tblAtenciones tbody tr").length > 0) {
            if ($("#tblAtenciones tbody tr").has("input:checked").length > 0) {
                var ok = true;
                var rucCliente = "";
                var registros = [];
                var table = $("#tblAtenciones").DataTable();
                $("#tblAtenciones tbody tr").has("input:checked").each(function (index) {
                    var data = table.row(this).data();
                    if (rucCliente == "") {
                        rucCliente = data.vcRucCliente;
                    }
                    if (rucCliente != data.vcRucCliente && ok) {
                        ok = false;
                        return;
                    }
                    registros.push(data);
                });
                if (ok) {
                    localStorage.setItem("registros", JSON.stringify(registros));
                    window.location.href = ("RegistrarDocumentoVenta");
                } else {
                    swal("Tiene que seleccionar Atenciones de un mismo cliente.");
                }
            } else {
                swal("Debe seleccionar uno o mas registros.");
            }
        } else {
            swal("Debe realizar una busqueda.");
        }
    }

    function fnValorizar()
    {
        if ($("#tlbAtenciones tbody tr").length > 0) {
            if ($("tlbAtenciones tbody tr").has("input:checked").length >0)
            {
                var Validacion = true;
                var RucPagador = "";
                var Registros = [];
                var Atenciones=$("#tlbAtenciones").DataTable();

                $("tlbAtenciones tbody tr").has("input:checked").each(function (index) {
                    var Data = Atenciones.row(this).data();
                    if (RucPagador == "") {
                        RucPagador = Data.vcRucCliente;
                    }
                    if (RucPagador != Data.vcRucCliente && Validacion)
                    {
                        Validacion = true;
                        return;
                    }
                    Registros.push(data);

                });

                if (Validacion) {
                    localStorage.setItem("fbaAtenciones", JSON.stringify(Registros))
                    window.location.href = ("RegistrarValorizacion");
                }
                else {
                    swal("Tiene que seleccionar Atenciones de un mismo cliente.");

                }
            } else
            {
                swal("Seleccione uno o mas regsitros");

            }
        }
        else{       

        swal("Debe realizar una busqueda.");
            }
        
        
    }

    function calcularImporte() {
        var importe = 0;
        var table = $("#tblAtenciones").DataTable();
        $("#tblAtenciones tbody tr").has("input:checked").each(function (index) {
            var data = table.row(this).data();
            importe += data.nuImporteTotalNeto;
        });
        $("#txtImporteSeleccionado").val(Number(importe).toFixed(2));
    }

    //LLamadas
    configuracion();
    tipoExamen();
    titular();
    cliente();

    //Eventos3
    $("#cboTitular").on("change", function () {
        unidad($(this).val());
    });

    $("#cboUnidad").on("change", function () {
        contrata($(this).val());
    });

    $("#btnBuscarAtencion").on("click", function () {
        var fini = formatoFecha("yy-mm-dd", $("#dFechaIni").datepicker("getDate"));
        var ffin = formatoFecha("yy-mm-dd", $("#dFechaFin").datepicker("getDate"));
        var texa = $("#cboTipoExamen").val();
        var rcli = $("#vcRucPagador").val();
        var ndoc = $("#vcNumeroDocumento").val();
        var nomb = $("#vcNombres").val();
        var rtit = $("#cboTitular").val();
        var idun = $("#cboUnidad").val();
        var rcon = $("#cboContrata").val();
        procesos(fini, ffin, texa, rcli, ndoc, nomb, rtit, idun, rcon);
    });

    $("#vcNumeroDocumento").on("keypress", function (e) {
        return soloNumeros(e);
    });

    $("#vcNombres").on("keypress", function (e) {
        return soloLetras(e);
    });

    $("#nvPagador").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
                datatype: "json",
                data: { vcRucCliente: "", nvRazonSocial: $("#nvPagador").val() },
                url: 'http://localhost:2506/Cliente/Get',
                async: false,
                contentType: "application/json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return { value: item.nvRazonSocial, text: item.vcRucEmpresa };
                    }));
                },
                error: function () { console.log("ERROR..."); }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $("#nvPagador").val(ui.item.value);
            $("#vcRucPagador").val(ui.item.text);
        },
        error: function (ex) {
            alert('Error al traer datos: ' + ex);
        }
    });

    $("#tblAtenciones tbody").on("click", "tr input", function () {
        calcularImporte();
    });

    $("#btnValorizar").on("click", function () {
        valorizar();
    });

    $("#btnFacturar").on("click", function () {
        facturar();
    });

    $("#btnExportar").on("click", function () {
    });
});
