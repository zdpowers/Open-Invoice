using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers {
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerAPIController : ControllerBase {
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Customer customerInfo) {

            //if(ModelState.IsValid) {
            //    return View("SuccessValidation");
            //}

            return Ok(customerInfo);
        }
    }
}

