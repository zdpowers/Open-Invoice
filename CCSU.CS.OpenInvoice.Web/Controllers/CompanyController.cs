using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    public class CompanyController : Controller
    {
        private readonly InvoicingContext _invoicingContext;
        public CompanyController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }
        public IActionResult Index()
        {
            var company = _invoicingContext.Companies.FirstOrDefault();
            // We have to get Company saved in database
            // Make company obeject and pass to view
            return View(company);
        }
    }
}
