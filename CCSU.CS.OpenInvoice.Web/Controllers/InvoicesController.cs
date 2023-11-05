using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly InvoicingContext _invoiceingContext;
        public InvoicesController(InvoicingContext invoicingContext)
        {
            _invoiceingContext = invoicingContext;
        }

        [HttpGet]
        public IActionResult GetAllInvoices()
        {
            try
            {
                var invoices = _invoiceingContext.Invoices;
                return Ok(invoices);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
