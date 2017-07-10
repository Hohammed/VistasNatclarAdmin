/// <reference path="../../../Views/Account/EscogerSede.html" />
/// <reference path="../../../Views/RRHH/Tareo.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />


////////////--------------------TABLA ASISTENCIA----------------////////////
function restarHoras2(Tipo, parent) {
    fecha = $(".mifecha").val();
    var i = parent.rowIndex;
    var unor = Number($("#unor").val());
    var obtfecha = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[17].firstChild;
    var obj = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[18].firstChild;
    var obj2 = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[20].firstChild;

    if (unor == 1 || unor == 2) {
        //alert("entre")
        if (Tipo == "T") {
            var inicio = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[16].firstChild.value;
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();

            inicioMinutos = parseInt(inicio.substr(3, 2));
            inicioHoras = parseInt(inicio.substr(0, 2));

            finMinutos = parseInt(fin.substr(4, 4));
            finHoras = parseInt(fin.substr(0, 2));

            transcurridoMinutos = finMinutos - inicioMinutos;
            transcurridoHoras = finHoras - inicioHoras;
            transcurridoHoras = transcurridoHoras * 60;

            if (transcurridoMinutos < 0) {
                //transcurridoHoras--;
                transcurridoMinutos = 60 + transcurridoMinutos;
            }

            //horas = transcurridoHoras.toString();
            //minutos = transcurridoMinutos.toString();

            horas = transcurridoHoras;
            minutos = transcurridoMinutos;

            if (horas < 0) {

                horas = "K";
                minutos = "K"
            }

            if (horas.length < 2) {
                horas = "0" + horas;
            }

            if (minutos.length < 2) {
                minutos = "0" + minutos;
            }


            obj.value = fin;
            //document.getElementById("TablaRegistrarAsistencia").rows[i].getElementById("mintotal").value = horas + ":" + minutos;
            //$("#ingresodia").val(fin);
            //obj2.value = horas + ":" + minutos;
            obj2.value = horas + minutos;
            obtfecha.value = fecha;
        } else {
            inicio = $("#ingreso").val().toString();
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();

            obj.value = fin;
            obj2.value = "";
            obtfecha.value = fecha;
        }
    } else {
        inicio = $("#ingreso").val().toString();
        fin = $("#reloj").val().toString();
        fecha = $(".mifecha").val();

        obj.value = fin;
        obj2.value = "";
        obtfecha.value = fecha;
    }

}

function restarHoras(Tipo, parent) {
    fecha = $(".mifecha").val();
    var i = parent.rowIndex;
    var unor = Number($("#unor").val());
    var obtfecha = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[17].firstChild;
    var obj = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[18].firstChild;
    var obj2 = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[20].firstChild;

    if (unor == 1 || unor == 2) {
        //alert("entre")
        if (Tipo == "T") {
            var inicio = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[16].firstChild.value;
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();

            inicioMinutos = parseInt(inicio.substr(3, 2));
            inicioHoras = parseInt(inicio.substr(0, 2));
            /* console.log(inicioMinutos)
            console.log(inicioHoras) */
            finMinutos = parseInt(fin.substr(4, 4));
            finHoras = parseInt(fin.substr(0, 2));
            /* console.log(finMinutos)
            console.log(finHoras) */
            transcurridoMinutos = finMinutos - inicioMinutos;
            transcurridoHoras = finHoras - inicioHoras;

            /*  console.log(transcurridoHoras)
             console.log(transcurridoMinutos) */

            if (transcurridoHoras <= 0) {
                if (transcurridoMinutos < 0) {
                    transcurridoHoras = transcurridoHoras * 0;
                    //transcurridoHoras = transcurridoHoras * 60;
                    transcurridoMinutos = transcurridoMinutos * 0;
                }
            } else if (transcurridoHoras > 0) {
                if (transcurridoMinutos > 0) {
                    transcurridoHoras--;
                    transcurridoHoras = transcurridoHoras * 60;
                    transcurridoMinutos = 60 + transcurridoMinutos;
                }
            }
            /*  console.log(transcurridoMinutos)
             console.log(transcurridoHoras) */
            //horas = transcurridoHoras.toString();
            //minutos = transcurridoMinutos.toString();

            horas = transcurridoHoras;
            minutos = transcurridoMinutos;

            if (horas < 0) {

                horas = "K";
                minutos = "K"
            }

            if (minutos < 0) {

                horas = "K";
                minutos = "K"
            }

            if (horas.length < 2) {
                horas = "0" + horas;
            }

            if (minutos.length < 2) {
                minutos = "0" + minutos;
            }


            obj.value = fin;
            //document.getElementById("TablaRegistrarAsistencia").rows[i].getElementById("mintotal").value = horas + ":" + minutos;
            //$("#ingresodia").val(fin);
            //obj2.value = horas + ":" + minutos;
            obj2.value = horas + minutos;
            obtfecha.value = fecha;
        } else {
            inicio = $("#ingreso").val().toString();
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();

            obj.value = fin;
            obj2.value = "";
            obtfecha.value = fecha;
        }
    } else {
        inicio = $("#ingreso").val().toString();
        fin = $("#reloj").val().toString();
        fecha = $(".mifecha").val();

        obj.value = fin;
        obj2.value = "";
        obtfecha.value = fecha;
    }

}

