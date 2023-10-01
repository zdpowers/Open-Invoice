using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(Company userInfo) {

            //if(ModelState.IsValid) {
            //    return View("SuccessValidation");
            //}

            return Ok(userInfo);
        }

    }
}
