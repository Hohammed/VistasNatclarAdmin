function GuardarMovimiento() {
    jsonObj = [];
    item = {}
    item["nvTrabajador"] = $("#nvTrabajador").val();
    item["nvTrabajadorR35"] = parseInt($("#nvTrabajadorR35").val());
    item["fecha3"] = $("#fecha3").val();
    item["cboUnidadOrganizativa"] = $("#cboUnidadOrganizativa").val();
    item["cboEmpresa"] = $("#cboEmpresa").val();
    item["cboSede"] = $("#cboSede").val();
    //item["CMAN_SUENO"] = $("#CMAN_SUENO").val();
    //item["CMAN_ORINA"] = $("#CMAN_ORINA").val();
    //item["CMAN_DEPOSICION"] = $("#CMAN_DEPOSICION").val();
    //item["CMAN_ESTADO_ANIMICO"] = $("#CMAN_ESTADO_ANIMICO").val();
    //item["CMAN_ANTECEDENTES"] = $("#CMAN_ANTECEDENTES").val();
    //item["CMAN_EXA_FISICO"] = $("#CMAN_EXA_FISICO").val();

    //item["CMAN_COMD_ID"] = $("#COMD_ID").val();
    //item["CMAN_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

    //$("#Anamesis_JSON").val(JSON.stringify(item));

    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(JSON.stringify(jsonObj))
}

//function AgregarBono() {
//    jsonObj = [];
//    item = {}
//    item["nvEmpresa"] = $("#cboEmpresaBono35 option:selected").text();
//    item["nvPuesto"] = $("#cboPuestoBono35 option:selected").text();
//    item["nvBono"] = $("#cboBono35 option:selected").text();
//    item["iCantidad"] = $("#Cantidad").val();
//    item["iIdempresa"] = $("#cboEmpresaBono35").val();
//    item["iIdPuesto"] = ($("#cboPuestoBono35").val());
//    item["iIdBono"] = $("#cboBono35").val();

//    //nvEmpresa = $("#cboEmpresaBono35 option:selected").text();
//    //nvPuesto = $("#cboPuestoBono35 option:selected").text();
//    //nvBono = $("#cboBono35 option:selected").text();
//    //iCantidad = $("#Cantidad").val();
//    //iIdempresa = $("#cboEmpresaBono35").val();
//    //iIdPuesto = ($("#cboPuestoBono35").val());
//    //iIdBono = $("#cboBono35").val();

//    //console.log(item);
//    jsonObj.push(item);
//    console.log(jsonObj);
//    var Djsonobj = JSON.stringify(jsonObj);
//    sessionStorage.setItem("Djsonobj", Djsonobj)
//    var nn = sessionStorage.getItem("Djsonobj");
//    console.log(nn);
//    console.log(Djsonobj);
//    var mm = JSON.parse(Djsonobj);
//    console.log(mm)
//    //DjsonITEM = JSON.stringify(item);
//    //console.log(DjsonITEM);
//  }

function AgregarBono() {
    var bono = $("#Bono option:selected").html();
    var cantidad = $("#Cantidad").val();

    if ($("#cboEmpresaBono35").val() == null) {
        swal("Escoja Empresa")
        $("#cboEmpresaBono35").focus();
        return;
    }
    if ($("#cboPuestoBono35").val() == null) {
        swal("Escoja Puesto")
        $("#cboPuestoBono35").focus();
        return;
    }
    if ($("#cboBono35").val() == null) {
        swal("Escoja Bono")
        $("#cboBono35").focus();
        return;
    }
    if ($("#Cantidad").val() == "") {
        swal("Ingrese monto del bono")
        $("#Cantidad").focus();
        return;
    }

    if ($("#Item_Bono").val() == "") {
        $("#tabla_oculta_bono tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaCabeceraBono tbody");
        $("#CantidadItemsBono").text(parseInt($("#CantidadItemsBono").text()) + 1);
        fila = parseInt($("#CantidadItemsBono").text());
    }
    else {
        fila = parseInt($("#Item_Bono").val());
    }
    ActualizarCampoDetalle(fila, 1, $("#CantidadItemsBono").text());
    ActualizarCampoDetalle(fila, 2, $("#cboEmpresaBono35").val());
    ActualizarCampoDetalle(fila, 3, $("#cboEmpresaBono35 option:selected").html());
    ActualizarCampoDetalle(fila, 4, $("#cboPuestoBono35").val());
    ActualizarCampoDetalle(fila, 5, $("#cboPuestoBono35 option:selected").html());
    ActualizarCampoDetalle(fila, 6, $("#cboBono35").val());
    ActualizarCampoDetalle(fila, 7, $("#cboBono35 option:selected").html());
    ActualizarCampoDetalle(fila, 8, $("#Cantidad").val());
    $('#frmRegistrarBono').modal('toggle');
    LimpiarDetalleBono();
}

function ActualizarCampoDetalle(fila, columna, valor) {
    $("#TablaCabeceraBono tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleBono() {
    $("#cboEmpresaBono35").val("");
    $("#cboPuestoBono35").val("");
    $("#cboBono35").val("");
    $("#Cantidad").val("");
    $("#Item_Bono").val("");
}

function ActualizarNumeroItem() {
    var i = 1;
    $("#TablaCabeceraBono tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}
