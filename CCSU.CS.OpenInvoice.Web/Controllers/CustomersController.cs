using System;
using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CCSU.CS.OpenInvoice.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        private readonly InvoicingContext _invoicingContext;
        public CustomersController(InvoicingContext invoicingContext)
        {
            _invoicingContext = invoicingContext;
        }

        [HttpPost]
        [Route("Save")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Customer>> Save(Customer customer)
        {
            if (ModelState.IsValid)
            {

                if (customer.Id > 0)
                {
                    _invoicingContext.Customers.Update(customer);
                }
                else
                {

                    var createdCustomer = _invoicingContext.Customers.Add(customer);
                }
                await _invoicingContext.SaveChangesAsync();
                return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
            }

            return Ok(customer);
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            try
            {
                var customers = _invoicingContext.Customers;
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetCustomerById(int id)
        {
            try
            {
                var customer = _invoicingContext.Customers.Find(id);
                if (customer == null)
                {
                    return NotFound();
                }
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Route("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteCustomerById(int id)
        {
            try
            {
                var customer = _invoicingContext.Customers.Find(id);
                if (customer == null)
                {
                    return NotFound();
                }
                _invoicingContext.Customers.Remove(customer);
                _invoicingContext.SaveChanges();

                return Ok(customer);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server Error");
            }
        }
    }
}

