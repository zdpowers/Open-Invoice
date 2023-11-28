using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly InvoicingContext _invoicingContext;
        public InvoicesController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }

        [HttpGet]
        public IActionResult GetAllInvoices()
        {
            try
            {
                var invoices = _invoicingContext.Invoices.Include(i => i.Customer);
                return Ok(invoices);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Route("Save")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Invoice>> Save(Invoice invoice)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (invoice.Id > 0)
                    {
                        
                        var invoiceItemsNotInDatabase = _invoicingContext.LineItems
                            .AsNoTracking()
                            .Where(i => i.InvoiceId == invoice.Id).AsEnumerable().Where(dbLineItem => !invoice.LineItems.Any(li => li.Id == dbLineItem.Id)).ToList();


                        if (invoiceItemsNotInDatabase.Any())
                        {
                            _invoicingContext.LineItems.RemoveRange(invoiceItemsNotInDatabase);
                        }
                         

                        _invoicingContext.Invoices.Update(invoice);
                    }
                    else
                    {

                        var createdInvoice = _invoicingContext.Invoices.Add(invoice);
                    }
                    await _invoicingContext.SaveChangesAsync();
                    return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }

            }

            return BadRequest();


        }


        [HttpDelete]
        [Route("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteInvoiceById(int id)
        {
            try
            {
                var invoice = _invoicingContext.Invoices.FirstOrDefault(i => i.Id == id);
                if (invoice == null)
                {
                    return NotFound();
                }
                _invoicingContext.Invoices.Remove(invoice);
                _invoicingContext.SaveChanges();
                return Ok(invoice);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server Error");
            }
        }
    }
}
