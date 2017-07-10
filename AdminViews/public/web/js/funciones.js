/// <reference path="../../../Views/Account/EscogerSede.html" />
/// <reference path="../../../Views/RRHH/Tareo.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />
/// <reference path="../../../Views/Shared/Plantilla.html" />
function retornarFecha() {
    var fecha
    fecha = new Date();
    dia = fecha.getDate();
    mes = (fecha.getMonth() + 1);

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }
    var cadena = dia + '/' + mes + '/' + fecha.getFullYear();
    //var cadena = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    // $("#" + fec + "").val(cadena);
    $(".mifecha").val(cadena);
}

function retornarAnio(asd) {
    var fecha
    fecha = new Date();
    var cadena = fecha.getFullYear();
    $("#" + asd + "").text(cadena);
}

function retornarCboAnios() {
    var d;
    d = new Date();
    var anioAct = d.getFullYear();
    anio = parseInt(anioAct) - 2;
        for (var i = 0; i <= 5; i++) {
            $(".mianio").append($('<option value=' + (anio + i) + '>' + (anio + i) + '</option>'));
            if (anioAct == (anio + i)) {
                $(".mianio").val(anioAct);
        }
    }
}

function retornarMes() {
    var fecha
    fecha = new Date();
    //var cadena = (fecha.getMonth() + 1);
    //$("#" + asd + "").text(cadena);

    mes = (fecha.getMonth() + 1);

    if (mes < 10) {
        mes = "0" + mes;
    }
    var cadena = (mes);
    $("#" + asd + "").text(cadena);
}

function retornarDia() {
    var fecha
    fecha = new Date();
    //var cadena = fecha.getDate();
    //$("#" + asd + "").text(cadena);

    dia = fecha.getDate();

    if (dia < 10) {
        dia = "0" + dia;
    }
    var cadena = (dia);
    $("#" + asd + "").text(cadena);
}

function retornarHora(hora) {

    var fecha
    fecha = new Date();
    //+ ':' + fecha.getSeconds()
    var cadena = fecha.getHours() + ':' + fecha.getMinutes();
    $("#" + hora + "").val(cadena);

}

function retornarFechaNombre(mes) {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var f = new Date();
    var cadena = (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
    $("#" + mes + "").text(cadena);
    return cadena;
}

function retornarNombreMes(mes) {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var f = new Date();
    var cadena = meses[f.getMonth()];
    $("#" + mes + "").val(cadena);
    //return cadena;

}

function retornarCboMes(mes) {

    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var l = meses.length, i = 0; j = 1;
    
    while (i < l) {
        if (i < 9) {
           
            $("#cboMes1").append($("<option value=" + '0'+j + "> " + meses[i] + "</option>"));
        } else {
            $("#cboMes1").append($("<option value=" + j + "> " + meses[i] + "</option>"));
        }
            
            i++; j++;
    }
}

function retornarFechaSistema() {
    var i = parent.rowIndex;
    var obj = document.getElementByClassName("fecha").rows[i].cells[18].firstChild;
    var fecha;
    fecha = new Date();
    var cadena = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    obj.valueOf(cadena);
}

function validarUsuarioREST() {

    var Logeado = $("#USU_CENTRO option").length;
    var user1 = $("#USU_LOGIN").val();
    var pass1 = $("#USU_CLAVE").val();

    var xhr = new XMLHttpRequest();
    var dataobj = { user: user1, password: pass1 };
    var obj;

    xhr.open('GET', 'http://localhost:15389/api/Login?user=' + user1 + '&password=' + pass1, true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");
    //if (Logeado != 0) {
    //swal(Logeado);
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;
            if (obj != "0") {
                //if (obj == "CORRECTO") {
                swal("El Usuario y Contraseña son correctos", "", "success")
                $("#USU_LOGIN").prop('readonly', true);
                $("#USU_CLAVE").prop('readonly', true);
                MostrarEscogerSede();
                Logeado = "S";
            }
            else {
                swal("Usuario o Clave incorrecto!")
            }
        }
        else {
            swal("Ocurrió un error al obtener su Usuario y Contraseña!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);
}

function CargarCentros() {

    var iId = $("#USU_ID").val();

    var xhr = new XMLHttpRequest();
    var dataobj = { Id: iId };
    var obj;

    xhr.open('GET', 'http://localhost:15389/api/Login?Id=' + Id, true);
    xhr.responseType = "json";

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            obj = xhr.response;
            if (obj != 0) {
                $.each(CENTROS, function (i, CENTRO) {
                    $("#USU_CENTRO").append('<option value="' + CENTRO.USCE_CEN_CODIGO + '">' +
                        CENTRO.USCE_CENTRO_DENOMINACION + '</option>');
                });
            } else {
                swal('Fallo al obtener Centros.');
            }
        }
    }
}

function CargarAreaNatclar() {
    var iId = $("#VCIDAREANATCLAR").val();

    var xhr = new XMLHttpRequest();
    var dataobj = { Id: iId };
    var obj;
    
    xhr.open('GET', 'http://localhost:63500/Help/Api/GET-AreaByFiltro-Get_filtro' + Id, true)
    xhr.responseType = "json";

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            obj = xhr.response;
            if (obj != 0) {
                $.each(AREAS, function (i, AREA) {
                    $(".cboAreaNatclar104").append('<option value="' + AREA.vcIdAreaNatclar + '">' +
                        AREA.nvDescripcion + '</option>');
                    
                });
            } else {
                swal('Fallo al obtener Area.');
            }
        }
    }
}

function MostrarEscogerSede() {

    var user1 = $("#USU_LOGIN").val();

    //$.session.set("user", "user1");
    sessionStorage.setItem("user1", $("#USU_LOGIN").val())

    setTimeout(" window.location = './EscogerSede.html'", 2000)
};

function ObtenerSede() {
    user2 = sessionStorage.getItem("user1");
    // user2 = sessionStorage.setItem("user1");
    var sede = $("#sede").val();
    sessionStorage.setItem("Sede", $("#sede").val())
    //alert(user2)
    console.log(user2)
    var xhr = new XMLHttpRequest();
    var dataobj = { user: user2 };
    var obj;

    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSSede/SedeByUser/Get?iduser=' + user2, true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Sede) {
                    id_sede = Sede
                    nombre_sede = Sede.DESC_SEDE;
                    $("#TablaSede").append('<td>' +
                        "<input class='enlaceSede' type='button' id='" + Sede.vcIdSede + "' value='" + Sede.vcDescripcion + "'>" +
                        '</td>');
                    //console.log(Sede.ID_SEDE)
                    //console.log(Sede.DESC_SEDE)
                });
            }
            else {
                swal("Usted no cuenta con Sedes asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Sedes!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Sede2() {
sede2 = sessionStorage.getItem("Sede");
var xhr = new XMLHttpRequest();
var obj;
xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSSede/Sede/Get?IdSede=', true);
xhr.responseType = "json";
xhr.onload = function () {
    var status = xhr.status;
    if (status == 200) {
        //console.log(xhr.response);
        obj = xhr.response;
        if (obj != "0") {
            $.each(obj, function (i, Sede) {
                var IdSede = Sede.vcIdSede;
                var Descripcion = Sede.vcDescripcion;
                var attr = "";
                var sede2 = sessionStorage.getItem("Sede");
                if (IdSede == sede2) {
                    attr = "selected='selected'";
                }
                $(".ListaSedes").append('<option value="' + Sede.vcIdSede + '"' + attr + ' >' +
                    Sede.vcDescripcion + '</option>');
            });
        }
        else {
            swal("Usted no cuenta con Sedes asignadas!")
        }
    }
    else {
        swal("Ocurrió un error al obtener Sedes!")
    }
}
xhr.send();
//xhr.send(dataobj);

}

function Sede() {
    sede2 = sessionStorage.getItem("Sede");
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSSede/Sede/Get?IdSede=', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Sede) {
                    if (Sede.ID_SEDE != sede2) {
                        $(".ListaSede").append('<option value="' + Sede.vcIdSede + '">' +
                         Sede.vcDescripcion + '</option>');
                        //console.log(Sede.ID_SEDE)
                        //console.log(Sede.DESC_SEDE)
                    } 
                });
            }
            else {
                swal("Usted no cuenta con Sedes asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Sedes!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function validarUsuarioSOAP() {
    var user1 = $("#USU_LOGIN").val();
    var pass1 = $("#USU_CLAVE").val();

    var xhr = new XMLHttpRequest();

    
    xhr.open('POST', 'http://admin_erp.natclar.com.pe:12000/sWSLogin/sWSLogin.svc?wsdl', true);
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.setRequestHeader("SOAPAction", "http://tempuri.org/ILogin/GetData");
    /*		
    var dataobj = 	'<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';
    dataobj+= 		'	<s:Body>'+
                    '		<GetData xmlns="http://tempuri.org/">'+
                    '<user d4p1:nil="true" xmlns:d4p1="http://www.w3.org/2001/XMLSchema-instance">a</user>'+
                    '<pass d4p1:nil="true" xmlns:d4p1="http://www.w3.org/2001/XMLSchema-instance">a</pass>'+
                    '</GetData>'+
                    '</s:Body>'+
                    '</s:Envelope>';
    
    */
    var dataobj = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    dataobj += '<soapenv:Header/>';
    dataobj += '<soapenv:Body>';
    dataobj += '<tem:GetData>';
    //<!--Optional:-->
    dataobj += '<tem:user>' + user1 + '</tem:user>';
    //<!--Optional:-->
    dataobj += '<tem:pass>' + pass1 + '</tem:pass>';
    dataobj += '</tem:GetData>';
    dataobj += '</soapenv:Body>';
    dataobj += '</soapenv:Envelope>';
    //console.log(dataobj);
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            xml = xhr.responseXML
            json = xmlToJson(xml);
            //console.log(xhr.response);
            //console.log(xhr.responseText);
            //console.log(xhr.responseXML);
            //console.log(json);
            obj = json["s:Envelope"]["s:Body"].GetDataResponse.GetDataResult["#text"];
            console.log(obj)
            if (obj == "TRUE") {
                swal("El Usuario y Contraseña son correctos", "", "success")
                $("#USU_LOGIN").prop('readonly', true);
                $("#USU_CLAVE").prop('readonly', true);
                MostrarEscogerSede();
            }
            else {
                swal("Usuario o Clave incorrecto!")
            }
        } else {
            swal("Ocurrió un error al obtener su Usuario y Contraseña!")
        }
    };

    //xhr.send(JSON.stringify(dataobj));	
    xhr.send(dataobj);
    //xhr.send(xmldoc);
}

