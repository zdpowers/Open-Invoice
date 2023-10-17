using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    public class InvoiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
