$(document).on("ready", function () {
    var botones = "<button id='btnEliminar' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button><button id='btnMostrarPago' class='btn btn-success' data-toggle='modal' data-target='#FormRegistrarPago'><i class='glyphicon glyphicon-eye-open'></i></button>";

    function configuracion() {
        $("#tblPagos").DataTable();
        $("#tblPagos tbody tr").remove();
    }

    function limpiarFormulario() {
        $("#FormRegistrarPago input, #FormRegistrarPago textarea").val('');
        $("#FormRegistrarPago select").val(0);
        $("#FormRegistrarPago button").show();
    }

    function reordenar() {
        var item = 1;
        $("#tblPagos tbody tr").each(function (index) {
            $(this).find("td:eq(1)").html(item++);
        });
    }

    function guardarPago() {
        var ief = $("#cboEntidadFinancieraf").val();
        var ef = $("#cboEntidadFinancieraf option:selected").text();
        var inc = $("#cboNumeroCuentaf").val();
        var nc = $("#cboNumeroCuentaf option:selected").text();
        var op = $("#Operacionf").val();
        var ni = $("#nuImportef").val();
        var fe = $("#dFecha").val();
        var ob = $("#nvObservacion").val();
        var fila = "<tr><td>" + botones + "</td><td></td><td hidden>" + ief + "</td><td>" + ef + "</td><td hidden>" + inc + "</td><td>" + nc + "</td><td>" + op + "</td><td>" + ni + "</td><td>" + fe + "</td><td>" + ob + "</td></tr>";
        $("#tblPagos tbody").append(fila);
    }

    function modificarPago() {
        var item = $("#item").val();
        var ief = $("#cboEntidadFinancieraf").val();
        var ef = $("#cboEntidadFinancieraf option:selected").text();
        var inc = $("#cboNumeroCuentaf").val();
        var nc = $("#cboNumeroCuentaf option:selected").text();
        var op = $("#Operacionf").val();
        var ni = $("#nuImportef").val();
        var fe = $("#dFecha").val();
        var ob = $("#nvObservacion").val();
        var fila = "<td>" + botones + "</td><td>" + item + "</td><td hidden>" + ief + "</td><td>" + ef + "</td><td hidden>" + inc + "</td><td>" + nc + "</td><td>" + op + "</td><td>" + ni + "</td><td>" + fe + "</td><td>" + ob + "</td>";
        $("#tblPagos tbody tr").each(function () {
            if ($(this).find("td:eq(1)").html() == item) {
                $(this).html("").html(fila);
            }
        });
    }

    function mostrarPago(fila) {
        $("#item").val(fila.find("td:eq(1)").html());
        $("#cboEntidadFinancieraf").val(fila.find("td:eq(2)").html());
        $("#cboNumeroCuentaf").val(fila.find("td:eq(4)").html());
        $("#Operacionf").val(fila.find("td:eq(6)").html());
        $("#nuImportef").val(fila.find("td:eq(7)").html());
        $("#dFecha").val(fila.find("td:eq(8)").html());
        $("#nvObservacion").val(fila.find("td:eq(9)").html());
    }

    function eliminarPago(fila) {
        fila.remove();
    }

    function ocultarBoton(oper) {
        if (oper == 1) {
            $("#btnModificarPago").hide();
        }
        if (oper == 2) {
            $("#btnGuardarPago").hide();
        }
    }

    configuracion();
    limpiarFormulario();
    GetEntidadFinanciera("","");

    $("#btnCancelar").on("click", function () {
        limpiarFormulario();
    });
    $("#btnNuevo").on("click", function () {
        ocultarBoton(1);
    });
    $("#btnGuardarPago").on("click", function () {
        guardarPago();
        reordenar();
        limpiarFormulario();
    });
    $("#tblPagos tbody").on("click", "#btnMostrarPago", function () {
        ocultarBoton(2);
        var fila = $(this).parent().parent();
        mostrarPago(fila);
    });
    $("#btnModificarPago").on("click", function () {
        modificarPago();
        limpiarFormulario();
    });
    $("#tblPagos tbody").on("click", "#btnEliminar", function () {
        eliminarPago($(this).parent().parent());
        reordenar();
    });

    
    

   
});