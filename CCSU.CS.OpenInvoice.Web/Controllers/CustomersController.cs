using CCSU.CS.OpenInvoice.Web.Models;
using CCSU.CS.OpenInvoice.Web.Models.SampleData;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;


namespace CCSU.CS.OpenInvoice.Web.Controllers {
    [Route("[controller]")]
    [ApiController]

    public class CustomersController : ControllerBase
    {

        private readonly InvoicingContext _invoicingContext;
        public CustomersController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }
        [HttpGet]
        public ActionResult Get(DataSourceLoadOptions loadOptions)
        {
            return Ok(DataSourceLoader.Load(_invoicingContext.Customers, loadOptions));
        }

        [HttpPost]
        public ActionResult Post([FromForm]String values)
        {
            var newCustomer = new Customer();
            JsonConvert.PopulateObject(values, newCustomer);
            if (!ModelState.IsValid)
                return BadRequest();

           _invoicingContext.Customers.Add(newCustomer);
            _invoicingContext.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public ActionResult Put(Customer customer)
        {
            var foundCustomer = _invoicingContext.Customers.First(e => e.CustomerId == customer.CustomerId);
            if (!ModelState.IsValid)
                return BadRequest();
            if (foundCustomer is not null)
            {
                _invoicingContext.Customers.Update(foundCustomer);
                _invoicingContext.SaveChanges();
            }
            

            return Ok();
        }

        [HttpDelete]
        public void Delete([FromForm] String key)
        {
            var customer = _invoicingContext.Customers.First(e => e.CustomerId == int.Parse(key));

            _invoicingContext.Customers.Remove(customer);
            _invoicingContext.SaveChanges();
        }

    }
}

