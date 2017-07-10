////////////------------------- REQUERIMIENTO--------------/////////
function GuardarRQ() {
    jsonObj = [];
    var jsonGlobal = {};

    if ($("#cboSede98c").val() == null) {
        swal("Escoja una Sede")
        return;
    }
    if ($("#nvPuesto98").val() == null) {
        swal("Ingrese un Puesto")
        return;
    }


    var RQ = [];

    item = {}
    item["iIdRequerimiento"] = $("#iIdRequerimiento").val();
    item["vcNumeroDocumento"] = $("#idTrabajadorS98").val();
    item["vcIdSedeOrigen"] = $("#vcIdSedeOrigen").val();
    item["iIdUnidadOrganizativa"] = $("#cboUnidadOrganizativa98").val();
    item["vcRucEmpresa"] = $("#cboEmpresa98").val();
    item["vcIdSede"] = $("#cboSede98c").val();
    item["vcCodigoUbigeo"] = $("#cbodistrito98").val();
    item["dFecha"] = $("#dFechaMovimiento1198").val();
    item["iIdEstadoAprobacion"] = $("#iIdEstadoAprobacion").val();
    item["vcUsuarioCreacionApp"] = $("#idTrabajadorS98").val();
    item["vcUsuarioCreacionOT"] = $("#idTrabajadorS98").val();
    //item["vcCodigoUbigeo"] = $("#cboDepartamento98").val();
    //item["vcCodigoUbigeo"] = $("#cboProvincia98").val();

    RQDetalle();

    RQ.push(item);
    RQ = JSON.stringify(RQ);
    //$("#CPAGO_DETALLE_PAGO_JSON").val(JSON.stringify(jsonObj));
    //console.log(RQ)

    jsonObj.push(RQ);
    jsonObj.push(RQDetalle);
    jsonGlobal["Requerimiento"] = item;
    jsonGlobal["RequerimientoDetalle"] = itemRQDetalle;
    //console.log(JSON.stringify(jsonGlobal));

    var xhr = new XMLHttpRequest();
    var dataobj = jsonObj[0];

    //var dataobj = Djsonobj;
    ////console.log(jsonObj[0])
    
    //xhr.open('POST', 'http://admin_erp.natclar.com.pe:12000/rWSRequerimientoRRHH/rWSRequerimiento/Post');
    xhr.open('POST', 'http://localhost:4376/rWSRequerimiento/Post');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            swal("El registro de Requerimiento fue exitoso")
            setTimeout(" window.location = '../../../Views/RRHH/RegistrarRequerimientoRRHH'", 2000)
            //console.log(xhr.response);
        } else {
            swal("Error al grabar..!")
            //console.log(status);
        }
    };
    //xhr.send(JSON.stringify(jsonObj[0]));
    xhr.send(JSON.stringify(jsonGlobal));
    
}

function RQDetalle() {
    var RQDetalle = [];

    itemRQDetalle = {}
    itemRQDetalle["iIdMotivo"] = $("#cboMotivo98").val();
    itemRQDetalle["iIdTrabajadorAReemplazar"] = $("#cboMotivo98").val();
    itemRQDetalle["iIdTipoContrato"] = $("#cboTipoContrato98").val();
    itemRQDetalle["iIdSistemaTrabajo"] = $("#cboSistTrabajo98").val();
    itemRQDetalle["tInicial"] = $("#tInicial98").val();
    itemRQDetalle["tFin"] = $("#tFin98").val();
    itemRQDetalle["iIdPuesto"] = $("#IdPuesto98").val();
    itemRQDetalle["iIdArea"] = $("#IdArea98").val();
    itemRQDetalle["iCantidad"] = $("#iCantidad98").val();
    itemRQDetalle["iSalario"] = $("#iSalario98").val();
    itemRQDetalle["vcConfirmarSalario"] = $("#vcResponsableConfirmarSalario").val();
    itemRQDetalle["vcLugarEjecucion"] = $("input:radio[name=rbLugarEjecucion]:checked").val();
    itemRQDetalle["vcEstadoCivil"] = $("input:radio[name=rbEstadoCivil]:checked").val();
    itemRQDetalle["vcSexo"] = $("input:radio[name=rbSexo]:checked").val();
    itemRQDetalle["vcRangoEdad"] = $("input:radio[name=rbRangoEdad]:checked").val();
    itemRQDetalle["iEdadMin"] = $("#iEdadMin").val();
    itemRQDetalle["iEdadMax"] = $("#iEdadMax").val();
    itemRQDetalle["nvObservacion"] = $("#txtaFunciones100").val();
    itemRQDetalle["vcUsuarioCreacionApp"] = $("#idTrabajadorS98").val();
    itemRQDetalle["vcUsuarioCreacionOT"] = $("#idTrabajadorS98").val();

    RQDetalle.push(itemRQDetalle);
    Detalle = JSON.stringify(RQDetalle);

    //console.log(Detalle)

}


