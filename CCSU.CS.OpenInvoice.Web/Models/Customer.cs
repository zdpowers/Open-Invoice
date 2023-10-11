namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }

        public string Contact { get; set; }
        public string Address { get; set; }

        public string? Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }

        public string Country { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string? Notes { get; set; }
    }
}