function restarHorasDetalle(Tipo, parent) {
    fecha = $(".mifecha").val();
    var i = parent.rowIndex;
    var unor = Number($("#unor").val());
    var obtfechaAlm = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[26].firstChild;
    var objminAlm = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[27].firstChild;
    //var obj2 = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[20].firstChild;

    if (unor == 1 || unor == 2) {
        //alert("entre")
        if (Tipo == "AI") {
            //var inicio = document.getElementById("TablaRegistrarAsistencia").rows[i].cells[16].firstChild.value;
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();


            objminAlm.value = fin;
            //document.getElementById("TablaRegistrarAsistencia").rows[i].getElementById("mintotal").value = horas + ":" + minutos;
            //$("#ingresodia").val(fin);
            //obj2.value = horas + ":" + minutos;
            //obj2.value = horas + minutos;
            obtfechaAlm.value = fecha;
        } else {
            inicio = $("#ingreso").val().toString();
            fin = $("#reloj").val().toString();
            fecha = $(".mifecha").val();

            obj.value = fin;
            obj2.value = "";
            obtfecha.value = fecha;
        }
    } else {
        inicio = $("#ingreso").val().toString();
        fin = $("#reloj").val().toString();
        fecha = $(".mifecha").val();

        obj.value = fin;
        obj2.value = "";
        obtfecha.value = fecha;
    }

}

function mostrarReloj() {
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()

    str_segundo = new String(segundo)
    if (str_segundo.length == 1)
        segundo = "0" + segundo

    str_minuto = new String(minuto)
    if (str_minuto.length == 1)
        minuto = "0" + minuto

    str_hora = new String(hora)
    if (str_hora.length == 1)
        hora = "0" + hora
    horaImprimible = hora + " : " + minuto + " : " + segundo
    // horaImprimible = hora + " : " + minuto

    document.reloj.reloj.value = horaImprimible.toString();
    setTimeout("mostrarReloj()", 1000)
}

////////////---------------------ASISTENCIA----------------////////////
function GuardarAsistencia() {
    jsonObj = [];

    $("#TablaRegistrarAsistencia tbody tr").each(function (index) {
        if (index >= 0) {
            item = {}

            $(this).children("td").each(function (index2) {
                if (index2 == 22)
                    item["iIdAsistencia"] = 0;

                if (index2 == 1)
                    item["iIdTrabajadorInterno"] = $(this).text();

                //if (index2 == 2)
                //    item["sNumeroDocumento"] = $(this).text();

                //if (index2 == 5)
                //    item["sNombres"] = $(this).text();

                if (index2 == 10)
                    item["vcIdSede"] = $(this).text();

                //if (index2 == 13)
                //    item["vcUsuarioCreacionApp"] = "yop";

                //if (index2 == 15)
                //    item["vcUsuarioCreacionOT"] = "tbm yo";

                if (index2 == 17)
                    if ($(this).find("input[type=text]").is("[type=text]"))
                        item["vcFechaCalendario"] = $(this).find("input[type=text]").val();

                if (index2 == 18)
                    if ($(this).find("input[type=text]").is("[type=text]"))
                        item["tAsistencia"] = $(this).find("input[type=text]").val();

                if (index2 == 19)
                    if ($(this).find("select option:selected"))
                        item["iIdMotivoTareo"] = $(this).find("select option:selected").val();

                //if (index2 == 21)
                //    if ($(this).find("select option:selected"))
                //        item["sDenMotivoTareo"] = $(this).find("select option:selected").html();

                if (index2 == 20)
                    if ($(this).find("input[type=text]").is("[type=text]"))
                        item["iMinTardanza"] = $(this).find("input[type=text]").val();

                if (index2 == 21)
                    if ($(this).find("textarea"))
                        item["nvObservacion"] = $(this).find("textarea").val();

                if (index2 == 23)
                    item["iIdEstadoAsistencia"] = $(this).text();

                if (index2 == 24)
                    item["vcUsuarioApp"] = $(this).text();

                if (index2 == 24)
                    item["vcUsuarioOT"] = $(this).text();
                //if (index2 == 17)
                //    if ($(this).find("input[type=text]").is("[type=text]"))
                //        item["ingreso"] = $(this).find("input[type=text]").val();

                //if (index2 == 18)
                //    if ($(this).find("input[type=text]").is("[type=text]"))
                //        item["fecha"] = $(this).find("input[type=text]").val();

                //if (index2 == 19)
                //    if ($(this).find("input[type=text]").is("[type=text]"))
                //        item["hora"] = $(this).find("input[type=text]").val();
                //if (index2 == 20)
                //    if ($(this).find("select option:selected"))
                //        item["descrip"] = $(this).find("select option:selected").val();

                ////if (index2 == 14)
                ////    item["tottard"] = $(this).text();

                //if (index2 == 21)
                //    if ($(this).find("input[type=text]").is("[type=text]"))
                //        item["mintard"] = $(this).find("input[type=text]").val();

            })
            jsonObj.push(item);
        }
    });

    Djsonobj = (JSON.stringify(jsonObj));
    console.log(Djsonobj);
    var xhr = new XMLHttpRequest();
    var dataobj = Djsonobj;

    xhr.open('POST', 'http://admin_erp.natclar.com.pe:12000/rWSAsistencia/Asistencia/Post');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            swal("El registro de Asistencia fue exitoso",
                "NO OLVIDE DE CONFIRMAR LA ASISTENCIA..!")
            console.log(xhr.response);
        } else {
            swal("Error al grabar..!")
            console.log(status);
        }
    };
    xhr.send(JSON.stringify(jsonObj));
}

