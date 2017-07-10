
function Permisos() {
    user = sessionStorage.getItem("user1");
    sede = sessionStorage.getItem("Sede");
    
    console.log(user);
    console.log(sede);
    var xhr = new XMLHttpRequest();
    //var dataobj = { login: user, id_sede: sede };
    var obj;

    xhr.open('GET', 'http://admin_erp.natclar.com.pe:12000/rWSAcceso/Acceso/GetAccesoResponse?login=' + user + '&id_sede=' + sede, true);
    xhr.responseType = "json";
    // xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            //console.log(xhr.response);
            // console.log(xhr.response.GetDataPOSTResult.cUser + " " + xhr.response.GetDataPOSTResult.cPassword);
            obj = xhr.response;
            //console.log(obj)
            if (obj != "0") {
                if (obj.Permisos != null) {
                    for (i = 0; i < obj.Permisos.length; i++) {
                        //console.log(obj.Permisos[i])
                        if (obj.Permisos[i].Operacion.iIdOperacion == 1) {
                            $("#" + obj.Permisos[i].Recurso.vcObjeto).show();
                        }

                        if (obj.Permisos[i].Operacion.iIdOperacion == 2) {
                            $("#" + obj.Permisos[i].Recurso.vcObjeto).show();
                        }
                        if (obj.Permisos[i].Operacion.iIdOperacion == 3) {
                            $("#" + obj.Permisos[i].Recurso.vcObjeto).show();
                        }
                        
                        if (obj.Permisos[i].Operacion.iIdOperacion == 4) {
                            $("#" + obj.Permisos[i].Recurso.vcObjeto).show();
                            $("#" + obj.Permisos[i].Recurso.vcObjeto).attr('disabled', 'disabled');
                            //console.log(obj.Permisos[i].Recurso.vcObjeto)
                        }
                       
                    }
                } else {
                    swal("Usted no cuenta con Permisos!")
                }
               
              
                if (obj.Rol != null) {
                    a = obj.Rol.vcDescripcion;
                    $("#nvRol").text(a);
                   
                } else {
                    swal("Usted no tiene Rol asignado!")
                }

                if (obj.Sede != null) {
                    a = obj.Sede.vcDescripcion;
                    b = obj.Sede.vcIdSede;
                    $(".SedeOrigen").val(a);
                    $(".misede").val(b);
                    $("#nvSede").text(a);
                    $("#vcSede1").val(a);
                    $("#vcSede16").val(a);
                    $("#vcSede48").val(a);
                    $("#vcSede51").val(a);
                   // $("#cboSede1").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboSedeOrigen23").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboSedeDestino23").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboSede3").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboSede4").append($("<option value=" + b + "> " + a + "</option>"));

                }  

                if (obj.Sede.UnidadOrganizativa != null) {
                    a = obj.Sede.UnidadOrganizativa.vcDescripcion;
                    b = obj.Sede.UnidadOrganizativa.iIdUnidadOrganizativa;
                    //$("#cboUnidadOrganizativa1").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboUnidadOrganizativa2").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboUnidadOrganizativa3").append($("<option value=" + b + "> " + a + "</option>"));
                    $("#cboUnidadOrganizativa4").append($("<option value=" + b + "> " + a + "</option>"));

                }

                //if (obj.Unidad_Organizativa != null) {
                //    a = obj.Unidad_Organizativa.Descripcion;
                //    b = obj.Unidad_Organizativa.Id_unidad_organizativa;
                //    $("#cboUnidadOrganizativa1").append($("<option value=" + b + "> " + a + "</option>"));
                //    $("#cboUnidadOrganizativa2").append($("<option value=" + b + "> " + a + "</option>"));
                //    $("#cboUnidadOrganizativa3").append($("<option value=" + b + "> " + a + "</option>"));
                //    $("#cboUnidadOrganizativa4").append($("<option value=" + b + "> " + a + "</option>"));

                //}

                if (obj.Usuario.Persona != null) {
                    a = obj.Usuario.Persona.vcNombres;
                    b = obj.Usuario.Persona.vcApellidoPaterno;
                    c = obj.Usuario.Persona.vcApellidoMaterno;
                    d = obj.Usuario.Persona.vcNumeroDocumento;
                    Login = obj.Usuario.vcLogin;

                    $(".UsuarioOrigen").val(a + " " + b + " " + c);
                    $("#nvUsuario").text(a + " " + b + " " + c);
                    $("#nvUsuario1").text(a + " " + b + " " + c);
                    //$("#nvTrabajador1").val(a + " " + b + " " + c);
                    $("#nvTrabajador16").val(a + " " + b + " " + c);
                    $("#vcLogin").val(Login);
                    $(".vcLogin").val(Login);
                    //$("#nvTrabajador23").val(a + " " + b + " " + c);
                    $("#nvTrabajador48").val(a + " " + b + " " + c);
                    sessionStorage.setItem("dni", d)
                    
                }

                if (obj.Usuario != null) {
                    a = obj.Usuario.vcLogin;
                    $("#dni").val(a);
                }
            }
           
        }
        else {
            swal("Error...!!")
        }
    }
    xhr.send();
    //xhr.send(dataobj);
    //}
}