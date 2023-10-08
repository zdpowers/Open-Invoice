namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Company
    {
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public string? Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }

        public string Country { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Contact { get; set; }
        public string? Notes { get; set; }
        public string? Terms { get; set; }

        public string Logo { get; set; }




    }
}