function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

function CerrarSesion() {
    $.session.clear();
    localStorage.removeItem('iIdRequerimientoRRHH');
    window.location = "../../index.html"
}

/////////////////////////////////////////////
/////////////////////////////////////////////

function GuardarRequerimiento() {
    //var tableReg = document.getElementById('tabla_oculta_requerimientoactivo101');
    var tableReg = document.getElementById('tblDetalleRequerimientoActivo101');

    
    var cellsOfRow = "";
    jsonObj = [];
    var jsonGlobal = {};
    console.log("entre")     
            
            jsonObjCabecera = [];
            item = {}

            item["vcIdRequerimiento"] = $("#vcIdRequerimiento").val();
            item["vcIdTipoBien"] = $("#cboTipoRequerimiento101").val();
            item["vcIdCentroCosto"] = "201";
            item["vcLogin"] = $("#vcLogin").val();
            item["vcIdTipoMotivo"] = $("#vcIdTipoMotivo");
            item["dFechaRequerimiento"] = $("#dFechaSolicitudRequerimiento101").val();
            item["vcIdTipoMotivo"] = $("#cboMotivoRequerimiento101").val();
            item["vcPrioridad"] = $("#cboPrioridad101").val();
            item["nvObservacion"] = $("#nvObservacionRequerimiento101").val();
            item["iIdEstadoAtencion"] = 26;
            item["iIdEstadoAprobacion"] = 12;
            item["dtFechaMaximaAtencion"] = $("#dFechaSolicitudRequerimiento101").val();
            item["dtFechaAtencion"] = $("#dFechaSolicitudRequerimiento101").val();
            item["nvObservacionRechazo"] = $("#nvObservacionRequerimiento101").val();
            item["bGeneradoporSistema"] = 1;
            item["iIdEstado"] = 1;
            item["iIdEstadoSincronizacion"] = 7;
            item["vcUsuarioCreacionApp"] = $("#vcLogin").val();
            item["vcUsuarioCreacionOT"] = $("#vcLogin").val();
           
            jsonObjCabecera.push(item);

           
            
            jsonObjdetalle = [];
            
    for (var i = 1; i < tableReg.rows.length; i++) {
                itemdetalle = {}

                
                
                cellsOfRow = tableReg.rows[i].getElementsByTagName('td');

               

                //for (var j = 0; j < cellsOfRow.length; j++)
                //{
                    //console.log(cellsOfRow[j].innerHTML.toLowerCase());
                itemdetalle["vcIdRequerimiento"] = $("#vcIdRequerimiento").val();
                itemdetalle["iItem"] = cellsOfRow[1].innerHTML.toLowerCase();
                    itemdetalle["vcCodigoItem"] = cellsOfRow[2].innerHTML.toLowerCase();
                    itemdetalle["vcIdCentroCosto"] = "201";
                    itemdetalle["vcIdPresentacion"] = "1";
                    itemdetalle["numCantidadSolicitada"] = cellsOfRow[4].innerHTML.toLowerCase();
                    itemdetalle["numCantidadAtendida"] = cellsOfRow[4].innerHTML.toLowerCase()
                    itemdetalle["bAtendido"] = 0;
                    itemdetalle["iIdEstado"] = 1;
                    itemdetalle["iIdEstadoSincronizacion"] = 1;
                    itemdetalle["vcIdUnidad"]=1
                    itemdetalle["vcUsuarioCreacionApp"] = $("#vcLogin").val();
                   itemdetalle["vcUsuarioCreacionOT"] = $("#vcLogin").val();
                //}
                jsonObjdetalle.push(itemdetalle);


            }
            //console.log(jsonObjdetalle);
            //console.log("sds");
            jsonObj.push(jsonObjCabecera);
            jsonObj.push(jsonObjdetalle);
            jsonGlobal["requerimiento"] = item;
            jsonGlobal["requerimientodetalle"] = jsonObjdetalle;
            console.log(JSON.stringify(jsonGlobal));



        ;
        var xhr = new XMLHttpRequest();
        var dataobj = jsonObj[0];
        
    //var dataobj = Djsonobj;
        ////console.log(jsonObj[0])

        xhr.open('POST', 'http://localhost:35061/RequerimientoFiltro/Post');
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                swal("El registro de Requerimiento fue exitoso",
                    "NO OLVIDE DE CONFIRMAR EL REQUERIMIENTO..!")
                setTimeout(" window.location = '../../../Views/Purchases/BuscarRequerimientoDetalleCompra'", 2000)
                console.log(xhr.response);

                
            } else {
                swal("Error al grabar..!")
                console.log(status);
            }

            
        };
        //xhr.send(JSON.stringify(jsonObj[0]));
        xhr.send(JSON.stringify(jsonGlobal));
   

}


function GuardarRequerimientoBienes()
{
    //var tableReg = document.getElementById('tabla_oculta_requerimientoactivo101');
    var tableReg = document.getElementById('tblDetalleRequerimientoArticulo101');


    var cellsOfRow = "";
    jsonObj = [];
    var jsonGlobal = {};
    console.log("entre")

    jsonObjCabeceraBienes = [];
    item = {}

    item["vcIdRequerimiento"] = $("#vcIdRequerimiento").val();
    item["vcIdTipoBien"] = $("#cboTipoRequerimiento101").val();
    item["vcIdCentroCosto"] = 201;
    item["vcLogin"] = $("#vcLogin").val();
    item["vcIdTipoMotivo"] = $("#vcIdTipoMotivo");
    item["dFechaRequerimiento"] = $("#dFechaSolicitudRequerimiento101").val();
    item["vcIdTipoMotivo"] = $("#cboMotivoRequerimiento101").val();
    item["vcPrioridad"] = $("#cboPrioridadRequerimiento101").val();
    item["nvObservacion"] = $("#nvObservacionRequerimiento101").val();
    item["iIdEstadoAtencion"] = 26;
    item["iIdEstadoAprobacion"] = 12;
    item["dtFechaMaximaAtencion"] = $("#dFechaSolicitudRequerimiento101").val();
    item["dtFechaAtencion"] = $("#dFechaSolicitudRequerimiento101").val();
    item["nvObservacionRechazo"] = $("#nvObservacionRequerimiento101").val();
    item["bGeneradoporSistema"] = 1;
    item["iIdEstado"] = $("#iIdEstado").val();
    item["iIdEstadoSincronizacion"] = 1;
    item["vcUsuarioCreacionApp"] = $("#vcLogin").val();
    item["vcUsuarioCreacionOT"] = $("#vcLogin").val();

    jsonObjCabeceraBienes.push(item);
    console.log("pruebahuhjuchjbdhydyvdhyvyvyd");
    console.log('arnold' + $("#nvObservacionRequerimiento101").val());


    console.log("prueba");
    console.log('valor' + $("#vcIdRequerimiento").val());
    jsonObjdetalleBienes = [];

    for (var i = 1; i < tableReg.rows.length; i++) {
        itemdetalle = {}



        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');



        //for (var j = 0; j < cellsOfRow.length; j++)
//{
        //console.log(cellsOfRow[j].innerHTML.toLowerCase());
        itemdetalle["vcIdRequerimiento"] = $("#vcIdRequerimiento").val();
        itemdetalle["iItem"] = cellsOfRow[1].innerHTML.toLowerCase();
        itemdetalle["vcCodigoItem"] = cellsOfRow[2].innerHTML.toLowerCase();
        itemdetalle["vcIdCentroCosto"] = 201;
        itemdetalle["vcIdPresentacion"] = "1";
        itemdetalle["numCantidadSolicitada"] = cellsOfRow[5].innerHTML.toLowerCase();
        itemdetalle["numCantidadAtendida"] = cellsOfRow[5].innerHTML.toLowerCase()
        itemdetalle["bAtendido"] = 0;
        itemdetalle["vcIdUnidad"] = 0;
        itemdetalle["iIdEstado"] = 1;
        //itemdetalle["iIdEstadoAtencion"] = 26;
        itemdetalle["iIdEstadoSincronizacion"] = 1;
        itemdetalle["vcUsuarioCreacionApp"] = $("#vcLogin").val();
        itemdetalle["vcUsuarioCreacionOT"] = $("#vcLogin").val();
        //}
        jsonObjdetalleBienes.push(itemdetalle);


    }
    //console.log(jsonObjdetalle);
    //console.log("sds");
    jsonObj.push(jsonObjCabeceraBienes);
    jsonObj.push(jsonObjdetalleBienes);
    jsonGlobal["requerimiento"] = item;
    jsonGlobal["requerimientodetalle"] = jsonObjdetalleBienes;
    console.log(JSON.stringify(jsonGlobal));



    ;
    var xhr = new XMLHttpRequest();
    var dataobj = jsonObj[0];

    //var dataobj = Djsonobj;
    ////console.log(jsonObj[0])

    xhr.open('POST', 'http://localhost:35061/RequerimientoFiltro/Post');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            swal("El registro de Requerimiento fue exitoso",
                "NO OLVIDE DE CONFIRMAR EL REQUERIMIENTO..!")
            setTimeout(" window.location = '../../../Views/Purchases/BuscarRequerimientoDetalleCompra'", 2000)
            console.log(xhr.response);
            
           
        } else {
            swal("Error al grabar..!")
            console.log(status);
        }


    };
    //xhr.send(JSON.stringify(jsonObj[0]));
    xhr.send(JSON.stringify(jsonGlobal));

}



