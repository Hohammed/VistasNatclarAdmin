//-------CONFIGURACIONES-------
function formatoFecha(formato, fecha) {
    return $.datepicker.formatDate(formato, fecha);
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48 && key <= 57) || (key == 8))
}

function soloLetras(e) {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 65 && key <= 95) || (key >= 97 && key <= 122) || (key == 8) || (key == 32))
}

function recursos(idRecurso, idRecursoPadre, claseIdentificador) {
    /*
    1	PaginaWeb
    2	label
    3	text
    4	combo
    5	button
    6	date
    7	checkbox
    8	textArea
    9	tabla
    10	menu
    11	submenu
    */
    /*
    insert into siUsuario.RECURSO(iIdRecurso, iIdTipoRecurso, iIdRecursoPadre, vcDescripcion, vcObjeto, iIdEstado, dtCreacion, vcUsuarioCreacionApp, vcUsuarioCreacionDB, vcUsuarioCreacionSP, vcUsuarioCreacionOT)
values(147, 3, 135, 'Unidad', 'vcIdUnidad', 1, GETDATE(), 'sistemas', 'sistemas', 'sistemas', 'sistemas')
    */
    claseIdentificador = claseIdentificador == undefined ? "body label, body input, body select, body table, body button, body ul, body li" : "." + claseIdentificador;
    //console.log(claseIdentificador);
    var registros = "";
    $(claseIdentificador).each(function () {
        var tipoRecusro = 0;
        var registro = "insert into siUsuario.RECURSO(iIdRecurso, iIdTipoRecurso, iIdRecursoPadre, vcDescripcion, vcObjeto, iIdEstado, dtCreacion, vcUsuarioCreacionApp, vcUsuarioCreacionDB, vcUsuarioCreacionSP, vcUsuarioCreacionOT) ";
        if ($(this).prop("id") != "") {
            switch (this.tagName.toUpperCase()) {
                case "INPUT":
                    var tipo = $(this).prop("type").toUpperCase();
                    tipo = $(this).hasClass("datepicker") ? "DATEPICKER" : tipo;
                    switch (tipo) {
                        case "TEXT":
                            tipoRecusro = 3;
                            break;
                        case "BUTTON":
                            tipoRecusro = 5;
                            break;
                        case "SUBMIT":
                            tipoRecusro = 5;
                            break;
                        case "RESET":
                            tipoRecusro = 5;
                            break;
                        case "DATE":
                            tipoRecusro = 6;
                            break;
                        case "DATEPICKER":
                            tipoRecusro = 6;
                            break;
                        case "CHECKBOX":
                            tipoRecusro = 7;
                            break;
                        default:
                    }
                    break;
                case "LABEL":
                    tipoRecusro = 2;
                    break;
                case "SELECT":
                    tipoRecusro = 4;
                    break;
                case "BUTTON":
                    tipoRecusro = 5;
                    break;
                case "TEXTAREA":
                    tipoRecusro = 8;
                case "TABLE":
                    tipoRecusro = 9;
                    break;
                case "UL":
                    tipoRecusro = 10;
                    break;
                case "LI":
                    tipoRecusro = 11;
                    break;
                default:
            }
            registro += "values(" + idRecurso++ + ", " + tipoRecusro + ", " + idRecursoPadre + ", 'AQUIDESCRIPCION', '" + $(this).prop("id") + "', 1, GETDATE(), 'sistemas', 'sistemas', 'sistemas', 'sistemas')\n";
            registros += registro;
        }
    });
    console.log(registros);
}

//recursos(136, 135, "recurso");



//-------DATOS-------
//Tipo de Moneda
function moneda() {
    $("#cboTipoMoneda option").remove();
    $("#cboTipoMoneda").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: { },
        url: 'http://localhost:48459/Moneda/Get',
        async: false,
        contentType: "application/json",
        success: function (data) {
        $.each(data, function (index, item) {
            $("#cboTipoMoneda").append("<option value='" + item.vcIdMoneda + "'>" + item.vcDenominacion + "</option>");
        });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Unidades por RUC de Titular
function unidad(RucEmpresa) {
    $("#cboUnidad option").remove();
    $("#cboUnidad").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: { vcRucEmpresa: RucEmpresa },
        url: 'http://localhost:1949/Unidad/GetByTitular?vcRucEmpresaTitular=',
        async: false,
        contentType: "application/json",
        success: function (data) {
        $.each(data, function (index, item) {
            $("#cboUnidad").append("<option value='" + item.vcIdUnidad + "'>" + item.nvDescripcion + "</option>");
        });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Estado de Factura
function estadoFactura() {
    $("#cboEstadoFactura option").remove();
    $("#cboEstadoFactura").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: {},
        url: 'http://localhost:20002/EstadoFactura/GET',
        async: false,
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (index, item) {
                $("#cboEstadoFactura").append("<option value='" + item.iIdEstado + "'>" + item.nvDescripcion + "</option>");
            });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Sedes
function listarSedes() {
    $("#cboSede option").remove();
    $("#cboSede").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: {},
        url: 'http://localhost:55200/Sede/Get?IdSede=',
        async: false,
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (index, item) {
                $("#cboSede").append("<option value='" + item.vcIdSede + "'>" + item.vcDescripcion + "</option>");
            });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Descuento
function listarDescuentos() {
    $("#cboTipoDescuento option").remove();
    $("#cboTipoDescuento").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: {},
        url: 'http://localhost:22796/TipoDescuento/GET',
        async: false,
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (index, item) {
                $("#cboTipoDescuento").append("<option value='" + item.vcIdDescuento + "'>" + item.vcDenominacion + "</option>");
            });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Descuento
function listarCentrosCosto() {
    $("#cboCentroCosto option").remove();
    $("#cboCentroCosto").append("<option value=''>----SELECCIONAR----</option>");
    $.ajax({
        type: "GET",
        datatype: "json",
        data: {},
        url: 'http://localhost:23108/CentroCosto/GET',
        async: false,
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (index, item) {
                $("#cboCentroCosto").append("<option value='" + item.vcEmpresaCentroCosto + "'>" + item.vcDescripcion + "</option>");
            });
        },
        error: function () { console.log("ERROR..."); }
    });
}

//Cliente
function cliente(RucCliente, RazonSocial) {
    RucCliente = RucCliente == undefined ? "" : RucCliente;
    RazonSocial = RazonSocial == undefined ? "" : RazonSocial;
    $.ajax({
        type: "GET",
        datatype: "json",
        data: { vcRucCliente: RucCliente, nvRazonSocial: RazonSocial },
        url: 'http://localhost:2506/Cliente/Get',
        async: false,
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (index, item) {
                console.log("RucCliente: " + item.vcRucCliente);
                //console.log("RazonSocial: " + item.nvRazonSocial);
                //console.log("Direccion: " + item.nvDireccion);
                //console.log("CondicionPago: " + item.vcCondicionPago);
                $("#txtvcRucCliente").val(item.vcRucCliente);
                $("#Pagador").val(item.nvRazonSocial);
                $("#Direccion").val(item.nvDireccion);
                $("#cboCondicionPago").val(item.vcCondicionPago);
            });
        },
        error: function () { console.log("ERROR..."); }
    });
}



