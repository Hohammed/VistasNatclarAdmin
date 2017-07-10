$(document).ready(function () {
    $("#LISTA_CENTROS").hide();
    retornarAnio($("#anio").attr("id"));
    //retornarFecha($("#fecha").attr("id"));
    //retornarHora($("#ingresodia").attr("id"));
    //retornarFecha($("#dInicioMovimiento23").attr("id"));
    //retornarFecha($("#dFinMovimiento23").attr("id"));
    //retornarHora($("#hora2").attr("id"));
    //retornarFecha($("#fecha3").attr("id"));
    retornarCboMes($("#cboMes1").attr("id"));
    retornarFecha();
    Sede();
    Sede2();

});


$(document).on("click", "#IniciarSesion", function () {
    //validarUsuarioREST();
    validarUsuarioSOAP();
});

$(document).on("click", "#CerrarSesion", function () {
    CerrarSesion();
});

$(document).on("click", "#btnRegistrarAsistencia", function () {
    window.location = "./RegistrarAsistencia.html";
});

$(document).on("click", "#btnNuevoMovimiento23", function () {
    window.location = "./RegistrarMovimiento.html";
});

$(document).on("click", "#btnNuevoEntrada50", function () {
    window.location = "./RegistrarEntrada.html";
});

$(document).on("click", "#btnNuevoMOF99", function () {
    window.location = "./RegistrarMOF.html";
});

$(document).on("click", "#NuevoTraslado", function () {
    window.location = "./RegistrarTraslado.html";
});

$(document).on("click", "#btnNuevoSalida51", function () {
    window.location = "./RegistrarSalida.html";
});
$(document).on("click", "#NuevoOrdenCompra", function () {
    window.location = "./RegistrarOrdendeCompra.html";
});
$(document).on("click", "#NuevoRequerimiento", function () {
    window.location = "./BuscarRequerimiento.html";
});

$(document).on("click", "#BuscarRequerimiento", function () {
    window.location = "./BuscarRequerimientoDetalle.html";
});

$(document).on("click", "#NuevoPedido", function () {
    window.location = "./RegistrarPedido.html";
});

$(document).on("click", "#btnNuevoCotizacion", function () {
    window.location = "./RegistrarCotizacion.html";
});

$(document).on("click", "#btnNuevoRequerimiento102", function () {
    window.location = "./RegistrarRequerimientoCompra.html";
});


$(document).on("click", "#btnBuscarStock", function () {
    window.location = "./BusquedaStockAlmacen.html";
});

$(document).on("click", "#btnBuscarMovimiento", function () {
    window.location = "./BusquedaKardexAlmacenMaterial.html";
});

$(document).on("click", "#btnNuevoAjusteStock50", function () {
    window.location = "./AjusteStock.html";
});

$(document).on("click", "#btnNuevoRequerimiento137", function () {
    window.location = "./RegistrarRequerimientoRRHH.html";
});

$(document).on("click", "#Atras", function () {
   // sessionStorage.removeItem('iIdRequerimientoRRHH');
    history.back();
});

$(document).on("click", "#btnGuardarAsistencia16", function () {
    GuardarAsistencia();
});



$(document).on("click", "#btnGuardarRequerimiento101", function () {
    GuardarRequerimiento();
});



$(document).on("click", "#btnGuardarRequerimientoBienes101", function () {
    GuardarRequerimientoBienes();
});


$(document).on("click", "#btnGuardarSalida54", function () {
    GuardarSalida();
});