function GuardarSalida()
{

    var tableReg = document.getElementById('tblDetalleSalida54');

    var cellsOfRow = "";
    jsonObj = [];
    var jsonGlobal = {};
    console.log("entre")

    jsonObjCabeceraSalida = [];
    item = {}

    item = {}
    item["vcIdSalida"] = $("#vcIdSalida").val();
    item["vcIdAlmacen"] = "0083";
    item["vcIdRequerimiento"] = 1;
    item["vcIdTipoOperacion"] = $("#vcIdTipoOperacion").val();
    item["vcLogin"] = $("#vcLogin").val();
    item["dtFecha"] = $("#dFechaSalida54").val();
    item["iIdTipoDocumento"] = $("#iIdTipoDocumento").val();
    item["vcSerieDocumento"] = $("#vcSerieSalida54").val();
    item["iNumeroDocumento"] = $("#vcNumeroSalida54").val();
    item["vcRutaArchivo"] = $("#vcRutaArchivo").val();
    item["nvObservacion"] = $("#nvObservacionSalida54").val();
    item["bConfirmado"] = 0;
    item["dtFechaRecepcionado"] = $("#dtFechaRecepcionado").val();
    item["iIdEstadoRecepcionado"] = 1;
    item["iIdEstado"] = 1;
    item["iIEstadoSincronizacion"] = 1;
    item["vcUsuarioApp"] = $("#vcLoginp").val();
    item["vcUsuarioOT"] = $("#vcLogin").val();

    jsonObjCabeceraSalida.push(item);

    jsonObjdetalleSalida = [];
            
    for (var i = 1; i < tableReg.rows.length; i++)
    {
        itemdetalle = {}

                
                
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');

        //for (var j = 0; j < cellsOfRow.length; j++)
        //{
        //console.log(cellsOfRow[j].innerHTML.toLowerCase());
        itemdetalle["vcIdSalida"] = $("#vcIdSalida").val();
        itemdetalle["iItem"] = cellsOfRow[1].innerHTML.toLowerCase();
        itemdetalle["vcCodigoItem"] = cellsOfRow[2].innerHTML.toLowerCase();
        itemdetalle["vcIdSubAlmacen"] = cellsOfRow[4].innerHTML.toLowerCase();
       
        itemdetalle["vcIdSubAlmacen"] = cellsOfRow[5].innerHTML.toLowerCase();
  
        itemdetalle["vcIdPresentacion"] = cellsOfRow[6].innerHTML.toLowerCase();
        itemdetalle["vcIdPresentacion"] = cellsOfRow[7].innerHTML.toLowerCase();

        itemdetalle["numCantidad"] = cellsOfRow[8].innerHTML.toLowerCase();
        itemdetalle["vcIdCentroCosto"] = 201;
        itemdetalle["iIdEstado"] = 1;
        itemdetalle["iIdEstadoSincronizacion"] = 1;
        itemdetalle["vcUsuarioApp"] = $("#vcUsuarioApp").val();
        itemdetalle["vcUsuarioOT"] = $("#vcUsuarioOT").val();
        //}
        jsonObjdetalleSalida.push(itemdetalle);


    }
    //console.log(jsonObjdetalle);
    //console.log("sds");
    jsonObj.push(jsonObjCabeceraSalida);
    jsonObj.push(jsonObjdetalleSalida);
    jsonGlobal["salida"] = item;
    jsonGlobal["salidadetalle"] = jsonObjdetalleSalida;
    console.log(JSON.stringify(jsonGlobal));



    ;
    var xhr = new XMLHttpRequest();
    var dataobj = jsonObj[0];

    xhr.open('POST', 'http://localhost:28959/SalidaByFiltro/Post');
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            swal("El registro de Salida fue exitoso",
                "NO OLVIDE DE CONFIRMAR LA SALIDA..!")
            setTimeout(" window.location = '../../../Views/Purchases/BuscarSalida'", 2000)
            console.log(xhr.response);
        } else {
            swal("Error al grabar..!")
            
            console.log(status);
        }
    };
    xhr.send(JSON.stringify(jsonGlobal));
    
}

        
        


