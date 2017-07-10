using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        public ActionResult Login()
        {
            return View();
        }

        // GET: /Account/
        public JsonResult BuscarUsuario()
        {
           
            string url = "/GetData?user={user}&pass={pass}";


            JavaScriptSerializer serializer = new JavaScriptSerializer();
            params = serializer.Deserialize<List<ProxyTrabajador.Persona>>(Request.Form["Datos_JSON"]);

            ProxyTrabajador.WSPersonaClient ws = new ProxyTrabajador.WSPersonaClient();
            ProxyTrabajador.Persona Personas = ws.ObtenerPersona(user, pass);

            return Json(Personas.Apellidos, JsonRequestBehavior.AllowGet);
        }
    }
}