$(document).on("click", "#btnNuevaBusqueda35", function () {
    $("#nvTrabajadorR35").prop("readonly", false);
    $("#nvTrabajadorR35").val("");
    $("#vcDocumento35").val("");
    $("#nvPuesto35-2").val("");
    $("#nvArea35").val("");
    $("#nvUnidadOrganizativa35-2").val("");
    $("#nvEmpresa35-2").val("");
    $("#nvSede35-2").val("");
    $("#vcSistTrabA35").val("");
    $("#nvPuestoA35").val("");
    $("#iSueldoA35").val("");
    $("#nvSedeOrigen35").val("");
    $("#nvTrabajadorR35").focus();
    $("#nvTrabajadorR35").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusquedaTS35", function () {
    $("#nvTrabajadorS35").prop("readonly", false);
    $("#nvTrabajadorS35").val("");
    $("#nvTrabajadorS35").focus();
    $("#nvTrabajadorS35").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusquedaTAR35", function () {
    $("#nvTrabajadorAR35").prop("readonly", false);
    $("#nvTrabajadorAR35").val("");
    $("#nvPuesto35").val("");
    $("#nvUnidadOrganizativa35").val("");
    $("#nvEmpresa35").val("");
    $("#nvSede35").val("");
    $("#nvTrabajadorAR35").focus();
    $("#nvTrabajadorAR35").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusquedaPN35", function () {
    $("#nvPuestoN35").prop("readonly", false);
    $("#nvPuestoN35").val("");
    $("#idPuestoN35").val("");
    $("#nvPuestoN35").focus();
    $("#nvPuestoN35").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusqueda98", function () {
    $("#nvPuesto98").prop("readonly", false);
    $("#nvPuesto98").val("");
    $("#IdPuesto98").val("");
    $("#nvPuesto98").css("background-color", "transparent");
    $("#nvPuesto98").focus();
});

$(document).on("click", "#btnNuevaBusquedaArea98", function () {
    $("#nvArea98").prop("readonly", false);
    $("#nvArea98").val("");
    $("#IdArea98").val("");
    $("#nvArea98").css("background-color", "transparent");
    $("#nvArea98").focus();
});

$(document).on("click", "#btnNuevaBusqueda99", function () {
    $("#nvPuesto99").prop("readonly", false);
    $("#nvPuesto99").val("");
    $("#nvPuesto99").css("background-color", "transparent");
    $("#nvPuesto99").focus();
});

$(document).on("click", "#btnNuevaBusqueda100", function () {
    $("#nvPuesto100").prop("readonly", false);
    $("#nvPuesto100").val("");
    $("#nvPuesto100").css("background-color", "transparent");
    $("#nvPuesto100").focus();
});

$(document).on("click", "#btnNuevaBusquedaArea100", function () {
    $("#nvArea100").prop("readonly", false);
    $("#nvArea100").val("");
    $("#nvArea100").css("background-color", "transparent");
    $("#nvArea100").focus();
});

$(document).on("click", "#btnNuevaBusqueda123", function () {
    $("#nvPuesto123").prop("readonly", false);
    $("#nvPuesto123").val("");
    $("#idPuesto123").val("");
    $("#nvPuesto123").focus();
    $("#nvPuesto123").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusquedaArea123", function () {
    $("#nvArea123").prop("readonly", false);
    $("#nvArea123").val("");
    $("#iIdArea123").val("");
    $("#nvArea123").focus();
    $("#nvArea123").css("background-color", "transparent");
});

$(document).on("click", "#btnNuevaBusquedaRQ102", function () {
    $("#nvResponsableRequerimiento102").prop("readonly", false);
    $("#nvResponsableRequerimiento102").val("");
    $("#nvResponsableRequerimiento102").focus();
    $("#nvResponsableRequerimiento102").css("background-color", "transparent");
    $("#iIdResponsableRequerimiento102").val("");
});

$(document).on("click", "#btnNuevaBusquedaRQ137", function () {
    $("#nvResponsableRequerimiento137").prop("readonly", false);
    $("#nvResponsableRequerimiento137").val("");
    $("#nvResponsableRequerimiento137").focus();
    $("#nvResponsableRequerimiento137").css("background-color", "transparent");
    $("#iIdResponsableRequerimiento137").val("");
});