function GuardarAsistencia() {
    //alert("GuardarTareo")
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

function AgregarDetalleEntrada() {
  

    if ($("#vcCodigoEntrada53").val() == "") {
        swal("Ingrese codigo")
        $("#vcCodigoEntrada53").focus();
        return;
    }
    if ($("#vcDescripcionEntrada53").val() == "") {
        swal("Ingrese descripcion")
        $("#vcDescripcionEntrada53").focus();
        return;
        //alert("Ingrese Descripcion")
    }
    if ($("#cboSubAlmacenEntrada53").val() == "") {
        //swal("Ingrese subalmacen")
        //$("#cboSubAlmacenEntrada53").focus();
        //return;
        //alert("Ingrese Divisonaria")
    }
    if ($("#cboPresentacionEntrada53").val() == "") {
        //swal("Ingrese presentacion")
        //$("#cboPresentacionEntrada53").focus();
        //return;
        //alert("Ingrese Presentacion")
    }
    if ($("#intCantidadEntrada53").val() == "") {
        swal("Ingrese cantidad")
        $("#intCantidadEntrada53").focus();
        return;
        //alert("Ingrese Cantidad")
    }
   

    if ($("#intCantidadEntrada53").val() == 0) {
        swal("Ingrese cantidad Valida")
        return;
    }
    if ($("#intCantidadEntrada53").val() < 0) {
        swal("Ingrese cantidad Valida")
        $("#intCantidadEntrada53").focus();
        return;
    }
   


    //fila = parseInt($("#CantidadItemsEntrada53").text());
    //var nuevo = 0;
    //var existe = 0;
    //if (fila == 0) {
    //    $("#tabla_oculta_entrada tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleEntrada53 tbody");

    //    $("#CantidadItemsEntrada53").text(parseInt($("#CantidadItemsEntrada53").text()) + 1);

    //    fila = 1;
    //    existe = 1;

    //}

    //$("#tblDetalleEntrada53 tr").find('td:eq(2)').each(function () {

    //    if ($(this).text() == $("#vcCodigoEntrada53").val()) {
    //        fila = $(this).parent().find('td:eq(1)').text();
    //        existe = 1;
    //    }
    //    else {
    //        nuevo = 1;
    //    }
    //})
    //if (existe == 0) {

    //    $("#CantidadItemsEntrada53").text(parseInt($("#CantidadItemsEntrada53").text()) + 1);

    //    fila = parseInt($("#CantidadItemsEntrada53").text());
    //}

    //if (nuevo == 1 && existe == 0 && fila != 1) {

    //    $("#tabla_oculta_entrada tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleEntrada53 tbody");

    //}

    
    //if ($("#vcCodigoEntrada53").val() == "") {
    if ($("#Entrada_item").val() == "") {

        //CantidadItemsRequerimientoActivo101
        $("#tabla_oculta_entrada tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleEntrada53 tbody");
        $("#CantidadItemsEntrada53").text(parseInt($("#CantidadItemsEntrada53").text()) + 1);
        fila = parseInt($("#CantidadItemsEntrada53").text());
    }
    else {
        fila = parseInt($("#Entrada_item").val());
    }
    //$("#tabla_oculta_entrada tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleEntrada53 tbody");
    //$("#CantidadItemsEntrada53").text(parseInt($("#CantidadItemsEntrada53").text()) + 1);
    //fila = parseInt($("#CantidadItemsEntrada53").text());
    ActualizarCampoDetalleEntrada(fila, 1, $("#CantidadItemsEntrada53").text());
    ActualizarCampoDetalleEntrada(fila, 2, $("#vcCodigoEntrada53").val());
    ActualizarCampoDetalleEntrada(fila, 3, $("#vcDescripcionEntrada53").val());
    ActualizarCampoDetalleEntrada(fila, 4, $("#cboSubAlmacenEntrada53").val());
    ActualizarCampoDetalleEntrada(fila, 5, $("#cboSubAlmacenEntrada53 option:selected").html());
    ActualizarCampoDetalleEntrada(fila, 6, $("#cboPresentacionEntrada53").val());
    ActualizarCampoDetalleEntrada(fila, 7, $("#cboPresentacionEntrada53 option:selected").html());
    ActualizarCampoDetalleEntrada(fila, 8, $("#intCantidadEntrada53").val());
    ActualizarCampoDetalleEntrada(fila, 9, $("#vcSede16").val());

    LimpiarDetalleEntrada();
}

function ActualizarCampoDetalleEntrada(fila, columna, valor) {
    $("#tblDetalleEntrada53 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleEntrada() {
    $("#Entrada_item").val("");
    $("#vcCodigoEntrada53").val("");
    $("#vcDescripcionEntrada53").val("");
    $("#cboSubAlmacenEntrada53").val("");
    $("#cboPresentacionEntrada53").val("");
    $("#intCantidadEntrada53").val("");
}

function ActualizarNumeroItemEntrada() {
    var i = 1;
    $("#tblDetalleEntrada53 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function AgregarDetalleTraslado() {
    //var bono = $("#Bono option:selected").html();
    //var cantidad = $("#Cantidad").val();

    if ($("#vcCodigo49").val() == "") {
        alert("Ingrese Codigo")
    }
    //if ($("#vcSubAlmacen49").val() == "") {
    //    alert("Ingrese SubAlmacen")
    //}
    if ($("#vcPresentacion49").val() == "") {
        alert("Ingrese Presentacion")
    }
    if ($("#intCantidad49").val() == "") {
        alert("Ingrese Cantidad")
    }
    if ($("#vcSede16").val() == "") {
        alert("Ingrese Cantidad")
    }

    $("#tabla_oculta_traslado tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleTraslado49 tbody");
    $("#CantidadItemsTraslado").text(parseInt($("#CantidadItemsTraslado").text()) + 1);
    fila = parseInt($("#CantidadItemsTraslado").text());
    ActualizarCampoDetalleTraslado(fila, 1, $("#CantidadItemsTraslado").text());
    ActualizarCampoDetalleTraslado(fila, 2, $("#vcCodigo49").val());
    ActualizarCampoDetalleTraslado(fila, 3, $("#vcSubAlmacen49").val());
    ActualizarCampoDetalleTraslado(fila, 4, $("#vcPresentacion49").val());
    ActualizarCampoDetalleTraslado(fila, 5, $("#intCantidad49").val());
    ActualizarCampoDetalleTraslado(fila, 6, $("#vcSede16").val());

    LimpiarDetalleEntrada();
}

function ActualizarCampoDetalleTraslado(fila, columna, valor) {
    $("#tblDetalleTraslado49 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleTraslado() {
    $("#vcCodigo53").val("");
    $("#vcSubAlmacen49").val("");
    $("#vcPresentacion49").val("");
    $("#intCantidad49").val("");
}

function ActualizarNumeroItemTraslado() {
    var i = 1;
    $("#tblDetalleEntrada49 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function AgregarDetalleSalida() {
    //var bono = $("#Bono option:selected").html();
    //var cantidad = $("#Cantidad").val();

    if ($("#vcCodigoSalida54").val() == "") {
        swal("Ingrese Codigo")
        return;
    }
    if ($("#nvDecripciónSalida54").val() == "") {
        swal("Ingrese Descripcion")
        return;
    }
    if ($("#cboSubAlmacenSalida54").val() == "") {
        swal("Ingrese Divisionaria")
        return;
    }
    if ($("#cboPresentacionSalida54").val() == "") {
        swal("Ingrese Presentacion")
        return;
    }

    if ($("#intCantidadSalida54").val() == "") {
        swal("Ingrese cantidad ")
        return;
    }
  

    if ($("#intCantidadSalida54").val() == 0) {
        swal("Ingrese cantidad Valida")
        return;
    }
    if ($("#intCantidadSalida54").val() < 0) {
        swal("Ingrese cantidad Valida")
        $("#intCantidadSalida54").focus();
        return;
    }
  

    fila = parseInt($("#CantidadItemsSalida54").text());
    var nuevo = 0;
    var existe = 0;
    if (fila == 0) {
        $("#tabla_oculta_salida tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleSalida54 tbody");

        $("#CantidadItemsSalida54").text(parseInt($("#CantidadItemsSalida54").text()) + 1);

        fila = 1;
        existe = 1;
       
    }

    $("#tblDetalleSalida54 tr").find('td:eq(2)').each(function () {

        if ($(this).text() == $("#vcCodigoSalida54").val()) {
            fila = $(this).parent().find('td:eq(1)').text();
            existe = 1;
        }
        else {
            nuevo = 1;
        }
    })
    if (existe == 0) {

        $("#CantidadItemsSalida54").text(parseInt($("#CantidadItemsSalida54").text()) + 1);

        fila = parseInt($("#CantidadItemsSalida54").text());
    }
    if (nuevo == 1 && existe == 0 && fila != 1) {

        $("#tabla_oculta_salida tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleSalida54 tbody");
        
    }

    //$("#tabla_oculta_salida tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleSalida54 tbody");
    //$("#CantidadItemsSalida54").text(parseInt($("#CantidadItemsSalida54").text()) + 1);
    //fila = parseInt($("#CantidadItemsSalida54").text());
    ActualizarCampoDetalleSalida(fila, 1, $("#CantidadItemsSalida54").text());
    ActualizarCampoDetalleSalida(fila, 2, $("#vcCodigoSalida54").val());
    ActualizarCampoDetalleSalida(fila, 3, $("#nvDecripciónSalida54").val());
    ActualizarCampoDetalleSalida(fila, 4, $("#cboSubAlmacenSalida54").val());
    ActualizarCampoDetalleSalida(fila, 5, $("#cboSubAlmacenSalida54 option:selected").html());
    ActualizarCampoDetalleSalida(fila, 6, $("#cboPresentacionSalida54").val());
    ActualizarCampoDetalleSalida(fila, 7, $("#cboPresentacionSalida54 option:selected").html());
    ActualizarCampoDetalleSalida(fila, 8, $("#intCantidadSalida54").val());
    ActualizarCampoDetalleSalida(fila, 9, $("#vcSede16").val());

    LimpiarDetalleSalida();
}

function ActualizarCampoDetalleSalida(fila, columna, valor) {
    $("#tblDetalleSalida54 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleSalida() {
    $("#vcCodigoSalida54").val("");
    $("#nvDecripciónSalida54").val("");
    $("#cboSubAlmacenSalida54").val("");
    $("#cboPresentacionSalida54").val("");
    $("#intCantidadSalida54").val("");
}

function ActualizarNumeroItemSalida() {
    var i = 1;
    $("#tblDetalleSalida54 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function AgregarDetalleRequerimientoActivo() {
    var fila = 0;

    //if ($("#vcCodigoRequerimientoActivo101").val() == "") {
    //    swal("Ingrese codigo")
    //    $("#Cantidad").focus();
    //    return;
    //    //alert("Ingrese Codigo")
    //}
    if ($("#vcDescripcionRequerimientoActivo101").val() == "") {
        swal("Ingrese descripcion")
        $("#vcDescripcionRequerimientoActivo101").focus();
        return;
        //alert("Ingrese Descripción")
    }

    if ($("#intCantidadRequerimientoActivo101").val() == "")
    {
        swal("Ingrese cantidad")
        return;
    }

    if (parseInt($("#intCantidadRequerimientoActivo101").val()) == 0)
    {

        swal("Ingrese cantidad Valida")
        return;
    }
    if (parseInt($("#intCantidadRequerimientoActivo101").val()) < 0)
    {
        swal("Ingrese cantidad Valida")
        $("#intCantidadRequerimientoActivo101").focus();
        return;
        //alert("Ingrese Cantidad")
    }


    //if ($("#vcSedeOrigen").val() == "") {
    //    swal("Ingrese Centro Costo")
    //    $("#vcSedeOrigen").focus();
    //    return;
    //    //alert("Ingrese Descripción")
    //}


    //    if ($("#vcCodigoRequerimientoActivo101").val() == "") {
    if ($("#Servicio_item").val() == "") {

        //CantidadItemsRequerimientoActivo101
        $("#tabla_oculta_requerimientoactivo101 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleRequerimientoActivo101 tbody");
        $("#CantidadItemsRequerimientoActivo101").text(parseInt($("#CantidadItemsRequerimientoActivo101").text()) + 1);
        fila = parseInt($("#CantidadItemsRequerimientoActivo101").text());
        }
        else {
        fila = parseInt($("#Servicio_item").val());
        }



    ActualizarCampoDetalleRequerimientoActivo(fila, 1, $("#CantidadItemsRequerimientoActivo101").text());
    ActualizarCampoDetalleRequerimientoActivo(fila, 2, $("#vcCodigoRequerimientoActivo101").val());
    ActualizarCampoDetalleRequerimientoActivo(fila, 3, $("#vcDescripcionRequerimientoActivo101").val());
    ActualizarCampoDetalleRequerimientoActivo(fila, 4, $("#intCantidadRequerimientoActivo101").val());
    ActualizarCampoDetalleRequerimientoActivo(fila, 5, $("#vcSedeOrigen").val());

    LimpiarDetalleRequerimientoActivo();
}

function ActualizarCampoDetalleRequerimientoActivo(fila, columna, valor) {
    $("#tblDetalleRequerimientoActivo101 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleRequerimientoActivo() {
    $("#Servicio_item").val("");
    $("#vcCodigoRequerimientoActivo101").val("");
    $("#vcDescripcionRequerimientoActivo101").val("");
    $("#intCantidadRequerimientoActivo101").val("");
}

function ActualizarNumeroItemRequerimientoActivo() {
    var i = 1;
    $("#tblDetalleRequerimientoActivo101 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}


var item = 0;
function AgregarDetalleRequerimientoArticulo() {

    //var fila = 0;

    //if ($("#vcCodigoRequerimientoArticulo101").val() == "") {
    //    swal("Ingrese codigo")
    //    $("#vcCodigoRequerimientoArticulo101").focus();
    //    return;
    //    //alert("Ingrese Codigo")
    //}
    if ($("#vcDescripcionRequerimientoArticulo101").val() == "") {
        swal("Ingrese descripcion")
        $("#vcDescripcionRequerimientoArticulo101").focus();
        return;
        //alert("Ingrese Descripción")
    }

    if ($("#nvUnidadMedidaRequerimientoArticulo101").val() == "") {
        swal("Ingrese unidad medida")
        $("#nvUnidadMedidaRequerimientoArticulo101").focus();
        return;

        //alert("Ingrese Unidad Medida")
    }

    if ($("#intCantidadRequerimientoArticulo101").val() == "") {
        swal("Ingrese cantidad")
        $("#intCantidadRequerimientoArticulo101").focus();
        return;}

    if (parseInt($("#intCantidadRequerimientoArticulo101").val()) == 0)
    {

        swal("Ingrese cantidad Valida")
        return;
        }
    if (parseInt($("#intCantidadRequerimientoArticulo101").val()) < 0)
    {
        swal("Ingrese cantidad Valida")
        $("#intCantidadRequerimientoArticulo101").focus();
        return;
        //alert("Ingrese Cantidad")
        }

    //if ($("#vcSede16").val() == "") {
    //    swal("Ingrese Centro Costo")
    //    $("#vcSede16").focus();
    //    return;
    //    //alert("Ingrese Descripción")
    //}
    var vcDescripcionRequerimientoArticulo101 = $("#vcDescripcionRequerimientoArticulo101").val();
    var nvUnidadMedidaRequerimientoArticulo101 = $("#nvUnidadMedidaRequerimientoArticulo101").val();
    var vcCodigoRequerimientoArticulo101 = $("#vcCodigoRequerimientoArticulo101").val();
    var intCantidadRequerimientoArticulo101 = $("#intCantidadRequerimientoArticulo101").val();

    item = $("#tblDetalleRequerimientoArticulo101 tr").length;
    //    if ($("#vcCodigoRequerimientoActivo101").val() == "") {
    if ($("#Bienes_item").val() == "") {

        //CantidadItemsRequerimientoActivo101
        //$("#tabla_oculta_requerimientoarticulo101 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleRequerimientoArticulo101 tbody");
        
        $("#tblDetalleRequerimientoArticulo101 tbody").append('<tr><td><button type="button" class="btn btn-danger btn-xs" id="QuitarRequerimientoArticulo"><span class="glyphicon glyphicon-remove"></span></button>' +
           '<button type="button" class="btn btn-success btn-xs" id="ModificarRequerimientoArticulo"><span class="glyphicon glyphicon-pencil"></span></button></td>' +
                                          '<td >' + item + '</td>' +
                                           '<td>' + vcCodigoRequerimientoArticulo101 + '</td>' +
                                           '<td>' + vcDescripcionRequerimientoArticulo101 + '</td>' +
                                           '<td>' + nvUnidadMedidaRequerimientoArticulo101 + '</td>' +
                                           '<td>' + intCantidadRequerimientoArticulo101 + '</td>' +
                                           '</td></tr>');

        $("#CantidadItemsRequerimientoArticulo101").text(item);
        fila = parseInt($("#CantidadItemsRequerimientoArticulo101").text());
       // console.log("tamaño de tabla:" +  );
    }
    else {
        fila = parseInt($("#Bienes_item").val());
        fila = fila - 1;
    }


    ActualizarCampoDetalleRequerimientoArticulo(fila, 1, $("#CantidadItemsRequerimientoArticulo101").text());
    ActualizarCampoDetalleRequerimientoArticulo(fila, 2, $("#vcCodigoRequerimientoArticulo101").val());
    ActualizarCampoDetalleRequerimientoArticulo(fila, 3, $("#vcDescripcionRequerimientoArticulo101").val());
    ActualizarCampoDetalleRequerimientoArticulo(fila, 4, $("#nvUnidadMedidaRequerimientoArticulo101").val());
    ActualizarCampoDetalleRequerimientoArticulo(fila, 5, $("#intCantidadRequerimientoArticulo101").val());
    ActualizarCampoDetalleRequerimientoArticulo(fila, 6, $("vcSede16").val());

    LimpiarDetalleRequerimientoArticulo();
}

function ActualizarCampoDetalleRequerimientoArticulo(fila, columna, valor) {
    $("#tblDetalleRequerimientoArticulo101 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleRequerimientoArticulo() {
    $("#Bienes_item").val("");
    $("#vcCodigoRequerimientoArticulo101").val("");
    $("#vcDescripcionRequerimientoArticulo101").val("");
    $("#nvUnidadMedidaRequerimientoArticulo101").val("");
    $("#intCantidadRequerimientoArticulo101").val("");
}

function ActualizarNumeroItemRequerimientoArticulo() {
    var i = 1;
    $("#tblDetalleRequerimientoArticulo101 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index >= 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function CalcularTotal() {
    var inafecto = false;
    var SubTotal = 0;
    var Igv = 0;
    var Total = 0;
    var Precio = 0;
    var Cantidad = 0;
    var Importe = 0;
    var Resultado = 0;
    $("#tblDetalleOrdenCompra57 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 9) {
                    if ($(this).find("input[type=checkbox]").is(':checked'))
                        inafecto = true;
                    else
                        inafecto = false;
                }
                if (index2 == 10) {
                    SubTotal = SubTotal + parseFloat($(this).text());
                    if (inafecto == false)
                        Igv = Igv + parseFloat($(this).text()) * 0.18;
                }
            })
        }
    })

    Total = SubTotal + Igv;
    $("#numSubTotalOrdenCompra57").val(SubTotal.toFixed(2));
    $("#numIGVOrdenCompra57").val(Igv.toFixed(2));
    $("#numTotalOrdenCompra57").val(Total.toFixed(2));


}


function AgregarDetalleOrdenCompra() {

    if ($("#vcCodigoOrdenCompras57").val() == "") {
        alert("Ingrese Codigo")
    }
    if ($("#nvDescripcionOrdenCompra57").val() == "") {
        alert("Ingrese Descripcion")
    }
    //if ($("#nvUnidadMedidaOrdenCompra57").val() == "") {
    //    alert("Ingrese UnidadMedida")
    //}
    if ($("#cboPresentacionOrdenCompra57").val() == "") {
        alert("Ingrese Presentacion")
    }
    if ($("#nvCantidadOrdenCompra57").val() == "") {
        alert("Ingrese Cantidad")
    }

    if ($("#nvPrecioOrdenCompra57").val() == "") {
        alert("Ingrese Precio")
    }

    fila = parseInt($("#CantidadItemsOrdenCompra57").text());
    var nuevo = 0;
    var existe = 0;
    if (fila == 0) {
        $("#tabla_oculta_ordencompra57 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleOrdenCompra57 tbody");

        $("#CantidadItemsOrdenCompra57").text(parseInt($("#CantidadItemsOrdenCompra57").text()) + 1);

        fila = 1;
        existe = 1;
    }

    $("#tblDetalleOrdenCompra57 tr").find('td:eq(2)').each(function () {

        if ($(this).text() == $("#vcCodigoOrdenCompras57").val()) {
            fila = $(this).parent().find('td:eq(1)').text();
            existe = 1;
        }
        else {
            nuevo = 1;
        }
    })
    if (existe == 0) {

        $("#CantidadItemsOrdenCompra57").text(parseInt($("#CantidadItemsOrdenCompra57").text()) + 1);

        fila = parseInt($("#CantidadItemsOrdenCompra57").text());
    }

    if (nuevo == 1 && existe == 0 && fila != 1) {

        $("#tabla_oculta_ordencompra57 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleOrdenCompra57 tbody");

    }

    ActualizarCampoDetalleOrdenCompra(fila, 1, $("#CantidadItemsOrdenCompra57").text());
    ActualizarCampoDetalleOrdenCompra(fila, 2, $("#vcCodigoOrdenCompras57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 3, $("#nvDescripcionOrdenCompra57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 4, $("#nvUnidadMedidaOrdenCompra57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 5, $("#cboPresentacionOrdenCompra57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 6, $("#cboPresentacionOrdenCompra57 option:selected").html());
    ActualizarCampoDetalleOrdenCompra(fila, 8, $("#nvCantidadOrdenCompra57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 7, $("#nvPrecioOrdenCompra57").val());
    ActualizarCampoDetalleOrdenCompra(fila, 10, parseFloat($("#nvCantidadOrdenCompra57").val()) * parseFloat($("#nvPrecioOrdenCompra57").val()));


    LimpiarDetalleOrdenCompra();
    //ActualizarNumeroItemOrdenCompra();
    CalcularTotal();

}

function ActualizarCampoDetalleOrdenCompra(fila, columna, valor) {

    $("#tblDetalleOrdenCompra57 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleOrdenCompra() {
    $("#vcCodigoOrdenCompras57").val("");
    $("#nvDescripcionOrdenCompra57").val("");
    $("#nvUnidadMedidaOrdenCompra57").val("");
    $("#cboPresentacionOrdenCompra57").val("");
    $("#nvCantidadOrdenCompra57").val("");
    $("#nvPrecioOrdenCompra57").val("");
    $("#numSubTotalOrdenCompra57").val("");
    $("#numIGVOrdenCompra57").val("");
    $("#numTotalOrdenCompra57").val("");

    //ActualizarNumeroItemOrdenCompra();
    CalcularTotal();
}

function ActualizarNumeroItemOrdenCompra() {
    var i = 1;



    $("#tblDetalleOrdenCompra57 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function CalcularTotalCuotas() {
    var Total = 0;
    $("#tblDetalleOrdenCompra57 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 7) {
                    Total = Total + parseFloat($(this).text());
                }
            })
        }
    })
    $("#numTotalOrdenCompra57").val(Total.toFixed(2));
}

function AgregarDetalleCotizacion() {

    if ($("#vcCodigoCotizacion106").val() == "") {
        alert("Ingrese Codigo")
    }
    if ($("#vcDescripcionCotizacion106").val() == "") {
        alert("Ingrese Descripcion")
    }

    if ($("#vcUnidadMedidaCotizacion106").val() == "") {
        alert("Ingrese UnidadMedida")
    }
    if ($("#vcCantidadCotizacion106").val() == "") {
        alert("Ingrese Cantidad")
    }

    if ($("#vcPrecioCotizacion106").val() == "") {
        alert("Ingrese Precio")
    }

    fila = parseInt($("#CantidadItemsCotizacion106").text());
    var nuevo = 0;
    var existe = 0;
    if (fila == 0) {
        $("#tabla_oculta_cotizacion106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacion106 tbody");

        $("#CantidadItemsCotizacion106").text(parseInt($("#CantidadItemsCotizacion106").text()) + 1);

        fila = 1;
        existe = 1;
    }

    $("#tblDetalleCotizacion106 tr").find('td:eq(2)').each(function () {

        if ($(this).text() == $("#vcCodigoCotizacion106").val()) {
            fila = $(this).parent().find('td:eq(1)').text();
            existe = 1;
        }
        else {
            nuevo = 1;
        }
    })
    if (existe == 0) {

        $("#CantidadItemsCotizacion106").text(parseInt($("#CantidadItemsCotizacion106").text()) + 1);

        fila = parseInt($("#CantidadItemsCotizacion106").text());
    }

    if (nuevo == 1 && existe == 0 && fila != 1) {

        $("#tabla_oculta_cotizacion106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacion106 tbody");

    }


    //$("#tabla_oculta_cotizacion106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacion106 tbody");
    //$("#CantidadItemsCotizacion106").text(parseInt($("#CantidadItemsCotizacion106").text()) + 1);
    //fila = parseInt($("#CantidadItemsCotizacion106").text());

    ActualizarCampoDetalleCotizacion(fila, 1, $("#CantidadItemsCotizacion106").text());
    ActualizarCampoDetalleCotizacion(fila, 2, $("#vcCodigoCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 3, $("#vcDescripcionCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 4, $("#vcUnidadMedidaCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 5, $("#vcCantidadCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 6, $("#vcPrecioCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 8, parseFloat($("#vcPrecioCotizacion106").val()) * parseFloat($("#vcCantidadCotizacion106").val()));


    LimpiarDetalleCotizacion();
    CalcularTotalCotizacion();
    //ActualizarNumeroItemOrdenCompra();
    //CalcularTotalCotizacion();

}

function ActualizarCampoDetalleCotizacion(fila, columna, valor) {

    $("#tblDetalleCotizacion106 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleCotizacion() {
    $("#vcCodigoCotizacion106").val("");
    $("#vcUnidadMedidaCotizacion106").val("");
    $("#vcCantidadCotizacion106").val("");
    $("#vcPrecioCotizacion106").val("");
    CalcularTotalCotizacion();

    //ActualizarNumeroItemOrdenCompra();
    //CalcularTotal();
}

function ActualizarNumeroItemCotizacion() {
    var i = 1;



    $("#tblDetalleCotizacion106 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function CalcularTotalCuotas() {
    var Total = 0;
    $("#tblDetalleCotizacion106 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 9) {
                    Total = Total + parseFloat($(this).text());
                }
            })
        }
    })
    $("#numTotalCotizacion106").val(Total.toFixed(2));
}

function CalcularTotalCotizacion() {
    var inafecto = false;
    var SubTotal = 0;
    var Igv = 0;
    var Total = 0;
    var Precio = 0;
    var Cantidad = 0;
    var Importe = 0;
    var Resultado = 0;
    $("#tblDetalleCotizacion106 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 8) {
                    if ($(this).find("input[type=checkbox]").is(':checked'))
                        inafecto = true;
                    else
                        inafecto = false;
                }
                if (index2 == 9) {
                    SubTotal = SubTotal + parseFloat($(this).text());
                    if (inafecto == false)
                        Igv = Igv + parseFloat($(this).text()) * 0.18;
                }
            })
        }
    })

    Total = SubTotal + Igv;
    $("#numSubTotalCotizacion106").val(SubTotal.toFixed(2));
    $("#numIGVCotizacion106").val(Igv.toFixed(2));
    $("#numTotalCotizacion106").val(Total.toFixed(2));


}

function AgregarDetalleCotizacionPago() {

    if ($("#cboCondicionPagoDetalleCotizacion106").val() == "") {
        alert("Ingrese Codigo")
    }
    if ($("#vcDiasCotizacion106").val() == "") {
        alert("Ingrese Descripcion")
    }

    if ($("#cboFormaPagoCotizacion106").val() == "") {
        alert("Ingrese UnidadMedida")
    }
    if ($("#vcMontoCuotaCotizacion106").val() == "") {
        alert("Ingrese Monto Cuota")
    }

    

    fila = parseInt($("#CantidadItemsCotizacionPago106").text());
    var nuevo = 0;
    var existe = 0;
    if (fila == 0) {
        $("#tabla_oculta_cotizaciondetalle106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacionPago106 tbody");

        $("#CantidadItemsCotizacionPago106").text(parseInt($("#CantidadItemsCotizacionPago106").text()) + 1);

        fila = 1;
        existe = 1;
    }

    $("#tblDetalleCotizacionPago106 tr").find('td:eq(2)').each(function () {

        if ($(this).text() == $("#cboCondicionPagoDetalleCotizacion106").val()) {
            fila = $(this).parent().find('td:eq(1)').text();
            existe = 1;
        }
        else {
            nuevo = 1;
        }
    })
    if (existe == 0) {

        $("#CantidadItemsCotizacionPago106").text(parseInt($("#CantidadItemsCotizacionPago106").text()) + 1);

        fila = parseInt($("#CantidadItemsCotizacionPago106").text());
    }

    if (nuevo == 1 && existe == 0 && fila != 1) {

        $("#tabla_oculta_cotizaciondetalle106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacionPago106 tbody");

    }


    //$("#tabla_oculta_cotizacion106 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleCotizacion106 tbody");
    //$("#CantidadItemsCotizacion106").text(parseInt($("#CantidadItemsCotizacion106").text()) + 1);
    //fila = parseInt($("#CantidadItemsCotizacion106").text());

    ActualizarCampoDetalleCotizacion(fila, 1, $("#CantidadItemsCotizacionPago106").text());
    ActualizarCampoDetalleCotizacion(fila, 2, $("#cboCondicionPagoDetalleCotizacion106").val());
    ActualizarCampoDetalleOrdenCompra(fila, 3, $("#cboCondicionPagoDetalleCotizacion106 option:selected").html());
    ActualizarCampoDetalleCotizacion(fila, 4, $("#vcDiasCotizacion106").val());
    ActualizarCampoDetalleCotizacion(fila, 5, $("#cboFormaPagoCotizacion106").val());
    ActualizarCampoDetalleOrdenCompra(fila, 6, $("#cboFormaPagoCotizacion106 option:selected").html());
    ActualizarCampoDetalleCotizacion(fila, 7, $("#vcMontoCuotaCotizacion106").val());
   
   


    LimpiarDetalleCotizacionPago();
   
    //ActualizarNumeroItemOrdenCompra();
    //CalcularTotalCotizacion();

}

function ActualizarDetalleCotizacion(fila, columna, valor) {

    $("#tblDetalleCotizacionPago106 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);
                return;
            }
        })
    })
}

