using System;
using CCSU.CS.OpenInvoice.Web.Models;
using CCSU.CS.OpenInvoice.Web.Models.SampleData;
using Microsoft.AspNetCore.Mvc;

namespace CCSU.CS.OpenInvoice.Web.Controllers {

	public class CustomerController : Controller {
        public IActionResult Index() {

            return View();

        }

    }
}