$(document).on("click", "#cbxSistTrab", function () {
    var $Todos = $(this);
    if ($Todos.is(':checked')) {
        $("#vcSistTrabA35").show();
        $("#cboSistTrabN35").show();
    } else {
        $("#vcSistTrabA35").hide();
        $("#cboSistTrabN35").hide();
    }
});
$(document).on("click", "#cbxPuesto", function () {
    var $Todos = $(this);
    if ($Todos.is(':checked')) {
        $(".Puestos").show();
        $("#nvPuestoA35").show();
        //$("#nvPuestoN35").show();
        //$("#btnNuevaBusqueda35").show();
    } else {
        $(".Puestos").hide();
        $("#nvPuestoA35").hide();
        //$("#nvPuestoN35").hide();
        //$("#btnNuevaBusqueda35").show();
    }
});
$(document).on("click", "#cbxSueldo", function () {
    var $Todos = $(this);
    if ($Todos.is(':checked')) {
        $("#iSueldoA35").show();
        $("#iSueldoN35").show();
        $("#lblFechaCambioSueldo35").show();
        $("#dFechaCambioSueldo35").show();
    } else {
        $("#iSueldoA35").hide();
        $("#iSueldoN35").hide();
        $("#lblFechaCambioSueldo35").hide();
        $("#dFechaCambioSueldo35").hide();
    }
});
$(document).on("click", "#cbxTransferencia", function () {
    var $Todos = $(this);
    if ($Todos.is(':checked')) {
        $("#nvSedeOrigen35").show();
        $("#cboSedeDestino35").show();
        $("#dFechaIni35").show();
        $("#dFechaFin35").show();
        //$("#Tiempo").show();
    } else {
        $("#nvSedeOrigen35").hide();
        $("#cboSedeDestino35").hide();
        $("#dFechaIni35").hide();
        $("#dFechaFin35").hide();
        //$("#Tiempo").hide();
    }
});

$(document).on("click", "#cbxTodosTrabajador52", function () {
    var $Todos = $(this);
    if ($Todos.is(':checked')) {
        $("#nvTrabajador52").prop("readonly", true);
        $("#nvTrabajador52").val("");
    } else {
        $("#nvTrabajador52").prop("readonly", false);
    }
});


$(document).on("click", "input:radio[name=rbRangoEdad]", function () {
    if ($("input:radio[name=rbRangoEdad]:checked").val() == "RELEVANTE") {
        $("#Rango_Edad_Min").show();
        $("#Rango_Edad_Max").show();
    } else {
        $("#Rango_Edad_Min").hide();
        $("#Rango_Edad_Max").hide();
    }
});

$(document).on("click", "#cbxSalario98", function () {
    var $Todos = $(this);
    user = $("#nvUsuario").text();
    if ($Todos.is(':checked')) {
        $("#vcResponsableConfirmarSalario").val(user);
        $("#vcResponsableConfirmarSalario").show();
        $("#iSalario98").prop("readonly", true);
        $("#iSalario98").css("background-color", "lightgoldenrodyellow");
        
    } else {
        $("#vcResponsableConfirmarSalario").val("");
        $("#vcResponsableConfirmarSalario").hide();
        $("#iSalario98").prop("readonly", false);
        $("#iSalario98").css("background-color", "transparent");
    }
});

$(document).on("click", "#AgregarBono", function () {
    AgregarBono();
});

$(document).on("click", "#AgregarProfesionGrado", function () {
    AgregarProfesionGrado();
});

$(document).on("click", "#AgregarFormacionObligatoria", function () {
    AgregarFormacionObligatoria();
});

$(document).on("click", "#AgregarFormacionComplementaria", function () {
    AgregarFormacionComplementaria();
});

$(document).on("click", "#AgregarAnioSector", function () {
    AgregarAnioSector();
});


$(document).on("click", "#QuitarBono", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsBono").text(parseInt($("#CantidadItemsBono").text()) - 1);
    LimpiarDetalleBono();
    ActualizarNumeroItem();
});

$(document).on("click", "#ModificarBono", function () {
    var parent = $(this).parents().get(1);
    $('#frmRegistrarBono').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#cboEmpresaBono35").val($(this).text());
        if (index2 == 4)
            $("#cboPuestoBono35").val($(this).text());
        if (index2 == 6)
            $("#cboBono35").val($(this).text());
        if (index2 == 8)
            $("#Cantidad").val($(this).text());
        if (index2 == 1)
            $("#Item_Bono").val($(this).text());
    })
});

$(document).on("click", "#ModificarPG", function () {
    var parent = $(this).parents().get(1);
    $('#frmRegistrarProfesionGrado').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#Profesion").val($(this).text());
        if (index2 == 4)
            $("#Grado").val($(this).text());
        if (index2 == 1)
            $("#Item_Profesion_Grado").val($(this).text());
    })
});

$(document).on("click", "#QuitarPG", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsProfesiongrado").text(parseInt($("#CantidadItemsProfesiongrado").text()) - 1);
    LimpiarDetallePG();
    ActualizarNumeroItemPG();
});

