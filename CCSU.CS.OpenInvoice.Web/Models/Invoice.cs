namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public DateTime? Date { get; set; } = DateTime.Now;
        public DateTime? DueDate { get; set; }

        public string PaymentTerms { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public IEnumerable<LineItem> Items { get; set; }


    }

}
