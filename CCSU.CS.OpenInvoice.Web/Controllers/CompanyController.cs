using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    public class CompanyController : Controller
    {
        public IActionResult Index()
        {
            // We have to get Company saved in database
            // Make company obeject and pass to view
            var Company = new Company
            {

                Name = "Test compamny",
                Address = "Adress"

            };
            return View(Company);
        }
    }
}