//////////////////////--------BUSCAR RQ--------/////////////////////
function TipoEstadoRRHH() {
   var xhr = new XMLHttpRequest();
   var obj;
   var dataobj = 11 ;
   xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSEstado/EstadoByClaseEstado/Get?claseestado=' + dataobj, true);
   xhr.responseType = "json";
   xhr.onload = function () {
       var status = xhr.status;
       if (status == 200) {
           //console.log(xhr.response);
           obj = xhr.response;
           if (obj != "0") {
               $.each(obj, function (i, TE) {
                   $(".cboEstadoRequerimiento").append('<option value="' + TE.iIdEstado + '">' +
                        TE.nvDescripcion + '</option>');
               });
           }
           else {
               swal("No se encuentra Tipo de Estado!")
           }
       }
       else {
           swal("Ocurrió un error al obtener los Tipo de Estado!")
       }
   }
   xhr.send();
   //xhr.send(dataobj);

}

function BuscarRequerimientoRRHH() {
       
    var responsable = $("#iIdResponsableRequerimiento137").val();
    var SedeOrigen = $("#cboSedeOrigen137").val();
    var SedeDestino = $("#cboSedeDestino137").val();
    var fechainicio = $("#dFechaInicioRequerimiento137").val();
    var fechafin = $("#dFechaFinRequerimiento137").val();
    var iIdEstado = $("#cboEstadoRequerimiento137").val()

    var xhr = new XMLHttpRequest();

    var obj;

    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSRequerimientoRRHH/rWSRequerimiento/Get?responsable=' + (responsable) + '&SedeOrigen=' + (SedeOrigen) + '&SedeDestino=' + (SedeDestino) + '&fechainicio=' + (fechainicio) + '&fechafin=' + (fechafin) + '&iIdEstado=' + (iIdEstado), true);

    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(sede)
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;
            obj2 = JSON.stringify(obj);

            if (obj != null) {
                //Para actualizar la fila de las columnas
                $("#TablaRegistrarRequerimiento137 tbody tr").remove();
                for (i = 0, j = 1; i < obj.length; i++, j++) {
                    $("#TablaRegistrarRequerimiento137 tbody").append("<tr><td><button type='button' class='btn btn-info btn-xs btnVerDetalleRQ' id='btnVerDetalleRQ'><span class='glyphicon glyphicon-info-sign'></span><b></b></button></td>" +
                    '<td>' + j + '</td>' +
                    '<td hidden>' + obj[i].iIdRequerimiento + '</td>' +
                    '<td>' + obj[i].vcNombres_Completos + '</td>' +
                    '<td>' + obj[i].vcIdSedeOrigen + '</td>' +
                    '<td>' + obj[i].dFecha + '</td>' +
                    '<td>' + obj[i].vcIdSede + '</td>' +
                    '<td>' + obj[i].vcEstadoAprobacion + '</td>' +
                    '</td></tr>');
                }
            }
            else {
                swal("Usted no cuenta con Requerimientos asignados!")
            }
        }
        else {
            swal("Ocurrió un error al obtener a sus Requerimientos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);
}


//////////////////////--------OBTENER RQ--------/////////////////////
function ObtenerRequerimiento() {
    var iIdRequerimiento = localStorage.getItem("iIdRequerimientoRRHH");
    //console.log(iIdRequerimiento)
        
    var xhr = new XMLHttpRequest();
    var obj;

    //xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSRequerimientoRRHH/rWSRequerimiento/GetDatos?iIdRequerimiento=' + iIdRequerimiento, true);
    xhr.open('GET', 'http://localhost:4376/rWSRequerimiento/GetDatos?iIdRequerimiento=' + iIdRequerimiento, true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(sede)
    xhr.onload = function () {

        var status = xhr.status;
        if (status == 200) {
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;
            //datosrequerimientodetalle = xhr.response;
            //obj2 = JSON.stringify(obj);
            //console.log(obj);

            if (obj != null) {
                //Para actualizar la fila de las columnas
                sessionStorage.setItem("unor", obj.iIdUnidadOrganizativa);
                sessionStorage.setItem("emp", obj.vcRucEmpresa);
                sessionStorage.setItem("sed", obj.vcIdSede);
                sessionStorage.setItem("depa", obj.vcDepartamento);
                sessionStorage.setItem("prov", obj.vcProvincia);
                sessionStorage.setItem("dist", obj.vcDistrito);
                sessionStorage.setItem("SisTra", obj.iIdSistemaTrabajo);
                sessionStorage.setItem("TipCont", obj.iIdTipoContrato);
                sessionStorage.setItem("Mot", obj.iIdMotivo);

                $("#nvTrabajadorS98").val(obj.vcNombres_Completos);
                $("#idTrabajadorS98").val(obj.vcNumeroDocumento);
                $("#vcSedeOrigen").val(obj.vcDescripcionSede);
                $("#vcIdSedeOrigen").val(obj.vcIdSedeOrigen);
                $("#dFechaMovimiento1198").val(obj.dFecha);
                $("#iIdEstadoAprobacion").val(obj.iIdEstadoAprobacion);
                //console.log(obj.iIdEstadoAprobacion)
                //console.log($("#cboUnidadOrganizativa98").val())
                //console.log(obj.iIdUnidadOrganizativa)
                //$("#cboUnidadOrganizativa98").val(obj.iIdUnidadOrganizativa);
                //console.log($("#cboUnidadOrganizativa98").val())

                //$("#cboUnidadOrganizativa98").change();
                //$("#cboEmpresa98").val(obj.vcRucEmpresa);
                //$("#cboEmpresa98").change(obj.vcRucEmpresa);
                //$("#cboSede98c").val(obj.vcIdSede);
                //$("#cboSede98c").change(obj.vcIdSede);
                //$("#cboDepartamento98").val(obj.vcDepartamento);
                //$("#cboDepartamento98").change();
                //$("#cboMotivo98").val(obj.iIdMotivo);
                //$("#cboTipoContrato98").val(obj.iIdTipoContrato);
                //$("#cboSistTrabajo98").val(obj.iIdSistemaTrabajo);

                if (obj.iIdSistemaTrabajo == 1 || obj.iIdSistemaTrabajo == 2) {
                    $(".Hora_Sist").show();
                    $("#tInicial98").val(obj.tInicial);
                    $("#tFin98").val(obj.tFin);
                }

                $("#nvPuesto98").val(obj.vcDescripcion);
                $("#IdPuesto98").val(obj.iIdPuesto);
                $("#nvArea98").val(obj.nvDescripcion);
                $("#IdArea98").val(obj.iIdArea);
                $("#iCantidad98").val(obj.iCantidad);
                $("#iSalario98").val(obj.iSalario);

                if (obj.vcConfirmarSalario!=null) {
                    $("#vcResponsableConfirmarSalario").val(obj.vcConfirmarSalario);
                    $("#vcResponsableConfirmarSalario").show();
                    $("#cbxSalario98").prop('checked', 'checked');
                    $("#cbxSalario98").prop('disabled', 'disabled')
                }
               
                $("#Estado_civil input[type='checkbox']").each(function (index) {
                    if ($(this).val() == obj.vcEstadoCivil) {
                        $(this).prop('checked', 'checked')
                    }

                }
                  );

                $("#Lugar_Ejecucion input[type='radio']").each(function (index) {
                    if ($(this).val() == obj.vcLugarEjecucion) {
                        $(this).prop('checked', 'checked')
                    }

                }
                    );

                $("#Estado_civil input[type='radio']").each(function (index) {
                    if ($(this).val() == obj.vcEstadoCivil) {
                        $(this).prop('checked', 'checked')
                    }

                }
                   );

                $("#Sexo input[type='radio']").each(function (index) {
                    if ($(this).val() == obj.vcSexo) {
                        $(this).prop('checked', 'checked')
                    }

                }
                   );

                $("#Rango_Edad input[type='radio']").each(function (index) {
                    if ($(this).val() == obj.vcRangoEdad) {
                        $(this).prop('checked', 'checked')
                        $("#Rango_Edad_Min").show();
                        $("#Rango_Edad_Max").show();
                        $("#iEdadMin").val(obj.iEdadMin);
                        $("#iEdadMax").val(obj.iEdadMax);
                    }

                }
                  );

                $("#txtaFunciones100").val(obj.nvObservacion);

               
                
                //console.log("cantidad " + obj.datosrequerimientodetalle.length);

                //$("#tabla_oculta_requerimientoarticulo101 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleRequerimientoArticulo101 tbody");
                //$("#CantidadItemsRequerimientoArticulo101").text(parseInt($("#CantidadItemsRequerimientoArticulo101").text()) + 1);
                //$("#tblDetalleRequerimientoArticulo101 tbody tr").remove();


        //        for (i = 0, j = 1; i < obj.datosrequerimientodetalle.length; i++, j++) {

        //            $("#tblDetalleRequerimientoArticulo101 tbody").append('<tr><td><button type="button" class="btn btn-danger btn-xs" id="QuitarRequerimientoArticulo"><span class="glyphicon glyphicon-remove"></span></button>' +
        //'<button type="button" class="btn btn-success btn-xs" id="ModificarRequerimientoArticulo"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
        //                               //'<tr><td >' + j + '</td>' +
        //                               '<td>' + obj.datosrequerimientodetalle[i].iItem + '</td>' +
        //                                '<td>' + obj.datosrequerimientodetalle[i].vcCodigoItem + '</td>' +
        //                                '<td>' + obj.datosrequerimientodetalle[i].nvDescripcionCorta + '</td>' +
        //                                '<td>' + obj.datosrequerimientodetalle[i].vcIdUnidad + '</td>' +
        //                                '<td>' + obj.datosrequerimientodetalle[i].numCantidadSolicitada + '</td>' +
        //                                '</td></tr>');
                        

                //        }

                //item++;
                //    if ($("#vcCodigoRequerimientoActivo101").val() == "") {
            //    if ($("#Bienes_item").val() == "") {

            //        //CantidadItemsRequerimientoActivo101
            //        //$("#tabla_oculta_requerimientoarticulo101 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleRequerimientoArticulo101 tbody");
            //        for (i = 0, j = 1; i < obj.datosrequerimientodetalle.length; i++, j++) {
            //        $("#tblDetalleRequerimientoArticulo101 tbody").append('<tr><td><button type="button" class="btn btn-danger btn-xs" id="QuitarRequerimientoArticulo"><span class="glyphicon glyphicon-remove"></span></button>' +
            //            '<button type="button" class="btn btn-success btn-xs" id="ModificarRequerimientoArticulo"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
            //                            '<td >' + item + '</td>' +
            //                            '<td>' + obj.datosrequerimientodetalle[i].vcCodigoItem + '</td>' +
            //                            '<td>' + obj.datosrequerimientodetalle[i].nvDescripcionCorta + '</td>' +
            //                            '<td>' + obj.datosrequerimientodetalle[i].vcIdUnidad + '</td>' +
            //                            '<td>' + obj.datosrequerimientodetalle[i].numCantidadSolicitada + '</td>' +
            //                            //'<td hidden>' + obj.datosrequerimientodetalle[i].EstadoAprobacion.nvDescripcion + '</td>' +
                                            
            //                            '</td></tr>');

                        
            //        ActualizarNumeroItemRequerimientoArticulo()

            //        $("#CantidadItemsRequerimientoArticulo101").text(item);
            //        fila = parseInt($("#CantidadItemsRequerimientoArticulo101").text());
            //        console.log(fila)
            //        console.log(item)
            //            }
            //    }
            //    else {
            //        fila = parseInt($("#Bienes_item").val());
            //        fila = fila - 1;
            //    }
            //    //});

            }
            
            else {
                swal("Usted no cuenta con Requerimientos asignados!")
            }
        }
        else {
            swal("Ocurrió un error al obtener a sus Requerimientos!")
        }


    }
    xhr.send();
    //xhr.send(dataobj);
}

function NuevoRQ() {
    localStorage.removeItem('iIdRequerimientoRRHH');
    sessionStorage.removeItem("unor");
    sessionStorage.removeItem("emp");
    sessionStorage.removeItem("sed");
    sessionStorage.removeItem("depa");
    sessionStorage.removeItem("prov");
    sessionStorage.removeItem("dist");
    sessionStorage.removeItem("SisTra");
    sessionStorage.removeItem("TipCont");
    sessionStorage.removeItem("Mot");
    window.location.href = "../../../Views/RRHH/RegistrarRequerimientoRRHH.html";
}