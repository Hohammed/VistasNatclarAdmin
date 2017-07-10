
$(document).on("ready", function () {
    //Variables
    var registros = JSON.parse(localStorage.getItem("registros"));
    var registro = registros[0];

    //Funciones
    function configuracion() {
        $("#cboTipoDocumento").append("<option >----SELECCIONAR----</option>");
        $("#cboTipoDocumento").append("<option value='FEL'>FACTURA ELECTRONICA</option>");
        $("#cboTipoDocumento").append("<option value='BEL'>BOLETA ELECTRONICA</option>");

        $("#cboSede").attr("disabled", true);
        $("#cboUnidad").attr("disabled", true);
        $("#cboEstadoFactura").attr("disabled", true);
        $("#cboTipoMoneda").attr("disabled", true);
        $("#cboCondicionPago").attr("disabled", true);
        $("#txtdtFechaEmision").attr("readonly", "readonly");
        $("#txtvcRucCliente").attr("readonly", "readonly");
        $("#PagadorRuc").attr("readonly", "readonly");
        $("#Pagador").attr("readonly", "readonly");
        $("#Direccion").attr("readonly", "readonly");
        $("#txtResponsable").attr("readonly", "readonly");
        $("#txtdtFechaVencimiento").val("");

    }

    function cargarDatos() {
        $("#cboSede").val(registro.vcIdSede);
        $("#cboUnidad").val(registro.vcIdUnidad);
        $("#cboTipoMoneda").val("PEN");
        $("#cboEstadoFactura").val("29");
    }

    function listarTiposSubTotal(vcIdTipoSubTotal) {
        vcIdTipoSubTotal = vcIdTipoSubTotal == undefined ? "" : vcIdTipoSubTotal;
        $("#cboTiposSubTotal option").remove();
        $("#cboTiposSubTotal").append("<option value=''>----SELECCIONAR----</option>");
        $.ajax({
            type: "GET",
            datatype: "json",
            data: { vcIdTipoSubTotal: vcIdTipoSubTotal },
            url: 'http://localhost:34079/TipoSubTotal/GET',
            async: false,
            contentType: "application/json",
            success: function (data) {
                $.each(data, function (index, item) {
                    $("#cboTiposSubTotal").append("<option value='" + item.vcIdTipoSubTotal + "'>" + item.vcDenominacion + "</option>");
                });
            },
            error: function () { console.log("ERROR..."); }
        });
    }

    function formaGlobal() {
        $("#tblDetalleDocumentoVenta tbody tr").remove();
        var importe = 0;
        registros.forEach(function (item) {
            importe += item.nuImporteTotalNeto;
        });
        $("#tblDetalleDocumentoVenta tbody").append("<tr><td>Acciones</td>" +
                                                        "<td></td><td>CODIGO</td><td>EXAMEN OCUPACIONAL</td><td>" + registros.length + "</td>" +
                                                        "<td>" + Number(importe).toFixed(2) + "</td><td>0.00</td><td>0.00</td><td>" + Number(importe).toFixed(2) + "</td></tr>");
    }

    function formaTipoExamen() {
        $("#tblDetalleDocumentoVenta tbody tr").remove();
        registros.forEach(function (item) {
            $("#tblDetalleDocumentoVenta tbody").append("<tr><td>Acciones</td>" +
                                                        "<td></td><td>" + item.vcIdTipoExamen + "</td><td>" + item.vcDescripcionExamen + "</td><td>1</td>" +
                                                        "<td>" + Number(item.nuImporteTotalNeto).toFixed(2) + "</td><td>0.00</td><td>0.00</td><td>" + Number(item.nuImporteTotalNeto).toFixed(2) + "</td></tr>");
        });
    }

    function calculos() {
        var nuItem = 1;
        var importe = 0;
        var igv = 0;
        var total = 0;
        $("#tblDetalleDocumentoVenta tbody tr").each(function (index) {
            $(this).find("td:eq(1)").html(nuItem++);
            importe += Number($(this).find("td:eq(8)").html());
        });
        igv = importe * 0.18;
        total = importe + igv;
        $("#nuSubTotal").val(Number(importe).toFixed(2));
        $("#nuImpuestoValor").val(Number(igv).toFixed(2));
        $("#nuTotal").val(Number(total).toFixed(2));
        $("#CantidadItems").html($("#tblDetalleDocumentoVenta tbody tr").length);
    }
    function datosCorrectos() {
        return $("#cboTipoDocumento").val() != '' && $("#txtiSerie").val() != '' && $("#txtiNUmero").val() != '' && $("#cboCentroCosto").val() != '' && $("#txtnvOrden").val() != '' && $("#txtdtFechaVencimiento").val() != '' && $("#cboTipoDescuento").val() != '' && $("#cboTiposSubTotal").val() != '';
    }

    function grabarDocumentoVenta(documentoVenta) {
        //console.log(JSON.stringify(documentoVenta));
        $.ajax({
            type: "POST",
            datatype: "json",
            data: JSON.stringify(documentoVenta),
            url: 'http://localhost:29711/DocumentoVenta/POST',
            async: false,
            contentType: "application/json",
            success: function (data) {
                swal("El documento de Venta se grabo correctamente.");
            },
            error: function () { console.log("ERROR..."); }
        });
    }

    //Llamadas
    configuracion();
    moneda();
    unidad(registro.vcRucCliente);
    estadoFactura();
    listarSedes();
    listarDescuentos();
    listarCentrosCosto();
    cliente(registro.vcRucCliente);
    listarTiposSubTotal();
    cargarDatos();
    
    //Eventos
    $("#iSerie, #iNumero").on("keypress", function (e) {
        return soloNumeros(e);
    });

    $("#cboTiposSubTotal").on("change", function () {
        switch ($(this).val()) {
            case "GLOBA":
                formaGlobal();
                break;
            case "PREST":
                break;
            case "PROTC":
                break;
            case "TIPEX":
                formaTipoExamen();
                break;
            case "":
                $("#tblDetalleDocumentoVenta tbody tr").remove();
                break;
        }
        calculos();
    });

    $("#btnGuardarDocumentoventa").on("click", function () {
        if (datosCorrectos()) {
            var documentoVenta = {};
            documentoVenta.iIdDocumentoVenta = 1;
            documentoVenta.vcIdSedeDocumentoVenta = $("#cboSede").val();
            documentoVenta.iSerie = $("#txtiSerie").val();
            documentoVenta.iNumero = $("#txtiNUmero").val();
            documentoVenta.vcTipoDocumentoVenta = $("#cboTipoDocumento").val();
            documentoVenta.dtFechaEmision = formatoFecha("yy-mm-dd", $("#txtdtFechaEmision").datepicker("getDate"));
            documentoVenta.vcRucCliente = $("#txtvcRucCliente").val();
            documentoVenta.vcIdMoneda = $("#cboTipoMoneda").val();
            documentoVenta.vcIdTipoSubTotal = $("#cboTiposSubTotal").val();
            documentoVenta.nuSubTotal = 0;
            documentoVenta.vcIdImpuesto = "IGV";
            documentoVenta.nuImpuestoValor = 0;
            documentoVenta.nuTotal = 0;
            documentoVenta.nvTotalLetras = "";
            documentoVenta.nuTotalPago = 0;
            documentoVenta.vcIdDescuento = $("#cboTipoDescuento").val();
            documentoVenta.nuDescuentoValor = 0;
            documentoVenta.vcIdDetraccion = "099";
            documentoVenta.nuDetraccionValor = 0;
            documentoVenta.cAutodetraccion = "";
            documentoVenta.dtFechaVencimiento = formatoFecha("yy-mm-dd", $("#txtdtFechaVencimiento").datepicker("getDate"));
            documentoVenta.nvOrden = $("#txtnvOrden").val();
            documentoVenta.vcIdCentroCosto = $("#cboCentroCosto").val();
            documentoVenta.nvObservacion = $("#txtnvObservacion").val();
            documentoVenta.iIdEstado = 1;
            documentoVenta.iIdEstadoFacturacion = 1;
            documentoVenta.vcIdUnidad = $("#cboUnidad").val();
            documentoVenta.vcLoginVendedor = $("#txtidResponsable").val();
            documentoVenta.vcGenerarTxt = "";
            documentoVenta.cImprime = "";
            documentoVenta.nuDevolucionValor = 0;
            documentoVenta.iIdEstadoEnvioXml = 1;
            documentoVenta.dtCreacion = formatoFecha("yy-mm-dd", new Date());
            documentoVenta.dtModificacion = formatoFecha("yy-mm-dd", new Date());
            documentoVenta.vcUsuarioCreacionApp = "";
            documentoVenta.vcUsuarioCreacionDB = "";
            documentoVenta.vcUsuarioCreacionSP = "";
            documentoVenta.vcUsuarioCreacionOT = "";
            documentoVenta.vcUsuarioModificacionApp = "";
            documentoVenta.vcUsuarioModificacionDB = "";
            documentoVenta.vcUsuarioModificacionSP = "";
            documentoVenta.vcUsuarioModificacionOT = "";

            var documentoVentaDetalle = [];
            $("#tblDetalleDocumentoVenta tbody tr").each(function () {
                var fila = $(this);
                var detalle = {};
                detalle.iIdDocumentoVenta = 1;
                detalle.vcIdSedeDocumentoVenta = $("#cboSede").val();
                detalle.iItem = fila.find("td:eq(1)").text();
                detalle.vcUnidadMedida = $("#cboUnidad").val();
                detalle.nvDescripcion = fila.find("td:eq(3)").text();
                detalle.iCantidad = fila.find("td:eq(5)").text();
                detalle.nuPrecioUnitario = fila.find("td:eq(5)").text();
                detalle.nuPrecioUnitarioNeto = fila.find("td:eq(7)").text();
                detalle.nuImporte = fila.find("td:eq(8)").text();
                detalle.nvObservacion = $("#txtnvObservacion").val();
                detalle.iIdEstado = $("#cboEstadoFactura").val();
                detalle.dtCreacion = formatoFecha("yy-mm-dd", new Date());
                detalle.dtModificacion = formatoFecha("yy-mm-dd", new Date());
                detalle.vcUsuarioCreacionApp = "";
                detalle.vcUsuarioCreacionDB = "";
                detalle.vcUsuarioCreacionSP = "";
                detalle.vcUsuarioCreacionOT = "";
                detalle.vcUsuarioModificacionApp = "";
                detalle.vcUsuarioModificacionDB = "";
                detalle.vcUsuarioModificacionSP = "";
                detalle.vcUsuarioModificacionOT = "";
                documentoVentaDetalle.push(detalle);
            });

            documentoVenta.documentoVentaDetalle = documentoVentaDetalle;
            grabarDocumentoVenta(documentoVenta);
        } else {
            swal("Faltan Datos.");
        }
    });
});