$(document).on("click", "#ModificarFO", function () {
    var parent = $(this).parents().get(1);
    $('#frmRegistrarFormacionObligatoria').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#FormacionObligatoria").val($(this).text());

        if (index2 == 1)
            $("#Item_Formacion_Obligatoria").val($(this).text());
    })
});

$(document).on("click", "#QuitarFO", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsFormacionObligatoria").text(parseInt($("#CantidadItemsFormacionObligatoria").text()) - 1);
    LimpiarDetalleFO();
    ActualizarNumeroItemFO();
});

$(document).on("click", "#ModificarFC", function () {
    var parent = $(this).parents().get(1);
    $('#frmRegistrarFormacioncomplementaria').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#Formacioncomplementaria").val($(this).text());
      
        if (index2 == 1)
            $("#Item_Formacion_Complementaria").val($(this).text());
    })
});

$(document).on("click", "#QuitarFC", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsFormacionComplementaria").text(parseInt($("#CantidadItemsFormacionComplementaria").text()) - 1);
    LimpiarDetalleFC();
    ActualizarNumeroItemFC();
});

$(document).on("click", "#ModificarAS", function () {
    var parent = $(this).parents().get(1);
    $('#frmRegistrarAnioSector').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#anio100").val($(this).text());
        if (index2 == 3)
            $("#cboSector100").val($(this).text());
        if (index2 == 1)
            $("#Item_Anio_Sector").val($(this).text());
    })
});

$(document).on("click", "#QuitarAS", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsAnioSector").text(parseInt($("#CantidadItemsAnioSector").text()) - 1);
    LimpiarDetalleAS();
    ActualizarNumeroItemAS();
});

$(document).on("click", "#QuitarAsistenciaDetalle", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsDetalleAsistencia").text(parseInt($("#CantidadItemsDetalleAsistencia").text()) - 1);
    LimpiarDetalleDetalleAsistencia();
    ActualizarNumeroItemDetalleasistencia();
});

$(document).on("click", "#ModificarAsistenciaDetalle", function () {
    var parent = $(this).parents().get(1);
    //$('#frmRegistrarDetalle').modal('toggle');
    $(parent).children("td").each(function (index2) {
        if (index2 == 4)
            $("#cboTipoMarcacion").val($(this).text());
        if (index2 == 7)
            $("#ObservacionesDetalle").val($(this).text());
        if (index2 == 3)
            $("#Item_Asistencia_Detalle").val($(this).text());
    })
});

$(document).on("click", "#QuitarEntrada", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsEntrada53").text(parseInt($("#CantidadItemsEntrada53").text()) - 1);
    LimpiarDetalleEntrada();
    ActualizarNumeroItemEntrada()
});

$(document).on("click", "#ModificarEntrada", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 1)
            $("#Entrada_item").val($(this).text());

        if (index2 == 2)
            $("#vcCodigoEntrada53").val($(this).text());

        if (index2 == 3)
            $("#vcDescripcionEntrada53").val($(this).text());

        if (index2 == 4)
            $("#cboSubAlmacenEntrada53").val($(this).text());

        if (index2 == 6)
            $("#cboPresentacionEntrada53").val($(this).text());

        if (index2 == 8)
            $("#intCantidadEntrada53").val($(this).text());
    })
});

$(document).on("click", "#btnAgregarDetalleEntrada53", function () {
    AgregarDetalleEntrada();
});



$(document).on("click", "#QuitarRequerimientoActivo", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsRequerimientoActivo101").text(parseInt($("#CantidadItemsRequerimientoActivo101").text()) - 1);
    LimpiarDetalleRequerimientoActivo();
    ActualizarNumeroItemRequerimientoActivo()
});

$(document).on("click", "#ModificarRequerimientoActivo", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 1)
            $("#Servicio_item").val($(this).text());
        
        if (index2 == 2)
            $("#vcCodigoRequerimientoActivo101").val($(this).text());

        if (index2 == 3)
            $("#vcDescripcionRequerimientoActivo101").val($(this).text());

        if (index2 == 4)
            $("#intCantidadRequerimientoActivo101").val($(this).text());

    })
});

$(document).on("click", "#btnAgregarDetalleRequerimientoActivo101", function () {
    AgregarDetalleRequerimientoActivo();
});




