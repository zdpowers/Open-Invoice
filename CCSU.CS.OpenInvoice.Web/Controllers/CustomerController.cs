using System;
using CCSU.CS.OpenInvoice.Web.Models;
using CCSU.CS.OpenInvoice.Web.Models.SampleData;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers {

	public class CustomerController : Controller {
        public IActionResult Index() {
            // Make customer object and pass to view
            /*var customer = new Customer
            {
                Name = "Julie Shevchenko",
                Address = "123 Test Ln",
                Address2 = "",
                City = "Testville",
                State = "CT",
                Zip = "12345",
                Country = "USA",
                Phone = "123-456-7890",

            };
            var customer2 = new Customer
            {
                Name = "John Shevchenko",
                Address = "123 Test Ln",
                Address2 = "",
                City = "Testville",
                State = "CT",
                Zip = "12345",
                Country = "USA",
                Phone = "123-456-7890",

            };
            Customer[] customers = { customer, customer2 };

            IEnumerable<Customer> c = customers;
            return View(c);*/

            var csd = CustomerSampleData.DataGridCustomers;
            return View(csd);
        }

    }
}

