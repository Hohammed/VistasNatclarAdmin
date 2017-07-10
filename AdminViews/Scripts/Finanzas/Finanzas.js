
$(document).ready(function () {
    //var sumaImporte = parseFloat("0.00");

    function CalcularImporte() {
        var Importe = 0;
        $(".chkSumarImporte").each(function () {
            var $this = $(this);
            if ($this.is(':checked')) {
                var $this = $(this);
                Importe += parseFloat($this.parent('td').parent('tr').find('td:eq(4)').text());
            }
        });
        $("#txtImporteSeleccionado").val(Importe.toFixed(2));
    }

    $(".chkSumarImporte").change(function () {

        var parent = $(this).parent('td').parent('tr');
        var $this = $(this);
        if ($this.is(':checked')) {
            $(parent).removeClass("danger");
            $(parent).addClass("success");
        }
        else {
            $(parent).removeClass("success");
          //  if ($this.data("valorizado") == "PENDIENTE")
            $(parent).addClass("danger");
        }

        CalcularImporte();

    });

    $(document).on("click", "#btnAgregarDetalle", function () {
        var flag = true;
        
        if ($("#vcCodigoServicio").val()=="")
        {
            alert("Ingrese el Codigo del Servicio")
            flag= false;
        }

        if ($("#nvDenominacionServicio").val() == "") {
            alert("Ingrese la Denominacion del Servicio")
            flag= false;
        }

        if ($("#nuCantidad").val() == "") {
            alert("Ingrese la Cantidad")
            flag=false;
        }
        else if (parseInt($("#nuCantidad").val()) <= 0)
        {
            alert("Cantidad Invalida")
            flag= false;
        }
        

        if ($("#nuPrecioUnitario").val() == "") {
            alert("Ingrese el Precio Unitario")
            flag = false;
        }
        else if (parseInt($("#nuPrecioUnitario").val()) <= 0)
        {   alert("Precio No Valid0")
            flag= false;
        }


        if (flag == true)
        {
            if ($("#iItemDetalleDocumentoVenta").val() == "") {
                $("#tabla_oculta_documentoventa_detalle tbody tr:eq(0)").clone().removeClass('fila-base').appendTo("#TablaDetalleDocumentoVenta tbody");
                $("#CantidadItems").text(parseInt($("#CantidadItems").text()) + 1);
                fila = parseInt($("#CantidadItems").text());
            }
            else
            {
                fila = parseInt($("#iItemDetalleDocumentoVenta").val());
            }

            //alert(fila);
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 4, $("#CantidadItems").text());
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 5, $("#vcCodigoServicio").val());
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 6, $("#nvDenominacionServicio").val());         
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 7, $("#nuCantidad").val());

            var PreUnit = parseFloat($("#nuPrecioUnitario").val());          
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 8, PreUnit.toFixed(2));

            var Descuento=0
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 9, Descuento.toFixed(2));

            var PrecioUnitarioNeto = parseFloat($("#nuPrecioUnitario").val()) - Descuento;
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 10, PrecioUnitarioNeto.toFixed(2));

            var Importe = parseFloat($("#nuCantidad").val()) * PrecioUnitarioNeto;
            ActualizarCampoDocumentoVentaDetalle(fila - 1, 11, Importe.toFixed(2));
           
            //ActualizarNumeroItemDocumentoVentaDetalle("D");
            LimpiarDatosAgregarDocumentoVentaDetalle();
            CalcularTotalDocumentoVenta();
            $('#FormRegistrarDetalleDocumentoVenta').modal('toggle');
        }
        
      
    });

    

    function ActualizarCampoDocumentoVentaDetalle(fila, columna, valor) {      
        $("#TablaDetalleDocumentoVenta tbody tr").each(function (index) {
            //alert("index: "+ index+ " fila: " + fila + " columna: " + columna + " valor: " + valor);
            $(this).children("td").each(function (index2) {
                if (index == fila && index2 == columna) {
                    $(this).text(valor);
                    return;
                }
            })
        })
    }

    function ActualizarNumeroItemDocumentoVentaDetalle(tabla) {
        var i = 1;
        if (tabla == 'D') {
            $("#TablaDetalleDocumentoVenta tbody tr").each(function (index) {
                $(this).children("td").each(function (index2) {
                    if (index >= 0 && index2 == 4) {
                        $(this).text(i);
                        i++;
                    }
                })
            })
        }
    }


    function LimpiarDatosAgregarDocumentoVentaDetalle() {
        $("#vcCodigoServicio").val("");
        $("#nvDenominacionServicio").val("");
        $("#nvDenominacionServicio").val("");
        $("#nuCantidad").val("");
        $("#nuPrecioUnitario").val("");
        

    }

    function CalcularTotalDocumentoVenta() {
        var SubTotal = 0;
        var Descuento = 0;
        $("#TablaDetalleDocumentoVenta tbody tr").each(function (index) {
            $(this).children("td").each(function (index2) {
                if (index >= 0 && index2 == 11) {

                    SubTotal = SubTotal + parseFloat($(this).text().replace(",", ""));
                }
            })
        })

        if ($("#nuDescuentoValor").val() == "") {
            var Descuento = 0;
        }
        else {
            var Descuento = parseFloat($("#nuDescuentoValor").val());
        }

        var DescuentoImporte = (Descuento / 100) * SubTotal;

        var Impuesto = parseFloat($("#nuImpuestoPorcentaje").val());
        var ImpuestoValor = (SubTotal - DescuentoImporte) * (Impuesto/100);
        var Detraccion = 10;
        var DetraccionValor = 0;
        var Total = 0;

        $("#nuSubTotal").val(SubTotal.toFixed(2).toString());
        $("#nuDescuentoValor").val(DescuentoImporte.toFixed(2));
        $("#nuImpuestoValor").val(ImpuestoValor.toFixed(2));

        if ($("#COPG_AUTODETRACCION").is(':checked')) {
            $("#nuDetraccionValor").val(DetraccionValor.toFixed(2));
        }
        else {
            if ((SubTotal - DescuentoImporte + ImpuestoValor) > 700)
            {
                DetraccionValor = (SubTotal - DescuentoImporte + ImpuestoValor) * (Detraccion / 100);
            }
        }

        $("#nuDetraccionValor").val(DetraccionValor.toFixed(2));
        Total = SubTotal - DescuentoImporte + ImpuestoValor - DetraccionValor;
        parseFloat($("#nuTotal").val(Total.toFixed(2)));
    }

    $(document).on("click", "#QuitarDetalleDocumentoVenta", function () {
        var parent = $(this).parents().get(1);
        $(parent).remove();
        $("#CantidadItems").text(parseInt($("#CantidadItems").text()) - 1);
        ActualizarNumeroItemDocumentoVentaDetalle("D");
        CalcularTotalDocumentoVenta();
    });


    $(document).on("click", "#COPG_AUTODETRACCION", function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $("#COPG_AUTODETRACCION").val("1");
            $("#trDetraccion").hide();
        }
        else {
            $("#COPG_AUTODETRACCION").val("0");
            $("#trDetraccion").show();
        }

        CalcularTotalDocumentoVenta();
    })


    $("#NuevoDocumentoVenta").click(function () {
        window.location.href = "../Finance/RegistrarDocumentoVenta";
    })
});