$(document).on("click", "#QuitarRequerimientoArticulo", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsRequerimientoArticulo101").text(parseInt($("#CantidadItemsRequerimientoArticulo101").text()) - 1);
    LimpiarDetalleRequerimientoArticulo();
    ActualizarNumeroItemRequerimientoArticulo()
});

$(document).on("click", "#ModificarRequerimientoArticulo", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 1)
            $("#Bienes_item").val($(this).text());

        if (index2 == 2)
            $("#vcCodigoRequerimientoArticulo101").val($(this).text());

        if (index2 == 3)
            $("#vcDescripcionRequerimientoArticulo101").val($(this).text());

        if (index2 == 4)
            $("#nvUnidadMedidaRequerimientoArticulo101").val($(this).text());

        if (index2 == 5)
            $("#intCantidadRequerimientoArticulo101").val($(this).text());
    })
});

$(document).on("click", "#btnAgregarDetalleRequerimientoArticulo101", function () {
    AgregarDetalleRequerimientoArticulo();
});



$(document).on("click", "#QuitarOrdenCompra", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsOrdenCompra57").text(parseInt($("#CantidadItemsOrdenCompra57").text()) - 1);
    LimpiarDetalleOrdenCompra();
    //ActualizarNumeroItemOrdenCompra()
});




$(document).on("click", "#ModificarOrdenCompra", function () {
   
    var parent = $(this).parents().get(1);
   
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#vcCodigoOrdenCompras57").val($(this).text());

        if (index2 == 3)
            $("#nvDescripcionOrdenCompra57").val($(this).text());

        if (index2 == 4)
            $("#nvUnidadMedidaOrdenCompra57").val($(this).text());

        if (index2 == 5)
            $("#cboPresentacionOrdenCompra57").val($(this).text());

        if (index2 == 7)
            $("#nvCantidadOrdenCompra57").val($(this).text());

        if (index2 == 8)
            $("#nvPrecioOrdenCompra57").val($(this).text());

        if (index2 == 9)
            $("#numIGVOrdenCompra57").val($(this).text());


    })

});

$(document).on("click", "#btnAgregarDetalleOrdenCompra57", function () {
    AgregarDetalleOrdenCompra();
});







$(document).on("click", "#QuitarOrdenCompraPago", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsOrdenCompraPago57").text(parseInt($("#CantidadItemsOrdenCompraPago57").text()) - 1);
    LimpiarDetalleOrdenCompraPago();
    //ActualizarNumeroItemOrdenCompraPago()
});



$(document).on("click", "#ModificarOrdenCompraPago", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#cboCondicionOrdenCompraPago57").val($(this).text());

        if (index2 == 4)
            $("#nvDiasOrdenCompraPago57").val($(this).text());

        if (index2 == 5)
            $("#cboMedioOrdenCompraPago57").val($(this).text());

        if (index2 == 7)
            $("#dFechaOrdenCompraPago57").val($(this).text());

        if (index2 == 8)
            $("#nvMontoOrdenCompraPago57").val($(this).text());
    })
});

$(document).on("click", "#btnAgregarDetalleOrdenCompraPago57", function () {
    AgregarDetalleOrdenCompraPago();
});








$(document).on("click", "#QuitarCotizacion", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsCotizacion106").text(parseInt($("#CantidadItemsCotizacion106").text()) - 1);
    LimpiarDetalleCotizacion();
    //ActualizarNumeroItemOrdenCompraPago()
});

$(document).on("click", "#ModificarCotizacion", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#vcCodigoCotizacion106").val($(this).text());

        if (index2 == 3)
            $("#vcDescripcionCotizacion106").val($(this).text());

        if (index2 == 4)
            $("#vcUnidadMedidaCotizacion106").val($(this).text());

        if (index2 == 5)
            $("#vcCantidadCotizacion106").val($(this).text());


        if (index2 == 6)
            $("#vcPrecioCotizacion106").val($(this).text());




    })
});

$(document).on("click", "#btnAgregarDetalleCotizacion106", function () {
    AgregarDetalleCotizacion();
});






$(document).on("click", "#QuitarCotizacionDetalle", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsCotizacionPago106").text(parseInt($("#CantidadItemsCotizacionPago106").text()) - 1);
    LimpiarDetalleCotizacionPago();
    //ActualizarNumeroItemOrdenCompraPago()
});