function LimpiarDetalleCotizacionPago() {
    $("#cboCondicionPagoDetalleCotizacion106").val("");
    $("#vcDiasCotizacion106").val("");
    $("#cboFormaPagoCotizacion106").val("");
    $("#vcCantidadCotizacion106").val("");
   
    //ActualizarNumeroItemOrdenCompra();
    //CalcularTotal();
}

function ActualizarNumeroItemCotizacion() {
    var i = 1;



    $("#tblDetalleCotizacionPago106 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function CalcularTotalCuotas() {
    var Total = 0;
    $("#tblDetalleCotizacionPago106 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 9) {
                    Total = Total + parseFloat($(this).text());
                }
            })
        }
    })
    $("#numTotalCotizacionPago106").val(Total.toFixed(2));
}

function AgregarDetalleOrdenCompraPago() {
    //var bono = $("#Bono option:selected").html();
    //var cantidad = $("#Cantidad").val();

    if ($("#cboCondicionOrdenCompraPago57").val() == "") {
        alert("Ingrese Condicion")
    }
    if ($("#nvDiasOrdenCompraPago57").val() == "") {
        alert("Ingrese Dias")
    }

    if ($("#cboMedioOrdenCompraPago57").val() == "") {
        alert("Ingrese Medio")
    }
    if ($("#dFechaOrdenCompraPago57").val() == "") {
        alert("Ingrese Fecha")
    }

    if ($("#nvMontoOrdenCompraPago57").val() == "") {
        alert("Ingrese Monto")
    }


    fila = parseInt($("#CantidadItemsOrdenCompraPago57").text());
    var nuevo = 0;
    var existe = 0;
    if (fila == 0) {
        $("#tabla_oculta_ordencomprapago57 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleOrdenCompraPago57 tbody");

        $("#CantidadItemsOrdenCompraPago57").text(parseInt($("#CantidadItemsOrdenCompraPago57").text()) + 1);

        fila = 1;
        existe = 1;
    }

    $("#tblDetalleOrdenCompraPago57 tr").find('td:eq(2)').each(function () {

        if ($(this).text() == $("#cboCondicionOrdenCompraPago57").val()) {
            fila = $(this).parent().find('td:eq(1)').text();
            existe = 1;
        }
        else {
            nuevo = 1;
        }
    })
    if (existe == 0) {

        $("#CantidadItemsOrdenCompraPago57").text(parseInt($("#CantidadItemsOrdenCompraPago57").text()) + 1);

        fila = parseInt($("#CantidadItemsOrdenCompraPago57").text());
    }
   
    if (nuevo == 1 && existe == 0 && fila != 1) {

        $("#tabla_oculta_ordencomprapago57 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleOrdenCompraPago57 tbody");
       
    }

    //$("#tabla_oculta_ordencomprapago57 tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#tblDetalleOrdenCompraPago57 tbody");
    //$("#CantidadItemsOrdenCompraPago57").text(parseInt($("#CantidadItemsOrdenCompraPago57").text()) + 1);
    //fila = parseInt($("#CantidadItemsOrdenCompraPago57").text());

    ActualizarCampoDetalleOrdenCompraPago(fila, 1, $("#CantidadItemsOrdenCompraPago57").text());
    ActualizarCampoDetalleOrdenCompraPago(fila, 2, $("#cboCondicionOrdenCompraPago57").val());
    ActualizarCampoDetalleOrdenCompraPago(fila, 3, $("#cboCondicionOrdenCompraPago57 option:selected").html());
    ActualizarCampoDetalleOrdenCompraPago(fila, 4, $("#nvDiasOrdenCompraPago57").val());
    ActualizarCampoDetalleOrdenCompraPago(fila, 5, $("#cboMedioOrdenCompraPago57").val());
    ActualizarCampoDetalleOrdenCompraPago(fila, 6, $("#cboMedioOrdenCompraPago57 option:selected").html());
    ActualizarCampoDetalleOrdenCompraPago(fila, 7, $("#dFechaOrdenCompraPago57").val());
    ActualizarCampoDetalleOrdenCompraPago(fila, 8, $("#nvMontoOrdenCompraPago57").val());

    LimpiarDetalleOrdenCompraPago();
    //CalcularTotalPago();

}