////////////---------------DETALLE ASISTENCIA--------------////////////
var item = parseInt($("#CantidadItemsDetalleAsistencia").text());
function AgregarMarcacion() {
    if (item != 0) {
        item = $("#CantidadItemsDetalleAsistencia").text();
    }
    if ($("#cboTipoMarcacion").val() == null) {
        swal("Escoja una Descripción")
        $("#cboTipoMarcacion").focus();
        return;
    }
    //if ($("#FechaDetalle").val() == "") {
    //    swal("Ingrese Fecha")
    //    $("#FechaDetalle").focus();
    //    return;
    //}
    if ($("#HoraDetalle").val() == "") {
        swal("Ingrese Hora")
        $("#HoraDetalle").focus();
        return;
    }
    var valor = $("#cboTipoMarcacion").val();
    var descripcion = $("#cboTipoMarcacion option:selected").text();
    var observacion = $("#ObservacionesDetalle").val();
    var hora = $("#HoraDetalle").val();
    var UsuarioDetAsist = $("#UsuarioDetAsist").val();
    var hora = $("#HoraDetalle").val();
    var idAsistencia = $("#idAsistencia").val();


    item++;
    if ($("#Item_Asistencia_Detalle").val() == "") {

        // $("#tabla_oculta_detalle_asistencia tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#ListaAsistenciaDetalle tbody");

        $("#ListaAsistenciaDetalle tbody").append('<tr><td>' +
            '<button type="button" class="btn btn-danger btn-xs QuitarAsistenciaDetalle" id="QuitarAsistenciaDetalle"><span class="glyphicon glyphicon-remove"></span></button>' +
            '<button type="button" class="btn btn-success btn-xs ModificarAsistenciaDetalle" id="ModificarAsistenciaDetalle"><span class="glyphicon glyphicon-pencil"></span></button>' +
            '</td> <td hidden>' + idAsistencia + '</td> <td hidden>0</td> <td>' + item + '</td> <td hidden>' + valor + '</td> <td>' + descripcion + '</td><td>' + hora + '</td> <td>' + observacion + '</td><td hidden>' + UsuarioDetAsist + '</td><td hidden>1</td>' +
            '</tr>');

        $("#CantidadItemsDetalleAsistencia").text(item);
        fila = parseInt($("#CantidadItemsDetalleAsistencia").text());


    }
    else {
        fila = parseInt($("#Item_Asistencia_Detalle").val());
        fila = fila - 1;
    }
    ActualizarCampoDetalleAsistencia(fila, 1, $("#idAsistencia").val());
    ActualizarCampoDetalleAsistencia(fila, 3, $("#CantidadItemsDetalleAsistencia").text());
    ActualizarCampoDetalleAsistencia(fila, 4, $("#cboTipoMarcacion").val());
    ActualizarCampoDetalleAsistencia(fila, 5, $("#cboTipoMarcacion option:selected").html());
    ActualizarCampoDetalleAsistencia(fila, 6, $("#HoraDetalle").val());
    ActualizarCampoDetalleAsistencia(fila, 7, $("#ObservacionesDetalle").val());
    ActualizarCampoDetalleAsistencia(fila, 8, $("#UsuarioDetAsist").val());
    //$('#frmRegistrarBono').modal('toggle');
    LimpiarDetalleDetalleAsistencia();
    ActualizarNumeroItemDetalleasistencia();

    ////    var obs = $("#ObservacionesDetalle").val();
    //var tipoMarcacion_id = $("#cboTipoMarcacion option:selected").val()
    //var tipoMarcacion = $("#cboTipoMarcacion option:selected").text()

    //$(this).parent().parent().find("td:eq(3)").val(tipoMarcacion_id);
    //$(this).parent().parent().find("td:eq(4)").val(tipoMarcacion);
    //$(this).parent().parent().find("td:eq(6)").val(obs);
}

