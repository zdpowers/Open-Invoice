using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly InvoicingContext _invoicingContext;
        public CompaniesController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;

        }
        [HttpPost]
        [Route("Save")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Company>> Save(Company company) {

            if(ModelState.IsValid) {

                if (company.CompanyId > 0)
                {
                    _invoicingContext.Companies.Update(company);
                }

                else {

                    var createdCompany = _invoicingContext.Companies.Add(company);

                }

                await _invoicingContext.SaveChangesAsync();

                return CreatedAtAction("GetCompany", new { id = company.CompanyId }, company);
            }

            return Ok(company);
        }

    }
}