function ActualizarCampoDetalleOrdenCompraPago(fila, columna, valor) {
    $("#tblDetalleOrdenCompraPago57 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index == fila && index2 == columna) {
                $(this).text(valor);

                return;
            }
        })
    })
}

function LimpiarDetalleOrdenCompraPago() {
    $("#cboCondicionOrdenCompraPago57").val("");
    $("#nvDiasOrdenCompraPago57").val("");
    $("#cboMedioOrdenCompraPago57").val("");
    $("#nvMontoOrdenCompraPago57").val("");
    $("#numSubTotalOrdenCompraPago57").val("");

    //CalcularTotalPago();
}

function ActualizarNumeroItemOrdenCompraPago() {
    var i = 1;
    $("#tblDetalleOrdenCompraPago57 tbody tr").each(function (index) {
        $(this).children("td").each(function (index2) {
            if (index > 0 && index2 == 1) {
                $(this).text(i);
                i++;
            }
        })
    })
}

function CalcularTotalPago() {
    var inafecto = false;
    var SubTotal = 0;
    var Igv = 0;
    var Total = 0;
    var Precio = 0;
    var Cantidad = 0;
    var Importe = 0;
    var Resultado = 0;
    $("#tblDetalleOrdenCompraPago57 tbody tr").each(function (index) {
        if (index > 0) {
            $(this).children("td").each(function (index2) {
                if (index2 == 7) {
                    if ($(this).find("input[type=checkbox]").is(':checked'))
                        inafecto = true;
                    else
                        inafecto = false;
                }
                if (index2 == 8) {
                    SubTotal = SubTotal + parseFloat($(this).text());
                    if (inafecto == false)
                        Igv = Igv + parseFloat($(this).text()) * 0.18;
                }
            })
        }
    })


    $("#numSubTotalOrdenCompraPago57").val(SubTotal.toFixed(2));
}