function ActualizarCampoDetalleAsistencia(fila, columna, valor) {
    $("#ListaAsistenciaDetalle tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {

            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleDetalleAsistencia() {
    $("#cboTipoMarcacion").val("");
    $("#ObservacionesDetalle").val("");
    $("#Item_Asistencia_Detalle").val("");
    //$("#idAsistencia").val("");
    //$("#UsuarioDetAsist").val("");
}

function ActualizarNumeroItemDetalleasistencia() {

    var i = 1;
    $("#ListaAsistenciaDetalle tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index >= 0 && index2 == 3) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function GuardarDetalleAsistencia() {
    jsonObj = [];

    $("#ListaAsistenciaDetalle tbody tr").each(function (index) {
        if (index >= 0) {
            //item = {}
            var itemOculto;

            var item_oculto = ($(this).find("td:eq(2)").text());

            if (item_oculto == 0) {
                var item = '{ "iIdAsistencia":"' + $(this).find("td:eq(1)").text() + '","iItem":"' + $(this).find("td:eq(2)").text() + '" ,"iIdTipoMarcacion":"' + $(this).find("td:eq(4)").text() + '" , "tAsistencia":"' + $(this).find("td:eq(6)").text() + '" , "nvObservacion":"' + $(this).find("td:eq(7)").text() + '", "vcUsuarioApp":"' + $(this).find("td:eq(8)").text() + '" ,"vcUsuarioOT":"' + $(this).find("td:eq(8)").text() + '", "iIdEstado":1}';
                var item2 = JSON.parse(item);
                //console.log(item2);
                jsonObj.push(item2);
            }

            //var jsonRes = '{ "students" : [' + '{ "firstName":"Michel" , "lastName":"John" ,"age":18},' + '{ "firstName":"Richard" , "lastName":"Joe","age":20 },' + '{ "firstName":"James" , "lastName":"Henry","age":15 } ]}';
            //var studentObject = JSON.parse(jsonRes);
            //console.log(studentObject);
        }
    });

    Djsonobj = (JSON.stringify(jsonObj));
    //console.log(Djsonobj);
    var xhr = new XMLHttpRequest();
    var dataobj = Djsonobj;

    xhr.open('POST', 'http://admin_erp.natclar.com.pe:12000/rWSDetalleAsistencia/rWSDetalleAsistencia/Post');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            swal("El registro del Detalle Asistencia fue exitoso")
            $('#frmRegistrarDetalle').modal('toggle');
            //console.log(xhr.response);
        } else {
            swal("Error al grabar..!")
            // console.log(status);
        }
    };
    xhr.send(JSON.stringify(jsonObj));
}

function ObtenerDetalleAsistencia() {
    //sede = sessionStorage.getItem("Sede");
    iIdAsistencia = $("#idAsistencia").val();

    var xhr = new XMLHttpRequest();
    var dataobj = { iIdAsistencia: iIdAsistencia };

    xhr.open('GET', 'http://localhost:29457/rWSDetalleAsistencia/Get?iIdAsistencia=' + idAsistencia, true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(sede)
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;

            if (obj != "0") {
                console.log(obj);
                // $("#ListaAsistenciaDetalle tbody tr").remove();
                for (i = 0, j = 1; i < obj.length; i++, j++) {

                    $("#ListaAsistenciaDetalle").append('<tr><td ></td >' +
                    '<td hidden>' + obj[i].iIdAsistencia + '</td>' +
                    '<td hidden>' + obj[i].iItem + '</td>' +
                    '<td>' + j + '</td>' +
                    '<td>' + obj[i].iIdTipoMarcacion + '</td>' +
                    '<td>' + obj[i].vcDescripcionTipoMarcacion + '</td>' +
                    '<td hidden>' + obj[i].tAsistencia + '</td>' +
                    '<td hidden>' + obj[i].nvObservacion + '</td>' +
                    '<td hidden></td>' +
                    '<td>' + obj[i].iIdEstado + '</td>' +
                    '</td></tr>');
                }

            }
            else {
                swal("Usted no cuenta con Trabajadores asignados!")
            }
        }
        else {
            swal("Ocurrió un error al obtener a sus Trabajadores!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);
}
