
function AgregarProfesionGrado() {
    if ($("#Profesion").val() == null) {
        swal("Ingrese Profesión")
        $("#Profesion").focus();
        return;
    }

    if ($("#Grado").val() == null) {
        swal("Ingrese Grado")
        $("#Grado").focus();
        return;
    }

    if ($("#Item_Profesion_Grado").val() == "") {
        $("#tabla_oculta_Profesion_Grado tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaCabeceraProfesionGrado tbody");
        $("#CantidadItemsProfesiongrado").text(parseInt($("#CantidadItemsProfesiongrado").text()) + 1);
        fila = parseInt($("#CantidadItemsProfesiongrado").text());
    }
    else {
        fila = parseInt($("#Item_Profesion_Grado").val());
    }
    ActualizarCampoDetallePG(fila, 1, $("#CantidadItemsProfesiongrado").text());
    ActualizarCampoDetallePG(fila, 2, $("#Profesion").val());
    ActualizarCampoDetallePG(fila, 3, $("#Profesion option:selected").html());
    ActualizarCampoDetallePG(fila, 4, $("#Grado").val());
    ActualizarCampoDetallePG(fila, 5, $("#Grado option:selected").html());
    $('#frmRegistrarProfesionGrado').modal('toggle');
    LimpiarDetallePG();
}

