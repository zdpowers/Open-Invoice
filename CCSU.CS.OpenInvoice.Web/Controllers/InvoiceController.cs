using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [Route("Customer/{customerId}/Invoice")]
        public IActionResult CustomerInvoice(int customerId, int invoiceId)
        {
            var company = _invoicingContext.Companies.FirstOrDefault();
            var customer = _invoicingContext.Customers.FirstOrDefault(customer => customer.Id == customerId);

            if (invoiceId != 0)
            {

                var invoice = _invoicingContext.Invoices.Where(invoice => invoice.Id == invoiceId).Include(invoice => invoice.LineItems).FirstOrDefault();
                invoice.Logo = company.Logo; 
                return View(invoice);

            }

            else {
 
                var invoice = new Invoice
                {

                    Terms = company.Terms,
                    Notes = company.Notes,
                    CustomerId = customerId,
                    From = company.CompleteAddress,
                    BillTo = customer.CompleteAddress,
                    Logo = company.Logo
                };

                return View(invoice);

            }
            
        }


    }
}
