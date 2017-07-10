$(document).ready(function () {
    var pathname = window.location.pathname;
    
    if (pathname == "/Views/Purchases/RegistrarRequerimientoCompra.html") {
        
        //Añadir 

        $("#btnAgregarDetalleRequerimientoArticulo101").click(function () {
            var x = $("#vcDescripcionRequerimientoArticulo101").val();

            $("#tblDetalleRequerimientoArticulo101 tbody").append($("<tr>").append(
                "<td>" + x +  "</td>"
                ));
        });


    }

});