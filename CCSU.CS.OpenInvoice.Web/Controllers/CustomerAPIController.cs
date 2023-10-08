using CCSU.CS.OpenInvoice.Web.Models;
using CCSU.CS.OpenInvoice.Web.Models.SampleData;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers {
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerAPIController : ControllerBase {

        [HttpGet]
        public ActionResult Get(DataSourceLoadOptions loadOptions)
        {
            return Ok(DataSourceLoader.Load(CustomerSampleData.DataGridCustomers, loadOptions));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Customer customerInfo) {

            //if(ModelState.IsValid) {
            //    return View("SuccessValidation");
            //}

            return Ok(CustomerSampleData.DataGridCustomers.Add(customerInfo));
        }

    }
}