function ActualizarCampoDetallePG(fila, columna, valor) {
    $("#TablaCabeceraProfesionGrado tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function ActualizarNumeroItemPG() {
    var i = 1;
    $("#TablaCabeceraProfesionGrado tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function LimpiarDetallePG() {
    $("#Profesion").val("");
    $("#Grado").val("");
    $("#Item_Profesion_Grado").val("");
}

function AgregarFormacionObligatoria() {
    if ($("#FormacionObligatoria").val() == null) {
        swal("Ingrese Formacion Obligatoria")
        $("#FormacionObligatoria").focus();
        return;
    }

    if ($("#Item_Formacion_Obligatoria").val() == "") {
        $("#tabla_oculta_Formacion_Obligatoria tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaCabeceraFormacionObligatoria tbody");
        $("#CantidadItemsFormacionObligatoria").text(parseInt($("#CantidadItemsFormacionObligatoria").text()) + 1);
        fila = parseInt($("#CantidadItemsFormacionObligatoria").text());
    }
    else {
        fila = parseInt($("#Item_Formacion_Obligatoria").val());
    }
    ActualizarCampoDetalleFO(fila, 1, $("#CantidadItemsFormacionObligatoria").text());
    ActualizarCampoDetalleFO(fila, 2, $("#FormacionObligatoria").val());
    ActualizarCampoDetalleFO(fila, 3, $("#FormacionObligatoria option:selected").html());

    $('#frmRegistrarFormacionObligatoria').modal('toggle');
    LimpiarDetalleFO();
}

function ActualizarCampoDetalleFO(fila, columna, valor) {
    $("#TablaCabeceraFormacionObligatoria tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function ActualizarNumeroItemFO() {
    var i = 1;
    $("#TablaCabeceraFormacionObligatoria tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function LimpiarDetalleFO() {
    $("#FormacionObligatoria").val("");
    $("#Item_Formacion_Obligatoria").val("");
}

function AgregarFormacionComplementaria() {
    if ($("#Formacioncomplementaria").val() == null) {
        swal("Ingrese Formacion Complementaria")
        $("#Formacioncomplementaria").focus();
        return;
    }

    if ($("#Item_Formacion_Complementaria").val() == "") {
        $("#tabla_oculta_Formacion_Complementaria tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaCabeceraFormacionComplementaria tbody");
        $("#CantidadItemsFormacionComplementaria").text(parseInt($("#CantidadItemsFormacionComplementaria").text()) + 1);
        fila = parseInt($("#CantidadItemsFormacionComplementaria").text());
    }
    else {
        fila = parseInt($("#Item_Formacion_Complementaria").val());
    }
    ActualizarCampoDetalleFC(fila, 1, $("#CantidadItemsFormacionComplementaria").text());
    ActualizarCampoDetalleFC(fila, 2, $("#Formacioncomplementaria").val());
    ActualizarCampoDetalleFC(fila, 3, $("#Formacioncomplementaria option:selected").html());

    $('#frmRegistrarFormacioncomplementaria').modal('toggle');
    LimpiarDetalleFC();
}

function ActualizarCampoDetalleFC(fila, columna, valor) {
    $("#TablaCabeceraFormacionComplementaria tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function ActualizarNumeroItemFC() {
    var i = 1;
    $("#TablaCabeceraFormacionComplementaria tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function LimpiarDetalleFC() {
    $("#Formacioncomplementaria").val("");
    $("#Item_Formacion_Complementaria").val("");
}

function AgregarAnioSector() {
    if ($("#anio100").val() == "") {
        swal("Ingrese Años")
        $("#anio100").focus();
        return;
    }

    if ($("#cboSector100").val() == null) {
        swal("Ingrese Sector")
        $("#cboSector100").focus();
        return;
    }

    if ($("#Item_Anio_Sector").val() == "") {
        $("#tabla_oculta_Anio_Sector tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaCabeceraAnioSector tbody");
        $("#CantidadItemsAnioSector").text(parseInt($("#CantidadItemsAnioSector").text()) + 1);
        fila = parseInt($("#CantidadItemsAnioSector").text());
    }
    else {
        fila = parseInt($("#Item_Anio_Sector").val());
    }
    ActualizarCampoDetalleAS(fila, 1, $("#CantidadItemsAnioSector").text());
    ActualizarCampoDetalleAS(fila, 2, $("#anio100").val());
    ActualizarCampoDetalleAS(fila, 3, $("#cboSector100").val());
    ActualizarCampoDetalleAS(fila, 4, $("#cboSector100 option:selected").html());

    $('#frmRegistrarAnioSector').modal('toggle');
    LimpiarDetalleAS();
}

function ActualizarCampoDetalleAS(fila, columna, valor) {
    $("#TablaCabeceraAnioSector tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function ActualizarNumeroItemAS() {
    var i = 1;
    $("#TablaCabeceraAnioSector tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function LimpiarDetalleAS() {
    $("#anio100").val("");
    $("#cboSector100").val("");
    $("#Item_Anio_Sector").val("");
}


function ss() {

    //var selected = '';
    //$('#destino option:checked').each(function () {
    //    selected += $(this).val() + ',';
    //});
    //fin = selected.length - 1; // calculo cantidad de caracteres menos 1 para eliminar la coma final
    //selected = selected.substr(0, fin); // elimino la coma final
    //console.log(selected);

    var arr = [];

    console.log(arr);
}
function GuardarMOF() {
    Datos();
    Destino();
    Profesion()
    Formacion_Obligatoria();
    Formacion_Complementaria();
    Aniosector();
    Destino2();
    Destino3();
    //console.log(JSON.stringify(jsonObj))
    //var DatosObj=[10,23,56];
    //var DestinoObj=[1,2];
    //var DatosObj;
    //var DestinoObj;
    //var ProfesionObj;
    //var arrJoin2 = $.merge(DatosObj, DestinoObj);
    //var arrJoin = DatosObj.concat(DestinoObj);
    //console.log(arrJoin2);
    //console.log(arrJoin);
    //console.log(Datos);
    // console.log(Destino);
    //sum = $.extend(Datos, Destino);
    // console.log(sum);
    //var jsons = new Array();
    //jsons.push(d);
    //jsons.push(de);
    //console.log(jsons);
    concattedjson = JSON.stringify(JSON.parse(Datos).concat(JSON.parse(Destino).concat(JSON.parse(Profesion).concat(JSON.parse(Formacion_Obligatoria)))));
    console.log(concattedjson);
}

function Datos() {
    var DatosObj = [];

    item = {}
    item["nvPuesto100"] = $("#nvPuesto100").val();
    item["cboArea"] = $("#cboArea").val();
    item["txtaFunciones100"] = $("#txtaFunciones100").val();
    //item["cboUnidadOrganizativa"] = $("#cboUnidadOrganizativa").val();
    //item["cboEmpresa"] = $("#cboEmpresa").val();
    //item["cboSede"] = $("#cboSede").val();
    //item["CMAN_SUENO"] = $("#CMAN_SUENO").val();
    //item["CMAN_ORINA"] = $("#CMAN_ORINA").val();
    //item["CMAN_DEPOSICION"] = $("#CMAN_DEPOSICION").val();
    //item["CMAN_ESTADO_ANIMICO"] = $("#CMAN_ESTADO_ANIMICO").val();
    //item["CMAN_ANTECEDENTES"] = $("#CMAN_ANTECEDENTES").val();
    //item["CMAN_EXA_FISICO"] = $("#CMAN_EXA_FISICO").val();

    //item["CMAN_COMD_ID"] = $("#COMD_ID").val();
    //item["CMAN_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

    DatosObj.push(item);
    Datos = JSON.stringify(DatosObj);
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(Datos)



}
function Destino() {
    DestinoObj = [];

    $("#destino option").each(function (i) {
        item = {}
        item["funciones"] = $(this).val();
        // arr.push(option); 
        //item["nvPuesto100"] = $("#nvPuesto100").val();
        DestinoObj.push(item);
    });
    //GuardarMOF_2();
    //item["nvTrabajadorR35"] = parseInt($("#nvTrabajadorR35").val());
    //item["fecha3"] = $("#fecha3").val();
    //item["cboUnidadOrganizativa"] = $("#cboUnidadOrganizativa").val();
    //item["cboEmpresa"] = $("#cboEmpresa").val();
    //item["cboSede"] = $("#cboSede").val();
    //item["CMAN_SUENO"] = $("#CMAN_SUENO").val();
    //item["CMAN_ORINA"] = $("#CMAN_ORINA").val();
    //item["CMAN_DEPOSICION"] = $("#CMAN_DEPOSICION").val();
    //item["CMAN_ESTADO_ANIMICO"] = $("#CMAN_ESTADO_ANIMICO").val();
    //item["CMAN_ANTECEDENTES"] = $("#CMAN_ANTECEDENTES").val();
    //item["CMAN_EXA_FISICO"] = $("#CMAN_EXA_FISICO").val();

    //item["CMAN_COMD_ID"] = $("#COMD_ID").val();
    //item["CMAN_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();


    Destino = JSON.stringify(DestinoObj);
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(Destino)



}
function Profesion() {
    ProfesionObj = [];
    $("#TablaCabeceraProfesionGrado tbody tr").each(function (index) {
        if (index > 0) {
            item = {}
            $(this).children("td").each(function (index2) {
                if (index2 == 1)
                    if ($(this).text() == "")
                        item["Item_Profesion"] = "0";
                    else
                        item["Item_Profesion"] = $(this).text();

                if (index2 == 2)
                    item["Id_Profresion"] = $(this).text();
                if (index2 == 4)
                    item["Id_Grado"] = $(this).text();

            });
            ProfesionObj.push(item);
        }
    });
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    Profesion = JSON.stringify(ProfesionObj);
    console.log(Profesion)

}
function Formacion_Obligatoria() {
    jsonObj = [];
    $("#TablaCabeceraFormacionObligatoria tbody tr").each(function (index) {
        if (index > 0) {
            item = {}
            $(this).children("td").each(function (index2) {
                if (index2 == 1)
                    if ($(this).text() == "")
                        item["Item_Formacion_Obligatoria"] = "0";
                    else
                        item["Item_Formacion_Obligatoria"] = $(this).text();

                if (index2 == 2)
                    item["Id_Formacion_Obligatoria"] = $(this).text();

            });
            jsonObj.push(item);
        }
    });
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    Formacion_Obligatoria = JSON.stringify(jsonObj);
    console.log(Formacion_Obligatoria)

}
function Formacion_Complementaria() {
    jsonObj = [];
    $("#TablaCabeceraFormacionComplementaria tbody tr").each(function (index) {
        if (index > 0) {
            item = {}
            $(this).children("td").each(function (index2) {
                if (index2 == 1)
                    if ($(this).text() == "")
                        item["Item_Formacion_Complementaria"] = "0";
                    else
                        item["Item_Formacion_Complementaria"] = $(this).text();

                if (index2 == 2)
                    item["Id_Formacion_Complementaria"] = $(this).text();

            });
            jsonObj.push(item);
        }
    });
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(JSON.stringify(jsonObj))

}
function Aniosector() {
    jsonObj = [];
    $("#TablaCabeceraAnioSector tbody tr").each(function (index) {
        if (index > 0) {
            item = {}
            $(this).children("td").each(function (index2) {
                if (index2 == 1)
                    if ($(this).text() == "")
                        item["Item_Anio_Sector"] = "0";
                    else
                        item["Item_Anio_Sector"] = $(this).text();

                if (index2 == 2)
                    item["Item_Anio"] = $(this).text();
                if (index2 == 3)
                    item["Id_Sector"] = $(this).text();

            });
            jsonObj.push(item);
        }
    });
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(JSON.stringify(jsonObj))

}
function Destino2() {
    jsonObj = [];

    $("#destino2 option").each(function (i) {
        item = {}
        item["Competencias_Generales"] = $(this).val();
        // arr.push(option); 
        //item["nvPuesto100"] = $("#nvPuesto100").val();
        jsonObj.push(item);
    });

    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(JSON.stringify(jsonObj))



}
function Destino3() {
    jsonObj = [];

    $("#destino3 option").each(function (i) {
        item = {}
        item["Competencias_Especficas"] = $(this).val();
        // arr.push(option); 
        //item["nvPuesto100"] = $("#nvPuesto100").val();
        jsonObj.push(item);
    });

    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    console.log(JSON.stringify(jsonObj))

}