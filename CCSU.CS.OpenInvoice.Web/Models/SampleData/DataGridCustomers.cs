using System;
namespace CCSU.CS.OpenInvoice.Web.Models.SampleData
{
	public static class CustomerSampleData
	{
        public static IEnumerable<Customer> Add<Customer>(this IEnumerable<Customer> e, Customer value)
        {
            foreach (var cur in e)
            {
                yield return cur;
            }
            yield return value;
        }

        public static IEnumerable<Customer> DataGridCustomers = new[] {
            new Customer
            {
                CustomerId = 1,
                Name = "Julie Shevchenko",
                Address = "123 Test Ln",
                Address2 = "",
                City = "Testville",
                State = "CT",
                Zip = "12345",
                Country = "USA",
                Phone = "123-456-7890",
                Email = "julie@gmail.com"
            },
            new Customer
            {
                CustomerId = 2,
                Name = "John Doe",
                Address = "456 Test Ln",
                Address2 = "",
                City = "Testville",
                State = "CT",
                Zip = "12345",
                Country = "USA",
                Phone = "890-123-4567",
                Email = "john@gmail.com"
            },
            new Customer
            {
                CustomerId = 3,
                Name = "Jane Doe",
                Address = "456 Test Ln",
                Address2 = "",
                City = "Testville",
                State = "CT",
                Zip = "12345",
                Country = "USA",
                Phone = "456-789-0123",
                Email = "jane@gmail.com"
            }
        };
    }
}