function LimpiarDetalleOrdenCompra() {
    $("#nvProveedorEntrada53").val("");
    $("#nvProveedorRuc53").val("");
    $("#idProveedor53").val("");
    $("#nvProveedorEntrada53").css("background-color", "transparent");
}

function Presentacion() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:56495/PresentacionByFiltro/Get?filtro', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, present) {
                    $("#cboPresentacionEntrada53").append('<option value="' + present.vcIdPresentacion + '">' +
                         present.nvDescripcion + '</koption>');
                });
            }
            else {
                swal("No se encuentra Presentaciones activas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Presentaciones!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function PresentacionSalida() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:56495/PresentacionByFiltro/Get?filtro', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, presentsal) {
                    $("#cboPresentacionSalida54").append('<option value="' + presentsal.vcIdPresentacion + '">' +
                         presentsal.nvDescripcion + '</koption>');
                });
            }
            else {
                swal("No se encuentra Presentaciones activas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Presentaciones!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function PresentacionOrdenC() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:56495/PresentacionByFiltro/Get?filtro', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, presentorde) {
                    $("#cboPresentacionOrdenCompra57").append('<option value="' + presentorde.vcIdPresentacion + '">' +
                         presentorde.nvDescripcion + '</koption>');
                });
            }
            else {
                swal("No se encuentra Presentaciones activas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Presentaciones!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function SubAlmacen() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:34867/SubAlmacenByFiltro/Get?filtro', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, subalma) {
                    $(".midivisionaria").append('<option value="' + subalma.vcIdSubAlmacen + '">' +
                         subalma.nvDescripcion + '</koption>');
                });
            }
            else {
                swal("No se encuentra SubAlmacenes activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las SubAlmacenes!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Prioridad() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://localhost:9410/PrioridadByFiltro/Get?id_prioridad=0', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            obj = xhr.response;
            if (obj != "0") {
                console.log(xhr.response)
                $.each(obj, function (i, priori) {
                    $("#cboPrioridad101").append('<option value="' + priori.iIdPrioridad + '">' +
                         priori.vcDescripcion + '</option>');
                    console.log(priori);
                });
            }
            else {
                swal("No se encuentra Prioridades activos!");
                //console.log("Error obj");
            }
        }
        else {
            swal("Ocurrió un error al obtener las Prioridades!");
            //console.log("Error 200");
        }
    }
    xhr.send();
}

