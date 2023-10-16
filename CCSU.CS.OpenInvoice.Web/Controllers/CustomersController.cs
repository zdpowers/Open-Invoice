using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly InvoicingContext _invoicingContext;
        public CustomersController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }

        [HttpGet]
        public JsonResult GetCustomers()
        {
            var customers = _invoicingContext.Customers.ToList();
            var serializedCustomers = JsonConvert.SerializeObject(customers);
            return new JsonResult(serializedCustomers);
        }
    }
}
