// SCRIPT

$(document).ready(function () {
    $('form').keypress(function (e) {
        if (e == 13) {
            return false;
        }
    });

    $('input').keypress(function (e) {
        if (e.which == 13) {
            return false;
        }
    });

    $('button').keypress(function (e) {
        if (e.which == 13) {
            return false;
        }
    });

    //HELPER - UI
    $(".datepicker").datepicker({ dateFormat: 'dd/mm/yy' });
    $(".select2").select2();

    //_Layout.cshtml
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    //LOGIN
    $("#USU_CLAVE").keypress(function (e) {
        if (e.which == 13) {
            $("#IniciarSesion").click();
        }
    });

    //BusquedaConsultaMedica
    $(window).load(function () {
        $("#COMD_ALERGIA").attr("multiple", true);
        ListarConsultaMedicas();
        if ($("#COMD_PACIENTE").val() != "") {
            BuscarPacientePorDni();
        } else {
            LimpiarDatosPaciente();
        }
    });

    function ListarConsultaMedicas() {
        MVCGrid.setFilters('ConsultaMedicaLista', {
            Establecimiento: $("#EstablecimientoUsuario").val(),
            Medico: $("#Medico").val(),
            Tipo: $("#Tipo").val(),
            FechaInicio: $("#FechaInicio").val(),
            FechaFin: $("#FechaFin").val(),
            Paciente: $("#Paciente").val(),
            Contrata: $("#Contrata").val(),
            Estado: $("#Estado").val()
        })
    }

    $(function () {
        $('#Buscar').click(function () {
            ListarConsultaMedicas();
        });

        $("#ExportarConsultaMedicaResumen").click(function () {
            window.open("../Consulta/ExportarConsultaMedicaResumen?psEstablecimiento=" + $("#EstablecimientoUsuario").val() +
                                                            "&psMedico=" + $("#Medico").val() +
                                                            "&psTipo=" + $("#Tipo").val() +
                                                            "&pdFechaInicio=" + $("#FechaInicio").val() +
                                                            "&pdFechaFin=" + $("#FechaFin").val() +
                                                            "&psPaciente=" + $("#Paciente").val() +
                                                            "&psContrata=" + $("#Contrata").val() +
                                                            "&piEstado=" + $("#Estado").val());
        })

        $("#ExportarConsultaMedicaDetallado").click(function () {
            window.open("../Consulta/ExportarConsultaMedicaDetallado?psEstablecimiento=" + $("#EstablecimientoUsuario").val() +
                                                            "&psMedico=" + $("#Medico").val() +
                                                            "&psTipo=" + $("#Tipo").val() +
                                                            "&pdFechaInicio=" + $("#FechaInicio").val() +
                                                            "&pdFechaFin=" + $("#FechaFin").val() +
                                                            "&psPaciente=" + $("#Paciente").val() +
                                                            "&psContrata=" + $("#Contrata").val() +
                                                            "&piEstado=" + $("#Estado").val());
        })

        $('#NuevaConsulta').click(function () {
            $('.cboTipoConsulta option[value=0]').remove();
        });

        $('#btnContinuarModal').click(function () {
            var a = $('.cboTipoConsulta option:selected').val();
            if (a === "CON") {
                window.location.href = "../Consulta/RegistrarConsulta";
            } else if (a === "EME") {
                window.location.href = "../Consulta/RegistrarEmergencia";
            } else {
                alert("Aún no disponible");
            }

        })
    });

    //REGISTRAR EMERGENCIA

    $(document).on('change', ':file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $(function () {
        $('.natclar-em').attr('readonly', true);
        $('.natclar-em option[value=CON]').remove();
        $('.natclar-em option[value=HSP]').remove();
    });

    $("#COMD_PAGADOR_DENOMINACION").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetEmpresas",
                type: "POST",
                dataType: "json",
                data: {
                    psRAZON_SOCIAL: request.term
                },
                success: function (Empresa) {
                    response($.map(Empresa, function (item) {
                        return {
                            value: item.RAZON_SOCIAL,
                            text: item.RUC
                        };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            $("#COMD_PAGADOR").val(ui.item.text);
            $("#COMD_PAGADOR_DENOMINACION").prop('readonly', true);
        }
    });

    //-- Datos del Paciente
    if ($("#COMD_PACIENTE").val() != "") {
        BuscarPacientePorDni();
    }

    $("#COMD_PACIENTE").keypress(function (e) {
        if (e.which == 13) {
            BuscarPacientePorDni();
        }
    });

    $("#BuscaPacientePorDni").click(function (e) {
        BuscarPacientePorDni();
    });

    $("#NuevaBusqueda").click(function (e) {
        LimpiarDatosPaciente();
    });

    function BuscarPacientePorDni() {
        var sexo;
        $.ajax({
            type: 'POST',
            url: '/Maestro/GetTrabajdor',
            dataType: 'json',
            data: { psDOCUMENTO: $("#COMD_PACIENTE").val() },
            success: function (Trabajador) {
                if (Trabajador.Documento != "") {
                    $("#COMD_PACIENTE").val();
                    $("#COMD_PACIENTE").val(Trabajador.Documento);
                    $("#APELLIDOS").val(Trabajador.Apellidos);
                    $("#NOMBRES").val(Trabajador.Nombres);
                    $("#EDAD").val(Trabajador.Edad);
                    if (Trabajador.Sexo === "F") {
                        sexo = "FEMENINO";
                    } else {
                        sexo = "MASCULINO";
                    }
                    EsFemenino(Trabajador.Sexo);
                    $("#COMD_PAC_SEXO").val(sexo);
                    if ($("#COMD_PAGADOR").val() !== "") {
                        $("#COMD_CONTRATA").val(Trabajador.Empresa)
                        $("#COMD_CONTRATA_DENOMINACION").val(Trabajador.EmpresaDenominacion);
                        $("#COMD_PAGADOR_DENOMINACION").val(Trabajador.EmpresaDenominacion);
                        $("#COMD_PAGADOR").val(Trabajador.Empresa);
                        $("#COMD_UBICACION").val(Trabajador.Ubicacion);
                        $("#COMD_AREA_EMPLEADO").val(Trabajador.AreaDeTrabajo);
                        $("#COMD_OCUPACION_EMPLEADO").val(Trabajador.Ocupacion);
                    }

                    var dateString = Trabajador.FechaNacimiento.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    var date = day + "/" + month + "/" + year;
                    $("#COMD_PAC_FECH_NAC").val(date);
                    $("#COMD_PACIENTE").prop('readonly', true);
                    $("#COMD_PAGADOR_DENOMINACION").prop('readonly', true);
                    $("#BuscaPacientePorDni").hide();
                } else {
                    //$.msgBox({
                    //    type: "error",
                    //    title: "Error",
                    //    content: 'DNI incorrecto o Trabajador no esta registrado.'
                    //});
                }
            },
            error: function (ex) {
                alert('Error al buscar trabajador.' + ex.toString());
            }
        });
    }

    $("#EditarPagador").click(function (e) {
        $("#COMD_PAGADOR_DENOMINACION").removeAttr("readonly");
        $("#COMD_PAGADOR_DENOMINACION").focus();
        $("#COMD_PAGADOR_DENOMINACION").select();
    });

    $("#COMD_TIPO_SEGURO_DESCRIPCION").hide();

    $("#COMD_TIPO_SEGURO").change(function () {
        var item = $("#COMD_TIPO_SEGURO option:selected").val();
        if (item == 3) {
            $("#COMD_TIPO_SEGURO_DESCRIPCION").show().val("").focus();
        } else {
            $("#COMD_TIPO_SEGURO_DESCRIPCION").hide().val("");
        }
    });

    $("#group-F").hide();

    function EsFemenino(value) {
        if (value == "F") { $("#group-F").show(); } else { $("#group-F").hide(); }
    }

    $("#COMD_TIPO").change(function () {
        $("#CMRE_DESTINO").empty();
        $.ajax({
            type: 'POST',
            url: '/Consulta/GetTipoConsulaMedicaDestino',
            dataType: 'json',
            data: { psTipoConsulta: $("#COMD_TIPO").val() },
            success: function (TIPOS_CONSULTA_DESTINO) {
                $.each(TIPOS_CONSULTA_DESTINO, function (i, TIPO_CONSULTA_DESTINO) {
                    $("#CMRE_DESTINO").append('<option value="' + TIPO_CONSULTA_DESTINO.TPDE_CODIGO + '">' +
                     TIPO_CONSULTA_DESTINO.TPDE_DENOMINACION + '</option>');
                });
            },
            error: function (ex) {
                alert('Fallo al obtener Tipo de Consulta Destino.' + ex);
            }
        });

        $("#TablaMedicamentos tbody tr").each(function (index) {
            if (index > 0)
                $(this).remove();
        });

        $("#CantidadItemsMedicamentos").text("0");

        return false;
    });


    /* EXAMENES AUXILIARES - TAB | MODAL */

    $("#PrestacionDenominacion").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetPrestacionesPorArea",
                type: "POST",
                dataType: "json",
                data: {
                    psAREA: $("#AreasPrestaciones").val(),
                    psDENOMINACION: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            text: item.ID,
                            value: item.DENOMINACION,
                            precio: item.PRECIO
                        };
                    }))
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $("#PrestacionDenominacion").val(ui.item.value);
            $("#Prestacion").val(ui.item.text);
            $("#PrecioExamenAuxiliar").val(ui.item.precio);
            $("#TotalExamenAuxiliar").val(parseInt($("#CantidadExamenAuxiliar").val()) * parseFloat($("#PrecioExamenAuxiliar").val()));
            $("#PrestacionDenominacion").prop('readonly', true);
        }
    });

    $("#PrestacionDenominacion").autocomplete("option", "appendTo", "#FormAgregarExamenAuxiliar");

    $("#NuevaBusquedaPrestacion").click(function (e) {
        $("#Prestacion").val("");
        $("#AreasPrestaciones").removeAttr("disabled");
        $("#PrestacionDenominacion").removeAttr("readonly");
        $("#PrestacionDenominacion").focus();
        $("#PrestacionDenominacion").select();
    });

    //CBO AreaPrestaciones - Ficha Examenes Auxiliares
    $("#AreasPrestaciones").change(function (e) {
        $("#Prestacion").val("");
        $("#PrestacionDenominacion").val("");
        $("#PrecioExamenAuxiliar").val("0.00");
        $("#TotalExamenAuxiliar").val("0.00");
        $("#PrestacionDenominacion").removeAttr("readonly");
        $("#PrestacionDenominacion").focus();
        $("#PrestacionDenominacion").select();

    });

    //AgregarExamenes
    $("#AgregaExamenAuxiliar").click(function (e) {

        var fila = 0;
        if ($("#Prestacion").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Examen."
            });
            return;
        }

        if ($("#CantidadExamenAuxiliar").val() == "" || $("#CantidadExamenAuxiliar").val() == "0") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Cantidad."
            });
            return;
        }

        if ($("#ItemEAOrden").val() == "") {
            $("#tabla_oculta_examenesauxiliares tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaExamenesAxuliares tbody");
            $("#CantidadItemsExamenesAuxiliares").text(parseInt($("#CantidadItemsExamenesAuxiliares").text()) + 1);
            fila = parseInt($("#CantidadItemsExamenesAuxiliares").text());
        }
        else {
            fila = parseInt($("#ItemEAOrden").val());
        }

        ActualizarCampoDetalle("EA", fila, 1, $("#ItemExamenAuxiliar").val());
        ActualizarCampoDetalle("EA", fila, 3, $("#Prestacion").val());
        ActualizarCampoDetalle("EA", fila, 4, $("#AreasPrestaciones").val());
        ActualizarCampoDetalle("EA", fila, 5, $("#AreasPrestaciones option:selected").html());
        ActualizarCampoDetalle("EA", fila, 6, $("#PrestacionDenominacion").val());
        ActualizarCampoDetalle("EA", fila, 7, $("#LugarRealizacionExamen").val());
        ActualizarCampoDetalle("EA", fila, 8, $("#CantidadExamenAuxiliar").val());
        ActualizarCampoDetalle("EA", fila, 9, $("#PrecioExamenAuxiliar").val());
        ActualizarCampoDetalle("EA", fila, 10, $("#TotalExamenAuxiliar").val());
        ActualizarCampoDetalle("EA", fila, 11, $("#ObservacionesExamenAuxiliar").val());

        ActualizarNumeroItem("EA");
        LimpiarDatosExamenAuxiliar();

        $('#FormAgregarExamenAuxiliar').modal('toggle');
    });

    function LlenarDetalleExamenAuxiliar() {
        jsonObj = [];
        $("#TablaExamenesAxuliares tbody tr").each(function (index) {
            if (index > 0) {
                item = {}
                $(this).children("td").each(function (index2) {
                    if (index2 == 1)
                        if ($(this).text() == "")
                            item["CMEA_ITEM"] = "0";
                        else
                            item["CMEA_ITEM"] = $(this).text();
                    if (index2 == 3)
                        item["CMEA_PRESTACION"] = $(this).text();
                    if (index2 == 4)
                        item["CMEA_GRUPO_PRESTACION"] = $(this).text();
                    if (index2 == 7)
                        item["CMEA_CANTIDAD"] = parseInt($(this).text());
                    if (index2 == 8)
                        item["CMEA_PRECIO"] = parseFloat($(this).text());
                    if (index2 == 9)
                        item["CMEA_TOTAL"] = parseFloat($(this).text());
                    if (index2 == 10)
                        item["CMEA_OBSERVACION"] = $(this).text();
                })
                item["CMEA_COMD_ID"] = $("#COMD_ID").val();
                item["CMEA_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

                jsonObj.push(item);
            }
        })
        $("#DetalleExamenesAxuliares_JSON").val(JSON.stringify(jsonObj));
    }

    function LimpiarDatosPaciente() {
        $("#COMD_PACIENTE").val("");
        $("#APELLIDOS").val("");
        $("#NOMBRES").val("");
        $("#EMPRESA").val("");
        $("#EDAD").val("");
        $("#PagadorDenominacion").val("");
        $("#Pagador").val("");
        $("#COMD_PAC_FECH_NAC").val("");
        $("#COMD_CONTRATA").val("");
        $("#COMD_CONTRATA_DENOMINACION").val("");
        $("#COMD_PAGADOR_DENOMINACION").val("");
        $("#COMD_PAGADOR").val("");
        $("#COMD_PAC_SEXO").val("");
        $("#COMD_PACIENTE").removeAttr("readonly");
        $("#COMD_UBICACION").val("");
        $("#BuscaPacientePorDni").show();
        $("#COMD_PAGADOR_DENOMINACION").removeAttr("readonly");
        $("#PagadorDenominacion").prop('readonly', true);
        $("#COMD_AREA_EMPLEADO").val("");
        $("#COMD_OCUPACION_EMPLEADO").val("");
        $("#COMD_PACIENTE").focus();
    }

    $(".btnSkype").click(function () {
        $(location).attr("href", "/Consulta/RegistrarInterconsulta");
    });

    $(function () {
        $("#tPeticiones tbody tr").each(function () {

            $(this).children("td").eq(1).each(function () {
                if ($(this).text() == "AMBULATORIO") {
                    $(this).children("button").addClass("btn btn-xs btn-success");
                }
                else {
                    $(this).children("button").addClass("btn btn-xs btn-danger");
                }
            })
        });
    });


    function LimpiarDatosExamenAuxiliar() {
        $("#ItemExamenAuxiliar").val("");
        $("#ItemEAOrden").val("");
        $("#Prestacion").val("");
        $("#PrestacionDenominacion").val("");
        $("#CantidadExamenAuxiliar").val("1");
        $("#PrecioExamenAuxiliar").val("0.00");
        $("#TotalExamenAuxiliar").val("0.00");
        $("#ObservacionesExamenAuxiliar").val("");
        $("#PrestacionDenominacion").removeAttr("readonly");
        $("#AreasPrestaciones").removeAttr("disabled");
        $("#LugarRealizacionExamen").val("");
    }

    //ModificarExamenes
    $(document).on("click", "#ModificarExamenAuxiliar", function () {
        var parent = $(this).parents().get(1);
        $(parent).children("td").each(function (index2) {
            if (index2 == 1)
                $("#ItemExamenAuxiliar").val($(this).text());
            if (index2 == 2)
                $("#ItemEAOrden").val($(this).text());
            if (index2 == 3)
                $("#Prestacion").val($(this).text());
            if (index2 == 4)
                $("#AreasPrestaciones").val($(this).text());
            if (index2 == 6)
                $("#PrestacionDenominacion").val($(this).text());
            if (index2 == 7)
                $("#LugarRealizacionExamen").val($(this).text());
            if (index2 == 8)
                $("#CantidadExamenAuxiliar").val($(this).text());
            if (index2 == 9)
                $("#PrecioExamenAuxiliar").val($(this).text());
            if (index2 == 10)
                $("#TotalExamenAuxiliar").val($(this).text());
            if (index2 == 11)
                $("#ObservacionesExamenAuxiliar").val($(this).text());
        })
        $("#AreasPrestaciones").prop('disabled', true);
        $("#PrestacionDenominacion").prop('readonly', true);
        $('#FormAgregarExamenAuxiliar').modal('toggle');
    });

    $(document).on("click", "#QuitarExamenAuxiliar", function () {
        var parent = $(this).parents().get(1);
        $(parent).remove();
        $("#CantidadItemsExamenesAuxiliares").text(parseInt($("#CantidadItemsExamenesAuxiliares").text()) - 1);
        ActualizarNumeroItem("EA");
    });

    /* DIAGNOSTICOS - TAB | MODAL */
    $("#CodigoCIE10").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetCIE10s_Codigo",
                type: "POST",
                dataType: "json",
                data: { psCODIGO: request.term },
                success: function (Empresa) {
                    response($.map(Empresa, function (item) {
                        return { value: item.CODIGO, text: item.DENOMINACION };
                    }))
                }
            })
        },
        select: function (event, ui) {
            $("#DescripcionCIE10").val(ui.item.text);
            $("#DescripcionCIE10").prop('readonly', true);
            $("#CodigoCIE10").prop('readonly', true);
        }
    });

    $("#DescripcionCIE10").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetCIE10s_Denominacion",
                type: "POST",
                dataType: "json",
                data: { psDENOMINACION: request.term },
                success: function (Empresa) {
                    response($.map(Empresa, function (item) {
                        return { value: item.DENOMINACION, text: item.CODIGO };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            $("#CodigoCIE10").val(ui.item.text);
            $("#DescripcionCIE10").prop('readonly', true);
            $("#CodigoCIE10").prop('readonly', true);

        }
    });

    //Agregar Diágnostico
    $("#AgregarDiagnostico").click(function (e) {
        var fila = 0;
        if ($("#CodigoCIE10").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Codigo CIE10."
            });
            return;
        }

        if ($("#DescripcionCIE10").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Descripción CIE10."
            });
            return;
        }

        if ($("#ItemDOrden").val() == "") {
            $("#tabla_oculta_diagnosticos tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaDiagnosticos tbody");
            $("#CantidadItemsDiagnosticos").text(parseInt($("#CantidadItemsDiagnosticos").text()) + 1);
            fila = parseInt($("#CantidadItemsDiagnosticos").text());
        }
        else {
            fila = parseInt($("#ItemDOrden").val());
        }


        //FECHA HORA

        var hora = new Date();
        var min_save = hora.getMinutes();
        var mes_save = hora.getMonth() + 1;
        var segundos_save = hora.getSeconds();
        var fecha_save = hora.getDate() + "/" + (mes_save < 10 ? "0" + mes_save : mes_save) + "/" + hora.getFullYear();
        var hora_save = hora.getHours() + ":" + (min_save < 10 ? "0" + min_save : min_save) + ":" + (segundos_save < 10 ? "0" + segundos_save : segundos_save);

        ActualizarCampoDetalle("D", fila, 1, $("#ItemDiagnostico").val());
        ActualizarCampoDetalle("D", fila, 3, $("#CodigoCIE10").val());
        ActualizarCampoDetalle("D", fila, 4, $("#DescripcionCIE10").val());
        ActualizarCampoDetalle("D", fila, 5, $("#COMD_PARTE_CUERPO_DIAGNOSTICO option:selected").val());
        ActualizarCampoDetalle("D", fila, 6, $("#COMD_PARTE_CUERPO_DIAGNOSTICO option:selected").text());
        ActualizarCampoDetalle("D", fila, 7, $("#COMD_TIPO_DIAGNOSTICO option:selected").val());
        ActualizarCampoDetalle("D", fila, 8, $("#COMD_TIPO_DIAGNOSTICO option:selected").text());
        ActualizarCampoDetalle("D", fila, 9, $("#COMD_LATERALIDAD_DIAGNOSTICO option:selected").val());
        ActualizarCampoDetalle("D", fila, 10, $("#COMD_LATERALIDAD_DIAGNOSTICO option:selected").text());
        ActualizarCampoDetalle("D", fila, 11, $("#COMD_NIVEL_ACCIDENTE option:selected").text());
        ActualizarCampoDetalle("D", fila, 12, $("#COMD_NIVEL_ACCIDENTE option:selected").text());
        ActualizarCampoDetalle("D", fila, 13, $("#ObservacionDiagnostico").val());
        ActualizarCampoDetalle("D", fila, 14, fecha_save + " " + hora_save);
        ActualizarCampoDetalle("D", fila, 15, $("#COMD_MEDICO").val());

        ActualizarNumeroItem("D");
        LimpiarDatosDiganosticos();

        $('#modalDiag').modal('toggle');
    });

    //CancelarDiagnostico
    $("#btnCancelarDiagnostico").click(function () {
        LimpiarDatosDiganosticos();
    });

    //Editar Diágnostico
    $("#EditarDiagnostico").click(function (e) {
        $("#CodigoCIE10").removeAttr("readonly");
        $("#DescripcionCIE10").removeAttr("readonly");
        $("#DescripcionCIE10").focus();
        $("#DescripcionCIE10").select();
    });

    //ModificarDiagnostico
    $(document).on("click", "#ModificarDiagnostico", function () {
        var parent = $(this).parents().get(1);
        $(parent).children("td").each(function (index2) {
            if (index2 == 1)
                $("#ItemDiagnostico").val($(this).text());
            if (index2 == 2)
                $("#ItemDOrden").val($(this).text());
            if (index2 == 3)
                $("#CodigoCIE10").val($(this).text());
            if (index2 == 4)
                $("#DescripcionCIE10").val($(this).text());
            if (index2 == 5)
                $("#COMD_PARTE_CUERPO_DIAGNOSTICO option[value=" + $(this).text() + "]").select();
            if (index2 == 7)
                $("#COMD_TIPO_DIAGNOSTICO option[value=" + $(this).text() + "]").select();
            if (index2 == 9)
                $("#COMD_LATERALIDAD_DIAGNOSTICO option[value=" + $(this).text() + "]").select();
            if (index2 == 11)
                $("#COMD_NIVEL_ACCIDENTE option[value=" + $(this).text() + "]").select();
            if (index2 == 13)
                $("#ObservacionDiagnostico").val($(this).text());
        });

        $("#CodigoCIE10").prop('readonly', true);
        $("#DescripcionCIE10").prop('readonly', true);
        $('#modalDiag').modal('toggle');
    });

    //Quitardiagnostico
    $(document).on("click", "#QuitarDiagnostico", function () {
        var parent = $(this).parents().get(1);
        $(parent).remove();
        $("#CantidadItemsDiagnosticos").text(parseInt($("#CantidadItemsDiagnosticos").text()) - 1);
        ActualizarNumeroItem("D");
    });

    //LimpiarListaDiagnosticos
    function LimpiarDatosDiganosticos() {
        $("#ItemDiagnostico").val("");
        $("#ItemDOrden").val("");
        $("#CodigoCIE10").val("");
        $("#DescripcionCIE10").val("");
        $("#ObservacionDiagnostico").val("");
        $("#CodigoCIE10").removeAttr("readonly");
        $("#DescripcionCIE10").removeAttr("readonly");
    }

    function LlenarDetalleDiagnosticos() {
        jsonObj = [];
        $("#TablaDiagnosticos tbody tr").each(function (index) {
            if (index > 0) {
                item = {}
                $(this).children("td").each(function (index2) {
                    if (index2 == 1)
                        if ($(this).text() == "")
                            item["CMDD_ITEM"] = "0";
                        else
                            item["CMDD_ITEM"] = $(this).text();
                    if (index2 == 3)
                        item["CMDD_CODIGO_CI10"] = $(this).text();
                    if (index2 == 5)
                        item["CMDD_OBSERVACION"] = $(this).text();
                })
                item["COMD_ID"] = $("#COMD_ID").val();
                item["CMDD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

                jsonObj.push(item);
            }
        })
        $("#DetalleDiagnosticos_JSON").val(JSON.stringify(jsonObj));
    }

    /* MEDICAMENTO - TAB | MODAL */



    $("#AgregaMedicamento").click(function (e) {
        var fila = 0;
        var Stock;
        var CantidadDespachar;

        if ($("#CodigoMaterial").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Codigo."
            });
            return;
        }

        if ($("#DescripciónMaterial").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Descripción."
            });
            return;
        }

        if ($("#Lote").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Seleccione Lote."
            });
            return;
        }

        if ($("#Stock").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Seleccione Lote."
            });
            return;
        }

        if ($("#CantidadDespachar").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Cantidad."
            });
            return;
        }
        Stock = parseFloat($("#Stock").val())
        CantidadDespachar = parseFloat($("#CantidadDespachar").val())

        if (Stock < CantidadDespachar) {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "La cantidad ingresada es mayor al Lote."
            });
            return;
        }

        if ($("#Dosis").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba la Toma."
            });
            return;
        }

        if ($("#FrecuenciaDosis").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Cada."
            });
            return;
        }

        if ($("#MedidaTiempo").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Seleccione frecuencia."
            });
            return;
        }

        if ($("#ViaAdministracion").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Seleccione Via."
            });
            return;
        }

        if ($("#ViaAdministracion").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Seleccione Via."
            });
            return;
        }

        if ($("#ItemMOrden").val() == "") {
            $("#tabla_oculta_medicamentos tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaMedicamentos tbody");
            $("#CantidadItemsMedicamentos").text(parseInt($("#CantidadItemsMedicamentos").text()) + 1);
            fila = parseInt($("#CantidadItemsMedicamentos").text());
        }
        else {
            fila = parseInt($("#ItemMOrden").val());
        }

        ObtenerDuracion();

        ActualizarCampoDetalle("M", fila, 1, $("#ItemMedicamento").val());
        ActualizarCampoDetalle("M", fila, 3, $("#CodigoMaterial").val());
        ActualizarCampoDetalle("M", fila, 4, $("#DescripciónMaterial").val());
        ActualizarCampoDetalle("M", fila, 5, $("#CantidadDespachar").val());
        ActualizarCampoDetalle("M", fila, 6, $("#Precio").val());
        var Importe = parseFloat($("#CantidadDespachar").val()) * parseFloat($("#Precio").val());
        var DosisDescripcion = $("#Dosis").val() + " cada " + $("#FrecuenciaDosis").val() + " " + $("#MedidaTiempo option:selected").html() + " por " + $("#DuracionTexto").val();
        ActualizarCampoDetalle("M", fila, 7, Importe.toFixed(2));
        ActualizarCampoDetalle("M", fila, 8, DosisDescripcion);
        ActualizarCampoDetalle("M", fila, 9, $("#FechaVencimiento").val());
        ActualizarCampoDetalle("M", fila, 10, $("#Lote").val());
        ActualizarCampoDetalle("M", fila, 11, $("#Laboratorio").val());
        ActualizarCampoDetalle("M", fila, 12, $("#FormaFarmaceutica").val());
        ActualizarCampoDetalle("M", fila, 13, $("#ObservacionesMedicamento").val());
        ActualizarCampoDetalle("M", fila, 14, $("#Dosis").val());
        ActualizarCampoDetalle("M", fila, 15, $("#FrecuenciaDosis").val());
        ActualizarCampoDetalle("M", fila, 16, $("#MedidaTiempo").val());
        ActualizarCampoDetalle("M", fila, 17, $("#DuracionCantidad").val());
        ActualizarCampoDetalle("M", fila, 18, $("#DuracionMedida").val());
        ActualizarCampoDetalle("M", fila, 19, $("#ViaAdministracion").val());

        if ($("#Dosificado").is(':checked'))
            ActualizarCampoDetalle("M", fila, 20, "S");
        else
            ActualizarCampoDetalle("M", fila, 20, "N");

        ActualizarCampoDetalle("M", fila, 21, $("#FechaInicioDosis").val());
        ActualizarCampoDetalle("M", fila, 22, $("#CMRE_DESTINO option:selected").html());
        ActualizarCampoDetalle("M", fila, 23, $("#CMRE_DESTINO").val());
        ActualizarNumeroItem("M");
        LimpiarDatosMedicamento();
        $('#modalTratamiento').modal('toggle');
    });

    $(document).on("click", "#ModificarMedicamento", function () {
        var Cantidad;
        var Lote;
        var parent = $(this).parents().get(1);
        $(parent).children("td").each(function (index2) {
            if (index2 == 1)
                $("#ItemMedicamento").val($(this).text());
            if (index2 == 2)
                $("#ItemMOrden").val($(this).text());
            if (index2 == 3)
                $("#CodigoMaterial").val($(this).text());
            if (index2 == 4)
                $("#DescripciónMaterial").val($(this).text());
            if (index2 == 10) {
                CargarLotes();
                $("#Lote").val($(this).text());
                CargarDatosLote();
            }
            if (index2 == 5) {
                Cantidad = $(this).text()
                $("#CantidadDespachar").val($(this).text());
                Cantidad = $(this).text();
            }

            //if (index2 == 8)
            //  $("#DuracionTexto").val($(this).text());

            if (index2 == 10) {
                CargarLotes();
                $("#Lote").val($(this).text());
                CargarDatosLote();
            }
            if (index2 == 11)
                $("#Laboratorio").val($(this).text());
            if (index2 == 12)
                $("#FormaFarmaceutica").val($(this).text());
            if (index2 == 13)
                $("#ObservacionesMedicamento").val($(this).text());
            if (index2 == 14)
                $("#Dosis").val(parseFloat($(this).text()));
            if (index2 == 15)
                $("#FrecuenciaDosis").val($(this).text());
            if (index2 == 16)
                $("#MedidaTiempo").val($(this).text());
            if (index2 == 17)
                $("#DuracionCantidad").val($(this).text());
            if (index2 == 18)
                $("#DuracionMedida").val($(this).text());
            if (index2 == 19)
                $("#ViaAdministracion").val($(this).text());
            if (index2 == 20) {
                if ($(this).text() == "S") {
                    $("#Dosificado").prop('checked', true);
                    $("#divFechaInicioDosis").show();
                }
                else {
                    $("#Dosificado").prop('checked', false);
                    $("#divFechaInicioDosis").hide();
                }

            }
            if (index2 == 21)
                $("#FechaInicioDosis").val($(this).text());
            if (index2 == 23)
                $("#CMRE_DESTINO").val($(this).text());
        });


        $("#CantidadDespachar").val(Cantidad);
        ObtenerDuracion();


        $('#modalTratamiento').modal('toggle');
    });

    $(document).on("click", "#QuitarMedicamento", function () {
        var parent = $(this).parents().get(1);
        $(parent).remove();
        $("#CantidadItemsMedicamentos").text(parseInt($("#CantidadItemsMedicamentos").text()) - 1);
        ActualizarNumeroItem("M");
    });

    $('#modalTratamiento').on('hidden.bs.modal', function (e) {
        LimpiarDatosMedicamento();
    });


    $("#Dosificado").click(function () {
        var $this = $(this);

        if ($this.is(':checked')) {
            $("#divFechaInicioDosis").show();
            $("#FechaInicioDosis").val(moment().format('DD/MM/YYYY HH:mm'));
        } else {
            $("#divFechaInicioDosis").hide();
        }
    });


    function CargarLotes() {
        $.ajax({
            type: 'POST',
            url: '/Logistica/GetLotesMaterial")',
            dataType: 'json',
            async: false,
            data: { psAlmacen: $("#USU_ALMACEN").val(), psMaterial: $("#CodigoMaterial").val(), psTipoDestino: $("#CMRE_DESTINO").val() },

            success: function (LOTES) {
                $("#FechaVencimiento").val("");
                $("#Stock").val("");
                $("#Precio").val("");
                $("#CantidadDespachar").val("");

                $.each(LOTES, function (i, LOTE) {
                    $("#Lote").append('<option value="' + LOTE.STKL_LOTE + '">' +
                     LOTE.STKL_LOTE + '</option>');
                });
            },
            error: function (ex) {
                alert('Fallo al obtener Lotes.' + ex);
            }
        });
    }

    function CargarDatosLote() {
        $.ajax({
            type: 'POST',
            url: '/Logistica/GetLoteMaterial")',
            dataType: 'json',
            async: false,
            data: { psAlmacen: $("#USU_ALMACEN").val(), psMaterial: $("#CodigoMaterial").val(), psLote: $("#Lote").val(), psTipoDestino: $("#CMRE_DESTINO").val() },
            success: function (LOTES) {
                $.each(LOTES, function (i, LOTE) {
                    $("#FechaVencimiento").val(LOTE.STKL_FECHA_VENCIMIENTO);
                    $("#Stock").val(LOTE.STKL_CANTIDAD);
                    $("#Precio").val(LOTE.STKL_PRECIO);
                });

            },
            error: function (ex) {
                alert('Fallo al obtener Datos del Lote.' + ex);
            }
        });
    }

    function ObtenerDuracion() {
        if ($("#CantidadDespachar").val() != "" && $("#Dosis").val() != "" && $("#FrecuenciaDosis").val() != "") {
            var CantidadDespachar = parseFloat($("#CantidadDespachar").val());
            var Dosis = parseFloat($("#Dosis").val());
            var FrecuenciaDosis = parseFloat($("#FrecuenciaDosis").val());
            var MedidaTiempo = $("#MedidaTiempo").val();

            $.ajax({
                type: 'POST',
                url: '/Consulta/GetDuracionTratamiento',
                dataType: 'json',
                data: { pdDespacho: CantidadDespachar, pdDosis: Dosis, pdFrecuencia: FrecuenciaDosis, piMedidaFrecuencia: MedidaTiempo },
                success: function (Duracion) {
                    var DuracionTexto = Duracion.CANTIDAD + ' ' + Duracion.DENOMINACION_MEDIDA;
                    $("#DuracionTexto").val(DuracionTexto);
                    $("#DuracionCantidad").val(Duracion.CANTIDAD);
                    $("#DuracionMedida").val(Duracion.CODIGO_MEDIDA);
                },
                error: function (ex) {
                    alert('Error al obtener Duracion.' + ex.toString());
                }
            });
        }
    }
    //LimpiarDatosMedicamento
    function LimpiarDatosMedicamento() {
        $("#ItemMOrden").val("");
        $("#ItemMedicamento").val("");
        $("#CodigoMaterial").val("");
        $("#DescripciónMaterial").val("");
        $("#Laboratorio").val("");
        $("#FormaFarmaceutica").val("");
        $("#Lote").empty();
        $("#FechaVencimiento").val("");
        $("#Precio").val("");
        $("#CantidadDespachar").val("");
        $("#Stock").val("");
        $("#Precio").val("");
        $("#Dosis").val("");
        $("#FrecuenciaDosis").val("");
        $("#ObservacionesMedicamento").val("");
        $("#DuracionTexto").val("");
        $("#DuracionCantidad").val("");
        $("#DuracionMedida").val("");
        $("#Dosificado").prop('checked', false);
        $("#CodigoMaterial").removeAttr("readonly");
        $("#DescripciónMaterial").removeAttr("readonly");
        $("#divFechaInicioDosis").hide();
    }


    $("#DescripciónMaterial").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Logistica/GetMateriales",
                type: "POST",
                dataType: "json",
                data: {
                    psMaterial: request.term, psCentroCosto: 0, psCentroCostoArea: 0, piMotivo: 0, psAlmacen: $("#USU_ALMACEN").val(), psTipoProducto: 1, psTipoDestino: $("#CMRE_DESTINO").val()
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            value: item.REQ_MATERIAL_DENOMINACION,
                            text: item.REQ_MATERIAL,
                            uni: item.REQ_MATERIAL_UNIDAD_MEDIDA,
                            labo: item.REQ_LABORATORIO_DENOMINACION,
                            forma: item.REQ_FORMA_FARMACEUTICA_DENOMINACION
                        };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            $("#CodigoMaterial").val(ui.item.text);
            $("#Laboratorio").val(ui.item.labo);
            $("#FormaFarmaceutica").val(ui.item.forma);
            $("#Lote").empty();
            $("#CodigoMaterial").prop('readonly', true);
            $("#DescripciónMaterial").prop('readonly', true);
            //$("#TRA_UM_DENOMINACION").val(ui.item.uni);
            $.ajax({
                type: 'POST',
                url: '/Logistica/GetLotesMaterial',

                dataType: 'json',

                data: { psAlmacen: $("#USU_ALMACEN").val(), psMaterial: $("#CodigoMaterial").val(), psTipoDestino: $("#CMRE_DESTINO").val() },

                success: function (LOTES) {
                    $("#FechaVencimiento").val("");
                    $("#Stock").val("");
                    $("#Precio").val("");
                    //$("#CantidadDespachar").val("");

                    $.each(LOTES, function (i, LOTE) {
                        $("#Lote").append('<option value="' + LOTE.STKL_LOTE + '">' +
                         LOTE.STKL_LOTE + '</option>');
                        //$("#Lote").change();
                    });
                },
                error: function (ex) {
                    alert('Fallo al obtener Lotes.' + ex);
                }
            });
        }
    });

    $("#Lote").change(function () {
        $("#FechaVencimiento").empty();
        $("#Stock").empty();
        $("#Precio").empty();
        //$("#CantidadDespachar").empty();
        $.ajax({
            type: 'POST',
            url: '/Logistica/GetLoteMaterial',
            dataType: 'json',
            data: { psAlmacen: $("#USU_ALMACEN").val(), psMaterial: $("#CodigoMaterial").val(), psLote: $("#Lote").val(), psTipoDestino: $("#CMRE_DESTINO").val() },
            success: function (LOTES) {
                $.each(LOTES, function (i, LOTE) {
                    $("#FechaVencimiento").val(LOTE.STKL_FECHA_VENCIMIENTO);
                    $("#Stock").val(LOTE.STKL_CANTIDAD);
                    $("#Precio").val(LOTE.STKL_PRECIO);
                });

            },
            error: function (ex) {
                alert('Fallo al obtener Datos del Lote.' + ex);
            }
        });

        return false;
    });
    $("#CodigoMaterial").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/Logistica/GetMaterialesPorCodigo',
                type: "POST",
                dataType: "json",
                data: { psMaterialCodigo: request.term, piMotivo: 0, psAlmacen: $("#USU_ALMACEN").val() },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { value: item.REQ_MATERIAL, text: item.REQ_MATERIAL_DENOMINACION, uni: item.REQ_MATERIAL_UNIDAD_MEDIDA, labo: item.REQ_LABORATORIO_DENOMINACION, forma: item.REQ_FORMA_FARMACEUTICA_DENOMINACION };
                    }))
                }
            })
        },
        minLength: 2,
        select: function (event, ui) {
            $("#DescripciónMaterial").val(ui.item.text);
            $("#Laboratorio").val(ui.item.labo);
            $("#FormaFarmaceutica").val(ui.item.forma);
            $("#Lote").empty();
            $("#CodigoMaterial").prop('readonly', true);
            $("#DescripciónMaterial").prop('readonly', true);
            //$("#TRA_UM_DENOMINACION").val(ui.item.uni);
            $.ajax({
                type: 'POST',
                url: '/Logistica/GetLotesMaterial',
                dataType: 'json',
                data: { psAlmacen: $("#USU_ALMACEN").val(), psMaterial: $("#CodigoMaterial").val(), psTipoDestino: $("#CMRE_DESTINO").val() },

                success: function (LOTES) {
                    $("#FechaVencimiento").val("");
                    $("#Stock").val("");
                    $("#Precio").val("");
                    //$("#CantidadDespachar").val("");
                    $.each(LOTES, function (i, LOTE) {
                        $("#Lote").append('<option value="' + LOTE.STKL_LOTE + '">' +
                         LOTE.STKL_LOTE + '</option>');
                        //$("#Lote").change();
                    });
                },
                error: function (ex) {
                    alert('Fallo al obtener llenar combo Lotes. =(' + ex);
                }
            });
        }
    });


    function LlenarDetalleMedicamentos() {
        jsonObj = [];
        $("#TablaMedicamentos tbody tr").each(function (index) {
            if (index > 0) {
                item = {}
                $(this).children("td").each(function (index2) {
                    if (index2 == 1)
                        if ($(this).text() == "")
                            item["CMRE_ITEM"] = "0";
                        else
                            item["CMRE_ITEM"] = $(this).text();
                    if (index2 == 3)
                        item["CMRE_MEDICAMENTO"] = $(this).text();
                    if (index2 == 9) {
                        var Fecha = $(this).text().split("/");
                        item["CMRE_FECHA_VENCIMIENTO"] = Fecha[2] + "/" + Fecha[1] + "/" + Fecha[0];
                    }
                    if (index2 == 10)
                        item["CMRE_LOTE"] = $(this).text();
                    if (index2 == 5)
                        item["CMRE_CANTIDAD"] = parseFloat($(this).text());
                    if (index2 == 6)
                        item["CMRE_PUSOLES"] = parseFloat($(this).text());
                    //if (index2 == 4)
                    //    item["SAL_PUDOLARES"] = $(this).text();
                    if (index2 == 14)
                        item["CMRE_TRAT_CANTIDAD"] = parseFloat($(this).text());
                    if (index2 == 13)
                        item["CMRE_OBSERVACION"] = $(this).text();
                    if (index2 == 15)
                        item["CMRE_FREC_CANTIDAD"] = parseFloat($(this).text());
                    if (index2 == 16)
                        item["CMRE_FREC_MEDIDA"] = parseInt($(this).text());
                    if (index2 == 17)
                        item["CMRE_DURAC_CANTIDAD"] = parseFloat($(this).text());
                    if (index2 == 18)
                        item["CMRE_DURAC_MEDIDA"] = parseInt($(this).text());
                    if (index2 == 5)
                        item["CMRE_CANT_RECETADA"] = parseFloat($(this).text());
                    //if (index2 == 4)
                    //    item["SAL_CANT_EXPENDIDA"] = $(this).text();
                    if (index2 == 19)
                        item["CMRE_VIADM"] = $(this).text();
                    if (index2 == 20)
                        item["CMRE_DOSIFICADO"] = $(this).text();
                    if (index2 == 21) {
                        if (item["CMRE_DOSIFICADO"] == "N") {
                            var Fecha = moment().format('DD/MM/YYYY HH:mm').split(" ")[0];
                            Fecha = Fecha.split("/");
                            var Hora = moment().format('DD/MM/YYYY HH:mm').split(" ")[1];
                            item["CMRE_DOSI_FECHA_INICIO"] = Fecha[2] + "/" + Fecha[1] + "/" + Fecha[0] + " " + Hora;;
                        }
                        else {
                            var Fecha = $(this).text().split(" ")[0];
                            Fecha = Fecha.split("/");
                            var Hora = $(this).text().split(" ")[1];
                            item["CMRE_DOSI_FECHA_INICIO"] = Fecha[2] + "/" + Fecha[1] + "/" + Fecha[0] + " " + Hora;
                        }
                    }
                    if (index2 == 23)
                        item["CMRE_DESTINO"] = $(this).text();
                })
                item["CMRE_COMD_ID"] = $("#COMD_ID").val();
                item["CMRE_TIPO"] = $("#COMD_TIPO").val();
                item["CMRE_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

                jsonObj.push(item);
            }
        })
        $("#DetalleMedicamentos_JSON").val(JSON.stringify(jsonObj));
    }

    $("#CantidadDespachar").focusout(function (e) {
        if ($("#CantidadDespachar").val() != "" && $("#Stock").val() != "") {
            var CantidadDespachar = parseFloat($("#CantidadDespachar").val());
            var Stock = parseFloat($("#Stock").val());
            if (Stock < CantidadDespachar) {
                $.msgBox({
                    type: "error",
                    title: "Error",
                    content: "Stock insuficiente."
                });
                $("#CantidadDespachar").val(Stock)
            }
        }
    });



    $("#Dosis").focusin(function (e) {
        if ($("#CantidadDespachar").val() == "") {

            $.msgBox({
                type: "error",
                title: "Error",
                content: "Stock insuficiente."
            });
            $("#CantidadDespachar").focus();
            $("#CantidadDespachar").select();
        }
    });

    $("#FrecuenciaDosis").focusout(function (e) {
        ObtenerDuracion();
    });

    $("#CantidadDespachar").focusout(function (e) {
        ObtenerDuracion();
    });

    $("#Dosis").focusout(function (e) {
        ObtenerDuracion();
    });

    $("#FrecuenciaDosis").focusout(function (e) {
        ObtenerDuracion();
    });

    $("#MedidaTiempo").focusout(function (e) {
        ObtenerDuracion();
    });
    $("#NuevaBusquedaMedicamento").click(function (e) {
        $("#CodigoMaterial").removeAttr("readonly");
        $("#DescripciónMaterial").removeAttr("readonly");
        $("#DescripciónMaterial").focus();
        $("#DescripciónMaterial").select();
    });

    /*Intervenciones - indicaciones*/

    $("#DescripcionIndicaciones").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetIndicacionPorDenominacion",
                type: "POST",
                dataType: "json",
                data: {
                    psDENOMINACION_INDICACION: request.term
                },
                success: function (Indicaciones) {
                    response($.map(Indicaciones, function (item) {
                        return {
                            value: item.INME_DENOMINACION,
                            text: item.INME_ID
                        };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            var INME_ID = ui.item.text;
            $("#CodigoIndicaciones").val(INME_ID).attr('readonly', true);
            $(this).attr('readonly', true);
        }
    });

    $("#CodigoIndicaciones").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetIndicacionesPorCodigo",
                type: "POST",
                dataType: "json",
                data: {
                    psCODIGO_INDICACION: request.term
                },
                success: function (Indicaciones) {
                    response($.map(Indicaciones, function (item) {
                        return {
                            text: item.INME_DENOMINACION,
                            value: item.INME_ID
                        };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            var INME_DENOMINACION = ui.item.text;
            $("#DescripcionIndicaciones").val(INME_DENOMINACION).attr('readonly', true);
            $(this).attr('readonly', true);
        }
    });


    $("#TipoPautaIntervencion").change(function () {
        if ($(this).val() === "CADA") {
            $("#divCantidadPautaIntervencion").show();
            $("#divMedidaPautaIntervencion").show();
            $("#CantidadPautaIntervencion").focus();
            $("#CantidadPautaIntervencion").select();
        }
        else {
            $("#divCantidadPautaIntervencion").hide();
            $("#divMedidaPautaIntervencion").hide();
        }
    });

    $("#EditarIntervencion").click(function (e) {
        $("#CodigoIndicaciones").removeAttr("readonly");
        $("#DescripcionIndicaciones").removeAttr("readonly");
        $("#DescripcionIndicaciones").focus();
        $("#DescripcionIndicaciones").select();
    });


    $('#modalIntervencion').on('hidden.bs.modal', function (e) {
        LimpiarDatosIntervenciones();
    });

    $("#AgregaIntervencion").click(function (e) {
        var fila = 0;
        if ($("#CodigoIndicaciones").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Codigo CIE9."
            });
            return;
        }

        if ($("#DescripcionIndicaciones").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Descripción CIE9."
            });
            return;
        }

        if (($("#TipoPautaIntervencion").val() == "OTROS" || $("#TipoPautaIntervencion").val() == "CADA") && $("#CantidadPautaIntervencion").val() == "") {
            $.msgBox({
                type: "error",
                title: "Error",
                content: "Escriba Cantidad."
            });
            return;
        }

        if ($("#ItemIOrden").val() == "") {
            $("#tabla_oculta_intervenciones tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaIntervenciones tbody");
            $("#CantidadItemsIntervenciones").text(parseInt($("#CantidadItemsIntervenciones").text()) + 1);
            fila = parseInt($("#CantidadItemsIntervenciones").text());
        }
        else {
            fila = parseInt($("#ItemIOrden").val());
        }

        ActualizarCampoDetalle("I", fila, 1, $("#ItemIntervencion").val());
        ActualizarCampoDetalle("I", fila, 3, $("#CodigoIndicaciones").val());
        ActualizarCampoDetalle("I", fila, 4, $("#DescripcionIndicaciones").val());
        ActualizarCampoDetalle("I", fila, 5, $("#TipoPautaIntervencion").val());
        if ($("#TipoPautaIntervencion").val() == "OTROS")
            ActualizarCampoDetalle("I", fila, 6, $("#CantidadPautaIntervencion").val());
        else if ($("#TipoPautaIntervencion").val() == "CADA")
            ActualizarCampoDetalle("I", fila, 6, $("#CantidadPautaIntervencion").val() + " " + $("#MedidaPautaIntervencion").val());
        else if ($("#TipoPautaIntervencion").val() == "TURNO")
            ActualizarCampoDetalle("I", fila, 6, $("#TurnoPautaIntervencion").val());
        else
            ActualizarCampoDetalle("I", fila, 6, "");

        ActualizarCampoDetalle("I", fila, 7, $("#FechaInicioIntervencion").val());
        ActualizarCampoDetalle("I", fila, 8, $("#FechaFinIntervencion").val());
        restaFechas($("#FechaInicioIntervencion").val(), $("#FechaFinIntervencion").val());
        ActualizarCampoDetalle("I", fila, 9, $("#DiasIntervencion").val());
        ActualizarCampoDetalle("I", fila, 10, $("#ObservacionIntervencion").val());

        ActualizarNumeroItem("I");
        LimpiarDatosIntervenciones();

        $('#modalIntervencion').modal('toggle');
    });

    $(document).on("click", "#QuitarIntervencion", function () {
        var parent = $(this).parents().get(1);
        $(parent).remove();
        $("#CantidadItemsIntervenciones").text(parseInt($("#CantidadItemsIntervenciones").text()) - 1);
        ActualizarNumeroItem("I");
    });

    $("#FechaInicioIntervencion").focusout(function (e) {
        restaFechas($("#FechaInicioIntervencion").val(), $("#FechaFinIntervencion").val());
    });

    $("#FechaFinIntervencion").focusout(function (e) {
        restaFechas($("#FechaInicioIntervencion").val(), $("#FechaFinIntervencion").val());
    });

    $("#DiasIntervencion").focusin(function (e) {
        restaFechas($("#FechaInicioIntervencion").val(), $("#FechaFinIntervencion").val());
    });

    function LimpiarDatosIntervenciones() {
        $("#ItemDiagnostico").val("");
        $("#ItemIOrden").val("");
        $("#CodigoIndicaciones").val("");
        $("#DescripcionIndicaciones").val("");
        $("#ObservacionIntervencion").val("");
        $("#CantidadPautaIntervencion").val("");
        $("#CodigoIndicaciones").removeAttr("readonly");
        $("#DescripcionIndicaciones").removeAttr("readonly");
    }

    function LlenarDetalleIntervencion() {
        jsonObj = [];
        $("#TablaIntervenciones tbody tr").each(function (index) {
            if (index > 0) {
                item = {}
                $(this).children("td").each(function (index2) {
                    if (index2 == 1)
                        if ($(this).text() == "")
                            item["CMIT_ITEM"] = "0";
                        else
                            item["CMIT_ITEM"] = $(this).text();
                    if (index2 == 3)
                        item["CMIT_CODIGO_CIE9"] = $(this).text();
                    if (index2 == 5)
                        item["CMIT_TIPO_PAUTA"] = $(this).text();
                    if (index2 == 6)
                        item["CMIT_CANTIDAD_PAUTA"] = $(this).text();
                    if (index2 == 7) {
                        var Fecha = $(this).text().split("/");
                        item["CMIT_FECHA_INICIO"] = Fecha[2] + "/" + Fecha[1] + "/" + Fecha[0];
                    }
                    if (index2 == 8) {
                        var Fecha = $(this).text().split("/");
                        item["CMIT_FECHA_FIN"] = Fecha[2] + "/" + Fecha[1] + "/" + Fecha[0];
                    }
                    if (index2 == 9)
                        item["CMIT_DIAS"] = parseInt($(this).text());
                    if (index2 == 10)
                        item["CMIT_OBSERVACION"] = $(this).text();
                })
                item["CMIT_ID"] = $("#COMD_ID").val();
                item["CMIT_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

                jsonObj.push(item);
            }
        })
        $("#DetalleIntervenciones_JSON").val(JSON.stringify(jsonObj));
    }

    function restaFechas(f1, f2) {
        var aFecha1 = f1.split('/');
        var aFecha2 = f2.split('/');
        var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
        var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        //return dias;
        $("#DiasIntervencion").val(dias);
    }
    $("#AgregarIntervencion").click(function () {
        $('#FormAgregarIntervencion').modal('toggle');
    });
    $(document).on("click", "#AgregalIntervencion", function () {
        var parent = $(this).parents().get(1);
        $(parent).children("td").each(function (index2) {
            if (index2 == 1)
                $("#ItemIntervencion").val($(this).text());
            if (index2 == 2)
                $("#ItemIOrden").val($(this).text());
            if (index2 == 3)
                $("#CodigoIndicaciones").val($(this).text());
            if (index2 == 4)
                $("#DescripcionIndicaciones").val($(this).text());
            if (index2 == 5)
                $("#TipoPautaIntervencion").val($(this).text());

            if (index2 == 6)
                if ($("#TipoPautaIntervencion").val() == "TURNO") {
                    $("#divTurnoPautaIntervencion").show();
                    $("#TurnoPautaIntervencion").val($(this).text());
                } else if ($("#TipoPautaIntervencion").val() == "OTROS") {
                    $("#divCantidadPautaIntervencion").show();
                    $("#CantidadPautaIntervencion").val($(this).text());
                } else if ($("#TipoPautaIntervencion").val() == "CADA") {
                    $("#divMedidaPautaIntervencion").show();
                    $("#divCantidadPautaIntervencion").show();
                    $("#CantidadPautaIntervencion").val(parseInt($(this).text().split("")[0]));
                }

            if (index2 == 7)
                $("#FechaInicioIntervencion").val($(this).text());
            if (index2 == 8)
                $("#FechaFinIntervencion").val($(this).text());
            if (index2 == 9)
                $("#DiasIntervencion").val($(this).text());
            if (index2 == 10)
                $("#ObservacionIntervencion").val($(this).text());
        })

        $("#CodigoIndicaciones").prop('readonly', true);
        $("#DescripcionIndicaciones").prop('readonly', true);
        $('#modalIntervencion').modal('toggle');
    });


    $(document).on("click", "#ModificarIntervencion", function () {
        var parent = $(this).parents().get(1);
        $(parent).children("td").each(function (index2) {
            if (index2 == 1)
                $("#ItemIntervencion").val($(this).text());
            if (index2 == 2)
                $("#ItemIOrden").val($(this).text());
            if (index2 == 3)
                $("#CodigoIndicaciones").val($(this).text());
            if (index2 == 4)
                $("#DescripcionIndicaciones").val($(this).text());
            if (index2 == 5)
                $("#TipoPautaIntervencion").val($(this).text());

            if (index2 == 6)
                if ($("#TipoPautaIntervencion").val() == "TURNO") {
                    $("#divTurnoPautaIntervencion").show();
                    $("#TurnoPautaIntervencion").val($(this).text());
                } else if ($("#TipoPautaIntervencion").val() == "OTROS") {
                    $("#divCantidadPautaIntervencion").show();
                    $("#CantidadPautaIntervencion").val($(this).text());
                } else if ($("#TipoPautaIntervencion").val() == "CADA") {
                    $("#divMedidaPautaIntervencion").show();
                    $("#divCantidadPautaIntervencion").show();
                    $("#CantidadPautaIntervencion").val(parseInt($(this).text().split("")[0]));
                }

            if (index2 == 7)
                $("#FechaInicioIntervencion").val($(this).text());
            if (index2 == 8)
                $("#FechaFinIntervencion").val($(this).text());
            if (index2 == 9)
                $("#DiasIntervencion").val($(this).text());
            if (index2 == 10)
                $("#ObservacionIntervencion").val($(this).text());
        })

        $("#CodigoIndicaciones").prop('readonly', true);
        $("#DescripcionIndicaciones").prop('readonly', true);
        $('#modalIntervencion').modal('toggle');
    });

    /* INTERCONSULTA - TAB | MODAL */
    $("#txtServicioConsultado").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetEspecialidades",
                type: "POST",
                dataType: "json",
                data: {
                    psDENOMINACION_ESPECIALIDAD: request.term
                },
                success: function (Especialidad) {
                    response($.map(Especialidad, function (item) {
                        return {
                            value: item.EPS_DENOMINACION,
                            text: item.EPS_ID
                        };
                    }))
                }
            })
        },
        minLength: 1,
        select: function (event, ui) {
            var ESP_ID = ui.item.text;
            $(this).attr('readonly', true);
        }
    });

    $(function () {
        var hora = new Date();
        var min_save = hora.getMinutes();
        var mes_save = hora.getMonth() + 1;
        var segundos_save = hora.getSeconds();
        var fecha_save = hora.getDate() + "/" + (mes_save < 10 ? "0" + mes_save : mes_save) + "/" + hora.getFullYear();
        var hora_save = hora.getHours() + ":" + (min_save < 10 ? "0" + min_save : min_save) + ":" + (segundos_save < 10 ? "0" + segundos_save : segundos_save);
        $("#txtFechaInterconsulta").val(fecha_save);
        $("#txtHoraInterconsulta").val(hora_save);

    });

    $("#CodigoCIE10_1").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetCIE10s_Codigo",
                type: "POST",
                dataType: "json",
                data: { psCODIGO: request.term },
                success: function (Empresa) {
                    response($.map(Empresa, function (item) {
                        return { value: item.CODIGO, text: item.DENOMINACION };
                    }))
                }
            })
        },
        select: function (event, ui) {
            $("#DescripcionCIE10_1").val(ui.item.text);
            $("#DescripcionCIE10_1").prop('readonly', true);
            $("#CodigoCIE10_1").prop('readonly', true);
        }
    });

    $("#DescripcionCIE10_1").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Maestro/GetCIE10s_Denominacion",
                type: "POST",
                dataType: "json",
                data: { psDENOMINACION: request.term },
                success: function (Empresa) {
                    response($.map(Empresa, function (item) {
                        return { value: item.DENOMINACION, text: item.CODIGO };
                    }))
                }
            })
        },
        minLength: 3,
        select: function (event, ui) {
            $("#CodigoCIE10_1").val(ui.item.text);
            $("#DescripcionCIE10_1").prop('readonly', true);
            $("#CodigoCIE10_1").prop('readonly', true);

        }
    });

    //Editarinterconsulta
    $("#btnEditarInterconsulta").click(function () {
        $("#CodigoCIE10_1").removeAttr("readonly");
        $("#DescripcionCIE10_1").removeAttr("readonly");
        $("#DescripcionCIE10_1").focus();
        $("#DescripcionCIE10_1").select();
    });

    //CancelarInterconsulta
    $("#btnCancelarInterconsulta").click(function () {
        $("#CodigoCIE10_1").val("");
        $("#DescripcionCIE10_1").val("");
        $("#COMD_ENFERMEDAD_ACTUAL").val("");
        $("#CodigoCIE10_1").removeAttr("readonly");
        $("#DescripcionCIE10_1").removeAttr("readonly");
    });

    //Agregarinterconsulta
    $("#btnAgregarInterconsulta").click(function () {
        $("#tabla_oculta_interconsulta tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaInterconsulta tbody");
        $("#CantidadItemsInterconsulta").text(parseInt($("#CantidadItemsInterconsulta").text()) + 1);
        fila = parseInt($("#CantidadItemsInterconsulta").text());
        ActualizarCampoDetalle("IC", fila, 1, $("#ItemInterconsulta").val());
        ActualizarCampoDetalle("IC", fila, 3, $("#txtServicioConsultado").val());
        ActualizarCampoDetalle("IC", fila, 4, $("#txtFechaInterconsulta").val());
        ActualizarCampoDetalle("IC", fila, 5, $("#txtHoraInterconsulta").val());
        ActualizarCampoDetalle("IC", fila, 6, $("#CodigoCIE10_1").val());
        ActualizarCampoDetalle("IC", fila, 7, $("#DescripcionCIE10_1").val());
        ActualizarCampoDetalle("IC", fila, 8, $("#COMD_MOTIVO_INTERCONSULTA option:selected").text());
        ActualizarNumeroItem("IC");
        $("#CodigoCIE10_1").val("");
        $("#DescripcionCIE10_1").val("");
        $("#COMD_ENFERMEDAD_ACTUAL").val("");
        $("#CodigoCIE10_1").removeAttr("readonly");
        $("#DescripcionCIE10_1").removeAttr("readonly");
        
        $("#modalInterconsulta").modal('toggle');
    });

    ////////////////////////////////////////////////////////////////////////////

    /* HELPER */
    function ActualizarCampoDetalle(tabla, fila, columna, valor) {
        if (tabla == 'D') {
            $("#TablaDiagnosticos tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index == fila && index2 == columna) {
                        $(this).text(valor);
                        return;
                    }
                })
            })
        }

        if (tabla == 'M') {
            $("#TablaMedicamentos tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index == fila && index2 == columna) {
                        $(this).text(valor);
                        return;
                    }
                })
            })
        }

        if (tabla == 'I') {
            $("#TablaIntervenciones tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index == fila && index2 == columna) {
                        $(this).text(valor);
                        return;
                    }
                })
            })
        }

        if (tabla == 'EA') {
            $("#TablaExamenesAxuliares tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index == fila && index2 == columna) {
                        $(this).text(valor);
                        return;
                    }
                })
            })
        }

        if (tabla == 'IC') {
            $("#TablaInterconsulta tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index == fila && index2 == columna) {
                        $(this).text(valor);
                        return;
                    }
                })
            })
        }
    }

    function ActualizarNumeroItem(tabla) {
        var i = 1;
        if (tabla == 'D') {
            $("#TablaDiagnosticos tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }
        if (tabla == "M") {
            $("#TablaMedicamentos tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }

        if (tabla == "I") {
            $("#TablaIntervenciones tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }

        if (tabla == "EA") {
            $("#TablaExamenesAxuliares tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }

        if (tabla == "AR") {
            $("#TablaExamenesArchivos tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }
        if (tabla == "IC") {
            $("#TablaInterconsulta tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index > 0 && index2 == 2) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }
    }

    $(function () {
        $("#TablaParteCuerpo tr select").click(function () {
            var cboAlter = $(this).attr('id');
            var txtAlter = cboAlter.substr(cboAlter.indexOf("_") + 1, cboAlter.length);
            var txtR = $("#txtParteCuerpoR_" + txtAlter).val();
            $("#" + cboAlter).change(function () {
                var item = $("#" + cboAlter + " option:selected").val();
                if (item != 0) {
                    $("#txtParteCuerpo_" + txtAlter).attr("readonly", false).val("").focus();
                } else {
                    $("#txtParteCuerpo_" + txtAlter).val(txtR).attr("readonly", true);
                }
            });
        });
    });

    /* GUARDAR - TAB | MODAL */
    $("#btnGuardarFichaAnamnesis").click(function () {
        LlenarAnamnesis();
        $("#COMD_CERRADO").val("0");
        $("#frmConsultaEmergencia").submit();
    });

    /* GUARDAR - TAB | PLAN DE TRABAJO */
    var btnNotification = document.getElementById("btnGuardarFichaPlanDeTrabajo"),
    btnPermission = document.getElementById("btnGuardarFichaPlanDeTrabajo")
    title = "Tiene una llamada entrante. ¿Desea Responder?",
    more = {
        icon: "http://localhost:44467/Images/logo_empresa.png",
        body: "Pulsa o cierra la notificación."
    };

    function permission() {
        Notification.requestPermission();
    };

    function showNotification() {
        if (Notification) {

            if (Notification.permission == "granted") {

                var n = new Notification(title, more);
                n.onclick = function () {
                    n.onclose = null;
                    window.open('/Consulta/TeleAsistenciaMedicoGeneral', '_blank');
                }
                n.onclose = function () {

                }

                setTimeout(function () { n.close() }, 5000);
            }

            else if (Notification.permission == "default") {
                alert("Primero da los permisos de notificación");
            }

            else {
                alert("Bloqueaste los permisos de notificación");
            }
        }

        else {
            alert("Tu navegador no es compatible con API Notification");
        }
    };

    if (btnPermission) {
        btnPermission.addEventListener("click", permission)
    }

    if (btnNotification) {
        btnNotification.addEventListener("click", showNotification);
    }

    // MOVER LUEGO
    function LlenarAnamnesis() {
        item = {}
        item["CMAN_MOTIVO"] = $("#CMAN_MOTIVO").val();
        item["CMAN_TE_CANTIDAD"] = parseInt($("#CMAN_TE_CANTIDAD").val());
        item["CMAN_TE_FRECUENCIA"] = $("#CMAN_TE_FRECUENCIA").val();
        item["CMAN_FORMA_INICIO"] = $("#CMAN_FORMA_INICIO").val();
        item["CMAN_APETITO"] = $("#CMAN_APETITO").val();
        item["CMAN_SED"] = $("#CMAN_SED").val();
        item["CMAN_SUENO"] = $("#CMAN_SUENO").val();
        item["CMAN_ORINA"] = $("#CMAN_ORINA").val();
        item["CMAN_DEPOSICION"] = $("#CMAN_DEPOSICION").val();
        item["CMAN_ESTADO_ANIMICO"] = $("#COMD_ESTADO_CONCIENCIA").val();
        item["CMAN_ANTECEDENTES"] = "";
        item["CMAN_EXA_FISICO"] = "";

        item["CMAN_COMD_ID"] = $("#COMD_ID").val();
        item["CMAN_COMD_ESTABLECIMIENTO"] = $("#COMD_ESTABLECIMIENTO").val();

        $("#Anamesis_JSON").val(JSON.stringify(item));
    }

    //////////*****************************************************//////////////////////////
    //////////            VALORES NORMALES DE SIGNOS VITALES       //////////////////////////
    //////////_____________________________________________________//////////////////////////
    $("#COMD_PAC_PULSO").keyup(function () {

        if ($(this).val() < 70 || $(this).val() > 100) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });
    $("#COMD_PAC_RESPIRACION").keyup(function () {

        if ($(this).val() < 17 || $(this).val() > 22) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });
    $("#COMD_PAC_OXIGENO").keyup(function () {

        if ($(this).val() < 95 || $(this).val() > 100) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });
    $("#COMD_PAC_PRESSIS").keyup(function () {

        if ($(this).val() < 80 || $(this).val() > 125) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });
    $("#COMD_PAC_PRESDIS").keyup(function () {

        if ($(this).val() < 50 || $(this).val() > 80) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });

    $("#COMD_PAC_TEMPERATURA").keyup(function () {

        if ($(this).val() < 36 || $(this).val() > 37.4) {
            $(this).addClass("input_error");
        }
        else {
            $(this).removeClass("input_error");
        }
    });





    $(".btn-periferico").click(function () {
        $(".btn-periferico").addClass("btn-danger");
        $(".btn-periferico").removeClass("btn-periferico-active");


        $(this).removeClass("btn-danger");
        $(this).addClass("btn-success");
        $(this).addClass("btn-periferico-active");



    });

    $(".btn-periferico-p").click(function () {
        $(".btn-periferico-p").addClass("btn-danger");
        $(".btn-periferico-p").removeClass("btn-periferico-active");


        $(this).removeClass("btn-danger");
        $(this).addClass("btn-success");
        $(this).addClass("btn-periferico-active");



    });





    $(function () {
        setInterval(getJson, 4000);
    });

    var myObj = { "cam1": 0, "cam2": 0, "monitor": 1 };

    function getJson() {
        //var myObj = { "cam1": 0, "cam2": 0, "monitor": 1 };

        var myJSON = JSON.stringify(myObj);

        if (myObj.cam1 == 1)
            btnCamera1.click();
        if (myObj.cam2 == 1)
            btnCamera2.click();
        if (myObj.monitor == 1)
            btnMonitor.click();

    }
    $(".btn-periferico").click(function () {

        $(this).change(function () {

            myObj.cam1 = 0;
            myObj.cam2 = 0;
            myObj.monitor = 0;

            var periferico = $(this).attr("ID");

            switch (periferico) {
                case "btnCamera1": myObj.cam1 = 1; break;
                case "btnCamera2": myObj.cam2 = 1; break;
                case "btnMonitor": myObj.monitor = 1; break;
            }

            //console.log("Ya");
            //console.log(periferico);
            //console.log(myObj);

        });



    });

    $(".btn-periferico-p").click(function () {

        myObj.cam1 = 0;
        myObj.cam2 = 0;
        myObj.monitor = 0;

        var periferico = $(this).attr("ID");

        switch (periferico) {
            case "cam1": myObj.cam1 = 1; break;
            case "cam2": myObj.cam2 = 1; break;
            case "monitor": myObj.monitor = 1; break;
        }


        //console.log(periferico);
        //console.log(myObj);

    });

    /*//////////////////////////////////////////////////////*/

    $(function () {
        var conn = $.connection("/mensaje");

        conn.received(function (data) {
            if (data.Titulo == "Servidor") {
                $("#mensajeBackEnd").append("<li>" + data.Titulo + ':' + data.Texto + "</li>");
            } else {
                $("#mensajeClient").append("<li>" + data.Titulo + ':' + data.Texto + "</li>");
            }
        });

        conn.error(function (error) {
            console.warn(error);
        });

        conn.start()
            .promise()
            .done(function () {
                $("#send").click(function () {
                    var pTitulo = $("#Titulo").val();
                    var pTexto = $("#Texto").val();
                    conn.send(JSON.stringify({ Titulo: pTitulo, Texto: pTexto }));
                })
            });
    });


});
