//Obtener parámetros de la URL
$.ObtenerParametros = function (key) {
    key = key.replace(/[\[]/, '\\[');
    key = key.replace(/[\]]/, '\\]');
    var pattern = "[\\?&]" + key + "=([^&#]*)";
    var regex = new RegExp(pattern);
    var url = unescape(window.location.href);
    var results = regex.exec(url);
    if (results === null) {
        return null;
    } else {
        return results[1];
    }
}

function ActualizarCampoDetalle(id, fila, columna, valor) {
    $("#" + id + " tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function TipoEstado() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSEstado/EstadoByClaseEstado/Get?claseestado=7', true);
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



function TipoEstadoSalida() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:15644/EstadoByClaseEstado/Get?claseestado=1', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TE) {
                    $(".cboEstadoSalida").append('<option value="' + TE.iIdEstado + '">' +
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




function TipoEstadoSalidaRequerimiento() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:15644/EstadoByClaseEstado/Get?claseestado=7', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TE) {
                    $(".cboEstadoSalidaRequerimiento").append('<option value="' + TE.iIdEstado + '">' +
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




function TipoEstadoEntrada() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:15644/EstadoByClaseEstado/Get?claseestado=1', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TE) {
                    $(".cboEstadoSalida").append('<option value="' + TE.iIdEstado + '">' +
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

//Funcion que Obtiene la lista de Entidades Financieras getJSON
function GetEntidadFinanciera(vcIdEntidadFinanciera, vcDescripcion) {
    $("#cboEntidadFinanciera").append("<option value=''>--SELECCIONAR--</option>");
    $.getJSON("http://localhost:24252/EntidadFinanciera/GET?vcIdEntidadFinanciera=" + vcIdEntidadFinanciera + "&vcDescripcion=" + vcDescripcion, function (data) {
        $.each(data, function (index, item) {
            $("#cboEntidadFinanciera").append("<option value='" + item.vcIdEntidadFinanciera + "'>" + item.vcDescripcion + "</option>")
        });
    });
}

//Funcion que Obtiene la lista de Entidades Financieras Ajax
function GetEntidadFinancieraAjax() {
}