////////////-------------INICIO MAESTROS RRHH-----------/////////////////
function UnidadOrganizativa() {
    //unor = sessionStorage.getItem("unor");
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe/rWSUnidadOrganizativa/UnidadOrganizativa/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Unor) {

                        var iIdUnidadOrganizativa = Unor.iIdUnidadOrganizativa;
                        var attr = "";
                        var unorg = sessionStorage.getItem("unor");
                        if (iIdUnidadOrganizativa == unorg) {
                            attr = "selected='selected'";
                        }

                        $(".cboUnidadOrganizativa").append('<option value="' + Unor.iIdUnidadOrganizativa + '"' + attr + ' >' +
                         Unor.vcDescripcion + '</option>');
                   
                });
               // $("#cboUnidadOrganizativa98").val(unor);
                $("#cboUnidadOrganizativa98").change();
            }
            else {
                swal("Usted no cuenta con Unor asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Unidades Organizativas!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Empresa() {
    Unor2 = sessionStorage.getItem("Unor");
    empr = sessionStorage.getItem("emp");
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe/rWSEmpresa/EmpresaByUniOrg/Get?uniOrg=' + Unor2, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Emp) {
                    $(".cboEmpresa").append('<option value="' + Emp.vcRucEmpresa + '">' +
                        Emp.nvRazonSocial + '</option>');
                });
                $("#cboEmpresa98").val(empr);
                $("#cboEmpresa98").change();
            }
            else {
                swal("La Unidad Organizativa no cuenta con Empresa asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Empresas!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Sede_Emp_Unor() {
    Unor2 = sessionStorage.getItem("Unor");
    Emp2 = sessionStorage.getItem("Emp");
    sede = sessionStorage.getItem("sed");
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe/rWSSede/SedeByUniOrgEmp/Get?uniOrg=' + Unor2 + '&rucEmp=' + Emp2, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Sede_Emp_Unor) {
                    $(".cboSede").append('<option value="' + Sede_Emp_Unor.vcIdSede + '">' +
                     Sede_Emp_Unor.vcDescripcion + '</option>');
                });
                $("#cboSede98c").val(sede);
                $("#cboSede98c").change();
            }
            else {
                swal("La Unidad Organizativa no cuenta con Empresa asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Empresas!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function SistemaTrabajo() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSSistemaTrabajo/SistemaTrabajo/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, sistTrab) {
                    var iIdSistemaTrabajo = sistTrab.iIdSistemaTrabajo;
                    var attr = "";
                    var SisTra = sessionStorage.getItem("SisTra");
                    if (iIdSistemaTrabajo == SisTra) {
                        attr = "selected='selected'";
                    }

                    $(".cboSistTrabajo").append('<option value="' + sistTrab.iIdSistemaTrabajo + '"' + attr + ' >' +
                    sistTrab.vcDescripcion + '</option>');
                });
            }
            else {
                swal("Usted no cuenta con Sistema de Trabajo asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Sistema de Trabajo!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Departamentos() {
    //Depa = sessionStorage.getItem("depa");
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSUbigeo/Ubigeo/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, dep) {

                   
                    var vcCodigoUbigeo = dep.vcCodigoUbigeo;
                    var attr = "";
                    var Depa = sessionStorage.getItem("depa");
                    if (vcCodigoUbigeo == Depa) {
                        attr = "selected='selected'";
                    }
                  

                    $(".cboDepartamento").append('<option value="' + dep.vcCodigoUbigeo + '"' + attr + ' >' +
                            dep.nvDescripcion + '</option>');
                    $("#cboDepartamento123").append('<option value="' + dep.vcCodigoUbigeo + '"' + attr + ' >' +
                          dep.nvDescripcion + '</option>');
                });
                //$("#cboDepartamento98").val(Depa);
                $("#cboDepartamento98").change();
            }
            else {
                swal("No se cuenta con Departamentos asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Departamentos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Provincia() {
    Dep2 = sessionStorage.getItem("Dep");
    provin = sessionStorage.getItem("prov");
    //console.log(provin)
    //unor = "1";
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSUbigeo/Ubigeo/Get?CodPadre=' + Dep2, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Prov) {
                    $(".cboProvincia").append('<option value="' + Prov.vcCodigoUbigeo + '">' +
                        Prov.nvDescripcion + '</option>');
                });
                $("#cboProvincia98").val(provin);
                $("#cboProvincia98").change();
            }
            else {
                swal("El Departamento no cuenta con Provincias asignadas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener Provincias!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Distrito() {
    Prov2 = sessionStorage.getItem("Prov");
    distr = sessionStorage.getItem("dist");
    //console.log(Prov2)
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSUbigeo/Ubigeo/Get?CodPadre=' + Prov2, true);
    xhr.responseType = "json";

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, Dist) {
                    $(".cboDistrito").append('<option value="' + Dist.vcCodigoUbigeo + '">' +
                        Dist.nvDescripcion + '</option>');
                });
            }
            else {
                swal("La Provincia no cuenta con Distritos asignadas!")
            }
            $("#cbodistrito98").val(distr);
            $("#cbodistrito98").change();
        }
        else {
            swal("Ocurrió un error al obtener Distritos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoDocumento() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSTipoDocumento/TipoDocumento/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TipoDoc) {
                    $(".cboTipoDocumento123").append('<option value="' + TipoDoc.iIdTipoDocumento + '">' +
                         TipoDoc.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Tipos de documentos activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Tipos de documentos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoEPS() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSEps/Eps/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, EPS) {
                    $(".cboEPS").append('<option value="' + EPS.iIdEPS + '">' +
                         EPS.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra EPS activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los EPS!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoRegimenPensionario() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSRegimenPensionario/RegimenPensionario/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, RP) {
                    $(".cboRegimenPensionario").append('<option value="' + RP.iIdRegimenPensionario + '">' +
                         RP.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Regimen Pensionario activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Regimen Pensionarios!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoRegimenSalud() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSRegimenSalud/RegimenSalud/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, RS) {
                    $(".cboRegimenSalud").append('<option value="' + RS.iIdRegimenSalud + '">' +
                         RS.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Regimen de Salud activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Regimen de Salud!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Gerencia() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rSWGerencia/rSWGerencia/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, G) {
                    $(".cboGerencia").append('<option value="' + G.iIdGerencia + '">' +
                         G.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Gerencias activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Gerencias!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoTrabajador() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rSWTipoTrabajador/rSWTipoTrabajador/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TT) {
                    $(".cboTipoTrabajador").append('<option value="' + TT.iIdTipoTrabajador + '">' +
                         TT.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Tipo de Trabajador activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Tipo de Trabajador!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function RegimenLaboral() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSRegimenLaboral/rSWRegimenLaboral/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, RL) {
                    $(".cboRegimenLaboral").append('<option value="' + RL.iIdRegimenLaboral + '">' +
                         RL.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Regímenes Laborales activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Regímenes Laborales!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function JornadaLaboral() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSJornadaLaboral/rSWJornadaLaboral/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, JL) {
                    $(".cboJornadaLaboral").append('<option value="' + JL.iIdJornadaLaboral + '">' +
                         JL.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Jornada Laboral activas!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Jornadas Laborales!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function CategoriaOcupacion() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSCategoriaOcupacion/rSWCategoriaOcupacion/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, CO) {
                    $(".cboCategoriaOcupacion").append('<option value="' + CO.iIdCategoriaOcupacion + '">' +
                         CO.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Categoría Ocupación activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener las Categorías Ocupación!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoContrato() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSTipoContrato/rWSTipoContrato/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TC) {

                    var iIdTipoContrato = TC.iIdTipoContrato;
                    var attr = "";
                    var TipCont = sessionStorage.getItem("TipCont");
                    if (iIdTipoContrato == TipCont) {
                        attr = "selected='selected'";
                    }
                    $(".cboTipoContrato").append('<option value="' + TC.iIdTipoContrato + '"' + attr + ' >' +
                         TC.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Tipo de Contrato!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Tipo de Contrato!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function Motivo() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSMotivo/rWSMotivo/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, MTO) {
                    var iIdMotivo = MTO.iIdMotivo;
                    var attr = "";
                    var Mot = sessionStorage.getItem("Mot");
                    if (iIdMotivo == Mot) {
                        attr = "selected='selected'";
                    }
                    $(".cboMotivo98").append('<option value="' + MTO.iIdMotivo + '"' + attr + ' >' +
                         MTO.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Motivo de Requerimiento!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Motivos de Requerimientos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function NivelEducativo() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSNivelEducativo/rWSNivelEducativo/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, NE) {
                    $(".cboNivelEducativo").append('<option value="' + NE.iIdNivelEducativo + '">' +
                         NE.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Nivel Educativo!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Niveles Educativos!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function MotivoCese() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSMotivoCese/rWSMotivoCese/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, MC) {
                    $(".cboMotivoCese").append('<option value="' + MC.iIdMotivoCese + '">' +
                         MC.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Motivo Ceses activos!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Motivos Ceses!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}

function TipoMarcador() {
    var xhr = new XMLHttpRequest();
    var obj;
    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSTipoMarcacion/rWSTipoMarcacion/Get', true);
    xhr.responseType = "json";
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            obj = xhr.response;
            if (obj != "0") {
                $.each(obj, function (i, TM) {
                    $(".cboTipoMarcacion").append('<option value="' + TM.iIdTipoMarcacion + '">' +
                         TM.vcDescripcion + '</option>');
                });
            }
            else {
                swal("No se encuentra Tipo de Marcación!")
            }
        }
        else {
            swal("Ocurrió un error al obtener los Tipo de Marcación!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);

}
////////////-------------FIN MAESTROS RRHH-----------/////////////////