$(document).on("click", "#ModificarCotizacionDetalle", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#cboCondicionPagoDetalleCotizacion106").val($(this).text());

        if (index2 == 3)
            $("#vcDiasCotizacion106").val($(this).text());

        if (index2 == 4)
            $("#cboFormaPagoCotizacion106").val($(this).text());

        if (index2 == 5)
            $("#vcMontoCuotaCotizacion106").val($(this).text());



    })
});

$(document).on("click", "#btnAgregarDetalleCotizacionPago106", function () {
    AgregarDetalleCotizacionPago();
});






$(document).on("click", "#QuitarSalida", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsSalida54").text(parseInt($("#CantidadItemsSalida54").text()) - 1);
    LimpiarDetalleSalida();
    ActualizarNumeroItemSalida()
});




$(document).on("click", "#ModificarPedido", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#vcCodigoPedido108").val($(this).text());

        if (index2 == 3)
            $("#vcDescripcionPedido108").val($(this).text());

        if (index2 == 4)
            $("#vcUnidadMedidaPedido108").val($(this).text());

        if (index2 == 5)
            $("#numCantidadPedido108").val($(this).text());

    })
});

$(document).on("click", "#btnAgregarDetallePedido108", function () {
    AgregarDetallePedido();
});

$(document).on("click", "#QuitarPedido", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsPedido108").text(parseInt($("#CantidadItemsPedido108").text()) - 1);
    LimpiarDetallePedido();
    ActualizarNumeroItemPedido()
});





$(document).on("click", "#ModificarSalida", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#vcCodigoSalida54").val($(this).text());

        if (index2 == 3)
            $("#nvDecripciónSalida54").val($(this).text());

        if (index2 == 4)
            $("#cboSubAlmacenSalida54").val($(this).text());

        if (index2 == 6)
            $("#cboPresentacionSalida54").val($(this).text());

        if (index2 == 8)
            $("#intCantidadSalida54").val($(this).text());

    })
});

$(document).on("click", "#btnAgregarDetalleSalida54", function () {
    AgregarDetalleSalida();
});


$(document).on("click", "#QuitarTraslado", function () {
    var parent = $(this).parents().get(1);
    $(parent).remove();
    $("#CantidadItemsTraslado").text(parseInt($("#CantidadItemsTraslado").text()) - 1);
    LimpiarDetalleTraslado();
    ActualizarNumeroItemTraslado()
});

$(document).on("click", "#ModificarTraslado", function () {

    var parent = $(this).parents().get(1);
    $(parent).children("td").each(function (index2) {
        if (index2 == 2)
            $("#vcCodigo49").val($(this).text());

        if (index2 == 3)
            $("#vcSubAlmacen49").val($(this).text());

        if (index2 == 4)
            $("#vcPresentacion49").val($(this).text());

        if (index2 == 5)
            $("#intCantidad49").val($(this).text());

    })
});

$(document).on("click", "#btnAgregarDetalleTraslado49", function () {
    AgregarDetalleTraslado();
});


$(document).on("click", ".enlaceSede", function () {
    var sede = $(this).attr("id");
    sessionStorage.setItem("Sede", $(this).attr("id"))
    window.location = "../Shared/Layout.html";
});

$(document).on("click", "#btnGuardarMovimiento", function () {
    GuardarMovimiento();
});

$(document).on("click", "#btnGuardarMOF", function () {
    GuardarMOF();
});

$(document).on("click", "#btnGuardarRQ", function () {
    GuardarRQ();
});

$(document).on("click", "#GuardarMarcacion", function () {
    //AgregarMarcacion2();
    GuardarDetalleAsistencia();
});

//$(function () {
//    $(".datepicker").datepicker();
//});

$(document).on("click", "#btnBuscarRequerimiento137", function () {
    BuscarRequerimientoRRHH();
});

$(document).on("click", "#btnEliminarRQ", function () {
    EliminarRQ();
});

$(document).on("click", "#btnNuevoRQ", function () {
    NuevoRQ();
});

//////////------- TAREO -------/////////////
$(document).on("click", "#btnGenerarTareo", function () {
    GenerarTareo();
});