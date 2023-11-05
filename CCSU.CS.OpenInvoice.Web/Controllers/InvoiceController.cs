using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly InvoicingContext _invoicingContext;

        public InvoiceController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("Customer/{customerId}/Invoice/{invoiceId}")]
        public IActionResult CustomerInvoice(int customerId, int invoiceId)
        {
            var company = _invoicingContext.Companies.FirstOrDefault();
            var customer = new Customer
            {

                Address = "100 Main st",
                Address2 = "3rd Floor",
                City = "Hartford",
                Contact = "Test contact",
                Country = "USA",
                Email = "test@test.com" ,
                Name = "Test customer",
                Phone = "(203)111-2222",
                State = "CT",
                Zip = "06106",
                Notes = "Notes"
              

            };

            var invoice = new Invoice
            {
                Terms = company.Terms,
                Notes = company.Notes,
                From = company.CompleteAddress,
                BillTo = customer.CompleteAddress,
                Logo  = company.Logo
            };

            return View(invoice);
        }


    }
}
